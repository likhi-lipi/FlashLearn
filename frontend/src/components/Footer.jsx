import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary py-16 px-6 border-t border-primary text-[#fdf6f4]">
      <div className="container mx-auto max-w-7xl flex flex-col gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start gap-4">
            <h2 className="text-2xl font-bold">FlashLearn</h2>
            <p className="text-[#fdf6f4]/80 font-medium text-sm text-center sm:text-left max-w-xs leading-relaxed">
              AI-powered flashcards for smarter learning.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 rounded-full bg-white dark:bg-[#1e1e1e]/10 hover:bg-white dark:bg-[#1e1e1e]/20 transition-all text-[#fdf6f4]">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white dark:bg-[#1e1e1e]/10 hover:bg-white dark:bg-[#1e1e1e]/20 transition-all text-[#fdf6f4]">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white dark:bg-[#1e1e1e]/10 hover:bg-white dark:bg-[#1e1e1e]/20 transition-all text-[#fdf6f4]">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-[#fdf6f4]">Quick Links</h4>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">Dashboard</a>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-3">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-[#fdf6f4]">Features</h4>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">Find Flashcards</a>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">Make Flashcards</a>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">AI Generator</a>
          </div>
          
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-[#fdf6f4]">Support</h4>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">Help Center</a>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="text-sm font-medium text-[#fdf6f4]/80 hover:text-white transition-colors">Terms of Service</a>
          </div>
          
        </div>
        
        <div className="border-t border-[#fdf6f4]/20 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-[#fdf6f4]/60 uppercase tracking-widest text-center md:text-left">
          <div>© 2026 FlashLearn</div>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            Made with ❤️ using 
            <span className="text-[#fdf6f4]">React</span> • 
            <span className="text-[#fdf6f4]">Express</span> • 
            <span className="text-[#fdf6f4]">MongoDB</span> • 
            <span className="text-[#fdf6f4]">Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
