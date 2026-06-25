const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Card = require('../models/Card');
const Deck = require('../models/Deck');

// @route   GET api/cards/deck/:deckId
// @desc    Get all cards for a specific deck
// @access  Private
router.get('/deck/:deckId', auth, async (req, res) => {
  try {
    // Check if deck exists and belongs to user
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) return res.status(404).json({ msg: 'Deck not found' });
    if (deck.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const cards = await Card.find({ deck: req.params.deckId });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/cards/study/:deckId
// @desc    Get cards for a specific deck that are due for review
// @access  Private
router.get('/study/:deckId', auth, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) return res.status(404).json({ msg: 'Deck not found' });
    if (deck.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const currentDate = new Date();
    const cards = await Card.find({ 
      deck: req.params.deckId,
      nextReviewDate: { $lte: currentDate }
    });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/cards
// @desc    Create a card
// @access  Private
router.post('/', auth, async (req, res) => {
  const { deck, question, answer, tags, image } = req.body;
  try {
    const deckObj = await Deck.findById(deck);
    if (!deckObj) return res.status(404).json({ msg: 'Deck not found' });
    if (deckObj.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const newCard = new Card({ deck, question, answer, tags, image });
    const card = await newCard.save();
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/cards/:id/review
// @desc    Update card after review (SRS basic logic)
// @access  Private
router.put('/:id/review', auth, async (req, res) => {
  const { quality } = req.body; // quality: 0 (Hard), 1 (Medium), 2 (Easy)
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ msg: 'Card not found' });

    // Ensure user owns the deck
    const deck = await Deck.findById(card.deck);
    if (deck.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    // Basic SRS Logic
    let daysToAdd = 1; // Default
    if (quality === 0) daysToAdd = 0; // Hard: review today/tomorrow
    else if (quality === 1) daysToAdd = 3; // Medium: review in 3 days
    else if (quality === 2) daysToAdd = 7; // Easy: review in 7 days

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysToAdd);

    card.difficulty = quality;
    card.nextReviewDate = nextReview;

    await card.save();
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/cards/:id
// @desc    Delete a card
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ msg: 'Card not found' });

    const deck = await Deck.findById(card.deck);
    if (deck.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await card.deleteOne();
    res.json({ msg: 'Card removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
