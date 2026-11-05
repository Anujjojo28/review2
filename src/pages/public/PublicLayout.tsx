import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { Globe, ArrowLeft, Layers, ShieldCheck, Heart } from 'lucide-react';

interface PublicLayoutProps {
  currentSlug?: string;
  onNavigatePage: (slug: string) => void;
  onReturnToAdmin: () => void;
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  currentSlug,
  onNavigatePage,
  onReturnToAdmin,
  children,
}) => {
  const { pages } = useCMS();
  const { currentUser } = useAuth();

  const publishedPages = pages.filter((p) => p.status === 'published');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Banner: CMS Control Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Public Website Mode
          </span>
          <span className="hidden sm:inline text-slate-400">&bull;</span>
          <span className="hidden sm:inline text-slate-300">
            Rendered live from CMS Local Storage
          </span>
        </div>

        <button
          onClick={onReturnToAdmin}
          className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to CMS Dashboard</span>
        </button>
      </div>

      {/* Website Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Website Logo */}
            <div 
              onClick={() => onNavigatePage('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Nexus Portal
              </span>
            </div>

            {/* Dynamic Navigation from Published Pages */}
            <nav className="flex items-center space-x-1 sm:space-x-3 overflow-x-auto py-2">
              <button
                onClick={() => onNavigatePage('home')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  currentSlug === 'home' || !currentSlug
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Home
              </button>

              {publishedPages
                .filter((p) => p.slug !== 'home')
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onNavigatePage(p.slug)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                      currentSlug === p.slug
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
            </nav>

          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Public Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-bold">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>NexusCMS Digital Experience</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with React + Vite</span>
            <span>&bull;</span>
            <span>Vercel Edge Ready</span>
            <span>&bull;</span>
            <span>Drag & Drop Blocks</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            &copy; {new Date().getFullYear()} NexusCMS Platform. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};
