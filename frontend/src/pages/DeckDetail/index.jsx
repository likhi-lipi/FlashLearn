import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { ArrowLeft, Trash2, Plus, Volume2 } from 'lucide-react';

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

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 pt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-muted hover:text-accent transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">{deck?.title || 'Loading Deck...'}</h1>
            <p className="text-muted font-medium">{cards.length} Cards in this collection</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-[#523639] text-white font-bold px-8 py-3.5 rounded-full flex items-center space-x-2 shadow-lg hover:opacity-95 transition-all"
        >
          <Plus size={20} /> <span>Add New Card</span>
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 animate-fade-in-down">
          <form onSubmit={handleAddCard} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-primary uppercase tracking-widest">Question (Front)</label>
                <textarea 
                  className="w-full bg-secondary/30 border-none rounded-2xl p-6 text-dark focus:ring-2 focus:ring-primary/20 resize-none font-medium"
                  rows="4"
                  placeholder="Enter the question..."
                  value={newQ}
                  onChange={(e) => setNewQ(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-accent uppercase tracking-widest">Answer (Back)</label>
                <textarea 
                  className="w-full bg-secondary/30 border-none rounded-2xl p-6 text-dark focus:ring-2 focus:ring-accent/20 resize-none font-medium"
                  rows="4"
                  placeholder="Enter the answer..."
                  value={newA}
                  onChange={(e) => setNewA(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => setShowAdd(false)} className="px-8 py-3 text-sm font-bold text-muted hover:text-dark">Cancel</button>
              <button type="submit" className="bg-primary text-white font-bold px-10 py-3 rounded-full shadow-lg shadow-primary/20">Create Card</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {cards.map(card => (
          <div key={card._id} className="bg-white p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 relative border border-gray-50 shadow-sm hover:shadow-md transition-all group">
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Question</span>
                <button onClick={() => playTTS(card.question)} className="text-muted hover:text-primary transition-colors"><Volume2 size={18}/></button>
              </div>
              <p className="text-xl font-bold text-dark leading-relaxed">{card.question}</p>
            </div>
            <div className="hidden md:block w-px bg-gray-100"></div>
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-accent uppercase tracking-widest">Answer</span>
                <button onClick={() => playTTS(card.answer)} className="text-muted hover:text-accent transition-colors"><Volume2 size={18}/></button>
              </div>
              <p className="text-lg font-medium text-muted leading-relaxed">{card.answer}</p>
            </div>
            <button 
              onClick={() => handleDeleteCard(card._id)} 
              className="absolute -right-3 -top-3 bg-white text-muted hover:text-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        
        {cards.length === 0 && !showAdd && (
          <div className="bg-white py-24 rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
               <Plus size={40} />
            </div>
            <div>
               <h3 className="text-xl font-bold text-dark">No cards yet</h3>
               <p className="text-muted font-medium">Start building your deck manually or use AI.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckDetail;
