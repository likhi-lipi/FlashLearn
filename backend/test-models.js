const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
console.log('Testing with key:', key ? key.substring(0, 10) + '...' : 'none');

const models = [
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-pro",
  "gemini-2.0-flash-exp"
];

async function run() {
  const genAI = new GoogleGenerativeAI(key);
  for (const m of models) {
    console.log(`\nTrying model: ${m}`);
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello! Respond with 'Success'.");
      console.log(`[SUCCESS] Model ${m} worked!`);
      console.log('Response:', result.response.text());
      return;
    } catch (err) {
      console.error(`[FAILED] Model ${m}:`, err.message);
    }
  }
}
run();
