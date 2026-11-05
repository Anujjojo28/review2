import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { BlockRenderer } from '../../components/builder/BlockRenderer';
import { PublicLayout } from './PublicLayout';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface LivePageProps {
  slug: string;
  onNavigatePage: (slug: string) => void;
  onReturnToAdmin: () => void;
}

export const LivePage: React.FC<LivePageProps> = ({ slug, onNavigatePage, onReturnToAdmin }) => {
  const { getPageBySlug, recordPageView } = useCMS();

  const page = getPageBySlug(slug);

  // Record pageview and set document title
  useEffect(() => {
    if (page) {
      recordPageView(page.id);
      document.title = page.seo.metaTitle || `${page.title} | Live Website`;
    }
  }, [slug, page?.id]);

  if (!page) {
    return (
      <PublicLayout currentSlug={slug} onNavigatePage={onNavigatePage} onReturnToAdmin={onReturnToAdmin}>
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">404 - Page Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">
            The page you are looking for does not exist or has not been published yet.
          </p>
          <button
            onClick={() => onNavigatePage('home')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
          >
            Go to Home
          </button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout currentSlug={slug} onNavigatePage={onNavigatePage} onReturnToAdmin={onReturnToAdmin}>
      <div className="space-y-8 animate-in fade-in duration-300">
        {page.blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isBuilderMode={false}
          />
        ))}
      </div>
    </PublicLayout>
  );
};
