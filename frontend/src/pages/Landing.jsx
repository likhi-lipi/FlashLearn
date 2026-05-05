import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Mic, Globe2, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import SplitText from '../components/SplitText';

const Landing = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f4] text-[#4a2c2a] font-['Outfit']">
      {/* Hero Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Left Column */}
            <div className="lg:w-1/2 flex flex-col items-start z-10">
              <h1 className="text-6xl lg:text-[5.5rem] font-bold leading-[1] mb-8 tracking-tight text-[#4a2c2a]">
                <div className="mb-2">Stop memorizing.</div>
                <div>Start mastering.</div>
              </h1>
              <p className="text-xl text-[#4a2c2a]/70 mb-10 leading-relaxed max-w-md">
                FlashLearn blends cognitive science with AI to build a study routine that actually sticks. Perfect for busy students who value their time as much as their grades.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 mb-12">
                <Link 
                  to="/browse" 
                  className="bg-[#e3979d] hover:bg-[#d8868c] transition-all text-white font-bold text-xl px-12 py-5 rounded-[2.5rem] shadow-sm flex items-center justify-center"
                >
                  Explore Decks
                </Link>
                <Link 
                  to="/generate" 
                  className="bg-[#f3e8e4] hover:bg-[#ebdcd6] transition-all text-[#4a2c2a] font-bold text-xl px-12 py-5 rounded-[2.5rem] shadow-sm flex items-center justify-center border border-[#e8dcd8]"
                >
                  Build Your Own
                </Link>
              </div>

              <div className="flex items-center gap-2 text-[#4a2c2a]/60 font-semibold text-sm">
                <Sparkles size={18} className="text-[#e3979d]" />
                Trusted by 50,000+ high-achievers
              </div>
            </div>

            {/* Right Column: App Mockup */}
            <div className="lg:w-1/2 relative flex justify-center w-full">
              <div className="relative z-10 w-full max-w-[550px] aspect-[4/3] bg-white rounded-3xl shadow-2xl border-[12px] border-white overflow-hidden">
                {/* Mockup Dashboard Content */}
                <div className="w-full h-full bg-[#fcf9f8] flex flex-col p-6">
                   <div className="flex justify-between items-center mb-8">
                     <div className="w-24 h-4 bg-[#f3e8e4] rounded-full"></div>
                     <div className="flex gap-2">
                       <div className="w-4 h-4 rounded-full bg-[#e3979d]"></div>
                       <div className="w-4 h-4 rounded-full bg-[#4a2c2a]"></div>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="h-32 bg-white rounded-2xl shadow-sm border border-[#f3e8e4] p-4">
                       <div className="w-1/2 h-3 bg-[#f3e8e4] rounded-full mb-4"></div>
                       <div className="h-16 bg-[#fcf9f8] rounded-xl"></div>
                     </div>
                     <div className="h-32 bg-white rounded-2xl shadow-sm border border-[#f3e8e4] p-4">
                       <div className="w-1/2 h-3 bg-[#f3e8e4] rounded-full mb-4"></div>
                       <div className="h-16 bg-[#fcf9f8] rounded-xl flex items-end gap-1 p-2">
                         <div className="w-1/4 h-1/2 bg-[#e3979d] rounded-t-sm"></div>
                         <div className="w-1/4 h-3/4 bg-[#e3979d] rounded-t-sm"></div>
                         <div className="w-1/4 h-full bg-[#e3979d] rounded-t-sm"></div>
                         <div className="w-1/4 h-2/3 bg-[#e3979d] rounded-t-sm"></div>
                       </div>
                     </div>
                   </div>
                   <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#f3e8e4] p-4">
                      <div className="w-1/3 h-3 bg-[#f3e8e4] rounded-full mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-2 bg-[#fcf9f8] w-full rounded-full"></div>
                        <div className="h-2 bg-[#fcf9f8] w-4/5 rounded-full"></div>
                        <div className="h-2 bg-[#fcf9f8] w-full rounded-full"></div>
                      </div>
                   </div>
                </div>
              </div>
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#f9e8e6] rounded-full blur-[100px] opacity-60 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Spaced Repetition Card - Large */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-12 shadow-sm border border-[#f3e8e4] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f9e8e6] flex items-center justify-center text-[#e3979d]">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-3xl font-bold">Spaced Repetition AI</h3>
                </div>
                <p className="text-xl text-[#4a2c2a]/70 max-w-2xl leading-relaxed">
                  Our intelligent algorithm tracks your memory decay and schedules reviews exactly when you need them. <strong>No more cramming</strong>, just permanent mastery.
                </p>
              </div>
              <div className="mt-12 relative h-40 w-full overflow-hidden">
                {/* Wave/Graph Illustration */}
                <svg viewBox="0 0 800 200" className="absolute bottom-0 w-full h-full">
                  <path d="M0,150 C100,140 200,180 300,100 C400,20 500,150 600,80 C700,10 800,100 800,100 L800,200 L0,200 Z" fill="#f9e8e6" opacity="0.5" />
                  <path d="M0,170 C100,160 200,190 300,120 C400,40 500,170 600,100 C700,30 800,120 800,120 L800,200 L0,200 Z" fill="#e3979d" opacity="0.3" />
                </svg>
              </div>
            </div>

            {/* Instant Creation Card */}
            <div className="bg-[#fcf9f8] rounded-[2.5rem] p-12 shadow-sm border border-[#f3e8e4] flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#fff] flex items-center justify-center text-[#e3979d] mb-8 shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-6">Instant Creation</h3>
              <p className="text-xl text-[#4a2c2a]/70 leading-relaxed">
                Upload PDFs or paste notes. Our AI extracts the most critical concepts into flashcards in seconds.
              </p>
            </div>

            {/* Voice Study Card */}
            <div className="bg-[#eef6f1] rounded-[2.5rem] p-12 shadow-sm border border-[#e4ede7] flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#4a9d6e] mb-8 shadow-sm">
                <Mic size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-6">Voice Study</h3>
              <p className="text-xl text-[#4a2c2a]/70 leading-relaxed">
                Hands-free learning. Talk to your flashcards while you commute or relax. A truly responsive experience.
              </p>
            </div>

            {/* Global Community Card - Large */}
            <div className="lg:col-span-2 bg-[#f9e8e6] rounded-[2.5rem] p-12 shadow-sm border border-[#ebdcd6] flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold mb-6">Global Community</h3>
                <p className="text-xl text-[#4a2c2a]/70 leading-relaxed">
                  Access millions of pre-made decks created by experts and students worldwide. Never start from scratch again.
                </p>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                {['Medicine', 'Law', 'Coding', 'History'].map(tag => (
                  <div key={tag} className="bg-white rounded-xl py-4 px-6 text-center font-bold text-[#4a2c2a]/80 shadow-sm border border-transparent hover:border-[#e3979d] transition-all cursor-pointer">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-10 max-w-7xl">
          <div className="bg-[#1e1b1b] rounded-[3rem] p-20 text-center text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3979d]/20 blur-[80px] rounded-full"></div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">Start your journey to mastery.</h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join over 50,000 learners using FlashLearn to crush their exams and learn with serenity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link 
                to="/login" 
                className="bg-[#7c5255] hover:bg-[#6b474a] transition-all text-white font-bold text-xl px-12 py-5 rounded-[2.5rem] shadow-lg"
              >
                Get Started Free
              </Link>
              <Link 
                to="/login" 
                className="bg-transparent hover:bg-white/5 transition-all text-white font-bold text-xl px-12 py-5 rounded-[2.5rem] border border-white/20"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#f3e8e4]">
        <div className="container mx-auto px-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div>
              <Link to="/" className="text-[#4a2c2a] font-bold text-3xl tracking-tight mb-4 block">
                FlashLearn
              </Link>
              <p className="text-[#4a2c2a]/50 text-sm">
                &copy; {new Date().getFullYear()} FlashLearn. Sophisticated Serenity in Learning.
              </p>
            </div>
            
            <div className="flex gap-10 text-[15px] font-semibold text-[#4a2c2a]/60">
              <Link to="#" className="hover:text-[#4a2c2a]">Privacy Policy</Link>
              <Link to="#" className="hover:text-[#4a2c2a]">Terms of Service</Link>
              <Link to="#" className="hover:text-[#4a2c2a]">Help Center</Link>
              <Link to="#" className="hover:text-[#4a2c2a]">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
