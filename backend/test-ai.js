const { GoogleGenerativeAI } = require('@google/generative-ai');

const keys = [
  "AIzaSyAVJ5M65PXVN17n-Ji22peOaWFPIdhollI",
  "AIzaSyDrnFUageIFO3S5GOuPRY3YI4H4lfKRL9I"
];

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
