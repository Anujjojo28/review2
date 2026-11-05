import React from 'react';
import { Block } from '../../types';
import { 
  X, 
  Trash2, 
  Plus, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Palette,
  Maximize2
} from 'lucide-react';

interface BlockInspectorProps {
  block: Block | null;
  onUpdate: (updates: Partial<Block>) => void;
  onClose: () => void;
  onDelete: () => void;
}

export const BlockInspector: React.FC<BlockInspectorProps> = ({
  block,
  onUpdate,
  onClose,
  onDelete,
}) => {
  if (!block) {
    return (
      <div className="w-80 bg-white border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Maximize2 className="w-8 h-8 mb-2 opacity-40" />
        <p className="text-xs font-medium">Select any block on the canvas to configure its content and styling.</p>
      </div>
    );
  }

  const handleItemChange = (itemId: string, field: string, value: any) => {
    if (!block.items) return;
    const updatedItems = block.items.map((it) =>
      it.id === itemId ? { ...it, [field]: value } : it
    );
    onUpdate({ items: updatedItems });
  };

  const handleAddItem = () => {
    const newItem = {
      id: 'item_' + Date.now().toString(36),
      title: 'New Item Title',
      description: 'Add a helpful description or highlight here.',
    };
    onUpdate({ items: [...(block.items || []), newItem] });
  };

  const handleRemoveItem = (itemId: string) => {
    if (!block.items) return;
    onUpdate({ items: block.items.filter((it) => it.id !== itemId) });
  };

  return (
    <div className="w-84 bg-white border-l border-slate-200 flex flex-col h-full shrink-0 shadow-lg z-30">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
            {block.type.replace('_', ' ')}
          </span>
          <h3 className="text-xs font-bold text-slate-900 mt-1">Block Properties</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onDelete}
            title="Delete Block"
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            title="Close Inspector"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs">
        
        {/* Title */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Headline / Title
          </label>
          <input
            type="text"
            value={block.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Subtitle / Tagline
          </label>
          <textarea
            rows={2}
            value={block.subtitle || ''}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Content Paragraphs (if applicable) */}
        {block.type === 'content' && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Body Content
            </label>
            <textarea
              rows={8}
              value={block.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-[11px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        )}

        {/* Button Settings (if hero, cta, or contact) */}
        {(block.type === 'hero' || block.type === 'cta' || block.type === 'contact') && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-[11px] font-bold text-slate-700 block">Call-to-Action Action</span>
            <div>
              <label className="block text-[10px] text-slate-500 mb-1">Button Label</label>
              <input
                type="text"
                value={block.buttonText || ''}
                onChange={(e) => onUpdate({ buttonText: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md bg-white text-xs"
              />
            </div>
            {block.type !== 'contact' && (
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Button Link / Anchor</label>
                <input
                  type="text"
                  value={block.buttonUrl || ''}
                  onChange={(e) => onUpdate({ buttonUrl: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md bg-white text-xs"
                />
              </div>
            )}
          </div>
        )}

        {/* Image URL (if hero or image_banner) */}
        {(block.type === 'hero' || block.type === 'image_banner') && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={block.imageUrl || ''}
              onChange={(e) => onUpdate({ imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
            {block.imageUrl && (
              <img
                src={block.imageUrl}
                alt="Preview"
                className="mt-2 w-full h-24 object-cover rounded-lg border border-slate-200"
              />
            )}
          </div>
        )}

        {/* Layout & Styling */}
        <div className="pt-2 border-t border-slate-200 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            <span>Style & Layout</span>
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-[10px] text-slate-500 mb-1.5">Text Alignment</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => onUpdate({ styles: { ...block.styles, align: 'left' } })}
                className={`py-1.5 flex items-center justify-center rounded text-xs font-medium ${
                  block.styles.align === 'left' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-600'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ styles: { ...block.styles, align: 'center' } })}
                className={`py-1.5 flex items-center justify-center rounded text-xs font-medium ${
                  block.styles.align === 'center' || !block.styles.align ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-600'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ styles: { ...block.styles, align: 'right' } })}
                className={`py-1.5 flex items-center justify-center rounded text-xs font-medium ${
                  block.styles.align === 'right' ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-600'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Padding */}
          <div>
            <label className="block text-[10px] text-slate-500 mb-1.5">Vertical Padding</label>
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg text-center">
              {(['sm', 'md', 'lg', 'xl'] as const).map((pad) => (
                <button
                  key={pad}
                  type="button"
                  onClick={() => onUpdate({ styles: { ...block.styles, padding: pad } })}
                  className={`py-1 uppercase text-[10px] font-semibold rounded ${
                    block.styles.padding === pad ? 'bg-white shadow-xs text-indigo-600' : 'text-slate-600'
                  }`}
                >
                  {pad}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-500 mb-1">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={block.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => onUpdate({ styles: { ...block.styles, backgroundColor: e.target.value } })}
                  className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={block.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => onUpdate({ styles: { ...block.styles, backgroundColor: e.target.value } })}
                  className="w-full px-2 py-1 text-[11px] font-mono border border-slate-200 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={block.styles.textColor || '#0f172a'}
                  onChange={(e) => onUpdate({ styles: { ...block.styles, textColor: e.target.value } })}
                  className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={block.styles.textColor || '#0f172a'}
                  onChange={(e) => onUpdate({ styles: { ...block.styles, textColor: e.target.value } })}
                  className="w-full px-2 py-1 text-[11px] font-mono border border-slate-200 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Multi-items editor (Features, FAQs, Testimonials, Stats) */}
        {block.items && (
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                List Items ({block.items.length})
              </span>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {block.items.map((item, idx) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Title / Name"
                    value={item.title}
                    onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded bg-white"
                  />

                  {item.subtitle !== undefined && (
                    <input
                      type="text"
                      placeholder="Role / Subtitle"
                      value={item.subtitle}
                      onChange={(e) => handleItemChange(item.id, 'subtitle', e.target.value)}
                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded bg-white"
                    />
                  )}

                  <textarea
                    rows={2}
                    placeholder="Description / Body"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded bg-white resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
