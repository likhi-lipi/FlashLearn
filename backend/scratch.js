require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/FlashLearn";

async function test() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    let user = new User({ username: 'testuser_debug2', email: 'test_debug2@gmail.com', password: 'password123' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    console.log('Saving user...');
    await user.save();
    console.log('User saved successfully');

    const jwt = require('jsonwebtoken');
    const payload = { user: { id: user.id } };
    console.log('Signing token with JWT_SECRET:', process.env.JWT_SECRET);
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
      if (err) throw err;
      console.log('Token generated successfully');
    });
  } catch (err) {
    console.error('ERROR OCCURRED:', err);
  } finally {
    mongoose.connection.close();
  }
}
test();
