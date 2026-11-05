import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCheck, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Edit3, 
  MessageSquare,
  Globe
} from 'lucide-react';

interface MySubmissionsProps {
  onNavigate: (view: string, params?: any) => void;
  onOpenNewPageModal: () => void;
}

export const MySubmissions: React.FC<MySubmissionsProps> = ({ onNavigate, onOpenNewPageModal }) => {
  const { pages } = useCMS();
  const { currentUser } = useAuth();

  // Filter pages authored by current user (or show all if admin/demo)
  const myPages = pages.filter((p) => p.authorId === currentUser?.id || currentUser?.role === 'admin');

  const myDrafts = myPages.filter((p) => p.status === 'draft');
  const myInReview = myPages.filter((p) => p.status === 'pending_review');
  const myPublished = myPages.filter((p) => p.status === 'published');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            Editor Workspace
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Content Portfolio & Submissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Craft web pages, submit drafts for editorial review, and track review feedback notes.
          </p>
        </div>

        <button
          onClick={onOpenNewPageModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Draft</span>
        </button>
      </div>

      {/* Editor Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Work in Progress (Drafts)</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{myDrafts.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Submitted for Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{myInReview.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Live Published</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{myPublished.length}</div>
        </div>
      </div>

      {/* Pages List with Feedback Threads */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900">My Managed Pages</h2>

        {myPages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No Drafts Yet</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Start assembling your first page with our drag-and-drop builder.</p>
            <button
              onClick={onOpenNewPageModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
            >
              Start New Page
            </button>
          </div>
        ) : (
          myPages.map((page) => (
            <div
              key={page.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 transition hover:shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{page.title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      page.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : page.status === 'pending_review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {page.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">/{page.slug}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('builder', { pageId: page.id })}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Open in Builder</span>
                  </button>

                  {page.status === 'published' && (
                    <button
                      onClick={() => onNavigate('live-page', { slug: page.slug })}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
                      title="View live website"
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Latest Review Feedback */}
              {page.comments.length > 0 && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                      Latest Editorial Activity:
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(page.comments[0].createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">
                    "{page.comments[0].comment}"
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
