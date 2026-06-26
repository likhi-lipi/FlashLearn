import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { BookOpen, Library, Search, PlusCircle, Sparkles, TrendingUp, ArrowRight, Layers, Zap } from 'lucide-react';

const DUMMY_DECKS = [
  { _id: 'dummy1', title: 'Physics Basics', description: 'Fundamental concepts of classical mechanics, kinematics, and thermodynamics.', cardCount: 24, category: 'Science', color: '#e3979d' },
  { _id: 'dummy2', title: 'Python Programming', description: 'Core syntax, data structures, and algorithms for beginner to intermediate Python developers.', cardCount: 50, category: 'Tech', color: '#4a9d6e' },
  { _id: 'dummy3', title: 'Engineering Math', description: 'Comprehensive review of Calculus, linear algebra, and differential equations.', cardCount: 35, category: 'Math', color: '#f6c445' },
  { _id: 'dummy4', title: 'Spanish Vocabulary', description: 'Essential words and conversational phrases for everyday Spanish communication.', cardCount: 100, category: 'Language', color: '#4a2c2a' },
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
      setTimeout(() => setLoading(false), 800); // Small delay for smooth transition
    }
  };

  const filteredDecks = decks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (deck.description && deck.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || deck.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const SkeletonCard = () => (
    <div className="bg-white rounded-[2.5rem] border border-[#f3e8e4] p-8 h-[320px] animate-pulse flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="w-20 h-6 bg-[#f3e8e4] rounded-full"></div>
        <div className="w-16 h-6 bg-[#f3e8e4] rounded-full"></div>
      </div>
      <div className="w-3/4 h-8 bg-[#f3e8e4] rounded-xl"></div>
      <div className="space-y-3">
        <div className="w-full h-4 bg-[#f3e8e4] rounded-full"></div>
        <div className="w-5/6 h-4 bg-[#f3e8e4] rounded-full"></div>
      </div>
      <div className="mt-auto w-full h-14 bg-[#f3e8e4] rounded-2xl"></div>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in font-['Outfit'] pb-20">
      {/* Premium Hero Section */}
      <div className="relative rounded-[3rem] overflow-hidden bg-white border border-[#f3e8e4] shadow-sm">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#f9e8e6] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-[#e3979d]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10 px-10 py-20 md:px-20 md:py-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f9e8e6] text-[#e3979d] text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
              <Library size={14} /> The Global Library
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-[#4a2c2a] leading-[1.1]">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-[#e3979d]' : ''}>{word} </span>
              ))}
            </h1>
            
            <p className="text-xl text-[#4a2c2a]/50 max-w-2xl leading-relaxed">
              Explore thousands of expert-curated decks or share your own knowledge with the community.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center lg:justify-start">
              <Link to="/generate" className="bg-[#4a2c2a] text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-[#382120] shadow-xl shadow-[#4a2c2a]/10 flex items-center justify-center gap-3">
                <PlusCircle size={22} /> Start Creating
              </Link>
              <Link to="/generate" className="bg-white text-[#4a2c2a] px-10 py-5 rounded-full font-bold transition-all border border-[#f3e8e4] hover:bg-[#fdf6f4] flex items-center justify-center gap-3">
                <Sparkles size={22} className="text-[#e3979d]" /> AI Generator
              </Link>
            </div>
          </div>

          {/* Decorative Visual */}
          <div className="hidden lg:flex w-1/3 justify-center">
            <div className="relative">
              <div className="w-64 h-80 bg-[#fdf6f4] rounded-[2.5rem] border-8 border-white shadow-2xl rotate-6 flex items-center justify-center">
                 <BookOpen size={80} className="text-[#e3979d]/20" />
              </div>
              <div className="absolute -top-10 -left-10 w-64 h-80 bg-white rounded-[2.5rem] border-8 border-white shadow-2xl -rotate-6 flex items-center justify-center z-10">
                 <Zap size={80} className="text-[#e3979d]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center px-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4a2c2a]/30" size={20} />
          <input 
            type="text" 
            placeholder="Search subjects, topics, or creators..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#f3e8e4] rounded-full pl-16 pr-8 py-5 text-[#4a2c2a] focus:outline-none focus:border-[#e3979d] transition-all shadow-sm placeholder-[#4a2c2a]/20 text-lg"
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-full whitespace-nowrap font-bold transition-all text-sm border ${
                selectedCategory === cat 
                  ? 'bg-[#4a2c2a] text-white border-[#4a2c2a] shadow-lg shadow-[#4a2c2a]/10' 
                  : 'bg-white text-[#4a2c2a]/40 hover:text-[#4a2c2a] border-[#f3e8e4] hover:bg-[#fdf6f4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="pt-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filteredDecks.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[4rem] border border-[#f3e8e4] flex flex-col items-center justify-center animate-fade-in-up shadow-sm">
            <div className="bg-[#f9e8e6] p-10 rounded-full mb-8 text-[#e3979d]">
              <Layers size={80} />
            </div>
            <h3 className="text-4xl font-bold mb-4 text-[#4a2c2a]">No decks found</h3>
            <p className="text-[#4a2c2a]/40 max-w-md mx-auto mb-12 text-lg leading-relaxed">
              We couldn't find anything matching "{searchTerm}". Try a different search or create your own!
            </p>
            <div className="flex gap-6">
              <Link to="/generate" className="bg-[#e3979d] text-white font-bold px-12 py-5 rounded-full hover:bg-[#d8868c] transition-all shadow-lg shadow-[#e3979d]/20">
                Create New Deck
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDecks.map((deck, idx) => (
              <div 
                key={deck._id} 
                className="group bg-white rounded-[3rem] transition-all duration-500 flex flex-col h-full border border-[#f3e8e4] overflow-hidden relative shadow-sm hover:shadow-2xl hover:shadow-[#e3979d]/10 hover:-translate-y-3"
              >
                {/* Decorative Thumbnail Area */}
                <div className="h-40 w-full relative overflow-hidden bg-[#fdf6f4]">
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                      <Layers size={120} />
                   </div>
                   <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-[#4a2c2a]/60 uppercase tracking-widest border border-white/40">
                      {deck.category || 'General'}
                   </div>
                   <div className="absolute bottom-6 left-8 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#e3979d]">
                        <BookOpen size={18} />
                      </div>
                      <span className="text-sm font-bold text-[#4a2c2a]">{deck.cardCount || 0} Cards</span>
                   </div>
                </div>

                <div className="p-10 pt-8 flex-1 flex flex-col">
                  <h3 className="text-3xl font-bold text-[#4a2c2a] mb-4 group-hover:text-[#e3979d] transition-colors leading-tight">
                    {deck.title}
                  </h3>
                  <p className="text-[#4a2c2a]/40 text-[15px] line-clamp-3 flex-1 leading-relaxed mb-10">
                    {deck.description || 'Dive into this comprehensive collection of flashcards designed for maximum retention and clarity.'}
                  </p>
                  
                  <button 
                    onClick={() => {
                      if (usingDummyData) {
                        alert("This is a sample deck! Please create a real deck from your Dashboard to start studying.");
                      } else {
                        navigate(`/study/${deck._id}`);
                      }
                    }}
                    className="w-full bg-[#f3e8e4] hover:bg-[#4a2c2a] text-[#4a2c2a] hover:text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn shadow-sm hover:shadow-lg hover:shadow-[#4a2c2a]/20"
                  >
                    Start Mastery 
                    <ArrowRight size={20} className="transform group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseDecks;
