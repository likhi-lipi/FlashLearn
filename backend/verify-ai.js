require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const key = process.env.GEMINI_API_KEY;
console.log('Key found:', key ? key.substring(0, 12) + '...' : 'NOT FOUND');

const genAI = new GoogleGenerativeAI(key);

const models = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash-lite',
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
];

async function test() {
  for (const modelName of models) {
    console.log(`\nTrying: ${modelName}...`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say the word WORKING.');
      const text = result.response.text();
      console.log(`✅ SUCCESS with ${modelName}:`);
      console.log(text);
      return modelName; // stop on first success
    } catch (e) {
      const short = e.message.includes('429') ? '429 Quota exceeded'
        : e.message.includes('404') ? '404 Not found'
        : e.message.substring(0, 120);
      console.log(`❌ ${short}`);
    }
  }
  console.log('\nAll models failed.');
}

test();
