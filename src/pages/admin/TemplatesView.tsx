import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageTemplate } from '../../types';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Plus, 
  Search,
  LayoutTemplate
} from 'lucide-react';

interface TemplatesViewProps {
  onNavigate: (view: string, params?: any) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onNavigate }) => {
  const { templates, createPage } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<PageTemplate | null>(null);

  const categories = ['all', 'Landing', 'Blog', 'Business'];

  const filteredTemplates = templates.filter((tpl) =>
    selectedCategory === 'all' ? true : tpl.category === selectedCategory
  );

  const handleUseTemplate = (tpl: PageTemplate) => {
    const newPage = createPage(
      `${tpl.name} Page`,
      undefined,
      tpl.id
    );
    onNavigate('builder', { pageId: newPage.id });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Curated Design Blueprints
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Customizable Template Library
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Accelerate your publishing lifecycle with responsive, SEO-ready page templates.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat === 'all' ? 'All Templates' : cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={tpl.thumbnailUrl}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-md">
                  {tpl.category}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold rounded-md shadow-xs">
                  {tpl.blocks.length} Blocks
                </div>
              </div>

              {/* Information */}
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Blocks preview tags */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {tpl.blocks.map((b) => (
                    <span
                      key={b.id}
                      className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded"
                    >
                      {b.type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setPreviewTemplate(tpl)}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>

              <button
                onClick={() => handleUseTemplate(tpl)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition hover:scale-102"
              >
                <span>Use Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Blueprint Inspect Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {previewTemplate.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{previewTemplate.name}</h3>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-600 my-3 leading-relaxed">
              {previewTemplate.description}
            </p>

            <h4 className="text-xs font-bold text-slate-800 mb-2">Assembled Component Blocks:</h4>
            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar p-1">
              {previewTemplate.blocks.map((b, i) => (
                <div key={b.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 capitalize">
                      {i + 1}. {b.type.replace('_', ' ')}
                    </span>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{b.title}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {b.styles.padding} padding
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const t = previewTemplate;
                  setPreviewTemplate(null);
                  handleUseTemplate(t);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm"
              >
                Create Page With This Template
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
