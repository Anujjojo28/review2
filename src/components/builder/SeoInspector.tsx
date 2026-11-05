import React, { useState } from 'react';
import { SeoSettings } from '../../types';
import { 
  Search, 
  Share2, 
  CheckCircle, 
  AlertCircle, 
  Globe, 
  HelpCircle,
  X,
  ExternalLink,
  Sliders
} from 'lucide-react';

interface SeoInspectorProps {
  seo: SeoSettings;
  pageTitle: string;
  pageSlug: string;
  onUpdateSeo: (updates: Partial<SeoSettings>) => void;
  onClose?: () => void;
}

export const SeoInspector: React.FC<SeoInspectorProps> = ({
  seo,
  pageTitle,
  pageSlug,
  onUpdateSeo,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'google' | 'social'>('meta');
  const [newKeyword, setNewKeyword] = useState('');

  const metaTitle = seo.metaTitle || pageTitle;
  const metaDesc = seo.metaDescription || 'Add a meta description to improve how search engines rank and summarize this page.';
  const score = seo.score || 75;

  const getScoreColor = (sc: number) => {
    if (sc >= 85) return { bg: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Excellent' };
    if (sc >= 65) return { bg: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Good' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', badge: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Needs Improvement' };
  };

  const scoreInfo = getScoreColor(score);

  const handleAddKeyword = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (('key' in e && e.key === 'Enter') || e.type === 'click') {
      e.preventDefault();
      if (!newKeyword.trim()) return;
      const current = seo.focusKeywords || [];
      if (!current.includes(newKeyword.trim().toLowerCase())) {
        onUpdateSeo({ focusKeywords: [...current, newKeyword.trim().toLowerCase()] });
      }
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    onUpdateSeo({
      focusKeywords: (seo.focusKeywords || []).filter((k) => k !== kw),
    });
  };

  return (
    <div className="w-88 bg-white border-l border-slate-200 flex flex-col h-full shrink-0 shadow-lg z-30">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">SEO Diagnostics & Metadata</h3>
            <p className="text-[10px] text-slate-500">Live search engine optimization</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* SEO Health Score Banner */}
      <div className="p-4 bg-slate-900 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300">SEO Health Score</span>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${scoreInfo.badge}`}>
            {scoreInfo.label}
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-extrabold text-white">{score}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${scoreInfo.bg} transition-all duration-500`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 px-3 pt-2 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('meta')}
          className={`px-3 py-2 font-semibold border-b-2 transition ${
            activeTab === 'meta'
              ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Meta Settings
        </button>
        <button
          onClick={() => setActiveTab('google')}
          className={`px-3 py-2 font-semibold border-b-2 transition ${
            activeTab === 'google'
              ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Google SERP
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`px-3 py-2 font-semibold border-b-2 transition ${
            activeTab === 'social'
              ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Social Share
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs">
        {activeTab === 'meta' && (
          <div className="space-y-4">
            
            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-700">Meta Title</label>
                <span className={`text-[10px] font-mono ${
                  metaTitle.length >= 30 && metaTitle.length <= 60 ? 'text-emerald-600 font-bold' : 'text-slate-400'
                }`}>
                  {metaTitle.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={seo.metaTitle || ''}
                placeholder={pageTitle}
                onChange={(e) => onUpdateSeo({ metaTitle: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Recommended between 30 and 60 characters.</p>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-700">Meta Description</label>
                <span className={`text-[10px] font-mono ${
                  (seo.metaDescription?.length || 0) >= 100 && (seo.metaDescription?.length || 0) <= 160
                    ? 'text-emerald-600 font-bold'
                    : 'text-slate-400'
                }`}>
                  {seo.metaDescription?.length || 0}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={seo.metaDescription || ''}
                placeholder="Brief summary of this page for search results..."
                onChange={(e) => onUpdateSeo({ metaDescription: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">Optimal length: 120 - 160 characters.</p>
            </div>

            {/* Focus Keywords */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Focus Keywords
              </label>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  placeholder="e.g. content management"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={handleAddKeyword}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(seo.focusKeywords || []).map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-indigo-50 text-indigo-700 border border-indigo-200"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-indigo-400 hover:text-indigo-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={seo.canonicalUrl || ''}
                placeholder={`https://yourdomain.com/${pageSlug}`}
                onChange={(e) => onUpdateSeo({ canonicalUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            {/* Search Indexing */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block text-xs">Search Engine Indexing</span>
                <span className="text-[10px] text-slate-500">
                  {seo.noIndex ? 'Page hidden from search crawlers (noindex)' : 'Page allowed for Google indexing (index, follow)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateSeo({ noIndex: !seo.noIndex })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  !seo.noIndex ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    !seo.noIndex ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>
        )}

        {/* Google SERP Preview Tab */}
        {activeTab === 'google' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-3">
                Google Search Engine Result Mockup
              </span>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200/80 font-sans">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-[11px] text-slate-700 truncate">
                    https://yourdomain.com &rsaquo; {pageSlug}
                  </div>
                </div>

                <h4 className="text-base text-blue-800 hover:underline font-medium cursor-pointer leading-tight mb-1 truncate">
                  {metaTitle}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {metaDesc}
                </p>
              </div>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900">
              <h5 className="font-bold text-[11px] mb-1">Pro Search Tip</h5>
              <p className="text-[11px] leading-relaxed text-indigo-700">
                Front-load your primary focus keyword within the first 35 characters of the page title for maximum organic click-through rate.
              </p>
            </div>
          </div>
        )}

        {/* Social Card Preview Tab */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                OpenGraph Share Image URL
              </label>
              <input
                type="text"
                value={seo.ogImage || ''}
                placeholder="https://..."
                onChange={(e) => onUpdateSeo({ ogImage: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-3">
                Social Feed Card Preview (Twitter / LinkedIn / FB)
              </span>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="h-36 bg-slate-200 relative overflow-hidden">
                  <img
                    src={seo.ogImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                    alt="Social Card"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[9px] rounded font-mono">
                    yourdomain.com
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mb-1">
                    {metaTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                    {metaDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
