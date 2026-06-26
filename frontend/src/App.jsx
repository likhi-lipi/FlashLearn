import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing/index';
import Login from './pages/Login/index';
import Dashboard from './pages/Dashboard/index';
import DeckDetail from './pages/DeckDetail/index';
import StudyMode from './pages/StudyMode/index';
import AIGenerator from './pages/AIGenerator/index';
import MakeFlashcards from './pages/MakeFlashcards/index';
import BrowseDecks from './pages/BrowseDecks';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen bg-background text-white flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-dark font-sans flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><Login /></div>} />
          <Route path="/dashboard" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><Dashboard /></div></ProtectedRoute>} />
          <Route path="/deck/:id" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><DeckDetail /></div></ProtectedRoute>} />
          <Route path="/study/:id" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><StudyMode /></div></ProtectedRoute>} />
          <Route path="/make" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><MakeFlashcards /></div></ProtectedRoute>} />
          <Route path="/generate" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><AIGenerator /></div></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><BrowseDecks type="all" title="Browse All Subjects" /></div></ProtectedRoute>} />
          <Route path="/popular" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><BrowseDecks type="popular" title="Most Popular Decks" /></div></ProtectedRoute>} />
          <Route path="/recent" element={<ProtectedRoute><div className="container mx-auto px-4 pt-2 pb-8 max-w-7xl flex-1"><BrowseDecks type="recent" title="Recently Added Decks" /></div></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
