import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { BookOpen, Library, Search, PlusCircle, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

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

  const categories = ['All', ...new Set(decks.map(deck => deck.category || 'General'))];

  useEffect(() => {
    fetchDecks();
  }, [type]);

  const fetchDecks = async () => {
    setLoading(true);
    setUsingDummyData(false);
    try {
      const res = await api.get(`/decks/${type}`);
      if (res.data && res.data.length > 0) {
        const populatedDecks = res.data.map(d => ({ ...d, category: d.category || 'General' }));
        setDecks(populatedDecks);
      } else {
        setDecks(DUMMY_DECKS);
        setUsingDummyData(true);
      }
    } catch (err) {
      console.error(err);
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
    <div className="space-y-8 animate-fade-in-up pb-20">
      {/* Hero Banner Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden mb-12 bg-white border border-[#f3e8e4] shadow-sm">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#f9e8e6] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-60"></div>
        
        <div className="relative z-10 px-10 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9e8e6] text-[#e3979d] text-xs font-bold mb-6 tracking-wider uppercase">
              <Sparkles size={14} /> Welcome to the Library
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#4a2c2a]">{title}</h1>
            <p className="text-xl text-[#4a2c2a]/60 max-w-2xl leading-relaxed">
              Discover, learn, and master new subjects with community-driven flashcards.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full md:w-auto">
            <Link to="/generate" className="bg-[#f3e8e4] hover:bg-[#ebdcd6] text-[#4a2c2a] px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-sm border border-[#e8dcd8]">
              <Sparkles size={20} className="text-[#e3979d]" /> AI Generator
            </Link>
            <Link to="/generate" className="bg-[#e3979d] hover:bg-[#d8868c] text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-md">
              <PlusCircle size={20} /> Create Deck
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-6 p-2">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#4a2c2a]/30" size={20} />
          <input 
            type="text" 
            placeholder="Search decks by title or description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#f3e8e4] rounded-[2rem] pl-14 pr-6 py-4 text-[#4a2c2a] focus:outline-none focus:border-[#e3979d] transition-all shadow-sm placeholder-[#4a2c2a]/30"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar items-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold transition-all text-sm ${
                selectedCategory === cat 
                  ? 'bg-[#4a2c2a] text-white shadow-md' 
                  : 'bg-white text-[#4a2c2a]/60 hover:bg-[#f3e8e4] border border-[#f3e8e4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#e3979d] mx-auto mb-4"></div>
          <p className="text-[#4a2c2a]/40 font-medium animate-pulse">Loading amazing content...</p>
        </div>
      ) : filteredDecks.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-[#f3e8e4] flex flex-col items-center justify-center animate-fade-in-up shadow-sm">
          <div className="bg-[#f9e8e6] p-8 rounded-full mb-8">
            <Library size={64} className="text-[#e3979d]" />
          </div>
          <h3 className="text-3xl font-bold mb-4">No decks found</h3>
          <p className="text-[#4a2c2a]/50 max-w-md mx-auto mb-10 text-lg">
            We couldn't find any decks matching your search. Start learning by creating or generating your first deck!
          </p>
          <div className="flex gap-5">
            <Link to="/generate" className="bg-[#e3979d] text-white font-bold px-8 py-4 rounded-full hover:bg-[#d8868c] transition-all shadow-md">
              Create a Deck
            </Link>
            <Link to="/generate" className="bg-[#f3e8e4] text-[#4a2c2a] font-bold px-8 py-4 rounded-full hover:bg-[#ebdcd6] transition-all border border-[#e8dcd8]">
              Use AI Generator
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDecks.map((deck, idx) => (
            <div 
              key={deck._id} 
              className="group bg-white rounded-[2rem] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border border-[#f3e8e4] overflow-hidden relative shadow-sm hover:shadow-xl hover:shadow-[#e3979d]/5"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-[#f9e8e6] text-[10px] font-bold text-[#e3979d] px-3 py-1 rounded-full uppercase tracking-widest border border-[#f9e8e6]">
                    {deck.category || 'General'}
                  </span>
                  <div className="flex items-center text-xs font-bold text-[#4a2c2a]/40">
                    <BookOpen size={14} className="mr-1.5 text-[#e3979d]" />
                    {deck.cardCount || 0} cards
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[#4a2c2a] mb-4 group-hover:text-[#e3979d] transition-colors">{deck.title}</h3>
                <p className="text-[#4a2c2a]/50 text-[15px] line-clamp-3 flex-1 leading-relaxed">{deck.description || 'No description provided for this deck. Dive in to explore the contents!'}</p>
                
                <div className="mt-8 pt-6 border-t border-[#f3e8e4]/50">
                  <button 
                    onClick={() => {
                      if (usingDummyData) {
                        alert("This is a sample deck! Please create a real deck from your Dashboard to start studying.");
                      } else {
                        navigate(`/study/${deck._id}`);
                      }
                    }}
                    className="w-full bg-[#f3e8e4] hover:bg-[#e3979d] text-[#4a2c2a] hover:text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-transparent"
                  >
                    Start Learning 
                    <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
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
