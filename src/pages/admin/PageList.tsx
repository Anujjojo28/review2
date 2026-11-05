import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { Page, PageStatus } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Globe, 
  Edit3, 
  Copy, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  ExternalLink,
  MoreVertical,
  Check,
  RotateCcw
} from 'lucide-react';

interface PageListProps {
  onNavigate: (view: string, params?: any) => void;
  onOpenNewPageModal: () => void;
}

export const PageList: React.FC<PageListProps> = ({ onNavigate, onOpenNewPageModal }) => {
  const { pages, deletePage, duplicatePage, approveAndPublish, unpublishPage } = useCMS();
  const { isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PageStatus>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredPages = pages.filter((page) => {
    const matchesSearch = 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: PageStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Published
          </span>
        );
      case 'pending_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Page Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, assemble with drag & drop, review, and publish web pages.
          </p>
        </div>

        <button
          onClick={onOpenNewPageModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Status Tab Filters */}
        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
          {(['all', 'published', 'pending_review', 'draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st === 'all' ? `All (${pages.length})` : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search title, slug, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200/80 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Page Title & Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Blocks</th>
                <th className="py-3 px-4">SEO Health</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No pages matched your search or status filter.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/70 transition">
                    
                    {/* Title & Slug */}
                    <td className="py-3.5 px-4">
                      <div 
                        onClick={() => onNavigate('builder', { pageId: page.id })}
                        className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                      >
                        {page.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        /{page.slug}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(page.status)}
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      {page.authorName}
                    </td>

                    {/* Blocks Count */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {page.blocks.length} blocks
                    </td>

                    {/* SEO Health */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          (page.seo.score || 0) >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                        <span className="font-semibold text-slate-800">
                          {page.seo.score || 70}/100
                        </span>
                      </div>
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-4 font-mono text-slate-700 whitespace-nowrap">
                      {(page.views || 0).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Visual Builder button */}
                        <button
                          onClick={() => onNavigate('builder', { pageId: page.id })}
                          className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg transition"
                          title="Open visual drag-and-drop builder"
                        >
                          Builder
                        </button>

                        {/* Live view button */}
                        {page.status === 'published' && (
                          <button
                            onClick={() => onNavigate('live-page', { slug: page.slug })}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
                            title="View public live site"
                          >
                            <Globe className="w-4 h-4" />
                          </button>
                        )}

                        {/* Duplicate page */}
                        <button
                          onClick={() => {
                            const copy = duplicatePage(page.id);
                            onNavigate('builder', { pageId: copy.id });
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                          title="Duplicate page"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        {/* Admin quick publish / unpublish toggle */}
                        {isAdmin && (
                          page.status === 'published' ? (
                            <button
                              onClick={() => unpublishPage(page.id)}
                              className="p-1.5 text-amber-500 hover:text-amber-700 rounded-lg hover:bg-amber-50 transition"
                              title="Unpublish page"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => approveAndPublish(page.id, 'One-click published by administrator.')}
                              className="p-1.5 text-emerald-600 hover:text-emerald-800 rounded-lg hover:bg-emerald-50 transition"
                              title="Publish immediately"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )
                        )}

                        {/* Delete confirmation button */}
                        <button
                          onClick={() => setDeleteConfirmId(page.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Delete page"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-2">Delete Page?</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Are you sure you want to delete this page? This action removes all configured blocks and revision history.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deletePage(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Delete Page
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
