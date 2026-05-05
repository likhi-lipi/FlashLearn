import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
      console.error('Login error:', err);
      setError(err.response?.data?.msg || err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6f4] px-6 font-['Outfit']">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl shadow-[#e3979d]/10 border border-[#f3e8e4]">
        <div className="text-center mb-10">
          <Link to="/" className="text-[#4a2c2a] font-bold text-3xl tracking-tight mb-4 block">
            FlashLearn
          </Link>
          <h2 className="text-2xl font-bold text-[#4a2c2a]">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-[#4a2c2a]/50 text-sm mt-2">
            {isLogin ? 'Log in to continue your learning journey.' : 'Join 50,000+ learners today.'}
          </p>
        </div>

        {error && (
          <div className="bg-[#fcf1f1] border border-[#f8dada] text-[#d9534f] px-4 py-3 rounded-2xl mb-8 flex items-center gap-3 text-sm animate-shake">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[13px] font-bold text-[#4a2c2a]/60 ml-4 mb-2 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                placeholder="Your name"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#fdf6f4] border border-transparent rounded-full px-6 py-4 text-[#4a2c2a] focus:outline-none focus:bg-white focus:border-[#e3979d] transition-all placeholder-[#4a2c2a]/30"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-[13px] font-bold text-[#4a2c2a]/60 ml-4 mb-2 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="name@email.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#fdf6f4] border border-transparent rounded-full px-6 py-4 text-[#4a2c2a] focus:outline-none focus:bg-white focus:border-[#e3979d] transition-all placeholder-[#4a2c2a]/30"
              required
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#4a2c2a]/60 ml-4 mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#fdf6f4] border border-transparent rounded-full px-6 py-4 text-[#4a2c2a] focus:outline-none focus:bg-white focus:border-[#e3979d] transition-all placeholder-[#4a2c2a]/30"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#4a2c2a] hover:bg-[#382120] text-white font-bold py-5 rounded-full flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 shadow-lg shadow-[#4a2c2a]/20"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                <span>{isLogin ? 'Login' : 'Register'}</span>
              </>
            )}
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#4a2c2a]/60 hover:text-[#4a2c2a] font-bold text-sm transition-colors"
          >
            {isLogin ? (
              <>Don't have an account? <span className="text-[#e3979d]">Sign up</span></>
            ) : (
              <>Already have an account? <span className="text-[#e3979d]">Login</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
