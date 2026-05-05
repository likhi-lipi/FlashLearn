import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
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
    <div className="max-w-5xl mx-auto space-y-10 pb-20 pt-10 flex flex-col h-[85vh]">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-muted hover:text-accent transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex flex-col items-center">
           <span className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Current Session</span>
           <div className="text-lg font-bold text-dark">
             Card {currentIndex + 1} <span className="text-muted/40 px-1">/</span> {cards.length}
           </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-muted">
           <RotateCcw size={18} />
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-700 ease-out" 
          style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center perspective-1000 py-10">
        <div 
          className={`relative w-full max-w-2xl aspect-[1.6] transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-[3rem] p-12 flex flex-col items-center justify-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary/20"></div>
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.question); }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-muted hover:text-primary transition-colors"
            >
              <Volume2 size={24} />
            </button>
            <h3 className="text-primary text-xs font-bold uppercase mb-8 tracking-[0.2em]">Question</h3>
            <p className="text-3xl md:text-4xl text-center font-bold text-dark leading-snug max-w-md">{currentCard.question}</p>
            {!isFlipped && (
              <div className="absolute bottom-10 flex items-center gap-2 text-muted/40 font-bold text-sm uppercase tracking-widest animate-pulse">
                 <span>Tap to reveal</span>
              </div>
            )}
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-[3rem] p-12 flex flex-col items-center justify-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-50 rotate-y-180 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-accent/20"></div>
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.answer); }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-muted hover:text-accent transition-colors"
            >
              <Volume2 size={24} />
            </button>
            <h3 className="text-accent text-xs font-bold uppercase mb-8 tracking-[0.2em]">Answer</h3>
            <p className="text-2xl md:text-3xl text-center font-medium text-muted leading-relaxed max-w-md">{currentCard.answer}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`transition-all duration-500 transform ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <h4 className="text-center text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8">How was your recall?</h4>
        <div className="flex justify-center items-center gap-6 max-w-2xl mx-auto">
          <button 
            onClick={() => handleReview(0)}
            className="flex-1 bg-white border border-gray-100 text-dark hover:bg-red-50 hover:border-red-100 hover:text-red-500 py-5 rounded-3xl font-bold transition-all shadow-sm flex flex-col items-center gap-1"
          >
            <span className="text-lg">Hard</span>
            <span className="text-[10px] uppercase opacity-40">1 day</span>
          </button>
          <button 
            onClick={() => handleReview(1)}
            className="flex-1 bg-white border border-gray-100 text-dark hover:bg-orange-50 hover:border-orange-100 hover:text-orange-500 py-5 rounded-3xl font-bold transition-all shadow-sm flex flex-col items-center gap-1"
          >
            <span className="text-lg">Good</span>
            <span className="text-[10px] uppercase opacity-40">4 days</span>
          </button>
          <button 
            onClick={() => handleReview(2)}
            className="flex-1 bg-accent text-white hover:opacity-90 py-6 rounded-3xl font-bold transition-all shadow-xl shadow-accent/20 flex flex-col items-center gap-1"
          >
            <span className="text-xl">Easy</span>
            <span className="text-[10px] uppercase opacity-70">7 days</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
