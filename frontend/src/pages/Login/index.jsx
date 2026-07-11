import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh] pt-10 transition-colors">
      <div className="bg-white dark:bg-[#1e1e1e] dark:bg-[#1e1e1e] p-12 rounded-[3rem] w-full max-w-lg shadow-[0_40px_80px_-15px_rgba(233,170,182,0.2)] dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col items-center transition-colors">
        <div className="w-20 h-20 rounded-3xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent dark:text-[#e3979d] mb-8 shadow-inner transition-colors">
           <span className="text-3xl font-bold">F</span>
        </div>
        <h2 className="text-4xl font-bold mb-3 text-center text-dark dark:text-gray-100 transition-colors">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-muted dark:text-gray-400 font-medium mb-10 text-center transition-colors">
          {isLogin ? 'Continue your journey to mastery.' : 'Join the global community of learners.'}
        </p>

        {error && <div className="w-full bg-red-50 dark:bg-[#3A1010] text-red-500 p-4 rounded-2xl mb-8 text-center text-sm font-bold border border-red-100 dark:border-[#3A1010] transition-colors">{error}</div>}
        
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
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#523639] dark:bg-[#e3979d] text-white dark:text-[#121212] font-bold py-5 rounded-full flex items-center justify-center space-x-3 shadow-xl dark:shadow-none hover:opacity-95 transition-all transform active:scale-[0.98] mt-4"
          >
            {isLogin ? <><LogIn size={20} /> <span className="text-lg">Log in</span></> : <><UserPlus size={20} /> <span className="text-lg">Join FlashLearn</span></>}
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10 w-full text-center transition-colors">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-muted dark:text-gray-400 hover:text-accent dark:hover:text-[#e3979d] transition-colors"
          >
            {isLogin ? "New to FlashLearn? Sign up for free" : "Already have an account? Log in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
