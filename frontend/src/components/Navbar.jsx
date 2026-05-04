import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Home, Wand2, Compass, ChevronDown } from 'lucide-react';
import Folder from './Folder';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const NavItem = ({ name, icon, items, onClick }) => {
    const isActive = activeDropdown === name;
    
    return (
      <div className="relative group">
        <div 
          className="flex items-center cursor-pointer hover:text-gray-300 transition-colors py-2"
          onClick={() => {
            if (onClick) onClick();
            else toggleDropdown(name);
          }}
        >
          {icon && <span className="mr-1">{icon}</span>}
          <span>{name}</span>
          {items && (
            <ChevronDown 
              size={14} 
              className={`ml-1 opacity-70 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} 
            />
          )}
        </div>
        
        {items && isActive && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-[#1e293b] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-gray-700 overflow-hidden z-50">
            {items.map((item, idx) => (
              <div 
                key={idx}
                className="px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors"
                onClick={() => {
                  setActiveDropdown(null);
                  if (item.action) item.action();
                  else if (item.link) navigate(item.link);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-background text-white py-5 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 font-bold text-2xl tracking-tight" onClick={() => setActiveDropdown(null)}>
            <div className="text-white relative w-12 h-10 flex items-center justify-center -ml-2">
              <Folder size={0.35} color="#2EB5F0" />
            </div>
            <span>FlashLearn</span>
          </Link>
          
          {/* Public Links - Always show */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-semibold" ref={dropdownRef}>
            <NavItem 
              name="Find Flashcards" 
              icon={<Compass size={16} />}
              items={[
                { label: "Browse All Subjects", link: "/browse" },
                { label: "Most Popular", link: "/popular" },
                { label: "Recent Decks", link: "/recent" }
              ]}
            />
            <Link to="/generate" className="hover:text-gray-300 transition-colors py-2">Make Flashcards</Link>
            <NavItem 
              name="How It Works" 
              onClick={() => scrollToSection('how-it-works')}
            />
            <NavItem 
              name="Educators" 
              items={[
                { label: "For Teachers", link: "/login" },
                { label: "For Schools", link: "/login" },
                { label: "Success Stories", link: "/login" }
              ]}
            />
            <NavItem 
              name="Businesses" 
              items={[
                { label: "Corporate Training", link: "/login" },
                { label: "Employee Onboarding", link: "/login" },
                { label: "Pricing", link: "/login" }
              ]}
            />
            <NavItem 
              name="Academy" 
              items={[
                { label: "Study Tips & Tricks", link: "/login" },
                { label: "FlashLearn Blog", link: "/login" },
                { label: "Webinars", link: "/login" }
              ]}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4 font-semibold text-sm bg-slate-800/50 px-5 py-2.5 rounded-full border border-gray-700 shadow-sm backdrop-blur-sm">
              <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center space-x-1.5 transition-colors">
                <Home size={16} />
                <span>Dashboard</span>
              </Link>
              <div className="w-px h-4 bg-gray-600"></div>
              <Link to="/generate" className="text-gray-300 hover:text-white flex items-center space-x-1.5 transition-colors">
                <Wand2 size={16} />
                <span>AI Gen</span>
              </Link>
              <div className="w-px h-4 bg-gray-600"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1.5 text-gray-300 hover:text-error transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6 font-semibold text-sm">
              <Link to="/login" className="text-white hover:text-gray-300 transition-colors py-2">Log in</Link>
              <Link to="/login" className="bg-white text-background hover:bg-gray-200 transition-colors py-2 px-5 rounded-md shadow-sm">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
