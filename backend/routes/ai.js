const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const CANDIDATE_MODELS = [
  "gemini-flash-latest",
  "gemini-1.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-pro"
];

// Helper function to generate content with a specific key
const tryGenerateWithKey = async (apiKey, prompt) => {
  if (!apiKey) throw new Error("API key not provided");
  const genAI = new GoogleGenerativeAI(apiKey);
  
  let lastErr;
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.warn(`Model ${modelName} failed: ${err.message}`);
      lastErr = err;
    }
  }
  throw lastErr || new Error("All generative models failed");
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
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ msg: 'GEMINI_API_KEY is not configured' });
    }

    let success = false;
    let lastError;

    // Try key
    try {
      console.log(`Trying API key GEMINI_API_KEY starting with: ${apiKey.substring(0, 8)}...`);
      responseText = await tryGenerateWithKey(apiKey, prompt);
      success = true;
    } catch (err) {
      console.error(`Error with GEMINI_API_KEY:`, err.message);
      lastError = err;
    }

    if (!success) {
      throw lastError || new Error("All API keys failed");
    }

    // Robustly extract JSON array from responseText
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON array from AI response");
    }

    const cards = JSON.parse(jsonMatch[0]);
    res.json(cards);
  } catch (err) {
    console.error('Final Generation Error:', err.message);
    res.status(500).send('Server error during AI generation');
  }
});

module.exports = router;
