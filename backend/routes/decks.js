const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Deck = require('../models/Deck');
const Card = require('../models/Card');

// @route   GET api/decks
// @desc    Get all decks for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const decks = await Deck.find({ user: req.user.id }).sort({ createdAt: -1 });
    // Get card counts for each deck
    const deckWithCounts = await Promise.all(decks.map(async (deck) => {
        const count = await Card.countDocuments({ deck: deck._id });
        return { ...deck._doc, cardCount: count };
    }));
    res.json(deckWithCounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/decks/all
// @desc    Get all public decks
// @access  Private
router.get('/all', auth, async (req, res) => {
  try {
    const decks = await Deck.find().sort({ title: 1 });
    const deckWithCounts = await Promise.all(decks.map(async (deck) => {
        const count = await Card.countDocuments({ deck: deck._id });
        return { ...deck._doc, cardCount: count };
    }));
    res.json(deckWithCounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/decks/popular
// @desc    Get most popular decks
// @access  Private
router.get('/popular', auth, async (req, res) => {
  try {
    const decks = await Deck.aggregate([
      {
        $lookup: {
          from: 'cards',
          localField: '_id',
          foreignField: 'deck',
          as: 'cards'
        }
      },
      {
        $addFields: { cardCount: { $size: "$cards" } }
      },
      { $sort: { cardCount: -1 } },
      { $limit: 20 },
      { $project: { cards: 0 } }
    ]);
    res.json(decks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/decks/recent
// @desc    Get recently added decks
// @access  Private
router.get('/recent', auth, async (req, res) => {
  try {
    const decks = await Deck.find().sort({ createdAt: -1 }).limit(20);
    const deckWithCounts = await Promise.all(decks.map(async (deck) => {
        const count = await Card.countDocuments({ deck: deck._id });
        return { ...deck._doc, cardCount: count };
    }));
    res.json(deckWithCounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/decks
// @desc    Create a deck
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newDeck = new Deck({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });
    const deck = await newDeck.save();
    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/decks/:id
// @desc    Delete a deck and its cards
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) return res.status(404).json({ msg: 'Deck not found' });
    if (deck.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    // Delete associated cards
    await Card.deleteMany({ deck: req.params.id });
    await deck.deleteOne();
    
    res.json({ msg: 'Deck removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
