import React, { useState } from 'react';
import { Block } from '../../types';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Settings2, 
  GripVertical,
  CheckCircle2, 
  Sparkles, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Send,
  HelpCircle,
  TrendingUp,
  Users,
  Search,
  Layout
} from 'lucide-react';

interface BlockRendererProps {
  block: Block;
  index?: number;
  totalBlocks?: number;
  isBuilderMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  index = 0,
  totalBlocks = 1,
  isBuilderMode = false,
  isSelected = false,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  // FAQ accordion open states
  const [openFaqId, setOpenFaqId] = useState<string | null>(block.items?.[0]?.id || null);
  // Contact form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const paddingClasses = {
    sm: 'py-8 px-4 sm:px-6',
    md: 'py-12 px-4 sm:px-8',
    lg: 'py-16 px-4 sm:px-10',
    xl: 'py-24 px-4 sm:px-12',
  }[block.styles.padding || 'lg'];

  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[block.styles.align || 'center'];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 2000);
  };

  const renderContent = () => {
    switch (block.type) {
      case 'hero':
        return (
          <div 
            className="relative overflow-hidden rounded-2xl"
            style={{
              backgroundColor: block.styles.backgroundColor || '#0f172a',
              color: block.styles.textColor || '#ffffff',
            }}
          >
            {block.imageUrl && (
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url(${block.imageUrl})` }}
              />
            )}
            <div className={`relative z-10 max-w-4xl ${alignClasses} ${paddingClasses}`}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md mb-6 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Featured Presentation
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                {block.title}
              </h1>
              {block.subtitle && (
                <p className="text-base sm:text-lg opacity-85 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
                  {block.subtitle}
                </p>
              )}
              {block.buttonText && (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={block.buttonUrl || '#'}
                    onClick={(e) => {
                      if (isBuilderMode) e.preventDefault();
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                  >
                    {block.buttonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        );

      case 'features':
        return (
          <div 
            className="rounded-2xl"
            style={{
              backgroundColor: block.styles.backgroundColor || '#f8fafc',
              color: block.styles.textColor || '#0f172a',
            }}
          >
            <div className={`max-w-6xl mx-auto ${paddingClasses}`}>
              <div className={`max-w-3xl mb-12 ${alignClasses}`}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  {block.title}
                </h2>
                {block.subtitle && (
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    {block.subtitle}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {block.items?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                      {item.icon === 'Sparkles' ? (
                        <Sparkles className="w-5 h-5" />
                      ) : item.icon === 'Users' ? (
                        <Users className="w-5 h-5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div
            className="rounded-2xl"
            style={{
              backgroundColor: block.styles.backgroundColor || '#ffffff',
              color: block.styles.textColor || '#334155',
            }}
          >
            <div className={`max-w-4xl mx-auto ${paddingClasses}`}>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                {block.title}
              </h2>
              {block.subtitle && (
                <p className="text-sm font-medium text-indigo-600 mb-6">
                  {block.subtitle}
                </p>
              )}
              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-slate-700">
                {block.content}
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div
            className="rounded-2xl"
            style={{
              backgroundColor: block.styles.backgroundColor || '#4338ca',
              color: block.styles.textColor || '#ffffff',
            }}
          >
            <div className={`max-w-6xl mx-auto ${paddingClasses}`}>
              {block.title && (
                <h3 className="text-center text-lg sm:text-xl font-semibold opacity-90 mb-8">
                  {block.title}
                </h3>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {block.items?.map((item) => (
                  <div key={item.id} className="p-4 bg-white/10 rounded-xl backdrop-blur-xs border border-white/15">
                    <div className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-1">
                      {item.title}
                    </div>
                    <div className="text-xs sm:text-sm opacity-80 font-medium">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'image_banner':
        return (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: block.styles.backgroundColor || '#ffffff',
              color: block.styles.textColor || '#0f172a',
            }}
          >
            <div className={`max-w-5xl mx-auto ${paddingClasses}`}>
              {block.imageUrl ? (
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <img
                    src={block.imageUrl}
                    alt={block.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              ) : (
                <div className="h-64 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                  No Image Specified
                </div>
              )}
              {(block.title || block.subtitle) && (
                <div className={`mt-4 ${alignClasses}`}>
                  {block.title && <h3 className="text-lg font-bold text-slate-900">{block.title}</h3>}
                  {block.subtitle && <p className="text-xs text-slate-500 mt-1">{block.subtitle}</p>}
                </div>
              )}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div
            className="rounded-2xl"
            style={{
              backgroundColor: block.styles.backgroundColor || '#f1f5f9',
              color: block.styles.textColor || '#0f172a',
            }}
          >
            <div className={`max-w-6xl mx-auto ${paddingClasses}`}>
              <div className={`max-w-3xl mb-10 ${alignClasses}`}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {block.title}
                </h2>
                {block.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600">
                    {block.subtitle}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {block.items?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1 mb-3 text-amber-400">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      {item.avatar && (
                        <img
                          src={item.avatar}
                          alt={item.title}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div
            className="rounded-2xl shadow-lg"
            style={{
              backgroundColor: block.styles.backgroundColor || '#0f172a',
              color: block.styles.textColor || '#ffffff',
            }}
          >
            <div className={`max-w-4xl mx-auto ${alignClasses} ${paddingClasses}`}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                {block.title}
              </h2>
              {block.subtitle && (
                <p className="text-sm sm:text-base opacity-80 mb-6 max-w-xl mx-auto">
                  {block.subtitle}
                </p>
              )}
              {block.buttonText && (
                <a
                  href={block.buttonUrl || '#'}
                  onClick={(e) => {
                    if (isBuilderMode) e.preventDefault();
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition hover:scale-[1.02]"
                >
                  {block.buttonText}
                </a>
              )}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div
            className="rounded-2xl"
            style={{
              backgroundColor: block.styles.backgroundColor || '#ffffff',
              color: block.styles.textColor || '#0f172a',
            }}
          >
            <div className={`max-w-3xl mx-auto ${paddingClasses}`}>
              <div className={`mb-10 ${alignClasses}`}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {block.title}
                </h2>
                {block.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600">
                    {block.subtitle}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {block.items?.map((item) => {
                  const isOpen = openFaqId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-800 hover:bg-slate-100/60 transition"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                          {item.title}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                          {item.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div
            className="rounded-2xl"
            style={{
              backgroundColor: block.styles.backgroundColor || '#f8fafc',
              color: block.styles.textColor || '#0f172a',
            }}
          >
            <div className={`max-w-2xl mx-auto ${paddingClasses}`}>
              <div className={`mb-8 ${alignClasses}`}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {block.title}
                </h2>
                {block.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600">
                    {block.subtitle}
                  </p>
                )}
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-900 mb-1">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-700">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can we help your team?"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{block.buttonText || 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-100 rounded-xl">
            Unknown block type: {block.type}
          </div>
        );
    }
  };

  if (!isBuilderMode) {
    return (
      <div className="w-full transition-all">
        {renderContent()}
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onSelect}
      className={`group relative rounded-2xl transition-all cursor-pointer border-2 ${
        isSelected
          ? 'border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg'
          : 'border-transparent hover:border-slate-300'
      }`}
    >
      {/* Builder Hover / Selection Controls Header */}
      <div className={`absolute top-2 right-2 z-20 flex items-center gap-1 p-1 bg-slate-900/90 backdrop-blur-md rounded-lg shadow-md transition-opacity ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <div 
          className="p-1 text-slate-400 hover:text-white cursor-grab active:cursor-grabbing" 
          title="Drag block to reorder"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </div>

        <div className="h-3 w-px bg-slate-700 mx-0.5" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp?.();
          }}
          disabled={index === 0}
          title="Move block up"
          className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown?.();
          }}
          disabled={index === totalBlocks - 1}
          title="Move block down"
          className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
          title="Edit block properties"
          className="p-1 text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 rounded"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          title="Delete block"
          className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Block Type Badge Indicator */}
      <div className={`absolute top-2 left-2 z-20 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider shadow-xs transition-opacity ${
        isSelected
          ? 'bg-indigo-600 text-white font-bold opacity-100'
          : 'bg-slate-900/80 text-slate-300 opacity-0 group-hover:opacity-100'
      }`}>
        {block.type.replace('_', ' ')}
      </div>

      {/* Actual Block Content */}
      <div className="pointer-events-none">
        {renderContent()}
      </div>
    </div>
  );
};
