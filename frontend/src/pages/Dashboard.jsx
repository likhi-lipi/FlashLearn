import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Plus, BookOpen, Trash2, Sparkles, TrendingUp, Calendar, Zap, MoreVertical } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

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

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Cards Mastered',
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: '#e3979d',
        backgroundColor: '#f9e8e6',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const activityData = Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 4)));

  return (
    <div className="space-y-10 pb-20 animate-fade-in font-['Outfit']">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#4a2c2a] mb-2">Welcome back, {user?.username || 'Learner'} 👋</h1>
          <p className="text-[#4a2c2a]/50">Ready to crush your goals today?</p>
        </div>
        <button 
          onClick={() => setShowNewDeck(true)}
          className="bg-[#4a2c2a] text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-[#382120] transition-all shadow-lg"
        >
          <Plus size={20} /> <span>New Deck</span>
        </button>
      </div>

      {/* AI Study Buddy Insight */}
      <div className="bg-[#f9e8e6] border border-[#ebdcd6] rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e3979d]/10 blur-3xl rounded-full"></div>
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#e3979d] shadow-sm shrink-0">
          <Sparkles size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-[#4a2c2a] mb-2">AI Study Buddy Insight</h3>
          <p className="text-[#4a2c2a]/70 leading-relaxed italic">
            "You're crushing it! You've mastered 15% more cards this week than last. I noticed you struggle a bit with 'Cell Biology'—maybe take 10 minutes to review those today for peak retention?"
          </p>
        </div>
        <Link to="/generate" className="bg-white text-[#4a2c2a] font-bold px-6 py-3 rounded-full border border-[#f3e8e4] hover:bg-[#fdf6f4] transition-all shrink-0">
          Personalize Study Plan
        </Link>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Cards', value: analytics?.totalCards || 0, icon: BookOpen, color: '#e3979d', bg: '#fdf6f4' },
          { label: 'Mastery Level', value: '78%', icon: Zap, color: '#f6c445', bg: '#fef9e7' },
          { label: 'Daily Streak', value: `${analytics?.streak || 0} Days`, icon: Calendar, color: '#4a9d6e', bg: '#eef6f1' },
          { label: 'Cards Today', value: '42', icon: TrendingUp, color: '#4a2c2a', bg: '#f3e8e4' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#f3e8e4] flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: stat.bg, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <p className="text-xs font-bold text-[#4a2c2a]/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[#4a2c2a]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Decks Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-bold text-[#4a2c2a]">Your Study Library</h2>
            <Link to="/browse" className="text-sm font-bold text-[#e3979d] hover:underline">View All</Link>
          </div>
          
          {decks.length === 0 ? (
            <div className="bg-white border border-[#f3e8e4] rounded-[2.5rem] p-12 text-center flex flex-col items-center shadow-sm">
              <div className="w-20 h-20 bg-[#fdf6f4] rounded-3xl flex items-center justify-center mb-6 text-[#e3979d]">
                <BookOpen size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#4a2c2a] mb-3">Your library is empty</h3>
              <p className="text-[#4a2c2a]/50 mb-10 max-w-sm leading-relaxed">
                Build a deck manually or let our AI scan your notes to generate flashcards instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setShowNewDeck(true)} className="bg-[#4a2c2a] text-white font-bold px-8 py-4 rounded-full hover:bg-[#382120] transition-all">
                  Create Manual Deck
                </button>
                <Link to="/generate" className="bg-[#e3979d] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d8868c] transition-all">
                  AI Generate
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {decks.map(deck => (
                <div key={deck._id} className="bg-white border border-[#f3e8e4] p-8 rounded-[2rem] hover:border-[#e3979d] transition-all group relative shadow-sm hover:shadow-xl hover:shadow-[#e3979d]/5">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#f9e8e6] text-[10px] font-bold text-[#e3979d] px-3 py-1 rounded-full uppercase tracking-widest">
                      {deck.category || 'General'}
                    </span>
                    <button onClick={() => handleDeleteDeck(deck._id)} className="text-[#4a2c2a]/20 hover:text-[#d9534f] transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4a2c2a] mb-2">{deck.title}</h3>
                  <p className="text-[#4a2c2a]/50 text-sm mb-8 h-10 overflow-hidden line-clamp-2 leading-relaxed">{deck.description || 'Focus on the core concepts.'}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs font-bold text-[#4a2c2a]/40">{deck.cardCount} cards</span>
                    <div className="flex gap-3">
                      <Link to={`/deck/${deck._id}`} className="p-3 bg-[#fdf6f4] rounded-full text-[#4a2c2a]/60 hover:bg-[#f3e8e4] transition-all">
                        <MoreVertical size={16} />
                      </Link>
                      <Link to={`/study/${deck._id}`} className="bg-[#4a2c2a] text-white text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#382120] transition-all shadow-md shadow-[#4a2c2a]/10">
                        <Zap size={14} /> <span>Study</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Column */}
        <div className="space-y-10">
          {/* Mastery Chart */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#f3e8e4] shadow-sm">
            <h2 className="text-xl font-bold text-[#4a2c2a] mb-6">Learning Curve</h2>
            <div className="h-48">
              <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false }, ticks: { color: '#4a2c2a40', font: { family: 'Outfit' } } } } }} />
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#f3e8e4] shadow-sm">
            <h2 className="text-xl font-bold text-[#4a2c2a] mb-6">Activity</h2>
            <div className="flex gap-[2px]">
              {activityData.slice(0, 20).map((week, i) => (
                <div key={i} className="flex flex-col gap-[2px]">
                  {week.map((day, j) => (
                    <div 
                      key={j} 
                      className="w-[10px] h-[10px] rounded-[2px]"
                      style={{ 
                        backgroundColor: day === 0 ? '#fdf6f4' : day === 1 ? '#f9e8e6' : day === 2 ? '#e3979d' : '#4a2c2a' 
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#4a2c2a]/40 mt-4 uppercase tracking-widest font-bold">Past 20 Weeks</p>
          </div>
        </div>
      </div>

      {showNewDeck && (
        <div className="fixed inset-0 bg-[#4a2c2a]/20 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-[#f3e8e4] animate-fade-in-up">
            <h2 className="text-2xl font-bold text-[#4a2c2a] mb-8">Create New Deck</h2>
            <form onSubmit={handleCreateDeck} className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-[#4a2c2a]/40 uppercase tracking-widest ml-4 mb-2">Deck Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Advanced Bio" 
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  className="w-full bg-[#fdf6f4] border border-transparent rounded-full px-6 py-4 text-[#4a2c2a] focus:bg-white focus:border-[#e3979d] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#4a2c2a]/40 uppercase tracking-widest ml-4 mb-2">Description</label>
                <input 
                  type="text" 
                  placeholder="Optional context" 
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                  className="w-full bg-[#fdf6f4] border border-transparent rounded-full px-6 py-4 text-[#4a2c2a] focus:bg-white focus:border-[#e3979d] transition-all"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-[#4a2c2a] text-white font-bold py-4 rounded-full hover:bg-[#382120] transition-all">Create Deck</button>
                <button type="button" onClick={() => setShowNewDeck(false)} className="flex-1 bg-[#fdf6f4] text-[#4a2c2a]/60 font-bold py-4 rounded-full hover:bg-[#f3e8e4] transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
