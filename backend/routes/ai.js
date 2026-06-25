const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Helper function to generate content with a specific key
const tryGenerateWithKey = async (apiKey, prompt) => {
  if (!apiKey) throw new Error("API key not provided");
  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-2.5-flash which is confirmed to work
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

// @route   POST api/ai/generate
// @desc    Generate flashcards from text using Gemini AI
// @access  Private
router.post('/generate', auth, async (req, res) => {
  const { text, count = 5, complexity = 'standard' } = req.body;

  if (!text) {
    return res.status(400).json({ msg: 'Text is required for generation' });
  }

  const prompt = `You are a high-achieving student helping a friend study. Your goal is to create flashcards that feel human, engaging, and easy to grasp, rather than robotic or purely academic.

Task:
Turn the following content into ${count} super-clear flashcards.

Style Guide:
- Tone: Conversational, friendly, and intuitive.
- Complexity Level: ${complexity} (if "advanced", dive deep; if "standard", focus on core intuition).
- Question Style: Instead of just "What is X?", use "How would you explain X to someone for the first time?" or "What's the main takeaway from X?".
- Answer Style: Short, punchy, and uses analogies where helpful. Keep it to 1-2 sentences.
- Focus: Key concepts that actually matter for understanding the big picture.

Output Format (STRICT JSON ONLY):
[
  {
    "question": "...",
    "answer": "..."
  }
]

Text to process:
${text}`;

  try {
    let responseText;
    const apiKey = process.env.GEMINI_API_KEY_1;

    if (!apiKey) {
      return res.status(500).json({ msg: 'GEMINI_API_KEY_1 is not configured' });
    }

    let success = false;
    let lastError;

    // Try key
    try {
      console.log(`Trying API key GEMINI_API_KEY_1 starting with: ${apiKey.substring(0, 8)}...`);
      responseText = await tryGenerateWithKey(apiKey, prompt);
      success = true;
    } catch (err) {
      console.error(`Error with GEMINI_API_KEY_1:`, err.message);
      lastError = err;
    }

    if (!success) {
      throw lastError || new Error("All API keys failed");
    }

    // Clean up response if it contains markdown JSON blocks
    let jsonStr = responseText.trim();
    if (jsonStr.startsWith('\`\`\`json')) {
      jsonStr = jsonStr.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
    } else if (jsonStr.startsWith('\`\`\`')) {
      jsonStr = jsonStr.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
    }

    const cards = JSON.parse(jsonStr);
    res.json(cards);
  } catch (err) {
    console.error('Final Generation Error:', err.message);
    res.status(500).send('Server error during AI generation');
  }
});

module.exports = router;
