import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Home, Wand2, Compass, ChevronDown } from 'lucide-react';
import Folder from './Folder';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-background text-white py-5 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 font-bold text-2xl tracking-tight">
            <div className="text-white relative w-12 h-10 flex items-center justify-center -ml-2">
              <Folder size={0.35} color="#2EB5F0" />
            </div>
            <span>FlashLearn</span>
          </Link>
          
          {/* Public Links (only show if not logged in, or always show? Let's show only if not logged in for simplicity, or show them if requested. The reference has them.) */}
          {!user && (
            <div className="hidden lg:flex items-center space-x-6 text-sm font-semibold">
              <Link to="/generate" className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
                <Compass size={16} />
                <span>Find Flashcards</span>
                <ChevronDown size={14} className="ml-1 opacity-70" />
              </Link>
              <Link to="/generate" className="hover:text-gray-300 transition-colors">Make Flashcards</Link>
              <div className="flex items-center cursor-pointer hover:text-gray-300 transition-colors">
                <span>How It Works</span>
                <ChevronDown size={14} className="ml-1 opacity-70" />
              </div>
              <div className="flex items-center cursor-pointer hover:text-gray-300 transition-colors">
                <span>Educators</span>
                <ChevronDown size={14} className="ml-1 opacity-70" />
              </div>
              <div className="flex items-center cursor-pointer hover:text-gray-300 transition-colors">
                <span>Businesses</span>
                <ChevronDown size={14} className="ml-1 opacity-70" />
              </div>
              <div className="flex items-center cursor-pointer hover:text-gray-300 transition-colors">
                <span>Academy</span>
                <ChevronDown size={14} className="ml-1 opacity-70" />
              </div>
            </div>
          )}
        </div>
        
        {user ? (
          <div className="flex items-center space-x-6 font-semibold text-sm">
            <Link to="/dashboard" className="text-gray-200 hover:text-white flex items-center space-x-1 transition-colors">
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/generate" className="text-gray-200 hover:text-white flex items-center space-x-1 transition-colors">
              <Wand2 size={18} />
              <span>AI Gen</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-300 hover:text-error transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-6 font-semibold text-sm">
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors">Log in</Link>
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
