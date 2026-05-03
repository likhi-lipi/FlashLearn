import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeckDetail from './pages/DeckDetail';
import StudyMode from './pages/StudyMode';
import AIGenerator from './pages/AIGenerator';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen bg-background text-white flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<div className="container mx-auto px-4 py-8 max-w-7xl flex-1"><Login /></div>} />
          <Route path="/dashboard" element={<ProtectedRoute><div className="container mx-auto px-4 py-8 max-w-7xl flex-1"><Dashboard /></div></ProtectedRoute>} />
          <Route path="/deck/:id" element={<ProtectedRoute><div className="container mx-auto px-4 py-8 max-w-7xl flex-1"><DeckDetail /></div></ProtectedRoute>} />
          <Route path="/study/:id" element={<ProtectedRoute><div className="container mx-auto px-4 py-8 max-w-7xl flex-1"><StudyMode /></div></ProtectedRoute>} />
          <Route path="/generate" element={<ProtectedRoute><div className="container mx-auto px-4 py-8 max-w-7xl flex-1"><AIGenerator /></div></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
