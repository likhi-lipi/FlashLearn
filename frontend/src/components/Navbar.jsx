import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-md text-[#4A4A4A] py-6 px-6 fixed top-0 left-0 right-0 z-50 shadow-sm shadow-[#800020]/5 border-b border-[#e3979d]/20">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 font-bold text-[1.75rem] tracking-tight text-primary">
          <span>FlashLearn</span>
        </Link>
        
        {/* Links */}
        <div className="hidden lg:flex items-center space-x-10 text-[15px] font-bold text-[#4a2c2a]">
          <Link to="/browse" className={`transition-colors relative group py-1 ${isActive('/browse') ? 'text-primary' : 'hover:text-primary'}`}>
            Find Flashcards
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all ${isActive('/browse') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link to="/make" className={`transition-colors relative group py-1 ${isActive('/make') ? 'text-primary' : 'hover:text-primary'}`}>
            Make Flashcards
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all ${isActive('/make') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link to="/dashboard" className={`transition-colors relative group py-1 ${isActive('/dashboard') ? 'text-primary' : 'hover:text-primary'}`}>
            Dashboard
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all ${isActive('/dashboard') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link to="/generate" className={`transition-colors relative group py-1 ${isActive('/generate') ? 'text-primary' : 'hover:text-primary'}`}>
            AI Generator
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all ${isActive('/generate') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </div>
        
        {/* Auth Actions */}
        <div className="flex items-center space-x-8 font-bold text-[15px]">
          {user ? (
            <div className="flex items-center space-x-8">
              <Link to="/profile" className="flex items-center space-x-2 text-[#4a2c2a] hover:text-primary transition-colors">
                <span>Profile</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-8">
              <Link to="/login" className="text-[#4a2c2a] hover:text-primary transition-colors">Log in</Link>
              <Link 
                to="/login" 
                className="bg-primary text-white px-7 py-3 rounded-full hover:opacity-95 transition-all shadow-md shadow-primary/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
