import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Layers, User, Mail, Lock, Shield, UserCheck, Eye } from 'lucide-react';

interface SignupPageProps {
  onSuccess: () => void;
  onGoToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSuccess, onGoToLogin }) => {
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('editor');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    const res = signup(name, email, password, role);
    if (res.success) {
      onSuccess();
    } else {
      setErrorMsg(res.error || 'Failed to register account.');
    }
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
            Register your CMS editorial identity
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Create your account</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Saved automatically to Local Storage
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
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
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
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Account Role & Privileges
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    role === 'admin'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Shield className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                  <span className="block text-[11px] font-bold">Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('editor')}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    role === 'editor'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="block text-[11px] font-bold">Editor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('viewer')}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    role === 'viewer'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Eye className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="block text-[11px] font-bold">Viewer</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition active:scale-98"
            >
              Complete Registration
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <button
              onClick={onGoToLogin}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Sign In
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
