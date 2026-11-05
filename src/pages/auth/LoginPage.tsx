import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layers, Shield, UserCheck, Eye, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onSuccess: () => void;
  onGoToSignup: () => void;
  onGoToPublic: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onGoToSignup, onGoToPublic }) => {
  const { login, quickLoginAs } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const res = login(email, password);
    if (res.success) {
      onSuccess();
    } else {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  const handleQuickLogin = (role: 'admin' | 'editor' | 'viewer') => {
    quickLoginAs(role);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 mx-auto flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mb-3">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">NexusCMS</h1>
          <p className="text-xs text-indigo-200 mt-1">
            Collaborative Drag & Drop Content Management
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Local Storage authenticated session
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="admin@cms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="password123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition active:scale-98"
            >
              Sign In
            </button>
          </form>

          {/* Quick Demo Accounts Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
              One-Click Demo Roles
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-center transition group"
              >
                <Shield className="w-4 h-4 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="block text-[11px] font-bold text-purple-900">Admin</span>
                <span className="block text-[9px] text-purple-600">Full Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('editor')}
                className="p-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-center transition group"
              >
                <UserCheck className="w-4 h-4 text-amber-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="block text-[11px] font-bold text-amber-900">Editor</span>
                <span className="block text-[9px] text-amber-600">Draft & Review</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('viewer')}
                className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-center transition group"
              >
                <Eye className="w-4 h-4 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="block text-[11px] font-bold text-emerald-900">Viewer</span>
                <span className="block text-[9px] text-emerald-600">Public Reader</span>
              </button>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={onGoToSignup}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Create New Account &rarr;
            </button>
            <button
              onClick={onGoToPublic}
              className="text-slate-500 hover:text-slate-800"
            >
              Browse Public Site
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
