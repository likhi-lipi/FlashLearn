import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Wand2, Save, Trash2, Check, RefreshCw, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIGenerator = () => {
  const [text, setText] = useState('');
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
      const res = await api.post('/ai/generate', { text });
      setGeneratedCards(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate flashcards. Please check your API key and try again.");
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          AI Flashcard Generator
        </h1>
        <p className="text-gray-400">Paste your notes, article, or text below and let AI create study cards for you.</p>
      </div>

      <div className="glass-panel p-6 rounded-xl space-y-4 shadow-xl">
        <div className="relative">
          <textarea
            className="w-full h-48 bg-background border border-gray-700 rounded-lg p-4 pb-12 text-white focus:outline-none focus:border-primary resize-none"
            placeholder="Paste your text here (e.g., 'Photosynthesis is a process used by plants...')"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button 
            onClick={handleDictate}
            title="Dictate text"
            className="absolute bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors shadow-lg flex items-center justify-center"
          >
            <Mic size={20} />
          </button>
        </div>
        
        {error && (
          <div className="bg-error/20 border border-error text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <span>⚠️</span> {error}
          </div>
        )}
        
        <div className="flex justify-end">
          <button 
            onClick={handleGenerate}
            disabled={loading || !text.trim()}
            className="bg-primary text-background font-bold px-6 py-3 rounded-lg flex items-center space-x-2 disabled:opacity-50 hover:bg-opacity-90 transition-transform transform hover:scale-105 active:scale-95"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Wand2 size={20} />}
            <span>{loading ? 'Generating...' : 'Generate Cards'}</span>
          </button>
        </div>
      </div>

      {generatedCards.length > 0 && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex justify-between items-end border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold">Review Generated Cards</h2>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedDeck}
                onChange={(e) => setSelectedDeck(e.target.value)}
                className="bg-background border border-gray-700 rounded px-3 py-2 text-white outline-none focus:border-primary"
              >
                {decks.length === 0 && <option value="">No decks available</option>}
                {decks.map(d => (
                  <option key={d._id} value={d._id}>{d.title}</option>
                ))}
              </select>
              <button 
                onClick={handleSaveCards}
                disabled={saving || !selectedDeck || success}
                className={`font-bold px-6 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  success ? 'bg-green-500 text-white' : 'bg-secondary text-background hover:bg-opacity-90'
                }`}
              >
                {success ? <><Check size={20} /> <span>Saved!</span></> : <><Save size={20} /> <span>Save to Deck</span></>}
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {generatedCards.map((card, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-lg flex gap-4 relative group">
                <div className="flex-1 space-y-2">
                  <label className="text-xs text-primary uppercase">Question</label>
                  <textarea 
                    className="w-full bg-transparent border-b border-gray-700 focus:border-primary focus:outline-none resize-none"
                    value={card.question}
                    onChange={(e) => handleCardChange(idx, 'question', e.target.value)}
                  />
                </div>
                <div className="w-px bg-gray-800"></div>
                <div className="flex-1 space-y-2">
                  <label className="text-xs text-secondary uppercase">Answer</label>
                  <textarea 
                    className="w-full bg-transparent border-b border-gray-700 focus:border-primary focus:outline-none resize-none"
                    value={card.answer}
                    onChange={(e) => handleCardChange(idx, 'answer', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => removeCard(idx)}
                  className="absolute -right-2 -top-2 bg-error text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 size={16} />
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
