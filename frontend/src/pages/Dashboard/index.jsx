import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
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
    <div className="space-y-8 pt-24 pb-12 w-full max-w-6xl mx-auto text-dark dark:text-gray-100 transition-colors">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-4xl font-bold">Hello, {user?.username}</h1>
        <button 
          onClick={() => setShowNewDeck(true)}
          className="bg-primary text-white font-bold px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-all shadow-md"
        >
          <Plus size={20} /> <span>New Deck</span>
        </button>
      </div>

      {showNewDeck && (
        <div className="bg-white dark:bg-[#1e1e1e]/50 dark:bg-white dark:bg-[#1e1e1e]/5 backdrop-blur-md p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-lg mx-2 transition-colors">
          <h2 className="text-xl font-bold mb-4">Create New Deck</h2>
          <form onSubmit={handleCreateDeck} className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Deck Title" 
                value={newDeckTitle}
                onChange={(e) => setNewDeckTitle(e.target.value)}
                className="w-full bg-white dark:bg-[#1e1e1e] dark:bg-[#121212] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary dark:focus:border-[#e3979d] outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Description (optional)" 
                value={newDeckDesc}
                onChange={(e) => setNewDeckDesc(e.target.value)}
                className="w-full bg-white dark:bg-[#1e1e1e] dark:bg-[#121212] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary dark:focus:border-[#e3979d] outline-none transition-colors"
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:opacity-90 transition-all">Create</button>
              <button type="button" onClick={() => setShowNewDeck(false)} className="bg-gray-700 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-gray-600 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 px-2">
        <div className="md:col-span-2 bg-white dark:bg-[#1e1e1e] dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-100 dark:border-white/10 pb-4">Your Decks</h2>
          {decks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-lg">You don't have any decks yet. Create one to start learning!</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {decks.map(deck => (
                <div key={deck._id} className="bg-[#FAF7F8] dark:bg-[#121212] border border-gray-200 dark:border-white/10 p-5 rounded-xl hover:border-primary dark:hover:border-[#e3979d] transition-all group relative shadow-sm hover:shadow-md">
                  <button onClick={() => handleDeleteDeck(deck._id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                    <Trash2 size={18} />
                  </button>
                  <h3 className="text-xl font-bold mb-2 pr-6 truncate">{deck.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 h-10 overflow-hidden">{deck.description || 'No description'}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs font-bold bg-white dark:bg-[#1e1e1e] dark:bg-white dark:bg-[#1e1e1e]/10 px-3 py-1.5 rounded-full border border-gray-100 dark:border-transparent">{deck.cardCount} cards</span>
                    <div className="space-x-3 flex items-center">
                      <Link to={`/deck/${deck._id}`} className="text-sm font-bold text-gray-500 hover:text-dark dark:hover:text-white transition-colors">Manage</Link>
                      <Link to={`/study/${deck._id}`} className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg inline-flex items-center space-x-1.5 hover:opacity-90 transition-all">
                        <BookOpen size={16} /> <span>Study</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-8 transition-colors">
          <h2 className="text-2xl font-bold border-b border-gray-100 dark:border-white/10 pb-4">Analytics</h2>
          {analytics ? (
            <>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[#FAF7F8] dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col justify-center transition-colors">
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Total Cards</p>
                  <p className="text-4xl font-black text-primary dark:text-[#e3979d]">{analytics.totalCards}</p>
                </div>
                <div className="bg-[#FAF7F8] dark:bg-[#121212] p-5 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col justify-center transition-colors">
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Day Streak</p>
                  <p className="text-4xl font-black text-primary dark:text-[#e3979d]">{analytics.streak}🔥</p>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 text-center mb-4 uppercase tracking-wider">Knowledge Mastery</p>
                <div className="w-56 h-56 mx-auto">
                  <Doughnut data={chartData} options={{ cutout: '75%', plugins: { legend: { position: 'bottom', labels: { color: '#a3a3a3', font: { size: 12, weight: 'bold' } } } } }} />
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Loading analytics...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
