import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Wand2, Save, Trash2, Check, RefreshCw, Sparkles, Mic, Plus } from 'lucide-react';
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
  const [showNewDeckModal, setShowNewDeckModal] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');
  const [creatingDeck, setCreatingDeck] = useState(false);
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

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;
    setCreatingDeck(true);
    try {
      const res = await api.post('/decks', { title: newDeckTitle, description: newDeckDesc });
      const newDeck = res.data;
      setDecks(prev => [newDeck, ...prev]);
      setSelectedDeck(newDeck._id);
      setShowNewDeckModal(false);
      setNewDeckTitle('');
      setNewDeckDesc('');
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingDeck(false);
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
    <div className="max-w-5xl mx-auto space-y-12 pb-24 pt-24 md:pt-28 flex flex-col items-center text-dark dark:text-gray-100 transition-colors">
      {/* Badge */}
      <div className="bg-secondary/50 dark:bg-[#1e1e1e] px-5 py-2 rounded-full border border-secondary dark:border-white/10 flex items-center gap-2 text-dark/60 dark:text-gray-400 font-bold text-xs uppercase tracking-widest transition-colors">
         <Sparkles size={14} className="text-primary dark:text-[#e3979d] transition-colors" />
         <span>Sophisticated Intelligence</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-dark dark:text-gray-100 tracking-tight transition-colors">Transform Knowledge Instantly</h1>
        <p className="text-muted dark:text-gray-400 font-medium text-lg leading-relaxed transition-colors">
          Paste your study notes, lecture transcripts, or articles below. Our AI will curate premium flashcards designed for serene and effective learning.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full bg-white dark:bg-[#1e1e1e] rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col gap-3 relative transition-colors">
        <textarea
          className="w-full h-24 bg-transparent border-none p-0 text-dark dark:text-gray-100 placeholder:text-muted/40 dark:placeholder:text-gray-600 focus:outline-none resize-none text-base leading-relaxed font-medium transition-colors"
          placeholder="Paste your text here to generate cards..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-white/5 transition-colors">
           <button className="w-12 h-12 rounded-full bg-secondary/50 dark:bg-[#2a2a2a] flex items-center justify-center text-muted dark:text-gray-400 hover:text-primary dark:hover:text-[#e3979d] transition-colors">
              <Mic size={20} />
           </button>
           <button 
             onClick={handleGenerate}
             disabled={loading || !text.trim()}
             className="bg-primary/30 dark:bg-primary text-primary dark:text-white font-bold px-10 py-4 rounded-full flex items-center space-x-3 disabled:opacity-50 hover:bg-primary/40 dark:hover:bg-[#a00028] transition-all"
           >
             {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
             <span className="text-base">{loading ? 'Curating...' : 'Generate Cards'}</span>
           </button>
        </div>
      </div>

      {generatedCards.length > 0 && (
        <div className="w-full space-y-12 animate-fade-in-up mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-dark dark:text-gray-100 transition-colors">Preview Generated Cards</h2>
            <div className="bg-white dark:bg-gray-200 px-4 py-1.5 rounded-full text-xs font-bold text-black uppercase tracking-widest border border-gray-300 shadow-sm transition-colors">
               {generatedCards.length} Cards Created
            </div>
          </div>

          <div className="grid gap-6">
            {generatedCards.map((card, idx) => (
              <div key={idx} className="bg-[#FAF5F6]/40 dark:bg-[#121212] p-10 rounded-[2rem] flex flex-col md:flex-row gap-12 relative border border-gray-100/50 dark:border-white/10 group transition-colors">
                <div className="flex-1 space-y-4">
                  <label className="text-[10px] font-bold text-primary dark:text-[#e3979d] uppercase tracking-widest transition-colors">Question</label>
                  <div className="space-y-4">
                     <textarea 
                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-dark dark:text-gray-100 font-bold text-xl resize-none leading-snug transition-colors"
                        rows="2"
                        value={card.question}
                        onChange={(e) => handleCardChange(idx, 'question', e.target.value)}
                     />
                     {/* Placeholder for image support if present in data */}
                     {card.image && (
                        <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm transition-colors">
                           <img src={card.image} alt="Visual Aid" className="w-full h-full object-cover" />
                        </div>
                     )}
                  </div>
                </div>
                <div className="hidden md:block w-px bg-gray-200/50 dark:bg-white dark:bg-[#1e1e1e]/10 transition-colors"></div>
                <div className="flex-1 space-y-4">
                  <label className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-widest transition-colors">Answer</label>
                  <textarea 
                    className="w-full bg-transparent border-none focus:ring-0 p-0 text-muted dark:text-gray-300 font-medium text-lg resize-none leading-relaxed transition-colors"
                    rows="4"
                    value={card.answer}
                    onChange={(e) => handleCardChange(idx, 'answer', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => removeCard(idx)}
                  className="absolute -right-3 -top-3 bg-white dark:bg-[#1e1e1e] dark:bg-[#2a2a2a] text-muted dark:text-gray-400 hover:text-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-8 pt-10">
             <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm font-bold text-muted dark:text-gray-400 transition-colors">Save to:</span>
                <select 
                  value={selectedDeck}
                  onChange={(e) => {
                    if (e.target.value === 'CREATE_NEW') {
                      setShowNewDeckModal(true);
                    } else {
                      setSelectedDeck(e.target.value);
                    }
                  }}
                  className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-white/10 rounded-xl px-5 py-2.5 text-dark dark:text-gray-100 font-bold outline-none focus:ring-2 focus:ring-primary/10 dark:focus:ring-white/10 shadow-sm text-sm transition-colors cursor-pointer"
                >
                  {decks.length === 0 ? (
                    <option value="">No decks available</option>
                  ) : (
                    decks.map(d => (
                      <option key={d._id} value={d._id}>{d.title}</option>
                    ))
                  )}
                  <option value="CREATE_NEW">+ Create New Deck...</option>
                </select>

                <button
                  type="button"
                  onClick={() => setShowNewDeckModal(true)}
                  className="bg-secondary/60 dark:bg-[#2a2a2a] text-dark dark:text-gray-200 hover:text-primary dark:hover:text-[#e3979d] font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 border border-secondary dark:border-white/10 text-sm transition-all shadow-sm"
                >
                  <Plus size={16} /> <span>New Deck</span>
                </button>
             </div>

             <button 
               onClick={handleSaveCards}
               disabled={saving || !selectedDeck || success}
               className={`font-bold px-16 py-5 rounded-full flex items-center justify-center space-x-4 transition-all shadow-xl text-lg ${
                 success ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-95 shadow-primary/20 dark:shadow-none disabled:opacity-50'
               }`}
             >
               {success ? <><Check size={24} /> <span>Saved to Collection</span></> : <><Save size={24} /> <span>Save to Deck</span></>}
             </button>
          </div>
        </div>
      )}

      {/* Create New Deck Modal */}
      {showNewDeckModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-white/10 p-8 rounded-[2rem] max-w-md w-full shadow-2xl space-y-6 text-dark dark:text-gray-100 transition-colors">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/10 pb-4">
              <h3 className="text-2xl font-bold">Create New Deck</h3>
              <button 
                onClick={() => setShowNewDeckModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateDeck} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted dark:text-gray-400 uppercase tracking-widest px-1">Deck Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Organic Chemistry, World History..."
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  className="w-full bg-secondary/30 dark:bg-[#121212] border-none rounded-2xl px-5 py-3.5 text-dark dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#e3979d]/20 outline-none transition-colors"
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted dark:text-gray-400 uppercase tracking-widest px-1">Description (Optional)</label>
                <input 
                  type="text"
                  placeholder="Brief description of this deck"
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                  className="w-full bg-secondary/30 dark:bg-[#121212] border-none rounded-2xl px-5 py-3.5 text-dark dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#e3979d]/20 outline-none transition-colors"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewDeckModal(false)}
                  className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] text-dark dark:text-gray-300 font-bold py-3.5 rounded-full hover:opacity-90 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingDeck || !newDeckTitle.trim()}
                  className="flex-1 bg-primary text-white font-bold py-3.5 rounded-full hover:opacity-95 transition-all text-sm shadow-md disabled:opacity-50"
                >
                  {creatingDeck ? 'Creating...' : 'Create & Select'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGenerator;
