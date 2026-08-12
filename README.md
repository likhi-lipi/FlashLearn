# 📚 FlashLearn - AI-Powered Flashcard Learning Platform

FlashLearn is a modern, feature-rich web application designed to revolutionize how students study. Powered by Google's Generative AI, it intelligently generates flashcards from user notes, supports voice input/output, tracks progress with detailed analytics, and implements spaced repetition algorithms to maximize memory retention.

---

## ✨ Key Features

### 📝 Smart Card Generation
- **AI-Powered Creation**: Automatically generate flashcards from your notes using Google Gemini AI
- **Multiple Input Formats**: Create cards manually or batch import from text
- **Customizable Questions**: Fine-tune questions and answers before saving

### 🗣️ Voice Capabilities
- **Text-to-Speech (TTS)**: Hear card content for audio learning
- **Voice Input**: Create and answer flashcards using voice commands
- **Natural Language Processing**: Accurate voice recognition for hands-free studying

### 📊 Advanced Analytics & Progress Tracking
- **Performance Metrics**: Track your study progress with detailed charts and statistics
- **Retention Analysis**: Monitor your learning curve and mastery level
- **Study Streak Counter**: Keep track of your consistency with daily streaks
- **Time Spent Tracking**: See how much time you've invested in each deck

### 🎯 Spaced Repetition Algorithm
- **Optimized Review Schedule**: Cards are automatically scheduled for review at optimal intervals
- **Difficulty Levels**: Track easy, medium, and hard cards
- **Adaptive Learning**: System adapts to your learning pace

### 📚 Deck Management
- **Create Multiple Decks**: Organize cards into topic-specific decks
- **Folder Organization**: Group related decks into folders for easy access
- **Public Decks**: Browse and study from publicly shared decks
- **Deck Sharing**: Share your decks with friends and classmates

### 🎮 Interactive Study Modes
- **Study Mode**: Traditional flashcard review with spaced repetition
- **Rapid Round**: Quick fire questions to test your knowledge
- **Progress Dashboard**: Real-time stats and visual progress indicators

### 👤 User Management
- **Secure Authentication**: JWT-based login and registration
- **User Profiles**: Personalized study spaces and preferences
- **Account Settings**: Manage your learning preferences

### 🎨 User Experience
- **Dark/Light Mode**: Choose your preferred theme for comfortable studying
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Modern UI**: Built with React and Tailwind CSS for smooth interactions
- **Smooth Animations**: GSAP-powered animations for engaging interactions

---

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks and functional components
- **React Router DOM v6**: Client-side routing and navigation
- **Vite**: Ultra-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Axios**: HTTP client for API communication
- **GSAP**: Professional-grade animation library
- **Lucide React**: Beautiful, consistent icon library
- **Three.js & React Three Fiber**: 3D graphics rendering (optional visual enhancements)
- **Chart.js & react-chartjs-2**: Data visualization for analytics

### Backend
- **Node.js & Express.js**: Server-side runtime and web framework
- **MongoDB & Mongoose**: NoSQL database and ODM for data persistence
- **Google Generative AI (Gemini)**: AI-powered flashcard generation
- **JWT (jsonwebtoken)**: Secure token-based authentication
- **Bcryptjs**: Secure password hashing
- **CORS**: Cross-origin resource sharing for frontend-backend communication
- **Dotenv**: Environment variable management

### Development Tools
- **Concurrently**: Run multiple npm commands simultaneously
- **ESLint**: Code quality and style enforcement
- **PostCSS**: CSS transformation tool

---

## 📋 Project Structure

```
FlashLearn/
├── backend/                          # Node.js/Express server
│   ├── models/                       # MongoDB schemas
│   │   ├── User.js                   # User data model
│   │   ├── Deck.js                   # Flashcard deck model
│   │   └── Card.js                   # Individual flashcard model
│   ├── routes/                       # API endpoints
│   │   ├── auth.js                   # Authentication routes
│   │   ├── cards.js                  # Card management routes
│   │   ├── decks.js                  # Deck management routes
│   │   ├── ai.js                     # AI generation routes
│   │   ├── analytics.js              # Analytics & statistics routes
│   │   └── public.js                 # Public deck routes
│   ├── middleware/                   # Express middleware
│   │   └── auth.js                   # JWT verification middleware
│   ├── server.js                     # Main server entry point
│   └── package.json                  # Backend dependencies
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Navbar.jsx            # Navigation header
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── Folder.jsx            # Folder display component
│   │   │   └── SplitText.jsx         # Animated text component
│   │   ├── pages/                    # Page components
│   │   │   ├── Landing/              # Landing page
│   │   │   ├── Login/                # Login & registration
│   │   │   ├── Dashboard/            # Main dashboard
│   │   │   ├── BrowseDecks/          # Public deck browsing
│   │   │   ├── DeckDetail/           # Deck overview
│   │   │   ├── MakeFlashcards/       # Card creation
│   │   │   ├── AIGenerator/          # AI-powered generation
│   │   │   ├── StudyMode/            # Study interface
│   │   │   ├── RapidRound/           # Quick quiz mode
│   │   │   └── Profile/              # User profile & analytics
│   │   ├── context/                  # React Context for state management
│   │   │   ├── AuthContext.jsx       # Authentication state
│   │   │   └── ThemeContext.jsx      # Theme (dark/light) state
│   │   ├── api/                      # API client configuration
│   │   │   └── axios.js              # Axios instance with interceptors
│   │   ├── assets/                   # Static assets (images, icons)
│   │   ├── App.jsx                   # Root component
│   │   └── main.jsx                  # Entry point
│   ├── public/                       # Static files
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS settings
│   ├── postcss.config.js             # PostCSS configuration
│   └── package.json                  # Frontend dependencies
│
├── package.json                      # Root package.json (runs both)
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v16.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v8.0.0 or higher (included with Node.js)
- **MongoDB**: Local or remote instance
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Remote: [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas)
- **Google Gemini API Key**: Get one free at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/FlashLearn.git
cd FlashLearn
```

#### 2. Install Root Dependencies
```bash
npm install
```

This installs the `concurrently` package needed to run both servers together.

#### 3. Install Backend Dependencies
```bash
npm run install:backend
```

#### 4. Install Frontend Dependencies
```bash
npm run install:frontend
```

Or install all at once:
```bash
npm run install:all
```

#### 5. Environment Configuration

**Backend (.env file in `/backend` directory)**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/flashlearn
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flashlearn

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Google AI
GOOGLE_API_KEY=your_google_gemini_api_key_here

# CORS
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env file in `/frontend` directory)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Start Both Frontend & Backend Together
```bash
npm start
```

This will launch:
- **Backend Server**: Running on `http://localhost:5000`
- **Frontend Application**: Running on `http://localhost:5173`

> The browser will automatically open the frontend at `http://localhost:5173`

### Individual Startup Commands

**Start only Backend**:
```bash
npm run backend
```

**Start only Frontend**:
```bash
npm run frontend
```

---

## 📱 Features Walkthrough

### 1. **Authentication & User Accounts**
- Sign up with email and password
- Secure JWT-based authentication
- Password encryption with bcryptjs
- Persistent login sessions

### 2. **Creating Flashcards**
- **Manual Creation**: Type questions and answers directly
- **AI Generation**: Paste your notes → AI generates cards automatically
- **Batch Import**: Import multiple cards at once
- **Edit & Delete**: Modify or remove cards anytime

### 3. **Studying with Spaced Repetition**
- Review cards at optimal intervals
- Track mastery level (learning, reviewing, mastered)
- Customizable study sessions
- Difficulty rating system

### 4. **Analytics & Progress**
- View study statistics
- Track retention rates
- Monitor study streaks
- Visualize learning progress with charts

### 5. **Deck Sharing & Discovery**
- Browse public decks created by other users
- Fork decks to create your own version
- Share your decks with classmates
- Private and public deck options

### 6. **Voice Features**
- Enable text-to-speech for card content
- Practice pronunciation by listening to cards
- Voice input for creating cards
- Adjustable voice speed and language

---

## 🔐 Security Features

- **Secure Authentication**: JWT tokens with expiration
- **Password Hashing**: Bcryptjs for secure password storage
- **CORS Protection**: Configured cross-origin resource sharing
- **Environment Variables**: Sensitive data protected with .env files
- **API Authorization**: Protected routes require valid JWT tokens
- **Input Validation**: Server-side validation for all inputs

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login with JWT
- `GET /api/auth/verify` - Verify JWT token validity

### Deck Endpoints
- `GET /api/decks` - Get user's decks
- `POST /api/decks` - Create new deck
- `GET /api/decks/:id` - Get deck details
- `PUT /api/decks/:id` - Update deck
- `DELETE /api/decks/:id` - Delete deck

### Card Endpoints
- `GET /api/cards/:deckId` - Get cards in a deck
- `POST /api/cards` - Create new card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card

### AI Endpoints
- `POST /api/ai/generate` - Generate cards from text using AI

### Analytics Endpoints
- `GET /api/analytics/stats` - Get user statistics
- `GET /api/analytics/deck/:id` - Get deck-specific stats

### Public Endpoints
- `GET /api/public/decks` - Browse public decks
- `GET /api/public/decks/:id` - Get public deck details

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod` (Windows) or service check on Mac/Linux
- Verify PORT 5000 is not in use: `netstat -ano | findstr :5000` (Windows)
- Check `.env` file exists in `/backend` with correct MongoDB URI

### Frontend won't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in backend
- Verify `.env` in `/frontend` has correct `VITE_API_URL`
- Clear browser cache and refresh

### AI generation not working
- Verify `GOOGLE_API_KEY` is set in backend `.env`
- Check API key has Generative AI permission
- Ensure you haven't exceeded free tier quota

### Port conflicts
- Backend default: `5000` (change in `.env`)
- Frontend default: `5173` (Vite will auto-increment if in use)

---

## 📦 Available Scripts

```bash
# Root level commands
npm start              # Start both frontend and backend
npm run backend        # Start only backend
npm run frontend       # Start only frontend
npm run install:all    # Install all dependencies
npm run install:backend # Install backend dependencies only
npm run install:frontend # Install frontend dependencies only

# Backend commands (from /backend directory)
npm run dev            # Start backend dev server
npm start              # Start backend server
npm test               # Run tests (not implemented yet)

# Frontend commands (from /frontend directory)
npm run dev            # Start Vite dev server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

---

## 🎓 Learning Outcomes

Using FlashLearn helps you:
- ✅ Retain information longer through spaced repetition
- ✅ Learn more efficiently with AI-generated questions
- ✅ Track progress and identify weak areas
- ✅ Study at your own pace with flexible scheduling
- ✅ Collaborate with classmates through shared decks

---

## 🚀 Future Enhancements

- [ ] Collaborative decks with real-time sync
- [ ] Mobile app (React Native)
- [ ] Integration with calendar for schedule optimization
- [ ] Custom study algorithms
- [ ] Leaderboards and gamification
- [ ] Browser extension for quick note capture
- [ ] PDF import functionality
- [ ] Machine learning for personalized recommendations

---

## 🤝 Contributing

We welcome contributions! To get started:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support & Contact

- **Issues**: Open an issue on GitHub
- **Email**: support@flashlearn.dev
- **Documentation**: Check the [Wiki](https://github.com/yourusername/FlashLearn/wiki)

---

## 🙏 Acknowledgments

- Google Gemini AI for powering flashcard generation
- React and Vite communities for excellent tools
- MongoDB for reliable data persistence
- All contributors and users of FlashLearn

---

**Happy Learning! 📚✨**
