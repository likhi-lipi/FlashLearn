import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#fdf6f4] py-6 px-10 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-16">
          {/* Logo */}
          <Link to="/" className="text-[#4a2c2a] font-bold text-3xl tracking-tight">
            FlashLearn
          </Link>
          
          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-10 text-[15px] font-semibold text-[#4a2c2a]/80">
            <Link to="/browse" className="hover:text-[#4a2c2a] border-b-2 border-transparent hover:border-[#e3979d] transition-all pb-1">Find Flashcards</Link>
            <Link to="/generate" className="hover:text-[#4a2c2a] border-b-2 border-transparent hover:border-[#e3979d] transition-all pb-1">Make Flashcards</Link>
            <Link to="/dashboard" className="hover:text-[#4a2c2a] border-b-2 border-transparent hover:border-[#e3979d] transition-all pb-1">Dashboard</Link>
            <Link to="/generate" className="hover:text-[#4a2c2a] border-b-2 border-transparent hover:border-[#e3979d] transition-all pb-1">AI Generator</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-[15px] font-semibold text-[#4a2c2a]">
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/profile" className="hover:opacity-70 transition-opacity">Profile</Link>
              <button 
                onClick={handleLogout}
                className="bg-[#4a2c2a] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/login" className="hover:opacity-70 transition-opacity">Login</Link>
              <Link to="/login" className="bg-[#4a2c2a] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all shadow-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
