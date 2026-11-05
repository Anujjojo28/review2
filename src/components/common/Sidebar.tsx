import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  CheckSquare, 
  Sparkles, 
  Search, 
  BarChart3, 
  Users, 
  Globe, 
  PlusCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenNewPageModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onOpenNewPageModal }) => {
  const { isAdmin } = useAuth();
  const { pages } = useCMS();

  const pendingApprovalsCount = pages.filter((p) => p.status === 'pending_review').length;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800">
      
      {/* Top CTA */}
      <div className="p-4 border-b border-slate-800">
        <button
          onClick={onOpenNewPageModal}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-xs shadow-md shadow-indigo-950 transition-all active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar text-xs">
        
        {/* Core CMS */}
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Content Core
          </p>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                currentView === 'dashboard'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => onNavigate('pages')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition ${
                currentView === 'pages'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>All Pages</span>
              </div>
              <span className="text-[11px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                {pages.length}
              </span>
            </button>

            <button
              onClick={() => onNavigate('approvals')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition ${
                currentView === 'approvals'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckSquare className="w-4 h-4" />
                <span>Approval Queue</span>
              </div>
              {pendingApprovalsCount > 0 && (
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {pendingApprovalsCount} new
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Builder & Tools */}
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Design & Growth
          </p>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('templates')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                currentView === 'templates'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Templates Library</span>
            </button>

            <button
              onClick={() => onNavigate('seo')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                currentView === 'seo'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>SEO Tools & Audit</span>
            </button>

            <button
              onClick={() => onNavigate('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                currentView === 'analytics'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Page Analytics</span>
            </button>
          </div>
        </div>

        {/* Role & Administration */}
        {isAdmin && (
          <div>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Administration
            </p>
            <div className="space-y-1">
              <button
                onClick={() => onNavigate('users')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                  currentView === 'users'
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4 text-purple-400" />
                <span>Users & Roles</span>
              </button>
            </div>
          </div>
        )}

        {/* User Workspace shortcut */}
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Editor Zone
          </p>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('user-workspace')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                currentView === 'user-workspace'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>My Drafts & Submissions</span>
            </button>
          </div>
        </div>

      </div>

      {/* Live Site Footer Link */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={() => onNavigate('public-site')}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>View Public Website</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </button>

        <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Vercel Deploy Ready</span>
          <span className="flex items-center gap-1 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>

    </aside>
  );
};
