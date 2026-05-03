import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Volume2, Mic, RotateCcw } from 'lucide-react';

const StudyMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    fetchStudyCards();
    fetchDeck();
  }, [id]);

  const fetchStudyCards = async () => {
    try {
      // Get cards due for review
      const res = await api.get(`/cards/study/${id}`);
      setCards(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchDeck = async () => {
    try {
      const res = await api.get('/decks');
      setDeck(res.data.find(d => d._id === id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = async (quality) => {
    const currentCard = cards[currentIndex];
    try {
      await api.put(`/cards/${currentCard._id}/review`, { quality });
      
      // Move to next card
      if (currentIndex < cards.length - 1) {
        setIsFlipped(false);
        // Small delay to allow flip animation to reset
        setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
      } else {
        // Session complete
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const playTTS = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;

  if (cards.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">You're all caught up! 🎉</h2>
        <p className="text-gray-400 mb-8">No cards due for review in this deck.</p>
        <Link to={`/deck/${id}`} className="bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-opacity-90">
          Manage Deck
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8 flex flex-col h-[80vh]">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-gray-400 hover:text-white flex items-center space-x-2">
          <ArrowLeft size={20} /> <span>Exit Session</span>
        </Link>
        <div className="text-gray-400">
          Card {currentIndex + 1} of {cards.length}
        </div>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500" 
          style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center perspective-1000">
        <div 
          className={`relative w-full max-w-xl h-80 transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden glass-panel rounded-2xl p-8 flex flex-col items-center justify-center border-t-4 border-t-primary shadow-2xl">
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.question); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary"
            >
              <Volume2 size={24} />
            </button>
            <h3 className="text-gray-500 text-sm uppercase mb-4 tracking-widest">Question</h3>
            <p className="text-2xl text-center font-medium leading-relaxed">{currentCard.question}</p>
            {!isFlipped && (
              <p className="absolute bottom-6 text-gray-500 text-sm animate-pulse">Click to reveal answer</p>
            )}
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden glass-panel rounded-2xl p-8 flex flex-col items-center justify-center border-t-4 border-t-secondary shadow-2xl rotate-y-180">
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.answer); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-secondary"
            >
              <Volume2 size={24} />
            </button>
            <h3 className="text-gray-500 text-sm uppercase mb-4 tracking-widest">Answer</h3>
            <p className="text-xl text-center leading-relaxed text-gray-200">{currentCard.answer}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`transition-opacity duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h4 className="text-center text-gray-400 mb-4">How difficult was this?</h4>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => handleReview(0)}
            className="flex-1 bg-surface border border-error text-error hover:bg-error hover:text-white py-3 rounded-xl font-bold transition-colors"
          >
            Hard
          </button>
          <button 
            onClick={() => handleReview(1)}
            className="flex-1 bg-surface border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white py-3 rounded-xl font-bold transition-colors"
          >
            Medium
          </button>
          <button 
            onClick={() => handleReview(2)}
            className="flex-1 bg-surface border border-secondary text-secondary hover:bg-secondary hover:text-background py-3 rounded-xl font-bold transition-colors"
          >
            Easy
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
