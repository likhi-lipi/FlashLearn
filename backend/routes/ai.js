const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   POST api/ai/generate
// @desc    Mock AI generation of flashcards from text
// @access  Private
router.post('/generate', auth, async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ msg: 'Text is required for generation' });
  }

  try {
    // In a real app, you would call OpenAI API or Gemini API here.
    // Example: const response = await openai.createCompletion({...})
    
    // Mock response
    setTimeout(() => {
      const mockCards = [
        { question: "What is the main topic of the provided text?", answer: "The text discusses concepts that require flashcards." },
        { question: "How does AI help in creating flashcards?", answer: "AI can extract key information and format it as question-answer pairs automatically." },
        { question: "What is Spaced Repetition?", answer: "A learning technique that incorporates increasing intervals of time between subsequent review of previously learned material." }
      ];
      res.json(mockCards);
    }, 1500); // simulate API delay
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error during AI generation');
  }
});

module.exports = router;
