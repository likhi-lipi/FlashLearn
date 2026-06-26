import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background py-20 px-6 border-t border-gray-100">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-bold text-accent">FlashLearn</h2>
          <p className="text-muted font-medium text-sm text-center md:text-left max-w-xs leading-relaxed">
            Empowering curious minds through sophisticated, AI-driven spaced repetition.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-10 text-sm font-bold text-muted">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Help Center</a>
          <a href="#" className="hover:text-accent transition-colors">Contact Us</a>
        </div>
        
        <div className="text-xs font-bold text-muted/40 uppercase tracking-widest">
          © 2024 FlashLearn. Sophisticated Serenity in Learning.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
