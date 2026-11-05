import React from 'react';
import { BLOCK_BLUEPRINTS } from '../../data/defaultBlocks';
import { BlockType } from '../../types';
import { 
  LayoutTemplate, 
  Grid3X3, 
  FileText, 
  BarChart2, 
  Image, 
  MessageSquareQuote, 
  Megaphone, 
  HelpCircle, 
  Mail, 
  Plus,
  GripVertical
} from 'lucide-react';

interface BlockLibraryProps {
  onAddBlock: (type: BlockType) => void;
  onDragStartBlock?: (type: BlockType, e: React.DragEvent) => void;
}

export const BlockLibrary: React.FC<BlockLibraryProps> = ({ onAddBlock, onDragStartBlock }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'LayoutTemplate':
        return <LayoutTemplate className="w-4 h-4 text-indigo-500" />;
      case 'Grid3X3':
        return <Grid3X3 className="w-4 h-4 text-sky-500" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-amber-500" />;
      case 'BarChart2':
        return <BarChart2 className="w-4 h-4 text-emerald-500" />;
      case 'Image':
        return <Image className="w-4 h-4 text-rose-500" />;
      case 'MessageSquareQuote':
        return <MessageSquareQuote className="w-4 h-4 text-purple-500" />;
      case 'Megaphone':
        return <Megaphone className="w-4 h-4 text-orange-500" />;
      case 'HelpCircle':
        return <HelpCircle className="w-4 h-4 text-cyan-500" />;
      case 'Mail':
        return <Mail className="w-4 h-4 text-teal-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-80 shrink-0">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Component Blocks
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Click or drag blocks onto canvas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
        {BLOCK_BLUEPRINTS.map((bp) => (
          <div
            key={bp.type}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', bp.type);
              onDragStartBlock?.(bp.type, e);
            }}
            onClick={() => onAddBlock(bp.type)}
            className="group flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-400 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              {getIcon(bp.iconName)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {bp.label}
                </span>
                <span className="text-[10px] text-indigo-600 opacity-0 group-hover:opacity-100 font-semibold flex items-center gap-0.5 transition-opacity">
                  <Plus className="w-3 h-3" /> Add
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                {bp.description}
              </p>
            </div>

            <GripVertical className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
