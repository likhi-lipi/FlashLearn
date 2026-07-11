import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Bold, Italic, List, Image as ImageIcon, X, ChevronDown, CheckCircle2 } from 'lucide-react';

const MakeFlashcards = () => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [tags, setTags] = useState(['Memory', 'Finals']);
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [image, setImage] = useState('');
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');
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

  const handleSave = async () => {
    if (!frontText.trim()) {
      alert("Please enter the front side of the flashcard.");
      return;
    }
    if (!backText.trim()) {
      alert("Please enter the back side of the flashcard.");
      return;
    }
    if (!selectedDeck) {
      alert("Please select a study set (deck) first! If you don't have one, create it from the Dashboard.");
      return;
    }
    
    setSaving(true);
    try {
      await api.post('/cards', { deck: selectedDeck, question: frontText, answer: backText, tags, image });
      setShowToast(true);
      setFrontText('');
      setBackText('');
      setImage('');
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to save flashcard. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDeck = async (e) => {
    if (e.key === 'Enter' && newDeckTitle.trim()) {
      try {
        const res = await api.post('/decks', { title: newDeckTitle.trim(), description: 'Created from Make Flashcards' });
        setDecks([res.data, ...decks]);
        setSelectedDeck(res.data._id);
        setIsCreatingDeck(false);
        setNewDeckTitle('');
      } catch (err) {
        console.error(err);
        alert("Failed to create deck");
      }
    } else if (e.key === 'Escape') {
      setIsCreatingDeck(false);
      setNewDeckTitle('');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto pt-24 pb-32 flex flex-col items-center bg-background dark:bg-[#121212] min-h-screen transition-colors">
      
      {/* App-like Header */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 text-dark dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white dark:bg-[#1e1e1e]/10 rounded-full transition-colors">
          <X size={24} />
        </button>
        <h1 className="text-xl font-bold text-dark dark:text-gray-100 transition-colors">New Flashcard</h1>
        <button 
          onClick={handleSave} 
          className={`text-primary font-bold text-[15px] hover:opacity-80 px-2 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full mb-8 overflow-hidden transition-colors">
        <div className="h-full bg-primary dark:bg-[#e3979d] w-1/3 rounded-full transition-colors"></div>
      </div>

      {/* Form Fields */}
      <div className="w-full flex flex-col gap-6">
        
        {/* Front Field */}
        <div>
          <label className="text-[11px] font-bold text-muted dark:text-gray-400 mb-2 block tracking-wider transition-colors">FRONT (TERM)</label>
          <div className="bg-white dark:bg-[#1e1e1e] dark:bg-[#1e1e1e] rounded-xl border border-gray-200/80 dark:border-white/10 p-4 transition-all focus-within:border-primary/40 dark:focus-within:border-[#e3979d]/40 focus-within:ring-2 focus-within:ring-primary/10 dark:focus-within:ring-[#e3979d]/10 shadow-sm">
            <textarea 
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-[15px] text-dark dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-0 resize-none h-[80px] outline-none transition-colors" 
              placeholder="Enter the term or question..."
            ></textarea>
          </div>
        </div>

        {/* Back Field */}
        <div>
          <label className="text-[11px] font-bold text-muted dark:text-gray-400 mb-2 block tracking-wider transition-colors">BACK (DEFINITION)</label>
          <div className="bg-white dark:bg-[#1e1e1e] dark:bg-[#1e1e1e] rounded-xl border border-gray-200/80 dark:border-white/10 transition-all focus-within:border-primary/40 dark:focus-within:border-[#e3979d]/40 focus-within:ring-2 focus-within:ring-primary/10 dark:focus-within:ring-[#e3979d]/10 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4">
              <textarea 
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-[15px] text-dark dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-0 resize-none h-[120px] outline-none transition-colors" 
                placeholder="Enter the definition or answer..."
              ></textarea>
            </div>
            
            {/* Toolbar */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-4 transition-colors">
              <button className="text-dark dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white dark:bg-[#1e1e1e]/10 p-1.5 rounded-md transition-colors"><Bold size={18} /></button>
              <button className="text-dark dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white dark:bg-[#1e1e1e]/10 p-1.5 rounded-md transition-colors"><Italic size={18} /></button>
              <button className="text-dark dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white dark:bg-[#1e1e1e]/10 p-1.5 rounded-md transition-colors mr-2"><List size={18} /></button>
              
              <button className="flex items-center gap-1.5 bg-[#E6F0FF] dark:bg-blue-500/20 text-[#4A72FF] dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors hover:opacity-90 ml-auto">
                <ImageIcon size={14} />
                <span>Add Image</span>
              </button>
            </div>
          </div>
        </div>

        {/* Study Set Selector */}
        <div>
          <label className="text-[11px] font-bold text-muted dark:text-gray-400 mb-2 block tracking-wider flex justify-between transition-colors">
            <span>STUDY SET</span>
            {!isCreatingDeck && (
              <button 
                onClick={() => setIsCreatingDeck(true)}
                className="text-primary hover:underline text-xs"
              >
                + New Deck
              </button>
            )}
          </label>
          <div className="relative bg-white dark:bg-[#1e1e1e]/50 dark:bg-white dark:bg-[#1e1e1e]/5 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-gray-200/50 dark:border-white/10 shadow-sm cursor-pointer hover:bg-white dark:bg-[#1e1e1e]/80 dark:hover:bg-white dark:bg-[#1e1e1e]/10 transition-colors">
            
            {!isCreatingDeck && (
              <select 
                value={selectedDeck}
                onChange={(e) => setSelectedDeck(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 text-dark dark:text-gray-100"
              >
                {decks.length === 0 && <option value="">No decks</option>}
                {decks.map(d => (
                  <option key={d._id} value={d._id}>{d.title}</option>
                ))}
              </select>
            )}

            <div className="flex items-center gap-3 w-full" style={isCreatingDeck ? {} : { pointerEvents: 'none' }}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <div className="flex flex-col flex-1">
                {isCreatingDeck ? (
                  <input 
                    autoFocus
                    type="text"
                    value={newDeckTitle}
                    onChange={(e) => setNewDeckTitle(e.target.value)}
                    onKeyDown={handleCreateDeck}
                    placeholder="Type deck name & press Enter"
                    className="text-[15px] font-bold text-dark dark:text-gray-100 leading-tight bg-transparent border-b border-primary/50 dark:border-[#e3979d]/50 dark:border-white/20 outline-none w-full pb-0.5 transition-colors"
                  />
                ) : (
                  <>
                    <span className="text-[15px] font-bold text-dark dark:text-gray-100 leading-tight transition-colors">
                      {decks.length === 0 
                        ? 'No decks' 
                        : (decks.find(d => d._id === selectedDeck)?.title || 'Select a deck...')}
                    </span>
                    <span className="text-[11px] text-muted dark:text-gray-400 transition-colors">
                      {decks.length === 0 ? 'Create a deck first' : 'Tap to select study set'}
                    </span>
                  </>
                )}
              </div>
            </div>
            {!isCreatingDeck && <ChevronDown size={18} className="text-gray-400 dark:text-gray-500 pointer-events-none shrink-0" />}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-[11px] font-bold text-muted dark:text-gray-400 mb-2 block tracking-wider transition-colors">TAGS</label>
          <div className="bg-white dark:bg-[#1e1e1e]/50 dark:bg-[#1e1e1e] backdrop-blur-sm rounded-xl p-3 flex flex-wrap items-center gap-2 border border-gray-200/50 dark:border-white/10 shadow-sm min-h-[50px] transition-colors">
            {tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-gray-200/70 dark:bg-gray-800 text-dark dark:text-gray-100 text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-primary dark:hover:text-[#e3979d] transition-colors focus:outline-none"><X size={12} /></button>
              </span>
            ))}
            <input 
              type="text" 
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tag..."
              className="bg-transparent border-none text-[13px] text-dark dark:text-gray-100 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-[80px] p-1 flex-1 transition-colors"
            />
          </div>
        </div>

        {/* Reference Image */}
        <label className="w-full mt-2 relative rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-white/20 bg-white dark:bg-[#1e1e1e]/40 dark:bg-[#1e1e1e]/40 h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white dark:bg-[#1e1e1e]/60 dark:hover:bg-[#1e1e1e]/60 hover:border-gray-400 dark:hover:border-white/40 transition-all group">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          {image ? (
            <img src={image} alt="Reference preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <ImageIcon size={32} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
              <span className="text-sm font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">Tap to add a reference image</span>
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')" }}></div>
            </>
          )}
        </label>

      </div>

      {/* Success Toast Overlay */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-gray-200/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/40 dark:border-white/10 text-dark dark:text-gray-100 px-4 py-3 rounded-xl shadow-lg flex items-center justify-between z-50 animate-fade-in-up transition-colors">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-[#4A55A2] dark:text-blue-400" />
            <span className="text-[14px] font-medium">Flashcard saved successfully!</span>
          </div>
          <button onClick={() => setShowToast(false)} className="text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-gray-100 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

    </div>
  );
};

export default MakeFlashcards;
