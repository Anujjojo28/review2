import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { 
  FileText, 
  CheckSquare, 
  Globe, 
  BarChart3, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  Plus, 
  Search,
  ExternalLink,
  ShieldAlert,
  TrendingUp,
  Users
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: string, params?: any) => void;
  onOpenNewPageModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenNewPageModal }) => {
  const { currentUser, isAdmin } = useAuth();
  const { pages, getAnalyticsSummary } = useCMS();

  const stats = getAnalyticsSummary();
  const publishedPages = pages.filter((p) => p.status === 'published');
  const pendingPages = pages.filter((p) => p.status === 'pending_review');
  const draftPages = pages.filter((p) => p.status === 'draft');

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md mb-2 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Content Operations Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name || 'Publisher'}!
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
              Collaboratively build, optimize with SEO tools, and deploy web experiences with zero code bottlenecks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenNewPageModal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-semibold text-xs rounded-xl shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>New Page</span>
            </button>
            <button
              onClick={() => onNavigate('public-site')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-400/30 text-white font-semibold text-xs rounded-xl backdrop-blur-xs transition"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Views */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Pageviews</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {stats.totalViews.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] text-emerald-600 font-semibold">
            <span>+18.4%</span>
            <span className="text-slate-400 font-normal">from last week</span>
          </div>
        </div>

        {/* Published Pages */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Live Published</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {publishedPages.length}
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-500">
            <span>Available on public portal</span>
          </div>
        </div>

        {/* Pending Reviews */}
        <div 
          onClick={() => onNavigate('approvals')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs cursor-pointer hover:border-amber-300 hover:shadow-sm transition"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Pending Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 tracking-tight">
            {pendingPages.length}
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] text-amber-700 font-medium">
            <span>Requires Admin sign-off &rarr;</span>
          </div>
        </div>

        {/* In Draft */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Work In Progress</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {draftPages.length}
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-500">
            <span>Active editor drafts</span>
          </div>
        </div>

      </div>

      {/* Main Content Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Pages Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Web Pages</h2>
              <p className="text-xs text-slate-500">Manage pages across their complete publication lifecycle</p>
            </div>
            <button
              onClick={() => onNavigate('pages')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View All ({pages.length}) &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {pages.slice(0, 5).map((page) => (
              <div
                key={page.id}
                className="p-4 hover:bg-slate-50/80 transition flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 
                      onClick={() => onNavigate('builder', { pageId: page.id })}
                      className="text-xs font-bold text-slate-900 hover:text-indigo-600 cursor-pointer truncate"
                    >
                      {page.title}
                    </h3>
                    
                    {/* Status Pill */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      page.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : page.status === 'pending_review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {page.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="font-mono text-slate-400">/{page.slug}</span>
                    <span>&bull;</span>
                    <span>By {page.authorName}</span>
                    <span>&bull;</span>
                    <span>{page.blocks.length} blocks</span>
                    <span>&bull;</span>
                    <span className="text-emerald-600 font-semibold">SEO {page.seo.score || 70}/100</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate('builder', { pageId: page.id })}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition"
                  >
                    Edit
                  </button>
                  {page.status === 'published' && (
                    <button
                      onClick={() => onNavigate('live-page', { slug: page.slug })}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
                      title="View live page"
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending Approvals & Quick Tools */}
        <div className="space-y-6">
          
          {/* Pending Reviews Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-900">Review Queue</h3>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {pendingPages.length} pending
              </span>
            </div>

            {pendingPages.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                All editorial submissions have been reviewed and signed off!
              </p>
            ) : (
              <div className="space-y-3">
                {pendingPages.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onNavigate('approvals')}
                    className="p-3 bg-amber-50/50 hover:bg-amber-50 rounded-xl border border-amber-200/80 cursor-pointer transition"
                  >
                    <h4 className="text-xs font-bold text-slate-900 truncate">{p.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                      {p.comments[0]?.comment || 'Submitted for publication review.'}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-amber-700 font-semibold">
                      <span>Submitted by {p.authorName}</span>
                      <span>Review &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
            <h3 className="text-xs font-bold text-slate-900 mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('templates')}
                className="p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl border border-slate-200 text-left transition"
              >
                <Sparkles className="w-4 h-4 text-indigo-500 mb-1" />
                <div className="font-bold">Templates</div>
                <div className="text-[10px] text-slate-500">Pick designs</div>
              </button>

              <button
                onClick={() => onNavigate('seo')}
                className="p-3 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl border border-slate-200 text-left transition"
              >
                <Search className="w-4 h-4 text-emerald-500 mb-1" />
                <div className="font-bold">SEO Audit</div>
                <div className="text-[10px] text-slate-500">Meta & SERP</div>
              </button>

              <button
                onClick={() => onNavigate('analytics')}
                className="p-3 bg-slate-50 hover:bg-cyan-50 hover:text-cyan-700 rounded-xl border border-slate-200 text-left transition"
              >
                <BarChart3 className="w-4 h-4 text-cyan-500 mb-1" />
                <div className="font-bold">Analytics</div>
                <div className="text-[10px] text-slate-500">Traffic logs</div>
              </button>

              <button
                onClick={() => onNavigate('users')}
                className="p-3 bg-slate-50 hover:bg-purple-50 hover:text-purple-700 rounded-xl border border-slate-200 text-left transition"
              >
                <Users className="w-4 h-4 text-purple-500 mb-1" />
                <div className="font-bold">User Roles</div>
                <div className="text-[10px] text-slate-500">Permissions</div>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
