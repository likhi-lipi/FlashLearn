import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';

const Login = () => {
  const location = useLocation();
  const isSignupMode = new URLSearchParams(location.search).get('mode') === 'signup';
  
  const [isLogin, setIsLogin] = useState(!isSignupMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize component state when URL search parameters change
  useEffect(() => {
    setIsLogin(!isSignupMode);
    setError('');
  }, [location.search, isSignupMode]);
  
  const { login, register, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();


  // If user is logged in, show options to navigate to dashboard or logout/switch account
  if (user) {
    return (
      <div className="flex justify-center items-center h-[85vh] pt-10 transition-colors font-['Outfit']">
        <div className="bg-white dark:bg-[#1e1e1e] p-12 rounded-[3rem] w-full max-w-lg shadow-[0_40px_80px_-15px_rgba(233,170,182,0.2)] dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col items-center text-center transition-colors">
          <div className="w-20 h-20 rounded-3xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent dark:text-[#e3979d] mb-8 shadow-inner transition-colors">
             <span className="text-3xl font-bold">F</span>
          </div>
          <h2 className="text-4xl font-bold mb-3 text-dark dark:text-gray-100 transition-colors">
            Already Logged In
          </h2>
          <p className="text-muted dark:text-gray-400 font-medium mb-10 transition-colors">
            You are currently signed in as <span className="font-bold text-dark dark:text-white">{user.username}</span> ({user.email}).
          </p>

          <div className="w-full space-y-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-[#523639] dark:bg-[#e3979d] text-white dark:text-[#121212] font-bold py-5 rounded-full flex items-center justify-center space-x-3 shadow-xl dark:shadow-none hover:opacity-95 transition-all transform active:scale-[0.98]"
            >
              <span className="text-lg">Go to Dashboard</span>
            </button>
            <button 
              onClick={logout}
              className="w-full bg-secondary dark:bg-[#2a2a2a] text-dark dark:text-gray-200 font-bold py-5 rounded-full flex items-center justify-center space-x-3 border border-secondary dark:border-white/10 hover:bg-opacity-80 transition-all transform active:scale-[0.98]"
            >
              <span className="text-lg">Logout & Switch Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setUsername('');
  };

  return (
    <div className="flex justify-center items-center h-[85vh] pt-10 transition-colors">
      <div className="bg-white dark:bg-[#1e1e1e] p-12 rounded-[3rem] w-full max-w-lg shadow-[0_40px_80px_-15px_rgba(233,170,182,0.2)] dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col items-center transition-colors">
        <div className="w-20 h-20 rounded-3xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent dark:text-[#e3979d] mb-8 shadow-inner transition-colors">
           <span className="text-3xl font-bold">F</span>
        </div>
        <h2 className="text-4xl font-bold mb-3 text-center text-dark dark:text-gray-100 transition-colors">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-muted dark:text-gray-400 font-medium mb-10 text-center transition-colors">
          {isLogin ? 'Continue your journey to mastery.' : 'Join the global community of learners.'}
        </p>

        {error && (
          <div className="w-full bg-red-50 dark:bg-[#3A1010] text-red-500 p-4 rounded-2xl mb-8 text-center text-sm font-bold border border-red-100 dark:border-[#3A1010] transition-colors">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted dark:text-gray-400 uppercase tracking-widest px-1 transition-colors">Username</label>
              <input 
                type="text" 
                placeholder="How should we call you?"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-secondary/30 dark:bg-[#121212] border-none rounded-2xl px-6 py-4 text-dark dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#e3979d]/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors outline-none"
                required
                disabled={isLoading}
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted dark:text-gray-400 uppercase tracking-widest px-1 transition-colors">Email Address</label>
            <input 
              type="email" 
              placeholder="alex@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary/30 dark:bg-[#121212] border-none rounded-2xl px-6 py-4 text-dark dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#e3979d]/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors outline-none"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted dark:text-gray-400 uppercase tracking-widest px-1 transition-colors">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary/30 dark:bg-[#121212] border-none rounded-2xl px-6 py-4 text-dark dark:text-gray-100 font-medium focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#e3979d]/20 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors outline-none"
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#523639] dark:bg-[#e3979d] text-white dark:text-[#121212] font-bold py-5 rounded-full flex items-center justify-center space-x-3 shadow-xl dark:shadow-none hover:opacity-95 transition-all transform active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader2 size={20} className="animate-spin" /><span className="text-lg">Please wait...</span></>
            ) : isLogin ? (
              <><LogIn size={20} /><span className="text-lg">Log in</span></>
            ) : (
              <><UserPlus size={20} /><span className="text-lg">Join FlashLearn</span></>
            )}
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10 w-full text-center transition-colors">
          <button 
            onClick={switchMode}
            disabled={isLoading}
            className="text-sm font-bold text-muted dark:text-gray-400 hover:text-accent dark:hover:text-[#e3979d] transition-colors disabled:opacity-50"
          >
            {isLogin ? "New to FlashLearn? Sign up for free" : "Already have an account? Log in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
