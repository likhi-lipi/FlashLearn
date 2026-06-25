import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Lightbulb, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudyData();
  }, []);

  const fetchStudyData = async () => {
    try {
      setLoading(true);
      const decksRes = await api.get('/decks');
      const decks = decksRes.data;
      
      if (decks.length > 0) {
        // Find a deck that has cards
        let selectedDeck = null;
        let studyCards = [];
        
        for (let d of decks) {
          if (d.cardCount > 0) {
            // First try due cards
            let res = await api.get(`/cards/study/${d._id}`);
            if (res.data.length > 0) {
              selectedDeck = d;
              studyCards = res.data;
              break;
            }
          }
        }
        
        // If no due cards, just pick the first deck with any cards
        if (!selectedDeck) {
          const deckWithCards = decks.find(d => d.cardCount > 0);
          if (deckWithCards) {
            selectedDeck = deckWithCards;
            const res = await api.get(`/cards/deck/${deckWithCards._id}`);
            studyCards = res.data;
          }
        }
        
        setDeck(selectedDeck);
        setCards(studyCards);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching study data", err);
      setLoading(false);
    }
  };

  const handleReview = async (quality) => {
    if (cards.length === 0 || currentIndex >= cards.length) return;
    
    try {
      const currentCard = cards[currentIndex];
      await api.put(`/cards/${currentCard._id}/review`, { quality });
      
      // Move to next card
      if (currentIndex < cards.length - 1) {
        setIsFlipped(false);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Finished deck session
        setCards([]);
      }
    } catch (err) {
      console.error("Failed to submit review", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!deck || cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center text-4xl">
          🎉
        </div>
        <div>
          <h2 className="text-3xl font-bold text-dark mb-2">You're all caught up!</h2>
          <p className="text-muted font-medium text-lg max-w-md mx-auto">No cards due for review right now. Take a break or create some new flashcards.</p>
        </div>
        <button 
          onClick={() => navigate('/make')}
          className="bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all hover:-translate-y-0.5"
        >
          Make New Flashcards
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="w-full max-w-[900px] mx-auto pt-8 pb-20 flex flex-col items-center">
      
      {/* Header section */}
      <div className="w-full flex justify-between items-end mb-8 px-2">
        <div>
          <p className="text-[11px] font-bold text-muted tracking-widest uppercase mb-1">Currently Studying</p>
          <h1 className="text-3xl font-bold text-dark tracking-tight">{deck.title}</h1>
        </div>
        <div className="flex flex-col items-end gap-2 w-48">
          <span className="text-xs font-bold text-muted">Progress: {currentIndex + 1}/{cards.length} cards</span>
          <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden">
            <div className="h-full bg-[#8A5A6B] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Flashcard */}
      <div 
        className="w-full min-h-[420px] bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-10 flex flex-col relative cursor-pointer group transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Lightbulb className="absolute top-8 right-8 text-gray-300 group-hover:text-yellow-400 transition-colors" size={24} />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-12">
          <span className="text-[11px] font-bold text-muted uppercase tracking-widest mb-6">
            {isFlipped ? 'ANSWER' : 'QUESTION'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark leading-tight tracking-tight mb-8 whitespace-pre-wrap">
            {isFlipped ? currentCard.answer : currentCard.question}
          </h2>
          
          {isFlipped && currentCard.image && (
            <img src={currentCard.image} alt="Reference" className="max-h-48 rounded-xl object-contain mb-8 shadow-sm border border-gray-100" />
          )}

          <p className="text-sm font-medium text-gray-400 italic">
            {isFlipped ? "How well did you know this?" : "Click the card to reveal the answer"}
          </p>
        </div>
      </div>

      {/* Rating Buttons */}
      <div className={`w-full max-w-lg mt-8 grid grid-cols-3 gap-4 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button onClick={(e) => { e.stopPropagation(); handleReview(0); }} className="py-3.5 rounded-full bg-[#FFE6E6] text-[#B30000] font-bold text-sm hover:brightness-95 transition-all">
          Hard
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleReview(1); }} className="py-3.5 rounded-full bg-gray-200/80 text-gray-700 font-bold text-sm hover:brightness-95 transition-all">
          Medium
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleReview(2); }} className="py-3.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-bold text-sm hover:brightness-95 transition-all">
          Easy
        </button>
      </div>

      {/* Bottom Widgets */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mt-16">
        
        {/* AI Insight */}
        <div className="bg-[#FAF5F6] border border-gray-200/60 rounded-3xl p-6 flex flex-col shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#A5D6A7] flex items-center justify-center text-[#2E7D32] shadow-sm">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#800020]">AI Insight</h3>
          </div>
          <p className="text-gray-700 font-medium text-sm leading-relaxed">
            You typically struggle with memory-related questions in the morning. Try revisiting this card in the evening.
          </p>
        </div>

        {/* Study Streak */}
        <div className="bg-dark rounded-3xl overflow-hidden relative shadow-md group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1497250681554-18239d5e3c83?q=80&w=1000&auto=format&fit=crop" 
            alt="Study Environment" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          <div className="relative z-10 p-8 h-full flex flex-col justify-center max-w-sm">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Study Streak</h3>
            <p className="text-white/80 font-medium text-sm leading-relaxed">
              You've been focused for 25 minutes.<br/>Take a 5-minute breather?
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
