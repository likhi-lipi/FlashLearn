import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { BookOpen, Library, Search, PlusCircle, Sparkles, TrendingUp } from 'lucide-react';
import SplitText from '../components/SplitText';

const DUMMY_DECKS = [
  { _id: 'dummy1', title: 'Physics Basics', description: 'Fundamental concepts of classical mechanics, kinematics, and thermodynamics.', cardCount: 24, category: 'Science' },
  { _id: 'dummy2', title: 'Python Programming', description: 'Core syntax, data structures, and algorithms for beginner to intermediate Python developers.', cardCount: 50, category: 'Tech' },
  { _id: 'dummy3', title: 'Engineering Math', description: 'Comprehensive review of Calculus, linear algebra, and differential equations.', cardCount: 35, category: 'Math' },
  { _id: 'dummy4', title: 'Spanish Vocabulary', description: 'Essential words and conversational phrases for everyday Spanish communication.', cardCount: 100, category: 'Language' },
];

const BrowseDecks = ({ type, title }) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [usingDummyData, setUsingDummyData] = useState(false);
  const navigate = useNavigate();

  const categories = ['All', 'Science', 'Tech', 'Math', 'Language'];

  useEffect(() => {
    fetchDecks();
  }, [type]);

  const fetchDecks = async () => {
    setLoading(true);
    setUsingDummyData(false);
    try {
      const res = await api.get(`/decks/${type}`);
      if (res.data && res.data.length > 0) {
        // Map backend data which might not have category, assign random or 'General'
        const populatedDecks = res.data.map(d => ({ ...d, category: d.category || 'General' }));
        setDecks(populatedDecks);
      } else {
        setDecks(DUMMY_DECKS);
        setUsingDummyData(true);
      }
    } catch (err) {
      console.error(err);
      // Fallback to dummy data on error
      setDecks(DUMMY_DECKS);
      setUsingDummyData(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredDecks = decks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (deck.description && deck.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || deck.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-gray-900 via-[#0a1120] to-[#121c2e] border border-gray-800 shadow-2xl">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 px-8 py-16 md:px-12 md:py-20 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold mb-6 tracking-wide uppercase">
              <Sparkles size={16} /> Welcome to the Library
            </div>
            
            <div className="flex justify-center md:justify-start">
              <SplitText
                text={title}
                className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg"
                delay={40}
                duration={1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
                tag="h1"
              />
            </div>
            
            <div className="flex justify-center md:justify-start">
              <SplitText
                text="Discover, learn, and master new subjects with community-driven flashcards."
                className="text-xl text-gray-300 max-w-2xl leading-relaxed"
                delay={20}
                duration={0.8}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, x: -20 }}
                to={{ opacity: 1, x: 0 }}
                textAlign="left"
                tag="p"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/generate" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg">
              <Sparkles size={20} className="text-secondary" /> AI Generate
            </Link>
            <Link to="/dashboard" className="bg-primary hover:bg-[#25A1DA] text-background px-6 py-4 rounded-xl font-bold transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(42,175,234,0.4)]">
              <PlusCircle size={20} /> Create Deck
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-800 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search decks by title or description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors shadow-inner"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary text-background shadow-md' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {usingDummyData && !loading && filteredDecks.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 px-6 py-4 rounded-xl flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-400" />
            <p><strong>No public decks yet!</strong> Explore these sample decks to get a feel for the platform.</p>
          </div>
          <button onClick={() => setUsingDummyData(false)} className="text-sm underline hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Content Section */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400 font-medium animate-pulse">Loading amazing content...</p>
        </div>
      ) : filteredDecks.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl border border-gray-800 flex flex-col items-center justify-center animate-fade-in-up">
          <div className="bg-gray-800/50 p-6 rounded-full mb-6">
            <Library size={64} className="text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold mb-3">No decks found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
            We couldn't find any decks matching your search. Start learning by creating or generating your first deck!
          </p>
          <div className="flex gap-4">
            <Link to="/dashboard" className="bg-primary text-background font-bold px-6 py-3 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105 shadow-lg">
              Create a Deck
            </Link>
            <Link to="/generate" className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md">
              Use AI Generator
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck, idx) => (
            <div 
              key={deck._id} 
              className="group glass-panel rounded-2xl hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full border border-gray-800 overflow-hidden relative animate-fade-in-up"
              style={{ animationFillMode: 'both', animationDelay: `${idx * 100}ms` }}
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-800 text-xs font-bold text-gray-300 px-3 py-1 rounded-full uppercase tracking-wider border border-gray-700">
                    {deck.category || 'General'}
                  </span>
                  <div className="flex items-center text-sm font-medium text-gray-400 bg-gray-900/50 px-2 py-1 rounded-md border border-gray-800">
                    <BookOpen size={14} className="mr-1.5 text-primary" />
                    {deck.cardCount || 0} cards
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{deck.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 flex-1 leading-relaxed">{deck.description || 'No description provided for this deck. Dive in to explore the contents!'}</p>
                
                <div className="mt-6 pt-5 border-t border-gray-800/50">
                  <button 
                    onClick={() => {
                      if (usingDummyData) {
                        alert("This is a sample deck! Please create a real deck from your Dashboard to start studying.");
                      } else {
                        navigate(`/study/${deck._id}`);
                      }
                    }}
                    className="w-full bg-white/5 hover:bg-primary text-white hover:text-background font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-transparent"
                  >
                    Start Learning 
                    <span className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseDecks;
