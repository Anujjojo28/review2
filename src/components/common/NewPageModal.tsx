import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageTemplate } from '../../types';
import { X, Sparkles, Layout, ArrowRight } from 'lucide-react';

interface NewPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPageCreated: (pageId: string) => void;
}

export const NewPageModal: React.FC<NewPageModalProps> = ({
  isOpen,
  onClose,
  onPageCreated,
}) => {
  const { templates, createPage } = useCMS();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPage = createPage(
      title.trim(),
      slug.trim() || undefined,
      selectedTemplateId || undefined
    );

    setTitle('');
    setSlug('');
    setSelectedTemplateId('');
    onPageCreated(newPage.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Create New Web Page</h2>
              <p className="text-xs text-slate-500">Pick a starting template or start with a custom layout</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Page Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Enterprise Solutions"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Slug
              </label>
              <div className="flex items-center">
                <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-2 border border-r-0 border-slate-200 rounded-l-lg font-mono">
                  /
                </span>
                <input
                  type="text"
                  placeholder="enterprise-solutions"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-r-lg text-xs font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Choose Starter Blueprint
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Blank option */}
              <div
                onClick={() => setSelectedTemplateId('')}
                className={`p-3 rounded-xl border cursor-pointer transition text-left flex flex-col justify-between ${
                  selectedTemplateId === ''
                    ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-500 mb-2 font-bold text-xs">
                    +
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Custom Blank</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Starts with default Hero and Feature blocks ready for customization.
                  </p>
                </div>
              </div>

              {/* Ready templates */}
              {templates.slice(0, 2).map((tpl: PageTemplate) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition text-left flex flex-col justify-between ${
                    selectedTemplateId === tpl.id
                      ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/10'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="w-7 h-7 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{tpl.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                      {tpl.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <span>Launch Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
