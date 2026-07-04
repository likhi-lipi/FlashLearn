import React, { useState, useEffect } from 'react';
import { Timer, Zap, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dummy flashcards for the rapid round
const dummyCards = [
  { id: 1, front: "What does HTML stand for?", back: "HyperText Markup Language" },
  { id: 2, front: "What is 7 * 8?", back: "56" },
  { id: 3, front: "Capital of Japan?", back: "Tokyo" },
  { id: 4, front: "Who wrote Romeo and Juliet?", back: "William Shakespeare" },
  { id: 5, front: "What is the powerhouse of the cell?", back: "Mitochondria" },
  { id: 6, front: "Fastest land animal?", back: "Cheetah" },
  { id: 7, front: "Chemical symbol for Gold?", back: "Au" },
  { id: 8, front: "Largest planet in our solar system?", back: "Jupiter" },
  { id: 9, front: "First element on the periodic table?", back: "Hydrogen" },
  { id: 10, front: "What year did the Titanic sink?", back: "1912" },
  { id: 11, front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
  { id: 12, front: "What is the hardest natural substance?", back: "Diamond" },
  { id: 13, front: "How many continents are there?", back: "Seven" },
  { id: 14, front: "What is the freezing point of water in Celsius?", back: "0" },
  { id: 15, front: "Who was the first President of the USA?", back: "George Washington" },
];

const RapidRound = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // 'idle', 'playing', 'finished'
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState([]);

  // Shuffle cards on mount
  useEffect(() => {
    setCards([...dummyCards].sort(() => Math.random() - 0.5));
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (status === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && status === 'playing') {
      setStatus('finished');
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const handleStart = () => {
    setScore(0);
    setTimeLeft(60);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCards([...dummyCards].sort(() => Math.random() - 0.5));
    setStatus('playing');
  };

  const handleAnswer = (knewIt) => {
    if (knewIt) setScore((prev) => prev + 1);
    
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      // Loop cards if they finish early
      setCards([...dummyCards].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  return (
    <div className="pt-24 pb-20 flex-1 flex flex-col items-center justify-center animate-fade-in font-['Outfit'] min-h-[calc(100vh-100px)]">
      <div className="max-w-2xl w-full mx-auto px-6">
        
        {status === 'idle' && (
          <div className="bg-white rounded-[3rem] p-12 text-center border border-[#e3979d]/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fce4ec] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
            
            <div className="w-24 h-24 bg-[#fdf6f4] border-4 border-white shadow-xl shadow-[#e3979d]/20 text-[#e3979d] rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
              <Zap size={48} className="animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-extrabold text-[#4a2c2a] mb-4 relative z-10">Rapid Round Challenge</h1>
            <p className="text-[#4a2c2a]/70 font-medium text-lg mb-10 max-w-md mx-auto relative z-10">
              Test your reflexes! You have exactly 60 seconds to answer as many flashcards as you can. Ready to set a new high score?
            </p>
            
            <button 
              onClick={handleStart}
              className="bg-[#800020] hover:bg-[#800020]/90 text-white font-bold text-xl px-12 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto relative z-10"
            >
              Start 60s Challenge <ArrowRight size={24} />
            </button>
            
            <button onClick={() => navigate('/profile')} className="mt-6 text-[#4a2c2a]/60 hover:text-[#4a2c2a] font-bold text-sm relative z-10 transition-colors">
              Back to Profile
            </button>
          </div>
        )}

        {status === 'playing' && (
          <div className="w-full">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8 px-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-[#fdf6f4] text-[#4a2c2a]'}`}>
                  {timeLeft}s
                </div>
                <div className="text-[#4a2c2a]/60 font-semibold uppercase tracking-wider text-sm">Time Left</div>
              </div>
              
              <div className="flex items-center gap-3 text-right">
                <div className="text-[#4a2c2a]/60 font-semibold uppercase tracking-wider text-sm">Score</div>
                <div className="text-3xl font-extrabold text-[#4a2c2a]">{score}</div>
              </div>
            </div>

            {/* Flashcard Area */}
            <div className="bg-white h-[400px] rounded-[3rem] p-10 border border-[#e3979d]/20 shadow-md relative flex flex-col items-center justify-center text-center cursor-pointer transition-all transform hover:scale-[1.01]" onClick={() => !isFlipped && setIsFlipped(true)}>
              {!isFlipped ? (
                <>
                  <p className="text-[#4a2c2a]/50 font-bold uppercase tracking-widest text-sm mb-6 absolute top-10">Question</p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#4a2c2a] leading-tight px-4">
                    {cards[currentIndex]?.front}
                  </h2>
                  <p className="text-[#4a2c2a]/40 font-medium text-sm absolute bottom-10 animate-bounce">
                    Tap to reveal answer
                  </p>
                </>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center animate-fade-in-up">
                  <p className="text-[#4a2c2a]/50 font-bold uppercase tracking-widest text-sm mb-6 absolute top-10">Answer</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#800020] leading-tight px-4">
                    {cards[currentIndex]?.back}
                  </h2>
                  
                  <div className="absolute bottom-10 w-full px-10 flex gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAnswer(false); }}
                      className="flex-1 bg-[#fdf6f4] hover:bg-[#f9e8e6] text-[#4a2c2a] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-[#e3979d]/20"
                    >
                      <XCircle size={20} /> Missed It
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAnswer(true); }}
                      className="flex-1 bg-[#eef6f1] hover:bg-[#dcf0e3] text-[#4a9d6e] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-[#95c9a4]/30"
                    >
                      <CheckCircle size={20} /> Knew It!
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full h-2 bg-[#fdf6f4] rounded-full mt-8 overflow-hidden">
               <div className="h-full bg-[#800020] rounded-full transition-all duration-1000" style={{ width: `${(timeLeft / 60) * 100}%` }}></div>
            </div>
          </div>
        )}

        {status === 'finished' && (
          <div className="bg-white rounded-[3rem] p-12 text-center border border-[#e3979d]/20 shadow-sm relative overflow-hidden animate-fade-in-up">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-extrabold text-[#4a2c2a] mb-2">Time's Up!</h1>
            <p className="text-[#4a2c2a]/70 font-medium text-lg mb-8">You survived the rapid round.</p>
            
            <div className="bg-[#fdf6f4] rounded-3xl p-8 mb-10 border border-[#e3979d]/20 inline-block w-full max-w-sm">
              <p className="text-[#4a2c2a]/50 font-bold uppercase tracking-widest text-sm mb-2">Final Score</p>
              <div className="text-6xl font-extrabold text-[#800020] mb-2">{score}</div>
              <p className="text-[#4a2c2a]/80 font-semibold text-sm">cards answered correctly</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStart}
                className="bg-[#800020] hover:bg-[#800020]/90 text-white font-bold px-8 py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} /> Play Again
              </button>
              <button 
                onClick={() => navigate('/profile')} 
                className="bg-[#fdf6f4] hover:bg-[#f9e8e6] text-[#4a2c2a] font-bold px-8 py-4 rounded-full border border-[#e3979d]/20 transition-all flex items-center justify-center"
              >
                Back to Profile
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RapidRound;
