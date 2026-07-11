const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Deck = require('./models/Deck');
const Card = require('./models/Card');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FlashLearn');
    console.log('MongoDB Connected for Seeding Extra...');

    let user = await User.findOne();
    if (!user) {
      console.log('No user found to assign decks to. Creating one...');
      user = new User({ username: 'system', email: 'system@flashlearn.app', password: 'password123' });
      await user.save();
    }

    const preAddedDecks = [
      { 
        title: 'World Geography', 
        description: 'Capitals, continents, and countries.', 
        category: 'Geography' 
      },
      { 
        title: 'Art History', 
        description: 'Famous paintings, sculptures, and artists from different eras.', 
        category: 'Art' 
      },
      { 
        title: 'React Fundamentals', 
        description: 'Hooks, components, state, and props.', 
        category: 'Tech' 
      },
      { 
        title: 'Data Structures', 
        description: 'Trees, graphs, linked lists, and arrays.', 
        category: 'Tech' 
      },
      { 
        title: 'Basic Astronomy', 
        description: 'Planets, stars, and galaxies in our universe.', 
        category: 'Science' 
      }
    ];

    const cardsData = {
      'World Geography': [
        { question: 'What is the capital of France?', answer: 'Paris' },
        { question: 'Which is the largest ocean?', answer: 'Pacific Ocean' },
        { question: 'How many continents are there?', answer: 'Seven' },
        { question: 'What is the longest river in the world?', answer: 'The Nile' }
      ],
      'Art History': [
        { question: 'Who painted the Starry Night?', answer: 'Vincent van Gogh' },
        { question: 'In what century did the Renaissance begin?', answer: '14th century' },
        { question: 'What museum houses the Mona Lisa?', answer: 'The Louvre' }
      ],
      'React Fundamentals': [
        { question: 'What hook is used to manage state?', answer: 'useState' },
        { question: 'What hook is used for side effects?', answer: 'useEffect' },
        { question: 'What is JSX?', answer: 'A syntax extension for JavaScript used with React.' }
      ],
      'Data Structures': [
        { question: 'What is a Linked List?', answer: 'A linear data structure where elements are not stored at contiguous memory locations.' },
        { question: 'What is LIFO?', answer: 'Last In, First Out (used in Stacks)' },
        { question: 'What data structure is used for BFS?', answer: 'Queue' }
      ],
      'Basic Astronomy': [
        { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
        { question: 'What galaxy is Earth located in?', answer: 'The Milky Way' },
        { question: 'What is the closest star to Earth?', answer: 'The Sun' }
      ]
    };

    for (const d of preAddedDecks) {
      const newDeck = new Deck({
        title: d.title,
        description: d.description,
        user: user._id,
      });
      await newDeck.save();

      for (const c of cardsData[d.title]) {
        await new Card({
          deck: newDeck._id,
          question: c.question,
          answer: c.answer
        }).save();
      }
    }

    console.log('Database seeded successfully with EXTRA content!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
