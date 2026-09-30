import React, { useState } from 'react';
import { Mail, Lock, User, Compass, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ onLoginSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true); // true = Login, false = Signup
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Form Validation
    if (!email || !password || (!isLoginMode && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!isLoginMode) {
      // Signup Flow
      const userData = { name, email, password };
      localStorage.setItem('jobtrack_user', JSON.stringify(userData));
      setSuccessMsg('Account created successfully! Logging you in...');
      setTimeout(() => {
        onLoginSuccess({ name, email });
      }, 800);
    } else {
      // Login Flow
      const savedUser = JSON.parse(localStorage.getItem('jobtrack_user'));
      
      // For demo convenience, if no user is saved yet, allow any valid login or auto-create demo user
      const loggedUser = savedUser || { name: 'Aniket Verma', email };
      
      setSuccessMsg('Login successful! Welcome back.');
      setTimeout(() => {
        onLoginSuccess(loggedUser);
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden">
        
        {/* Background decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isLoginMode ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isLoginMode ? 'Enter your credentials to access your job tracker workspace.' : 'Start tracking your career pipeline like a pro.'}
          </p>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2.5 text-rose-700 dark:text-rose-300 text-xs font-medium animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLoginMode && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Aniket Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input 
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{isLoginMode ? 'Sign In to Workspace' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Toggle Mode Footer */}
        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          {isLoginMode ? "Don't have an account yet?" : "Already have an account?"}{' '}
          <button 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError('');
              setSuccessMsg('');
            }}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
          >
            {isLoginMode ? 'Sign up now' : 'Sign in'}
          </button>
        </div>

      </div>
    </div>
  );
}