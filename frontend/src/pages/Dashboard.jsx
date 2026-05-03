import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Plus, BookOpen, Trash2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [decks, setDecks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showNewDeck, setShowNewDeck] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [decksRes, analyticsRes] = await Promise.all([
        api.get('/decks'),
        api.get('/analytics')
      ]);
      setDecks(decksRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    try {
      await api.post('/decks', { title: newDeckTitle, description: newDeckDesc });
      setShowNewDeck(false);
      setNewDeckTitle('');
      setNewDeckDesc('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDeck = async (id) => {
    if(window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await api.delete(`/decks/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const chartData = analytics ? {
    labels: ['New', 'Hard', 'Medium', 'Easy'],
    datasets: [
      {
        data: [
          analytics.difficultyBreakdown.new,
          analytics.difficultyBreakdown.hard,
          analytics.difficultyBreakdown.medium,
          analytics.difficultyBreakdown.easy
        ],
        backgroundColor: ['#888888', '#CF6679', '#F6A500', '#03DAC6'],
        borderWidth: 0,
      },
    ],
  } : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hello, {user?.username}</h1>
        <button 
          onClick={() => setShowNewDeck(true)}
          className="bg-primary text-background font-bold px-4 py-2 rounded flex items-center space-x-2 hover:bg-opacity-90 transition"
        >
          <Plus size={20} /> <span>New Deck</span>
        </button>
      </div>

      {showNewDeck && (
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Create New Deck</h2>
          <form onSubmit={handleCreateDeck} className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Deck Title" 
                value={newDeckTitle}
                onChange={(e) => setNewDeckTitle(e.target.value)}
                className="w-full bg-background border border-gray-700 rounded px-4 py-2 focus:border-primary"
                required
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Description (optional)" 
                value={newDeckDesc}
                onChange={(e) => setNewDeckDesc(e.target.value)}
                className="w-full bg-background border border-gray-700 rounded px-4 py-2 focus:border-primary"
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-secondary text-background font-bold px-4 py-2 rounded">Create</button>
              <button type="button" onClick={() => setShowNewDeck(false)} className="bg-gray-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Your Decks</h2>
          {decks.length === 0 ? (
            <p className="text-gray-400">You don't have any decks yet. Create one to start learning!</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {decks.map(deck => (
                <div key={deck._id} className="bg-background border border-gray-800 p-4 rounded-lg hover:border-primary transition-colors group relative">
                  <button onClick={() => handleDeleteDeck(deck._id)} className="absolute top-2 right-2 text-gray-500 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                  <h3 className="text-lg font-bold mb-1">{deck.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 h-10 overflow-hidden">{deck.description || 'No description'}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded">{deck.cardCount} cards</span>
                    <div className="space-x-2">
                      <Link to={`/deck/${deck._id}`} className="text-sm text-primary hover:underline">Manage</Link>
                      <Link to={`/study/${deck._id}`} className="bg-primary text-background text-sm font-bold px-3 py-1 rounded inline-flex items-center space-x-1">
                        <BookOpen size={14} /> <span>Study</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-6">
          <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Analytics</h2>
          {analytics ? (
            <>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-background p-4 rounded-lg border border-gray-800">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Total Cards</p>
                  <p className="text-3xl font-bold text-primary">{analytics.totalCards}</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-gray-800">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Day Streak</p>
                  <p className="text-3xl font-bold text-secondary">{analytics.streak}🔥</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-400 text-center mb-2">Knowledge Mastery</p>
                <div className="w-48 h-48 mx-auto">
                  <Doughnut data={chartData} options={{ cutout: '70%', plugins: { legend: { position: 'bottom', labels: { color: '#fff'} } } }} />
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-sm">Loading analytics...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
