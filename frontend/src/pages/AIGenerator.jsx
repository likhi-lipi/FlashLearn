import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Wand2, Save, Trash2, Check, RefreshCw, Mic, FileText, Link as LinkIcon, Layers, Settings2, Sliders } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIGenerator = () => {
  const [text, setText] = useState('');
  const [sourceType, setSourceType] = useState('text'); // text, url, pdf
  const [cardCount, setCardCount] = useState(5);
  const [complexity, setComplexity] = useState('standard');
  const [loading, setLoading] = useState(false);
  const [generatedCards, setGeneratedCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
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
    setError(null);
    try {
      const res = await api.post('/ai/generate', { text, count: cardCount, complexity });
      setGeneratedCards(res.data);
    } catch (err) {
      console.error(err);
      setError("We couldn't generate cards from that content. Please check your text and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDictate = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(prev => prev + (prev ? ' ' : '') + transcript);
    };
    recognition.start();
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
    <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-fade-in font-['Outfit']">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#f9e8e6] text-[#e3979d] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          <Wand2 size={14} /> AI Creation Lab
        </div>
        <h1 className="text-5xl font-bold text-[#4a2c2a] tracking-tight">
          Turn anything into knowledge.
        </h1>
        <p className="text-[#4a2c2a]/50 text-lg max-w-2xl mx-auto">
          Paste notes, drop a URL, or upload a PDF. Our AI handles the heavy lifting so you can focus on learning.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left: Input & Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Source Tabs */}
          <div className="bg-white p-2 rounded-full border border-[#f3e8e4] shadow-sm flex gap-2">
            {[
              { id: 'text', label: 'Text Input', icon: FileText },
              { id: 'url', label: 'Website URL', icon: LinkIcon },
              { id: 'pdf', label: 'PDF / Document', icon: Layers }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSourceType(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all ${
                  sourceType === tab.id 
                  ? 'bg-[#4a2c2a] text-white shadow-lg shadow-[#4a2c2a]/10' 
                  : 'text-[#4a2c2a]/40 hover:text-[#4a2c2a] hover:bg-[#fdf6f4]'
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#f3e8e4] shadow-sm space-y-6">
            <div className="relative">
              <textarea
                className="w-full h-64 bg-[#fdf6f4] border border-transparent rounded-[1.5rem] p-8 text-[#4a2c2a] focus:outline-none focus:bg-white focus:border-[#e3979d] transition-all resize-none text-lg leading-relaxed placeholder-[#4a2c2a]/20"
                placeholder={
                  sourceType === 'text' ? "Paste your study notes here..." :
                  sourceType === 'url' ? "Paste a link to an article or video transcript..." :
                  "Upload feature coming soon! For now, please paste the text."
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button 
                onClick={handleDictate}
                title="Dictate text"
                className="absolute bottom-6 right-6 bg-white hover:bg-[#fdf6f4] text-[#4a2c2a] w-12 h-12 rounded-full transition-all shadow-md flex items-center justify-center border border-[#f3e8e4]"
              >
                <Mic size={20} />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-[11px] font-bold text-[#4a2c2a]/30 uppercase tracking-widest ml-4">
                {text.length} characters entered
              </p>
              <button 
                onClick={handleGenerate}
                disabled={loading || !text.trim()}
                className="bg-[#e3979d] text-white font-bold px-10 py-4 rounded-full flex items-center gap-3 disabled:opacity-50 hover:bg-[#d8868c] transition-all shadow-lg shadow-[#e3979d]/20"
              >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                <span>{loading ? 'Thinking...' : 'Generate Flashcards'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Settings */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#f3e8e4] shadow-sm space-y-8">
            <div className="flex items-center gap-2 mb-2">
              <Settings2 size={18} className="text-[#e3979d]" />
              <h3 className="font-bold text-[#4a2c2a]">Generation Settings</h3>
            </div>

            {/* Card Count */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-[#4a2c2a]/50 uppercase tracking-widest">Card Count</label>
                <span className="text-[#4a2c2a] font-bold">{cardCount}</span>
              </div>
              <input 
                type="range" min="3" max="20" step="1"
                value={cardCount}
                onChange={(e) => setCardCount(parseInt(e.target.value))}
                className="w-full accent-[#e3979d]"
              />
            </div>

            {/* Complexity */}
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-[#4a2c2a]/50 uppercase tracking-widest">Complexity Level</label>
              <div className="grid grid-cols-2 gap-2">
                {['standard', 'advanced'].map(level => (
                  <button
                    key={level}
                    onClick={() => setComplexity(level)}
                    className={`py-3 rounded-2xl text-xs font-bold capitalize transition-all border ${
                      complexity === level 
                      ? 'bg-[#f9e8e6] border-[#e3979d] text-[#e3979d]' 
                      : 'bg-white border-[#f3e8e4] text-[#4a2c2a]/40 hover:border-[#4a2c2a]/20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#fdf6f4]">
              <div className="flex items-center gap-2 text-[11px] text-[#4a2c2a]/40 italic">
                <Sparkles size={14} />
                Human-like tone enabled
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-[#fcf1f1] border border-[#f8dada] text-[#d9534f] p-6 rounded-[2rem] flex items-start gap-4 animate-shake">
              <Trash2 size={20} className="shrink-0 mt-1" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Generated Results Area */}
      {generatedCards.length > 0 && (
        <div className="space-y-8 pt-10 border-t border-[#f3e8e4] animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
            <div>
              <h2 className="text-3xl font-bold text-[#4a2c2a]">Review & Refine</h2>
              <p className="text-[#4a2c2a]/40 text-sm mt-1">Review the AI generated cards before saving them to your deck.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <select 
                value={selectedDeck}
                onChange={(e) => setSelectedDeck(e.target.value)}
                className="w-full sm:w-64 bg-white border border-[#f3e8e4] rounded-full px-6 py-4 text-[#4a2c2a] outline-none focus:border-[#e3979d] shadow-sm"
              >
                {decks.length === 0 && <option value="">No decks available</option>}
                {decks.map(d => (
                  <option key={d._id} value={d._id}>{d.title}</option>
                ))}
              </select>
              <button 
                onClick={handleSaveCards}
                disabled={saving || !selectedDeck || success}
                className={`w-full sm:w-auto font-bold px-10 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg ${
                  success 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#4a2c2a] text-white hover:bg-[#382120] shadow-[#4a2c2a]/20'
                }`}
              >
                {success ? <><Check size={20} /> <span>Saved Successfully</span></> : <><Save size={20} /> <span>Add to Deck</span></>}
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            {generatedCards.map((card, idx) => (
              <div key={idx} className="bg-white border border-[#f3e8e4] p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 relative group shadow-sm hover:shadow-xl hover:shadow-[#e3979d]/5 transition-all">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#e3979d] uppercase tracking-widest">
                    <Sliders size={12} /> Front side
                  </div>
                  <textarea 
                    className="w-full bg-[#fdf6f4] rounded-[1.5rem] p-6 text-[#4a2c2a] font-bold focus:bg-white focus:border-[#e3979d] border border-transparent transition-all outline-none resize-none"
                    value={card.question}
                    onChange={(e) => handleCardChange(idx, 'question', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#4a2c2a]/40 uppercase tracking-widest">
                    <Check size={12} /> Back side
                  </div>
                  <textarea 
                    className="w-full bg-[#fdf6f4] rounded-[1.5rem] p-6 text-[#4a2c2a] focus:bg-white focus:border-[#e3979d] border border-transparent transition-all outline-none resize-none"
                    value={card.answer}
                    onChange={(e) => handleCardChange(idx, 'answer', e.target.value)}
                    rows={3}
                  />
                </div>
                <button 
                  onClick={() => removeCard(idx)}
                  className="absolute -right-3 -top-3 bg-white text-[#d9534f] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl border border-[#f3e8e4] hover:bg-[#fcf1f1]"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGenerator;
