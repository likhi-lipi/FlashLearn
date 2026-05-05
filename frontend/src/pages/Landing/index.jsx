import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Sparkles, Zap, Mic, Globe, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Landing = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ users: '50,000+', decks: '100,000+' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/public/stats');
        setStats({
          users: res.data.users.toLocaleString() + '+',
          decks: res.data.decks.toLocaleString() + '+'
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-background min-h-screen text-dark selection:bg-primary selection:text-white pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Content */}
          <div className="lg:w-1/2 flex flex-col items-start">
            <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight text-dark">
              The ultimate study<br />
              weapon.
            </h1>
            <p className="text-xl text-gray-500 mb-12 max-w-lg leading-relaxed font-medium">
              Use AI to create flashcards and learn faster. Experience Sophisticated Serenity in your daily learning routine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Link 
                to={user ? "/dashboard" : "/login"} 
                className="bg-primary hover:opacity-95 transition-all text-white font-bold text-lg px-12 py-5 rounded-full shadow-sm"
              >
                Find Flashcards
              </Link>
              <Link 
                to={user ? "/generate" : "/login"} 
                className="bg-secondary hover:bg-gray-200/50 transition-all text-dark font-bold text-lg px-12 py-5 rounded-full shadow-sm border border-white/40"
              >
                Make Flashcards
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-3 text-muted font-bold tracking-tight uppercase text-xs">
              <Sparkles size={18} className="text-primary" />
              <span>AI-powered insights included</span>
            </div>
          </div>

          {/* Right Side: Mockup Illustration */}
          <div className="lg:w-1/2 relative flex justify-center w-full">
             <div className="relative z-10 w-full max-w-[580px] aspect-[1.3] bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(233,170,182,0.3)] border-[14px] border-white overflow-hidden">
                <div className="w-full h-full bg-[#FAF5F6] p-8 flex flex-col gap-6">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-md bg-primary"></div>
                         </div>
                         <div className="h-5 w-32 bg-gray-200/60 rounded-full"></div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-5">
                      <div className="h-40 rounded-[2rem] bg-white shadow-sm border border-gray-50 p-6">
                         <div className="w-10 h-10 rounded-full bg-blue-50/50 mb-6 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-blue-300"></div>
                         </div>
                         <div className="h-3 w-3/4 bg-gray-100 rounded-full mb-3"></div>
                         <div className="h-3 w-1/2 bg-gray-50 rounded-full"></div>
                      </div>
                      <div className="h-40 rounded-[2rem] bg-white shadow-sm border border-gray-50 p-6">
                         <div className="w-10 h-10 rounded-full bg-pink-50/50 mb-6 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-pink-300"></div>
                         </div>
                         <div className="h-3 w-3/4 bg-gray-100 rounded-full mb-3"></div>
                         <div className="h-3 w-1/2 bg-gray-50 rounded-full"></div>
                      </div>
                   </div>
                   <div className="flex-1 rounded-[2rem] bg-white shadow-sm border border-gray-50 p-8">
                      <div className="h-5 w-40 bg-gray-100 rounded-full mb-8"></div>
                      <div className="space-y-6">
                         {[1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                  <div className="w-5 h-5 rounded-full border-[3px] border-primary/20"></div>
                                  <div className="h-3 w-48 bg-gray-50 rounded-full"></div>
                               </div>
                               <div className="h-3 w-16 bg-gray-50 rounded-full"></div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
             {/* Decorative Background Blur */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-primary/10 rounded-full blur-[140px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Spaced Repetition Card */}
          <div className="md:col-span-2 bg-white rounded-[3rem] p-16 shadow-sm border border-gray-100/50 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-secondary flex items-center justify-center mb-10">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="text-4xl font-bold mb-6">Spaced Repetition AI</h3>
              <p className="text-xl text-gray-500 max-w-md leading-relaxed font-medium">
                Our intelligent algorithm tracks your memory decay and schedules reviews exactly when you need them. No more cramming, just permanent mastery.
              </p>
            </div>
            {/* Abstract Graphic */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[#FAF5F6] flex items-end justify-center p-12 opacity-40 group-hover:opacity-80 transition-opacity">
               <div className="flex items-end gap-4 h-48 w-full max-w-[280px]">
                  {[40, 80, 60, 100, 50, 90, 70].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-primary/25 rounded-t-xl transition-all duration-500 group-hover:bg-primary/40"></div>
                  ))}
               </div>
            </div>
          </div>

          {/* Instant Creation Card */}
          <div className="bg-[#FFF5F6] rounded-[3rem] p-12 flex flex-col justify-between border border-pink-100/30">
             <div>
                <Zap className="text-accent mb-8" size={40} />
                <h3 className="text-3xl font-bold mb-6">Instant Creation</h3>
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  Upload PDFs or paste notes. Our AI extracts the most critical concepts into flashcards in seconds.
                </p>
             </div>
             <div className="mt-12 flex justify-end">
                <ArrowRight className="text-accent/30" size={40} />
             </div>
          </div>

          {/* Voice Study Card */}
          <div className="bg-voice-bg rounded-[3rem] p-12 flex flex-col justify-between border border-green-100/30">
             <div>
                <Mic className="text-voice-icon mb-8" size={40} />
                <h3 className="text-3xl font-bold mb-6">Voice Study</h3>
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  Hands-free learning. Talk to your flashcards while you commute or relax. A truly responsive experience.
                </p>
             </div>
             <div className="mt-12 flex justify-end">
                <ArrowRight className="text-voice-icon/30" size={40} />
             </div>
          </div>

          {/* Global Community Card */}
          <div className="md:col-span-2 bg-[#F6F6F9] rounded-[3rem] p-16 flex flex-col lg:flex-row items-center gap-16 border border-gray-100/30">
             <div className="lg:w-1/2">
                <h3 className="text-4xl font-bold mb-6">Global Community</h3>
                <p className="text-xl text-gray-500 leading-relaxed font-medium">
                  Access millions of pre-made decks created by experts and students worldwide. Never start from scratch again.
                </p>
             </div>
             <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                {['Medicine', 'Law', 'Coding', 'History'].map(tag => (
                   <div key={tag} className="bg-white py-6 rounded-2xl text-center font-bold text-gray-700 shadow-sm border border-gray-50">
                      {tag}
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 max-w-7xl">
         <div className="bg-dark rounded-[4rem] p-24 text-center relative overflow-hidden shadow-2xl">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -mr-64 -mt-64"></div>
            
            <div className="relative z-10">
               <h2 className="text-6xl font-bold text-white mb-8">Start your journey to mastery.</h2>
               <p className="text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-medium">
                 Join over {stats.users} learners using FlashLearn to crush their exams and learn with serenity.
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link 
                    to={user ? "/dashboard" : "/login"} 
                    className="bg-accent hover:opacity-90 transition-all text-white font-bold text-xl px-16 py-6 rounded-full shadow-xl"
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="bg-transparent hover:bg-white/5 transition-all text-white font-bold text-xl px-16 py-6 rounded-full border-2 border-white/10"
                  >
                    View Pricing
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-16 max-w-7xl border-t border-gray-100 mt-20 flex flex-col md:flex-row justify-between items-center gap-12">
         <div className="flex flex-col gap-4">
            <span className="text-3xl font-bold text-accent tracking-tight">FlashLearn</span>
            <span className="text-base text-muted font-medium">© 2024 FlashLearn. Sophisticated Serenity in Learning.</span>
         </div>
         <div className="flex flex-wrap justify-center gap-10 text-base font-bold text-gray-500">
            <Link to="/privacy" className="hover:text-dark transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-dark transition-colors">Terms of Service</Link>
            <Link to="/help" className="hover:text-dark transition-colors">Help Center</Link>
            <Link to="/contact" className="hover:text-dark transition-colors">Contact Us</Link>
         </div>
      </footer>
    </div>
  );
};

export default Landing;
