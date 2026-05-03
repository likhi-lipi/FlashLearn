import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Landing = () => {
  return (
    <div className="bg-background min-h-screen text-white flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column: Text & Buttons */}
          <div className="lg:w-1/2 flex flex-col items-start text-left z-10">
            <h1 className="text-6xl lg:text-[5.5rem] font-extrabold leading-[1.1] mb-6 tracking-tight text-white drop-shadow-sm">
              The ultimate<br />
              study weapon.
            </h1>
            <p className="text-2xl text-gray-200 mb-10 leading-snug">
              Use <strong className="text-white font-bold">AI</strong> to find or make flashcards from any source.<br />
              Learn faster with spaced repetition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                to="/generate" 
                className="bg-primary hover:bg-[#25A1DA] transition-colors text-white font-semibold text-xl px-12 py-5 rounded-md flex items-center justify-center shadow-lg transform hover:-translate-y-0.5"
              >
                Find Flashcards
              </Link>
              <Link 
                to="/generate" 
                className="bg-secondary hover:bg-[#E57A45] transition-colors text-white font-semibold text-xl px-12 py-5 rounded-md flex items-center justify-center shadow-lg transform hover:-translate-y-0.5"
              >
                Make Flashcards
              </Link>
            </div>
          </div>

          {/* Right Column: Stylized Illustration */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0 w-full">
            {/* Base Laptop */}
            <div className="relative w-[500px] h-[320px] bg-[#E8EEF2] rounded-t-xl rounded-b-md shadow-2xl overflow-hidden border-8 border-white">
              {/* Laptop Screen Content */}
              <div className="w-full h-full bg-[#F5F8FA] flex p-4">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-[#334155] rounded-lg h-full flex flex-col p-4 shadow-inner">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <div className="w-4 h-4 rounded-sm bg-primary"></div>
                    </div>
                    <div className="h-4 bg-gray-400 rounded w-20"></div>
                  </div>
                  {/* Sidebar Items */}
                  <div className="flex-1 space-y-3">
                    <div className="h-8 bg-slate-600 rounded-md flex items-center px-2">
                      <Search size={16} className="text-slate-400" />
                    </div>
                    <div className="h-10 bg-primary/20 rounded-md border-l-4 border-primary flex items-center px-3">
                       <div className="w-16 h-3 bg-primary/60 rounded"></div>
                    </div>
                    <div className="h-8 bg-transparent flex items-center px-3">
                       <div className="w-16 h-3 bg-slate-500 rounded"></div>
                    </div>
                    <div className="h-8 bg-transparent flex items-center px-3">
                       <div className="w-24 h-3 bg-slate-500 rounded"></div>
                    </div>
                  </div>
                </div>
                {/* Right Content Area */}
                <div className="w-2/3 pl-6 pt-2">
                  <div className="h-6 bg-primary/20 w-32 rounded mb-6 flex items-center px-2">
                     <span className="text-[10px] text-primary font-bold">Biology: Cells</span>
                  </div>
                  {/* List items */}
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">{i}</div>
                        <div className="flex-1 border-b-2 border-dashed border-gray-300 pb-2 flex justify-between">
                          <div className="w-12 h-2 bg-gray-300 rounded mt-2"></div>
                          <div className="w-16 h-2 bg-gray-300 rounded mt-2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Laptop Base Lip */}
            <div className="absolute -bottom-2 -left-12 w-[600px] h-3 bg-gray-300 rounded-b-xl z-0"></div>

            {/* Overlapping Mobile Phone */}
            <div className="absolute -right-4 -bottom-16 w-[180px] h-[360px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[6px] border-[#2A3444] z-20 overflow-hidden flex flex-col">
              {/* Phone Status Bar */}
              <div className="h-6 bg-white w-full flex justify-center items-center">
                 <div className="w-12 h-4 bg-[#2A3444] rounded-b-xl"></div>
              </div>
              <div className="px-4 py-2 bg-white flex justify-between items-center text-[#2A3444]">
                <span className="font-bold">Q</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i===1?'bg-gray-800':'bg-gray-300'}`}></div>)}
                </div>
              </div>
              {/* Question Card */}
              <div className="mx-3 mt-2 h-24 bg-white border border-gray-200 rounded-lg shadow-sm p-3 text-xs text-gray-700 text-center flex flex-col justify-center">
                Which brain part regulates learning & memory?
              </div>
              {/* Answer Space */}
              <div className="flex-1 bg-[#F8FAFC] mt-4 relative">
                 <div className="absolute -top-3 w-full flex justify-center">
                   <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center font-bold text-gray-700 border border-gray-100">A</div>
                 </div>
                 <div className="mt-8 px-4 flex justify-center">
                   <div className="w-20 h-16 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500">
                     [Brain]
                   </div>
                 </div>
                 {/* Spaced Repetition Buttons */}
                 <div className="absolute bottom-4 left-0 w-full px-2 flex justify-between gap-1">
                   <div className="w-6 h-6 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">1</div>
                   <div className="w-6 h-6 rounded-full bg-orange-400 text-white text-[10px] flex items-center justify-center">2</div>
                   <div className="w-6 h-6 rounded-full bg-yellow-400 text-white text-[10px] flex items-center justify-center">3</div>
                   <div className="w-6 h-6 rounded-full bg-green-400 text-white text-[10px] flex items-center justify-center">4</div>
                   <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">5</div>
                 </div>
              </div>
            </div>

            {/* Overlapping Floating Element 1: Mastery Circle */}
            <div className="absolute -top-8 right-8 w-24 h-24 bg-background border border-gray-700 rounded-full shadow-lg z-30 flex flex-col items-center justify-center">
               <div className="absolute inset-2 border-4 border-transparent border-t-primary border-r-primary border-b-primary rounded-full transform rotate-45"></div>
               <span className="text-white font-bold text-xl">97%</span>
               <span className="text-gray-400 text-[10px]">Mastery</span>
            </div>

            {/* Overlapping Floating Element 2: Bar Chart */}
            <div className="absolute -bottom-10 left-4 w-40 h-28 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-30 p-4">
              <div className="text-primary text-xs font-bold mb-2">Cards studied</div>
              <div className="flex items-end gap-1 h-12 w-full">
                <div className="w-1/6 bg-primary h-[40%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary h-[80%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary h-[60%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary h-[100%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary h-[50%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary h-[90%] rounded-t-sm"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
