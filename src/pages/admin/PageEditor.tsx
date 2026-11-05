import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { Block, BlockType, PageStatus } from '../../types';
import { BlockLibrary } from '../../components/builder/BlockLibrary';
import { BlockRenderer } from '../../components/builder/BlockRenderer';
import { BlockInspector } from '../../components/builder/BlockInspector';
import { SeoInspector } from '../../components/builder/SeoInspector';
import { DevicePreviewBar, DeviceMode } from '../../components/common/DevicePreviewBar';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  CheckCircle2, 
  Search, 
  Globe, 
  MessageSquare, 
  Plus, 
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PageEditorProps {
  pageId: string;
  onNavigate: (view: string, params?: any) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({ pageId, onNavigate }) => {
  const { 
    pages, 
    updatePage, 
    addBlock, 
    updateBlock, 
    removeBlock, 
    moveBlock, 
    submitForReview, 
    approveAndPublish,
    addReviewComment,
    updateSeo
  } = useCMS();

  const { currentUser, isAdmin } = useAuth();

  const page = pages.find((p) => p.id === pageId);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [authorNote, setAuthorNote] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(null);
  const [isDraggingOverCanvas, setIsDraggingOverCanvas] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Auto-select first block on load if none selected
  useEffect(() => {
    if (page && page.blocks.length > 0 && !selectedBlockId) {
      setSelectedBlockId(page.blocks[0].id);
    }
  }, [page, selectedBlockId]);

  if (!page) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-base font-bold text-slate-800">Page Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The requested page may have been deleted.</p>
        <button
          onClick={() => onNavigate('pages')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
        >
          Return to All Pages
        </button>
      </div>
    );
  }

  const selectedBlock = page.blocks.find((b) => b.id === selectedBlockId) || null;

  // Handle Drag & Drop of Blocks inside Canvas
  const handleDragStartBlock = (index: number) => {
    setDraggedBlockIndex(index);
  };

  const handleDropBlockOn = (targetIndex: number) => {
    if (draggedBlockIndex !== null && draggedBlockIndex !== targetIndex) {
      moveBlock(page.id, draggedBlockIndex, targetIndex);
    }
    setDraggedBlockIndex(null);
  };

  // Handle Dragging a new block from the sidebar onto canvas
  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverCanvas(true);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverCanvas(false);
    const blockType = e.dataTransfer.getData('text/plain') as BlockType;
    if (blockType) {
      addBlock(page.id, blockType);
    }
  };

  const handleSaveNotification = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handlePublishClick = () => {
    approveAndPublish(page.id, 'Published directly by administrator.');
    handleSaveNotification();
  };

  const handleSubmitForReview = () => {
    submitForReview(page.id, authorNote.trim() || 'Page submitted for editorial approval.');
    setReviewModalOpen(false);
    setAuthorNote('');
    handleSaveNotification();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addReviewComment(page.id, newCommentText.trim());
    setNewCommentText('');
  };

  // Viewport width styling
  const canvasWidthClass = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-[768px] shadow-2xl rounded-2xl border-4 border-slate-700 overflow-hidden my-4',
    mobile: 'w-[375px] shadow-2xl rounded-3xl border-8 border-slate-800 overflow-hidden my-4',
  }[deviceMode];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8 bg-slate-100 overflow-hidden">
      
      {/* Top Builder Control Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between z-40 shrink-0">
        
        {/* Left: Back & Title Edit */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('pages')}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            title="Back to pages"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={page.title}
                onChange={(e) => updatePage(page.id, { title: e.target.value })}
                className="font-bold text-sm text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none px-1 py-0.5 rounded transition"
              />
              {/* Status Badge */}
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                page.status === 'published'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : page.status === 'pending_review'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {page.status.replace('_', ' ')}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono pl-1">
              /{page.slug}
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center">
          <DevicePreviewBar deviceMode={deviceMode} onChangeDevice={setDeviceMode} />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          
          {/* SEO Button */}
          <button
            onClick={() => {
              setIsSeoOpen(!isSeoOpen);
              if (!isSeoOpen) setIsCommentsOpen(false);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isSeoOpen
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">SEO</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
              {page.seo.score || 70}
            </span>
          </button>

          {/* Workflow Comments Thread */}
          <button
            onClick={() => {
              setIsCommentsOpen(!isCommentsOpen);
              if (!isCommentsOpen) setIsSeoOpen(false);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isCommentsOpen
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Activity</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1 rounded-full">
              {page.comments.length}
            </span>
          </button>

          {/* Live Preview Button */}
          {page.status === 'published' && (
            <button
              onClick={() => onNavigate('live-page', { slug: page.slug })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Live Page</span>
            </button>
          )}

          {/* Publishing & Review Action Gate */}
          {isAdmin ? (
            <button
              onClick={handlePublishClick}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{page.status === 'published' ? 'Update & Publish' : 'Publish Page'}</span>
            </button>
          ) : (
            <button
              onClick={() => setReviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Review</span>
            </button>
          )}

        </div>
      </div>

      {/* Main Builder Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar: Block Library */}
        <BlockLibrary
          onAddBlock={(type) => {
            addBlock(page.id, type);
            // Auto-select the newly added block
            setTimeout(() => {
              const updatedPage = pages.find((p) => p.id === page.id);
              if (updatedPage && updatedPage.blocks.length > 0) {
                setSelectedBlockId(updatedPage.blocks[updatedPage.blocks.length - 1].id);
              }
            }, 50);
          }}
        />

        {/* Center: Live Drag-and-Drop Canvas */}
        <div 
          onDragOver={handleCanvasDragOver}
          onDragLeave={() => setIsDraggingOverCanvas(false)}
          onDrop={handleCanvasDrop}
          className="flex-1 overflow-y-auto p-6 flex flex-col items-center custom-scrollbar"
        >
          {isDraggingOverCanvas && (
            <div className="w-full max-w-4xl p-6 mb-4 border-2 border-dashed border-indigo-400 bg-indigo-50/60 rounded-2xl text-center text-xs font-semibold text-indigo-700 animate-pulse">
              Release to drop component onto canvas
            </div>
          )}

          <div className={`${canvasWidthClass} transition-all duration-300 space-y-4`}>
            {page.blocks.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-800">Canvas Is Empty</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Choose a component from the left palette or drag it here to start assembling your page.
                </p>
                <button
                  onClick={() => addBlock(page.id, 'hero')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert Hero Block</span>
                </button>
              </div>
            ) : (
              page.blocks.map((block, index) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  index={index}
                  totalBlocks={page.blocks.length}
                  isBuilderMode={true}
                  isSelected={selectedBlockId === block.id}
                  onSelect={() => setSelectedBlockId(block.id)}
                  onMoveUp={() => moveBlock(page.id, index, index - 1)}
                  onMoveDown={() => moveBlock(page.id, index, index + 1)}
                  onDelete={() => removeBlock(page.id, block.id)}
                  onDragStart={() => handleDragStartBlock(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropBlockOn(index)}
                />
              ))
            )}

            {/* Bottom Quick Insert Zone */}
            <div className="pt-4 text-center">
              <button
                onClick={() => addBlock(page.id, 'content')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs transition hover:scale-105"
              >
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Append Content Block</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Drawer 1: Selected Block Property Inspector */}
        {!isSeoOpen && !isCommentsOpen && (
          <BlockInspector
            block={selectedBlock}
            onUpdate={(updates) => {
              if (selectedBlockId) {
                updateBlock(page.id, selectedBlockId, updates);
              }
            }}
            onClose={() => setSelectedBlockId(null)}
            onDelete={() => {
              if (selectedBlockId) {
                removeBlock(page.id, selectedBlockId);
                setSelectedBlockId(null);
              }
            }}
          />
        )}

        {/* Right Drawer 2: SEO Tools Inspector */}
        {isSeoOpen && (
          <SeoInspector
            seo={page.seo}
            pageTitle={page.title}
            pageSlug={page.slug}
            onUpdateSeo={(updates) => updateSeo(page.id, updates)}
            onClose={() => setIsSeoOpen(false)}
          />
        )}

        {/* Right Drawer 3: Collaborative Activity & Comments Drawer */}
        {isCommentsOpen && (
          <div className="w-84 bg-white border-l border-slate-200 flex flex-col h-full shrink-0 shadow-lg z-30">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900">Workflow & Review Log</h3>
              </div>
              <button
                onClick={() => setIsCommentsOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            {/* Comment List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
              {page.comments.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No comments or review history yet.</p>
              ) : (
                page.comments.map((cm) => (
                  <div key={cm.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{cm.userName}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(cm.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-slate-200 rounded font-semibold text-slate-600">
                      {cm.userRole}
                    </span>
                    <p className="text-xs text-slate-700 pt-1 leading-relaxed">{cm.comment}</p>
                    {cm.statusChange && (
                      <span className="inline-block text-[10px] text-indigo-600 font-semibold pt-1">
                        &rarr; Changed status to {cm.statusChange.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="p-3 border-t border-slate-200 bg-slate-50">
              <input
                type="text"
                placeholder="Add editorial feedback or note..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="w-full mt-2 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition"
              >
                Post Note
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Submit for Review Modal for Editors */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Submit Page for Editorial Review</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              An Administrator will inspect the layout, review your copy, and publish this page to the live website.
            </p>

            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note for Reviewer (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Completed draft copy for the product launch. Please verify the headline and CTA links."
              value={authorNote}
              onChange={(e) => setAuthorNote(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReviewModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitForReview}
                className="px-4 py-1.5 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Queue</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Saved Toast */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Page changes synced and saved!</span>
        </div>
      )}

    </div>
  );
};
