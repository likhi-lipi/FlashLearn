import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BookOpen, Target, Flame, Sparkles, Timer, ChevronRight, Brain, Languages, Shield, Settings, Bell, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Placeholder data
  const heatmapData = Array.from({ length: 182 }, () => Math.floor(Math.random() * 4)); 

  return (
    <div className="pt-24 pb-20 animate-fade-in font-['Outfit']">
      <div className="max-w-[1200px] mx-auto px-6 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#4a2c2a] dark:text-gray-100 mb-2">Good Morning, {user?.username || 'Alex'}</h1>
            <p className="text-[#4a2c2a]/70 dark:text-gray-400 font-medium text-lg">You've mastered 12 new concepts this week. Keep the flow.</p>
          </div>
          <div className="bg-[#fdf6f4] dark:bg-[#121212] border border-[#e3979d]/30 dark:border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#4a2c2a] flex items-center justify-center text-[10px] text-white">L</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#4a2c2a] dark:text-gray-100 leading-none">Level 14 Polyglot</span>
              <span className="text-[11px] font-medium text-[#4a2c2a]/60 dark:text-gray-400 mt-1 leading-none">2,450 Total XP</span>
            </div>
          </div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-[#e3979d]/20 dark:border-white/10 relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#fce4ec] text-[#e3979d] rounded-xl"><BookOpen size={20} /></div>
                <div className="bg-[#eef6f1] dark:bg-[#4a9d6e]/20 text-[#4a9d6e] text-xs font-bold px-3 py-1 rounded-full">+12% vs last week</div>
             </div>
             <p className="text-[#4a2c2a]/60 dark:text-gray-400 font-semibold text-sm mb-1">Total Studied</p>
             <h2 className="text-4xl font-extrabold text-[#4a2c2a] dark:text-gray-100">1,284</h2>
             <p className="text-[#4a2c2a]/50 dark:text-gray-500 text-xs font-medium mt-2">Cards reviewed this month</p>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-[#e3979d]/20 dark:border-white/10 relative overflow-hidden flex flex-col justify-between">
             <div>
               <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#eef6f1] dark:bg-[#4a9d6e]/20 text-[#4a9d6e] rounded-xl"><Target size={20} /></div>
                  <div className="text-[#4a2c2a]/40 dark:text-gray-500 text-xs font-bold uppercase tracking-wider">Precision score</div>
               </div>
               <p className="text-[#4a2c2a]/60 dark:text-gray-400 font-semibold text-sm mb-1">Accuracy %</p>
               <h2 className="text-4xl font-extrabold text-[#4a2c2a] dark:text-gray-100">94.2%</h2>
             </div>
             <div className="w-full h-1.5 bg-[#f3e8e4] dark:bg-white/10 rounded-full mt-6">
               <div className="h-full bg-[#e3979d] rounded-full" style={{ width: '94.2%' }}></div>
             </div>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-[#e3979d]/20 dark:border-white/10 relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-orange-50 dark:bg-orange-500/20 text-orange-500 rounded-xl"><Flame size={20} /></div>
                <div className="text-[#4a2c2a]/40 dark:text-gray-500 text-xs font-bold uppercase tracking-wider">Daily Consistency</div>
             </div>
             <p className="text-[#4a2c2a]/60 dark:text-gray-400 font-semibold text-sm mb-1">Current Streak</p>
             <div className="flex items-baseline gap-2">
               <h2 className="text-4xl font-extrabold text-[#4a2c2a] dark:text-gray-100">18</h2>
               <span className="text-3xl">🔥</span>
             </div>
             <p className="text-[#4a2c2a]/50 dark:text-gray-500 text-xs font-medium mt-2">Personal best: 24 days</p>
          </div>
        </div>

        {/* Middle Section: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-[#e3979d]/20 dark:border-white/10 lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-[#4a2c2a] dark:text-gray-100">Study Progression</h3>
              <div className="flex bg-[#f3e8e4] dark:bg-white/10 rounded-full p-1">
                <button className="bg-[#e3979d] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">Daily</button>
                <button className="text-[#4a2c2a]/60 dark:text-gray-400 hover:text-[#4a2c2a] dark:text-gray-100 text-xs font-bold px-4 py-1.5 rounded-full transition-colors">Weekly</button>
              </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 h-48 mt-auto pt-4 border-b border-[#f3e8e4] dark:border-white/10">
               {/* Mon-Sun bars */}
               <div className="w-full flex flex-col items-center gap-3">
                 <div className="w-full bg-[#fce4ec] rounded-t-md" style={{ height: '30%' }}></div>
                 <span className="text-[10px] font-bold text-[#4a2c2a]/50 dark:text-gray-500 uppercase">Mon</span>
               </div>
               <div className="w-full flex flex-col items-center gap-3">
                 <div className="w-full bg-[#fce4ec] rounded-t-md" style={{ height: '50%' }}></div>
                 <span className="text-[10px] font-bold text-[#4a2c2a]/50 dark:text-gray-500 uppercase">Tue</span>
               </div>
               <div className="w-full flex flex-col items-center gap-3">
                 <div className="w-full bg-[#fce4ec] rounded-t-md" style={{ height: '40%' }}></div>
                 <span className="text-[10px] font-bold text-[#4a2c2a]/50 dark:text-gray-500 uppercase">Wed</span>
               </div>
               <div className="w-full flex flex-col items-center gap-3">
                 <div className="w-full bg-[#fce4ec] rounded-t-md" style={{ height: '70%' }}></div>
                 <span className="text-[10px] font-bold text-[#4a2c2a]/50 dark:text-gray-500 uppercase">Thu</span>
               </div>
               <div className="w-full flex flex-col items-center gap-3">
                 <div className="w-full bg-[#fce4ec] rounded-t-md" style={{ height: '80%' }}></div>
                 <span className="text-[10px] font-bold text-[#4a2c2a]/50 dark:text-gray-500 uppercase">Fri</span>
               </div>
               <div className="w-full flex flex-col items-center gap-3">
                 <div className="w-full bg-[#fce4ec] rounded-t-md" style={{ height: '45%' }}></div>
                 <span className="text-[10px] font-bold text-[#4a2c2a]/50 dark:text-gray-500 uppercase">Sat</span>
               </div>
               <div className="w-full flex flex-col items-center gap-3">
                 <div className="w-full bg-[#e3979d] rounded-t-md" style={{ height: '95%' }}></div>
                 <span className="text-[10px] font-bold text-[#4a2c2a] dark:text-gray-100 uppercase">Sun</span>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-[#e3979d]/20 dark:border-white/10 flex flex-col">
            <h3 className="text-xl font-bold text-[#4a2c2a] dark:text-gray-100 mb-8">Performance by Subject</h3>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex justify-between text-sm font-semibold text-[#4a2c2a] dark:text-gray-100 mb-2">
                  <span>Medical Anatomy</span>
                  <span>92%</span>
                </div>
                <div className="w-full h-2 bg-[#f3e8e4] dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4a2c2a] rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold text-[#4a2c2a] dark:text-gray-100 mb-2">
                  <span>Spanish Vocabulary</span>
                  <span>78%</span>
                </div>
                <div className="w-full h-2 bg-[#fce4ec] rounded-full overflow-hidden">
                  <div className="h-full bg-[#e3979d] rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold text-[#4a2c2a] dark:text-gray-100 mb-2">
                  <span>Software Patterns</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-2 bg-[#eef6f1] dark:bg-[#4a9d6e]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#95c9a4] rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            <button className="w-full py-3 mt-6 border border-[#e3979d]/30 dark:border-white/10 text-[#4a2c2a] dark:text-gray-100 text-sm font-bold rounded-full hover:bg-[#fce4ec]/30 transition-colors">
              View All Subjects
            </button>
          </div>

        </div>

        {/* Heatmap Section */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-[#e3979d]/20 dark:border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#4a2c2a] dark:text-gray-100">Daily Activity</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#4a2c2a]/40 dark:text-gray-500 uppercase">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#f3e8e4] dark:bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-[#fce4ec]"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-[#f6cdd5]"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-[#e3979d]"></div>
              </div>
              <span>More</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col justify-between text-[10px] font-bold text-[#4a2c2a]/40 dark:text-gray-500 uppercase py-2">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex-1 grid grid-rows-7 grid-flow-col gap-1.5 overflow-x-auto pb-2">
              {heatmapData.map((val, i) => {
                let bgColor = 'bg-[#f3e8e4] dark:bg-white/10';
                if (val === 1) bgColor = 'bg-[#fce4ec]';
                if (val === 2) bgColor = 'bg-[#f6cdd5]';
                if (val === 3) bgColor = 'bg-[#e3979d]';
                return (
                  <div key={i} className={`w-3.5 h-3.5 rounded-sm ${bgColor} hover:ring-1 hover:ring-[#4a2c2a] transition-all cursor-pointer`}></div>
                )
              })}
            </div>
          </div>
          <p className="text-[10px] font-medium text-[#4a2c2a]/50 dark:text-gray-500 mt-4 italic">Activity heatmap showing study frequency over the last 6 months.</p>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-[#fcf5f6] dark:bg-[#181818] rounded-3xl p-8 border-2 border-dashed border-[#e3979d]/50 dark:border-white/20 relative overflow-hidden">
            <div className="absolute top-4 right-4 p-2 bg-[#e3979d]/20 text-[#e3979d] rounded-lg">
              <Sparkles size={20} />
            </div>
            <h3 className="text-xl font-bold text-[#4a2c2a] dark:text-gray-100 mb-4">AI Study Buddy Insight</h3>
            <p className="text-[#4a2c2a]/80 dark:text-gray-300 text-sm font-medium leading-relaxed mb-8 pr-8">
              "You tend to struggle with 'Recursive Algorithms' after 9 PM. We recommend moving this deck to your morning sessions for 25% better retention."
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <button className="bg-[#800020] hover:bg-[#800020]/90 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors">
                Apply Schedule
              </button>
              <button className="text-[#4a2c2a] dark:text-gray-100 text-sm font-bold hover:underline">
                Learn More
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-8 shadow-sm border border-[#e3979d]/20 dark:border-white/10 flex flex-col justify-between group cursor-pointer hover:shadow-md hover:border-[#e3979d] transition-all">
             <div className="mb-4">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Timer size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#4a2c2a] dark:text-gray-100 mb-2">Rapid Round Challenge</h3>
                <p className="text-[#4a2c2a]/70 dark:text-gray-400 text-sm font-medium">Test your reflexes. Answer as many flashcards as you can in 60 seconds.</p>
             </div>
             <button onClick={() => navigate('/rapid-round')} className="bg-[#e3979d] text-white text-sm font-bold w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#d6858b] transition-colors shadow-sm">
                Start Challenge
             </button>
          </div>

          <div className="bg-[#f3e8e4]/50 dark:bg-white/5 rounded-3xl p-8 border border-[#f3e8e4] dark:border-white/10 relative overflow-hidden">
            <h3 className="text-xl font-bold text-[#4a2c2a] dark:text-gray-100 mb-6">Next Up for Review</h3>
            <div className="space-y-3">
              
              <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="text-[#e3979d]"><Brain size={20} /></div>
                  <div>
                    <h4 className="text-[#4a2c2a] dark:text-gray-100 font-bold text-sm">Cognitive Biases</h4>
                    <p className="text-[#4a2c2a]/50 dark:text-gray-500 text-xs font-semibold mt-0.5">42 cards • <span className="text-[#800020]">Overdue</span></p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#4a2c2a]/30 dark:text-gray-600" />
              </div>
              
              <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl flex justify-between items-center cursor-pointer hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="text-[#95c9a4]"><Languages size={20} /></div>
                  <div>
                    <h4 className="text-[#4a2c2a] dark:text-gray-100 font-bold text-sm">Advanced Kanji</h4>
                    <p className="text-[#4a2c2a]/50 dark:text-gray-500 text-xs font-semibold mt-0.5">12 cards • Due Today</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#4a2c2a]/30 dark:text-gray-600" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
