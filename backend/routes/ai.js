const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Helper function to generate content with a specific key
const tryGenerateWithKey = async (apiKey, prompt) => {
  if (!apiKey) throw new Error("API key not provided");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

// @route   POST api/ai/generate
// @desc    Generate flashcards from text using Gemini AI
// @access  Private
router.post('/generate', auth, async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ msg: 'Text is required for generation' });
  }

  const prompt = `You are an expert educational assistant that creates high-quality flashcards.

Task:
Convert the given text into clear, concise flashcards for effective learning.

Instructions:
- Generate 5–10 flashcards
- Each flashcard must have:
  - "question": a clear, exam-style question
  - "answer": a short, accurate answer
- Keep answers concise (1–3 lines max)
- Focus on key concepts, definitions, and important facts
- Avoid vague or generic questions
- Do NOT repeat similar questions
- Make questions useful for revision and memory recall

Output Format (STRICT JSON ONLY):
[
  {
    "question": "What is ...?",
    "answer": "..."
  },
  {
    "question": "Explain ...",
    "answer": "..."
  }
]

Do not include any explanation, text, or formatting outside the JSON.

Text:
${text}`;

  try {
    let responseText;
    const keys = [
      process.env.GEMINI_API_KEY_1, 
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY // fallback in case of old .env
    ].filter(Boolean); // Remove undefined/null keys

    if (keys.length === 0) {
      return res.status(500).json({ msg: 'No API keys configured' });
    }

    let success = false;
    let lastError;

    // Try keys sequentially
    for (const key of keys) {
      try {
        console.log(`Trying API key starting with: ${key.substring(0, 8)}...`);
        responseText = await tryGenerateWithKey(key, prompt);
        success = true;
        break; // Stop loop if successful
      } catch (err) {
        console.error(`Error with key ${key.substring(0, 8)}...:`, err.message);
        lastError = err;
      }
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
