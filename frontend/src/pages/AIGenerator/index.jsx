import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Wand2, Save, Trash2, Check, RefreshCw, Sparkles, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AIGenerator = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCards, setGeneratedCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const res = await api.get('/decks');
      setDecks(res.data);
      if (res.data.length > 0) setSelectedDeck(res.data[0]._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/ai/generate', { text });
      setGeneratedCards(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeCard = (index) => {
    const newCards = [...generatedCards];
    newCards.splice(index, 1);
    setGeneratedCards(newCards);
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...generatedCards];
    newCards[index][field] = value;
    setGeneratedCards(newCards);
  };

  const handleSaveCards = async () => {
    if (!selectedDeck || generatedCards.length === 0) return;
    setSaving(true);
    try {
      // Save cards sequentially or Promise.all
      await Promise.all(
        generatedCards.map(card => 
          api.post('/cards', { deck: selectedDeck, question: card.question, answer: card.answer })
        )
      );
      setSuccess(true);
      setTimeout(() => {
        navigate(`/deck/${selectedDeck}`);
      }, 1500);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 pt-10 flex flex-col items-center">
      {/* Badge */}
      <div className="bg-secondary/50 px-5 py-2 rounded-full border border-secondary flex items-center gap-2 text-dark/60 font-bold text-xs uppercase tracking-widest">
         <Sparkles size={14} className="text-primary" />
         <span>Sophisticated Intelligence</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-dark tracking-tight">Transform Knowledge Instantly</h1>
        <p className="text-muted font-medium text-lg leading-relaxed">
          Paste your study notes, lecture transcripts, or articles below. Our AI will curate premium flashcards designed for serene and effective learning.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-8 relative">
        <textarea
          className="w-full h-80 bg-transparent border-none p-0 text-dark placeholder:text-muted/40 focus:outline-none resize-none text-xl leading-relaxed font-medium"
          placeholder="Paste your text here to generate cards..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
           <button className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-muted hover:text-primary transition-colors">
              <Mic size={20} />
           </button>
           <button 
             onClick={handleGenerate}
             disabled={loading || !text.trim()}
             className="bg-primary/30 text-primary font-bold px-10 py-4 rounded-full flex items-center space-x-3 disabled:opacity-50 hover:bg-primary/40 transition-all"
           >
             {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
             <span className="text-base">{loading ? 'Curating...' : 'Generate Cards'}</span>
           </button>
        </div>
      </div>

      {generatedCards.length > 0 && (
        <div className="w-full space-y-12 animate-fade-in-up mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-dark">Preview Generated Cards</h2>
            <div className="bg-secondary/50 px-4 py-1.5 rounded-full text-[10px] font-bold text-muted uppercase tracking-widest border border-secondary">
               {generatedCards.length} Cards Created
            </div>
          </div>

          <div className="grid gap-6">
            {generatedCards.map((card, idx) => (
              <div key={idx} className="bg-[#FAF5F6]/40 p-10 rounded-[2rem] flex flex-col md:flex-row gap-12 relative border border-gray-100/50 group">
                <div className="flex-1 space-y-4">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Question</label>
                  <div className="space-y-4">
                     <textarea 
                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-dark font-bold text-xl resize-none leading-snug"
                        rows="2"
                        value={card.question}
                        onChange={(e) => handleCardChange(idx, 'question', e.target.value)}
                     />
                     {/* Placeholder for image support if present in data */}
                     {card.image && (
                        <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                           <img src={card.image} alt="Visual Aid" className="w-full h-full object-cover" />
                        </div>
                     )}
                  </div>
                </div>
                <div className="hidden md:block w-px bg-gray-200/50"></div>
                <div className="flex-1 space-y-4">
                  <label className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Answer</label>
                  <textarea 
                    className="w-full bg-transparent border-none focus:ring-0 p-0 text-muted font-medium text-lg resize-none leading-relaxed"
                    rows="4"
                    value={card.answer}
                    onChange={(e) => handleCardChange(idx, 'answer', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => removeCard(idx)}
                  className="absolute -right-3 -top-3 bg-white text-muted hover:text-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-8 pt-10">
             <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-muted">Save to:</span>
                <select 
                  value={selectedDeck}
                  onChange={(e) => setSelectedDeck(e.target.value)}
                  className="bg-white border border-gray-100 rounded-xl px-5 py-2.5 text-dark font-bold outline-none focus:ring-2 focus:ring-primary/10 shadow-sm text-sm"
                >
                  {decks.length === 0 && <option value="">No decks available</option>}
                  {decks.map(d => (
                    <option key={d._id} value={d._id}>{d.title}</option>
                  ))}
                </select>
             </div>
             <button 
               onClick={handleSaveCards}
               disabled={saving || !selectedDeck || success}
               className={`font-bold px-16 py-5 rounded-full flex items-center justify-center space-x-4 transition-all shadow-xl text-lg ${
                 success ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-95 shadow-primary/20'
               }`}
             >
               {success ? <><Check size={24} /> <span>Saved to Collection</span></> : <><Save size={24} /> <span>Save to Deck</span></>}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGenerator;
