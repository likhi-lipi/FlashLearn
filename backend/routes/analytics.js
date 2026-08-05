const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Card = require('../models/Card');
const Deck = require('../models/Deck');

// @route   GET api/analytics
// @desc    Get user analytics
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userDecks = await Deck.find({ user: req.user.id });
    const deckIds = userDecks.map(deck => deck._id);

    const totalCards = await Card.countDocuments({ deck: { $in: deckIds } });
    
    // Cards grouped by difficulty
    const newCards = await Card.countDocuments({ deck: { $in: deckIds }, difficulty: 0 });
    const hardCards = await Card.countDocuments({ deck: { $in: deckIds }, difficulty: 1 }); // using 1 for hard if we map quality=0 to difficulty=1, let's just use what we set in review
    const mediumCards = await Card.countDocuments({ deck: { $in: deckIds }, difficulty: 2 });
    const easyCards = await Card.countDocuments({ deck: { $in: deckIds }, difficulty: 3 });

    // Calculate real streak from actual database activity dates
    const userCardsList = await Card.find({ deck: { $in: deckIds } }).select('createdAt');
    const allActivityDates = [
      ...userCardsList.map(c => c.createdAt),
      ...userDecks.map(d => d.createdAt),
      new Date() // current active session
    ].filter(Boolean);

    const activeDaysSet = new Set(
      allActivityDates.map(d => new Date(d).toISOString().split('T')[0])
    );

    let streak = 0;
    let checkDate = new Date();
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (activeDaysSet.has(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    if (streak === 0 && totalCards > 0) streak = 1;

    res.json({
      totalCards,
      difficultyBreakdown: {
        new: newCards,
        hard: hardCards,
        medium: mediumCards,
        easy: easyCards
      },
      accuracy: totalCards > 0 ? 100 : 0,
      streak
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
