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
    <div className="flex justify-center items-center h-[85vh] pt-10">
      <div className="bg-white p-12 rounded-[3rem] w-full max-w-lg shadow-[0_40px_80px_-15px_rgba(233,170,182,0.2)] border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center text-accent mb-8 shadow-inner">
           <span className="text-3xl font-bold">F</span>
        </div>
        <h2 className="text-4xl font-bold mb-3 text-center text-dark">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-muted font-medium mb-10 text-center">
          {isLogin ? 'Continue your journey to mastery.' : 'Join the global community of learners.'}
        </p>

        {error && <div className="w-full bg-red-50 text-red-500 p-4 rounded-2xl mb-8 text-center text-sm font-bold border border-red-100">{error}</div>}
        
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Username</label>
              <input 
                type="text" 
                placeholder="How should we call you?"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-secondary/30 border-none rounded-2xl px-6 py-4 text-dark font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Email Address</label>
            <input 
              type="email" 
              placeholder="alex@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary/30 border-none rounded-2xl px-6 py-4 text-dark font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary/30 border-none rounded-2xl px-6 py-4 text-dark font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#523639] text-white font-bold py-5 rounded-full flex items-center justify-center space-x-3 shadow-xl hover:opacity-95 transition-all transform active:scale-[0.98] mt-4"
          >
            {isLogin ? <><LogIn size={20} /> <span className="text-lg">Log in</span></> : <><UserPlus size={20} /> <span className="text-lg">Join FlashLearn</span></>}
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-gray-100 w-full text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-muted hover:text-accent transition-colors"
          >
            {isLogin ? "New to FlashLearn? Sign up for free" : "Already have an account? Log in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
