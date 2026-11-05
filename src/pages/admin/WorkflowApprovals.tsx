import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { Page } from '../../types';
import { 
  CheckSquare, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Eye, 
  Edit3, 
  Sparkles, 
  Send,
  AlertCircle,
  UserCheck
} from 'lucide-react';

interface WorkflowApprovalsProps {
  onNavigate: (view: string, params?: any) => void;
}

export const WorkflowApprovals: React.FC<WorkflowApprovalsProps> = ({ onNavigate }) => {
  const { pages, approveAndPublish, rejectPage, addReviewComment } = useCMS();
  const { currentUser, isAdmin } = useAuth();

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const pendingPages = pages.filter((p) => p.status === 'pending_review');
  const publishedHistory = pages.filter((p) => p.status === 'published' && p.comments.length > 1);

  const handleApprove = (pageId: string) => {
    approveAndPublish(pageId, feedbackText.trim() || 'Reviewed and approved by Admin for live publishing.');
    setFeedbackText('');
    setSelectedPageId(null);
    setActionSuccessMessage('Page approved and published successfully to the live website!');
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  const handleReject = (pageId: string) => {
    if (!feedbackText.trim()) {
      alert('Please provide feedback explaining what changes are needed before rejecting.');
      return;
    }
    rejectPage(pageId, feedbackText.trim());
    setFeedbackText('');
    setSelectedPageId(null);
    setActionSuccessMessage('Feedback sent. Page moved back to Draft status for revision.');
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
            <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
            Governance & Quality Gate
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Collaborative Approval Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review editorial drafts from team members, leave feedback, and control what goes live.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-medium border border-slate-200">
            Current Role: <strong className="text-indigo-600 uppercase font-mono">{currentUser?.role}</strong>
          </span>
        </div>
      </div>

      {/* Action Notification */}
      {actionSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* Main Grid: Pending Items Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Pending Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Awaiting Review</span>
              <span className="px-2 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded-full font-bold">
                {pendingPages.length}
              </span>
            </h2>
          </div>

          {pendingPages.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800">All Caught Up!</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                There are no pending submissions awaiting editorial review right now.
              </p>
            </div>
          ) : (
            pendingPages.map((page) => (
              <div
                key={page.id}
                className="bg-white rounded-2xl border border-amber-200/80 shadow-xs p-5 transition hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{page.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="font-mono">/{page.slug}</span>
                      <span>&bull;</span>
                      <span>Submitted by <strong>{page.authorName}</strong></span>
                      <span>&bull;</span>
                      <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('builder', { pageId: page.id })}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Canvas</span>
                    </button>
                  </div>
                </div>

                {/* Latest Submission Note */}
                {page.comments.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-4 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700 text-[11px]">
                        Author Submission Note:
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(page.comments[0].createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-slate-600 italic">
                      "{page.comments[0].comment}"
                    </p>
                  </div>
                )}

                {/* Review Action Controls */}
                {isAdmin ? (
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <textarea
                      rows={2}
                      placeholder="Add reviewer feedback or approval notes (required if requesting changes)..."
                      value={selectedPageId === page.id ? feedbackText : ''}
                      onChange={(e) => {
                        setSelectedPageId(page.id);
                        setFeedbackText(e.target.value);
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                    />

                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleReject(page.id)}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Request Changes</span>
                      </button>

                      <button
                        onClick={() => handleApprove(page.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve & Publish</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-amber-700 font-medium">
                    &bull; Awaiting Administrator sign-off. Switch to Admin role to approve or reject this page.
                  </div>
                )}

              </div>
            ))
          )}
        </div>

        {/* Right Col: Workflow Guidelines & Recent Approvals */}
        <div className="space-y-6">
          
          {/* Workflow Guide */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
            <h3 className="text-xs font-bold text-slate-900 mb-2">How Collaboration Works</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Content Creation:</strong> Editors construct pages using the drag & drop builder.
              </li>
              <li>
                <strong>Quality Submission:</strong> When ready, Editors submit pages to this approval pipeline with notes.
              </li>
              <li>
                <strong>Admin Governance:</strong> Admins inspect blocks, SEO score, and grant final publication approval.
              </li>
              <li>
                <strong>Revisions:</strong> If changes are requested, the page moves back to Draft with reviewer notes.
              </li>
            </ol>
          </div>

          {/* Published Pages with History */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
            <h3 className="text-xs font-bold text-slate-900 mb-3">Recently Signed Off</h3>
            <div className="space-y-3">
              {pages.filter(p => p.status === 'published').slice(0, 3).map((p) => (
                <div key={p.id} className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs">
                  <div className="font-bold text-slate-900 truncate">{p.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Author: {p.authorName}</div>
                  <div className="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Live on website</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
