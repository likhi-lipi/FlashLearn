require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Deck = require('./models/Deck');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/FlashLearn";

async function query() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    const users = await User.find();
    console.log('--- USERS ---');
    for (const u of users) {
      console.log(`ID: ${u._id}, Email: ${u.email}, Username: ${u.username}`);
    }

    const decks = await Deck.find();
    console.log('\n--- DECKS ---');
    for (const d of decks) {
      console.log(`ID: ${d._id}, Title: ${d.title}, User ID: ${d.user}`);
    }
  } catch (err) {
    console.error('ERROR OCCURRED:', err);
  } finally {
    mongoose.connection.close();
  }
}
query();
