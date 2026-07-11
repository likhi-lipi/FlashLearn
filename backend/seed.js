const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Deck = require('./models/Deck');
const Card = require('./models/Card');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FlashLearn');
    console.log('MongoDB Connected for Seeding...');

    // Get any user to assign the decks to, or create a dummy user
    let user = await User.findOne();
    if (!user) {
      user = new User({ username: 'system', email: 'system@flashlearn.app', password: 'password123' });
      await user.save();
    }

    // Check if we already have decks, if so clear them to avoid duplicates (optional, but let's just clear for the demo)
    await Deck.deleteMany({});
    await Card.deleteMany({});

    const preAddedDecks = [
      { 
        title: 'Physics Basics', 
        description: 'Fundamental concepts of classical mechanics, kinematics, and thermodynamics.', 
        category: 'Science' 
      },
      { 
        title: 'Python Programming', 
        description: 'Core syntax, data structures, and algorithms for beginner to intermediate Python developers.', 
        category: 'Tech' 
      },
      { 
        title: 'Engineering Math', 
        description: 'Comprehensive review of Calculus, linear algebra, and differential equations.', 
        category: 'Math' 
      },
      { 
        title: 'Spanish Vocabulary', 
        description: 'Essential words and conversational phrases for everyday Spanish communication.', 
        category: 'Language' 
      },
    ];

    const cardsData = {
      'Physics Basics': [
        { question: 'What is Newton\'s First Law?', answer: 'An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.' },
        { question: 'Define velocity.', answer: 'The rate of change of position with respect to time, typically with a specified direction.' },
        { question: 'What is the formula for kinetic energy?', answer: 'KE = 1/2 * m * v^2' }
      ],
      'Python Programming': [
        { question: 'What is a list comprehension in Python?', answer: 'A concise way to create lists based on existing lists. Example: [x*2 for x in range(10)]' },
        { question: 'What is a decorator?', answer: 'A function that takes another function and extends the behavior of the latter function without explicitly modifying it.' },
        { question: 'Difference between tuple and list?', answer: 'Lists are mutable (can be changed), while tuples are immutable (cannot be changed after creation).' }
      ],
      'Engineering Math': [
        { question: 'What is the derivative of sin(x)?', answer: 'cos(x)' },
        { question: 'What is an eigenvector?', answer: 'A non-zero vector that changes at most by a scalar factor when that linear transformation is applied to it.' },
        { question: 'Define Laplace Transform.', answer: 'An integral transform that converts a function of a real variable t (often time) to a function of a complex variable s (complex frequency).' }
      ],
      'Spanish Vocabulary': [
        { question: 'Hello', answer: 'Hola' },
        { question: 'Thank you', answer: 'Gracias' },
        { question: 'Where is the bathroom?', answer: '¿Dónde está el baño?' }
      ]
    };

    for (const d of preAddedDecks) {
      const newDeck = new Deck({
        title: d.title,
        description: d.description,
        user: user._id,
        // if category field is in schema, great. If not, it will be ignored unless we update schema.
      });
      // Assuming we need to bypass strict schema for 'category' or add it. Let's update schema.
      await newDeck.save();

      // Add cards
      for (const c of cardsData[d.title]) {
        await new Card({
          deck: newDeck._id,
          question: c.question,
          answer: c.answer
        }).save();
      }
    }

    console.log('Database seeded successfully with pre-added content!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
