import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { 
  Layout, 
  Globe, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  ChevronDown, 
  Plus, 
  ExternalLink,
  Layers,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenNewPageModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenNewPageModal }) => {
  const { currentUser, logout, switchRole, isAdmin } = useAuth();
  const { pages, resetToSeedData } = useCMS();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const pendingReviewCount = pages.filter((p) => p.status === 'pending_review').length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">NexusCMS</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
                  React + Vite
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Collaborative Visual Content Management</p>
            </div>
          </div>

          {/* Module Switcher Buttons */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'dashboard' || currentView === 'pages' || currentView === 'builder'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Admin Hub</span>
            </button>

            <button
              onClick={() => onNavigate('user-workspace')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'user-workspace'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Editor Workspace</span>
            </button>

            <button
              onClick={() => onNavigate('approvals')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all relative ${
                currentView === 'approvals'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Workflows</span>
              {pendingReviewCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-white rounded-full">
                  {pendingReviewCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('public-site')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'public-site'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </nav>

          {/* Action Center: Role Switcher, New Page, Profile */}
          <div className="flex items-center space-x-3">
            {/* Quick Create Page Button */}
            <button
              onClick={onOpenNewPageModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Page</span>
            </button>

            {/* Quick Demo Role Selector */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-xs">
              <span className="px-2 text-slate-600 text-[11px] font-medium">Role:</span>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2 py-1 rounded text-xs font-medium transition ${
                  currentUser?.role === 'admin'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => switchRole('editor')}
                className={`px-2 py-1 rounded text-xs font-medium transition ${
                  currentUser?.role === 'editor'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => switchRole('viewer')}
                className={`px-2 py-1 rounded text-xs font-medium transition ${
                  currentUser?.role === 'viewer'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Viewer
              </button>
            </div>

            {/* User Profile & Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                    {currentUser?.name || 'Guest User'}
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                        isAdmin
                          ? 'bg-purple-100 text-purple-700'
                          : currentUser?.role === 'editor'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {currentUser?.role || 'Guest'}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{currentUser?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Layout className="w-4 h-4 text-slate-400" />
                      Admin Dashboard
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('user-workspace');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-slate-400" />
                      My Submissions & Drafts
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('templates');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-slate-400" />
                      Templates Library
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('public-site');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4 text-slate-400" />
                      View Public Site
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setResetConfirmOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-amber-600 hover:bg-amber-50 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset to Demo Seed Data
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Demo Seed Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Reset Demo Data?</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              This will restore the original sample pages, approval comments, and templates in your local storage.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToSeedData();
                  setResetConfirmOpen(false);
                  window.location.reload();
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
