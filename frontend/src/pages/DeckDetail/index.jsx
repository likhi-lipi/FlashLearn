import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { ArrowLeft, Trash2, Plus, Volume2, Mic, Check, Layers, HelpCircle, Edit3, Zap } from 'lucide-react';

const DeckDetail = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
    fetchDeckDetails();
  }, [id]);

  const fetchCards = async () => {
    try {
      const res = await api.get(`/cards/deck/${id}`);
      setCards(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchDeckDetails = async () => {
    try {
      const res = await api.get('/decks');
      const currentDeck = res.data.find(d => d._id === id);
      setDeck(currentDeck);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cards', { deck: id, question: newQ, answer: newA });
      setNewQ('');
      setNewA('');
      setShowAdd(false);
      fetchCards();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Delete this card?')) {
      try {
        await api.delete(`/cards/${cardId}`);
        fetchCards();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const playTTS = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleDictate = (setter) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setter(prev => prev + (prev ? ' ' : '') + transcript);
    };
    recognition.start();
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-12 h-12 border-4 border-[#e3979d]/20 border-t-[#e3979d] rounded-full animate-spin"></div>
      <p className="text-[#4a2c2a]/40 font-bold uppercase tracking-widest text-xs">Loading deck details...</p>
    </div>
  );

  return (
    <div className="pt-24 space-y-10 max-w-5xl mx-auto pb-20 animate-fade-in font-['Outfit']">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[3rem] border border-[#f3e8e4] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f9e8e6] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-50"></div>
        
        <Link to="/dashboard" className="w-14 h-14 rounded-full bg-[#fdf6f4] flex items-center justify-center text-[#4a2c2a]/40 hover:text-[#4a2c2a] transition-all border border-[#f3e8e4] shrink-0">
          <ArrowLeft size={24} />
        </Link>
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9e8e6] text-[#e3979d] text-[10px] font-bold tracking-widest uppercase mb-3">
            <Layers size={12} /> Study Deck
          </div>
          <h1 className="text-5xl font-bold text-[#4a2c2a] tracking-tight">{deck?.title || 'Untitled Deck'}</h1>
          <p className="text-[#4a2c2a]/40 font-bold mt-2 flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 bg-[#e3979d] rounded-full"></span>
            {cards.length} Mastery Cards
          </p>
        </div>

        <div className="flex gap-4">
          <Link to={`/study/${id}`} className="bg-[#4a2c2a] text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-[#382120] shadow-xl shadow-[#4a2c2a]/10 flex items-center gap-2">
            <Zap size={20} /> Study Now
          </Link>
        </div>
      </div>

      {/* Cards List Toolbar */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-2xl font-bold text-[#4a2c2a] flex items-center gap-3">
          Knowledge Base <span className="bg-[#f3e8e4] text-[11px] px-3 py-1 rounded-full text-[#4a2c2a]/60">{cards.length}</span>
        </h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className={`flex items-center gap-2 px-6 py-4 rounded-full font-bold transition-all ${
            showAdd 
            ? 'bg-[#f9e8e6] text-[#e3979d] border border-[#e3979d]/20' 
            : 'bg-white text-[#4a2c2a] border border-[#f3e8e4] hover:bg-[#fdf6f4]'
          }`}
        >
          {showAdd ? <ArrowLeft size={18} /> : <Plus size={18} />}
          <span>{showAdd ? 'Back to list' : 'Add New Card'}</span>
        </button>
      </div>

      {/* Add Card Form */}
      {showAdd && (
        <div className="bg-white p-10 rounded-[3rem] border border-[#e3979d]/20 shadow-xl shadow-[#e3979d]/5 animate-fade-in-up">
          <form onSubmit={handleAddCard} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[11px] font-bold text-[#4a2c2a]/40 uppercase tracking-widest flex items-center gap-2">
                    <HelpCircle size={14} /> Front (Question)
                  </label>
                  <button type="button" onClick={() => handleDictate(setNewQ)} className="text-[#4a2c2a]/30 hover:text-[#e3979d] flex items-center gap-1 text-[11px] font-bold uppercase transition-colors">
                    <Mic size={14}/> <span>Voice</span>
                  </button>
                </div>
                <textarea 
                  className="w-full bg-[#fdf6f4] border border-transparent rounded-[2rem] p-6 text-[#4a2c2a] font-bold focus:bg-white focus:border-[#e3979d] transition-all outline-none resize-none min-h-[150px] text-lg"
                  placeholder="What's the main concept?"
                  value={newQ}
                  onChange={(e) => setNewQ(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[11px] font-bold text-[#4a2c2a]/40 uppercase tracking-widest flex items-center gap-2">
                    <Check size={14} /> Back (Answer)
                  </label>
                  <button type="button" onClick={() => handleDictate(setNewA)} className="text-[#4a2c2a]/30 hover:text-[#e3979d] flex items-center gap-1 text-[11px] font-bold uppercase transition-colors">
                    <Mic size={14}/> <span>Voice</span>
                  </button>
                </div>
                <textarea 
                  className="w-full bg-[#fdf6f4] border border-transparent rounded-[2rem] p-6 text-[#4a2c2a] focus:bg-white focus:border-[#e3979d] transition-all outline-none resize-none min-h-[150px] text-lg"
                  placeholder="Explain it simply..."
                  value={newA}
                  onChange={(e) => setNewA(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={() => setShowAdd(false)} className="px-10 py-4 text-[#4a2c2a]/40 font-bold hover:text-[#4a2c2a] transition-all">Cancel</button>
              <button type="submit" className="bg-[#4a2c2a] text-white font-bold px-12 py-4 rounded-full shadow-lg shadow-[#4a2c2a]/10 hover:bg-[#382120] transition-all">Save Card</button>
            </div>
          </form>
        </div>
      )}

      {/* Cards Display Grid */}
      <div className="space-y-6">
        {cards.map(card => (
          <div key={card._id} className="bg-white p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-10 border border-[#f3e8e4] shadow-sm hover:shadow-xl hover:shadow-[#4a2c2a]/5 transition-all group relative overflow-hidden">
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#e3979d] uppercase tracking-widest bg-[#f9e8e6] px-3 py-1 rounded-full">Front</span>
                <button onClick={() => playTTS(card.question)} className="text-[#4a2c2a]/20 hover:text-[#e3979d] transition-colors p-2"><Volume2 size={20}/></button>
              </div>
              <p className="text-xl font-bold text-[#4a2c2a] leading-relaxed">{card.question}</p>
            </div>

            <div className="hidden md:block w-px bg-[#f3e8e4]"></div>

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#4a2c2a]/30 uppercase tracking-widest bg-[#fdf6f4] px-3 py-1 rounded-full">Back</span>
                <button onClick={() => playTTS(card.answer)} className="text-[#4a2c2a]/20 hover:text-[#e3979d] transition-colors p-2"><Volume2 size={20}/></button>
              </div>
              <p className="text-lg text-[#4a2c2a]/60 leading-relaxed">{card.answer}</p>
            </div>

            <div className="flex items-center justify-end md:justify-center px-2">
              <button 
                onClick={() => handleDeleteCard(card._id)} 
                className="w-12 h-12 rounded-full bg-white text-[#4a2c2a]/20 hover:text-[#d9534f] hover:bg-[#fcf1f1] transition-all border border-[#f3e8e4] flex items-center justify-center shadow-sm"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {cards.length === 0 && !showAdd && (
          <div className="text-center py-24 bg-white border border-[#f3e8e4] rounded-[3rem] flex flex-col items-center shadow-sm">
            <div className="w-20 h-20 bg-[#fdf6f4] text-[#4a2c2a]/10 rounded-full flex items-center justify-center mb-6">
              <Layers size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#4a2c2a]">This deck is empty</h3>
            <p className="text-[#4a2c2a]/40 max-w-xs mx-auto mt-2 mb-10">Add cards manually or use the AI Generator to populate it instantly.</p>
            <button 
              onClick={() => setShowAdd(true)}
              className="bg-[#e3979d] text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-[#e3979d]/20 hover:bg-[#d8868c] transition-all"
            >
              Add First Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckDetail;
