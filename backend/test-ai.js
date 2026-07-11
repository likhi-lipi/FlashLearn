const { GoogleGenerativeAI } = require('@google/generative-ai');

require('dotenv').config();
const keys = [
  process.env.GEMINI_API_KEY
].filter(Boolean);

async function test() {
  for (const key of keys) {
    console.log(`\nTesting key: ${key.substring(0, 8)}...`);
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent("Hello, say hi.");
      console.log("Success with gemini-1.5-flash!");
      console.log(result.response.text());
      return;
    } catch (err) {
      console.error("Error with gemini-1.5-flash:", err.message);
    }

    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent("Hello, say hi.");
      console.log("Success with gemini-pro!");
      console.log(result.response.text());
      return;
    } catch (err) {
      console.error("Error with gemini-pro:", err.message);
    }
  }
}
test();
