import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, BrainCircuit, Mic, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import SplitText from '../components/SplitText';

const Landing = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-32 lg:pb-24 flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Column: Text & Buttons */}
            <div className="lg:w-1/2 flex flex-col items-start text-left z-10">
              <h1 className="text-6xl lg:text-[5.5rem] font-extrabold leading-[1.1] mb-6 tracking-tight text-white drop-shadow-sm flex flex-col items-start">
                <SplitText
                  text="The ultimate"
                  delay={40}
                  duration={1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, x: -50 }}
                  to={{ opacity: 1, x: 0 }}
                  textAlign="left"
                  tag="span"
                />
                <SplitText
                  text="study weapon."
                  delay={40}
                  duration={1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, x: -50 }}
                  to={{ opacity: 1, x: 0 }}
                  textAlign="left"
                  tag="span"
                />
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
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0a0f18] relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Supercharge your learning</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">FlashLearn combines the power of artificial intelligence with proven cognitive science to help you memorize anything faster.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-gray-800">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                <BrainCircuit size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Generation</h3>
              <p className="text-gray-400">Paste any text, notes, or article and our AI will automatically extract the key concepts into Q&A flashcards instantly.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-gray-800">
              <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-6 text-secondary">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Spaced Repetition</h3>
              <p className="text-gray-400">Our algorithm tracks your mastery and schedules reviews right before you forget, maximizing your memory retention.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-gray-800">
              <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-6 text-green-500">
                <Mic size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Voice Dictation</h3>
              <p className="text-gray-400">Study hands-free using Text-to-Speech, or create new flashcards quickly by just speaking into your microphone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-10">How FlashLearn works</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-background font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Create or Generate</h4>
                    <p className="text-gray-400">Manually type your flashcards, use voice dictation, or let the AI do the heavy lifting from your notes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-background font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Study Smart</h4>
                    <p className="text-gray-400">Flip cards and rate your confidence (Easy, Medium, Hard). The app learns what you know and what you don't.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-background font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Track Progress</h4>
                    <p className="text-gray-400">Watch your mastery score grow over time through your personalized analytics dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="glass-panel p-8 rounded-2xl border border-gray-800 text-center">
                <BarChart3 size={120} className="mx-auto text-gray-700 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{user ? "Ready to study?" : "Start learning today"}</h3>
                {user ? (
                  <Link to="/dashboard" className="inline-block bg-primary text-background font-bold px-8 py-4 rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="inline-block bg-primary text-background font-bold px-8 py-4 rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
                    Sign Up Free
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0a0f18] py-16 text-center text-gray-400">
        <div className="flex justify-center items-center gap-3 mb-8 text-white font-bold text-3xl">
          <BrainCircuit className="text-primary" size={36} /> 
          <SplitText
            text="FlashLearn"
            delay={80}
            duration={1.5}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, scale: 0.5, rotation: 15 }}
            to={{ opacity: 1, scale: 1, rotation: 0 }}
            textAlign="center"
            tag="span"
          />
        </div>
        <div className="max-w-2xl mx-auto mb-10">
          <SplitText
            text="Master any subject. Conquer any exam. Unlock your brain's true potential with AI-powered spaced repetition."
            className="text-xl leading-relaxed text-gray-300"
            delay={30}
            duration={0.8}
            ease="power2.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            tag="p"
          />
        </div>
        <div className="flex justify-center gap-8 mb-10 text-sm font-semibold tracking-wider uppercase text-gray-500">
          <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link to="#" className="hover:text-primary transition-colors">FAQ</Link>
        </div>
        <p className="text-sm border-t border-gray-800 pt-8 max-w-4xl mx-auto">&copy; {new Date().getFullYear()} FlashLearn AI Education Platform. All rights reserved. Built for students, professionals, and lifelong learners globally.</p>
      </footer>
    </div>
  );
};

export default Landing;
