import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Volume2, Sparkles, RotateCcw, Check, Zap, Info, HelpCircle } from 'lucide-react';

const StudyMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    fetchStudyCards();
    fetchDeck();
  }, [id]);

  const fetchStudyCards = async () => {
    try {
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
      const foundDeck = res.data.find(d => d._id === id);
      setDeck(foundDeck);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = async (quality) => {
    const currentCard = cards[currentIndex];
    try {
      await api.put(`/cards/${currentCard._id}/review`, { quality });
      
      if (currentIndex < cards.length - 1) {
        setIsFlipped(false);
        setShowHint(false);
        setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const playTTS = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-12 h-12 border-4 border-[#e3979d]/20 border-t-[#e3979d] rounded-full animate-spin"></div>
      <p className="text-[#4a2c2a]/40 font-bold uppercase tracking-widest text-xs">Preparing your session...</p>
    </div>
  );

  if (cards.length === 0) {
    return (
      <div className="text-center py-32 max-w-md mx-auto space-y-8 animate-fade-in font-['Outfit']">
        <div className="w-24 h-24 bg-[#eef6f1] text-[#4a9d6e] rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Check size={48} />
        </div>
        <h2 className="text-4xl font-bold text-[#4a2c2a]">Clear for today!</h2>
        <p className="text-[#4a2c2a]/50 leading-relaxed">
          You've reviewed all the cards due in this deck. Great job keeping your streak alive!
        </p>
        <div className="pt-4">
          <Link to="/dashboard" className="bg-[#4a2c2a] text-white font-bold px-10 py-4 rounded-full hover:bg-[#382120] transition-all inline-block shadow-lg">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-fade-in font-['Outfit']">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-4">
        <Link to="/dashboard" className="text-[#4a2c2a]/40 hover:text-[#4a2c2a] flex items-center gap-2 font-bold transition-colors">
          <ArrowLeft size={18} /> <span>Exit Session</span>
        </Link>
        <div className="bg-white px-4 py-2 rounded-full border border-[#f3e8e4] text-[#4a2c2a]/60 text-sm font-bold shadow-sm">
          {currentIndex + 1} <span className="text-[#4a2c2a]/20 mx-1">/</span> {cards.length}
        </div>
        <div className="hidden md:block w-32"></div>
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="w-full bg-[#f3e8e4] rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="bg-[#e3979d] h-full rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex flex-col justify-center items-center perspective-[2000px] py-10 min-h-[450px]">
        <div 
          className={`relative w-full max-w-2xl h-[400px] transition-all duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180 scale-100' : 'hover:scale-[1.02]'}`}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Frontside */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-[3rem] p-12 flex flex-col items-center justify-center border border-[#f3e8e4] shadow-2xl shadow-[#4a2c2a]/5 overflow-hidden">
            <div className="absolute top-8 left-10 flex items-center gap-2 text-[10px] font-bold text-[#e3979d] uppercase tracking-widest">
              <HelpCircle size={14} /> Flashcard Front
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.question); }}
              className="absolute top-8 right-10 text-[#4a2c2a]/20 hover:text-[#e3979d] transition-colors p-2"
            >
              <Volume2 size={24} />
            </button>
            
            <p className="text-3xl md:text-4xl text-center font-bold text-[#4a2c2a] leading-tight max-w-lg">
              {currentCard.question}
            </p>

            {!isFlipped && (
              <div className="absolute bottom-12 text-[#4a2c2a]/30 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Click card to flip <Zap size={14} className="text-[#e3979d]" />
              </div>
            )}
          </div>

          {/* Backside */}
          <div className="absolute w-full h-full backface-hidden bg-[#fdf6f4] rounded-[3rem] p-12 flex flex-col items-center justify-center border border-[#e3979d]/20 shadow-2xl rotate-y-180 overflow-hidden">
            <div className="absolute top-8 left-10 flex items-center gap-2 text-[10px] font-bold text-[#4a2c2a]/40 uppercase tracking-widest">
              <Check size={14} /> Correct Answer
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); playTTS(currentCard.answer); }}
              className="absolute top-8 right-10 text-[#4a2c2a]/20 hover:text-[#4a2c2a] transition-colors p-2"
            >
              <Volume2 size={24} />
            </button>
            
            <div className="space-y-6 text-center">
              <p className="text-2xl md:text-3xl text-[#4a2c2a] font-bold leading-relaxed max-w-lg">
                {currentCard.answer}
              </p>
              
              {currentCard.hint && showHint && (
                <div className="bg-white border border-[#f3e8e4] p-4 rounded-2xl animate-fade-in">
                  <p className="text-sm text-[#4a2c2a]/60 italic">💡 {currentCard.hint}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Controls */}
      <div className={`transition-all duration-500 max-w-2xl mx-auto ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-[#4a2c2a]/40 uppercase tracking-widest">How well did you know this?</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Again', quality: 0, color: '#d9534f', bg: '#fcf1f1', interval: '< 1m' },
            { label: 'Hard', quality: 1, color: '#f0ad4e', bg: '#fef7e9', interval: '2d' },
            { label: 'Good', quality: 2, color: '#4a2c2a', bg: '#f3e8e4', interval: '4d' },
            { label: 'Easy', quality: 3, color: '#4a9d6e', bg: '#eef6f1', interval: '7d' },
          ].map((btn, i) => (
            <button 
              key={i}
              onClick={() => handleReview(btn.quality)}
              className="group flex flex-col items-center gap-1 transition-all transform hover:scale-105 active:scale-95"
            >
              <div 
                className="w-full py-4 rounded-2xl font-bold text-sm transition-colors border border-transparent shadow-sm"
                style={{ backgroundColor: btn.bg, color: btn.color }}
              >
                {btn.label}
              </div>
              <span className="text-[10px] font-bold text-[#4a2c2a]/30 uppercase">{btn.interval}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-sm font-bold text-[#4a2c2a]/40 hover:text-[#e3979d] transition-colors"
          >
            <Sparkles size={16} /> {showHint ? 'Hide AI Hint' : 'Get AI Hint'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
