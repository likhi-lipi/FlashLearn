import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Trash2, Plus, Volume2, Mic } from 'lucide-react';

const DeckDetail = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  useEffect(() => {
    fetchCards();
    fetchDeckDetails();
  }, [id]);

  const fetchCards = async () => {
    try {
      const res = await api.get(`/cards/deck/${id}`);
      setCards(res.data);
    } catch (err) {
      console.error(err);
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
    try {
      await api.delete(`/cards/${cardId}`);
      fetchCards();
    } catch (err) {
      console.error(err);
    }
  };

  const playTTS = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{deck?.title || 'Loading Deck...'}</h1>
          <p className="text-gray-400">{cards.length} Cards</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Cards</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-primary text-background font-bold px-4 py-2 rounded flex items-center space-x-2"
        >
          <Plus size={20} /> <span>Add Card</span>
        </button>
      </div>

      {showAdd && (
        <div className="glass-panel p-6 rounded-xl animate-fade-in-down">
          <form onSubmit={handleAddCard} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-gray-400">Question (Front)</label>
                <button type="button" onClick={() => handleDictate(setNewQ)} className="text-gray-500 hover:text-primary flex items-center space-x-1 text-xs" title="Dictate">
                  <Mic size={16}/> <span>Dictate</span>
                </button>
              </div>
              <textarea 
                className="w-full bg-background border border-gray-700 rounded p-3 focus:border-primary focus:outline-none"
                rows="3"
                value={newQ}
                onChange={(e) => setNewQ(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-gray-400">Answer (Back)</label>
                <button type="button" onClick={() => handleDictate(setNewA)} className="text-gray-500 hover:text-primary flex items-center space-x-1 text-xs" title="Dictate">
                  <Mic size={16}/> <span>Dictate</span>
                </button>
              </div>
              <textarea 
                className="w-full bg-background border border-gray-700 rounded p-3 focus:border-primary focus:outline-none"
                rows="3"
                value={newA}
                onChange={(e) => setNewA(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
              <button type="submit" className="bg-secondary text-background font-bold px-6 py-2 rounded">Save</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {cards.map(card => (
          <div key={card._id} className="glass-panel p-4 rounded-lg flex flex-col md:flex-row gap-4 border border-gray-800">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500 uppercase">Question</span>
                <button onClick={() => playTTS(card.question)} className="text-gray-500 hover:text-primary"><Volume2 size={16}/></button>
              </div>
              <p className="text-lg">{card.question}</p>
            </div>
            <div className="hidden md:block w-px bg-gray-800"></div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500 uppercase">Answer</span>
                <button onClick={() => playTTS(card.answer)} className="text-gray-500 hover:text-primary"><Volume2 size={16}/></button>
              </div>
              <p className="text-lg text-gray-300">{card.answer}</p>
            </div>
            <div className="flex items-center justify-end md:justify-center px-2">
              <button onClick={() => handleDeleteCard(card._id)} className="text-gray-600 hover:text-error transition-colors p-2">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {cards.length === 0 && !showAdd && (
          <div className="text-center py-12 text-gray-500 border border-dashed border-gray-700 rounded-xl">
            No cards yet. Add some or use the AI Generator!
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckDetail;
