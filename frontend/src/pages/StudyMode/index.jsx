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
    <div className="max-w-5xl mx-auto space-y-10 pb-24 pt-10 flex flex-col min-h-[calc(100vh-160px)]">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-muted hover:text-primary transition-colors shadow-sm">
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

      <div className="w-full bg-gray-200/60 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-[#8A5A6B] h-full rounded-full transition-all duration-700 ease-out" 
          style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center perspective-1000 py-10 w-full">
        <div 
          className={`relative w-full max-w-2xl min-h-[420px] transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-[3rem] p-12 flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all">
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.question); }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-muted hover:text-primary transition-colors"
            >
              <Volume2 size={24} />
            </button>
            <h3 className="text-primary text-[11px] font-bold uppercase mb-8 tracking-[0.2em]">Question</h3>
            <h2 className="text-3xl md:text-4xl text-center font-bold text-dark leading-tight tracking-tight max-w-md whitespace-pre-wrap">{currentCard.question}</h2>
            {!isFlipped && (
              <div className="absolute bottom-10 flex items-center gap-2 text-gray-400 font-medium text-sm italic animate-pulse">
                 <span>Click the card to reveal the answer</span>
              </div>
            )}
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-[3rem] p-12 flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 rotate-y-180 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all">
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.answer); }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-muted hover:text-primary transition-colors"
            >
              <Volume2 size={24} />
            </button>
            <h3 className="text-primary text-[11px] font-bold uppercase mb-8 tracking-[0.2em]">Answer</h3>
            <h2 className="text-2xl md:text-3xl text-center font-bold text-dark leading-tight tracking-tight max-w-md whitespace-pre-wrap mb-6">{currentCard.answer}</h2>
            
            {currentCard.image && (
              <img src={currentCard.image} alt="Reference" className="max-h-40 rounded-xl object-contain mb-8 shadow-sm border border-gray-100" />
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`w-full max-w-2xl mx-auto transition-all duration-500 transform ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <h4 className="text-center text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-6">How was your recall?</h4>
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => handleReview(0)}
            className="flex flex-col items-center justify-center py-4 rounded-3xl bg-[#FFE6E6] text-[#B30000] font-bold transition-all hover:brightness-95"
          >
            <span className="text-lg">Hard</span>
            <span className="text-[10px] uppercase opacity-70 mt-1">1 day</span>
          </button>
          <button 
            onClick={() => handleReview(1)}
            className="flex flex-col items-center justify-center py-4 rounded-3xl bg-gray-200/80 text-gray-700 font-bold transition-all hover:brightness-95"
          >
            <span className="text-lg">Good</span>
            <span className="text-[10px] uppercase opacity-70 mt-1">4 days</span>
          </button>
          <button 
            onClick={() => handleReview(2)}
            className="flex flex-col items-center justify-center py-4 rounded-3xl bg-[#E8F5E9] text-[#2E7D32] font-bold transition-all hover:brightness-95"
          >
            <span className="text-lg">Easy</span>
            <span className="text-[10px] uppercase opacity-70 mt-1">7 days</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
