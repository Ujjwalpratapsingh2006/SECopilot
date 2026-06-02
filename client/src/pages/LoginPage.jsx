import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, AlertCircle, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [invalidFields, setInvalidFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/dashboard', { replace: true }); // Redirect to dashboard
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push('email');
    if (password.length < 6) errors.push('password');
    return errors;
  };

  const triggerError = (msg, fields = []) => {
    setError(msg);
    setInvalidFields(fields);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setInvalidFields([]);
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      triggerError("Please enter a valid email and a password of at least 6 characters.", validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save auth state via Context memory
      login(data.user, data.accessToken);
      
      // Navigate on success
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      triggerError(err.message || 'An error occurred during login', ['email', 'password']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sec-dark bg-grid-pattern relative overflow-hidden font-sans flex items-center justify-center">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sec-green rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sec-red rounded-full blur-[128px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        
        {/* Toast Notification */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 w-full backdrop-blur-md transition-all">
            <AlertCircle size={20} className="shrink-0 text-red-400" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-sec-green" />
              <span className="text-2xl font-bold tracking-tighter text-white">
                SEC<span className="text-sec-green">opilot</span>
              </span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8">Sign in to your SEC analyst account.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${invalidFields.includes('email') ? 'border-sec-red focus:ring-sec-red/20' : 'border-white/10 focus:border-sec-green focus:ring-sec-green/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-4 transition-all`}
              />
            </div>
            
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${invalidFields.includes('password') ? 'border-sec-red focus:ring-sec-red/20' : 'border-white/10 focus:border-sec-green focus:ring-sec-green/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-4 transition-all`}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-6 py-3 px-4 bg-sec-green hover:bg-emerald-400 text-sec-darker font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Log In'} 
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-sec-green hover:text-emerald-400 font-semibold transition-colors">
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
