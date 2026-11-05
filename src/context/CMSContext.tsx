import React, { createContext, useContext, useState, useEffect } from 'react';
import { Page, PageStatus, Block, BlockType, SeoSettings, ReviewComment, PageTemplate, AnalyticsSummary } from '../types';
import { SEED_PAGES, SEED_TEMPLATES } from '../data/seedData';
import { BLOCK_BLUEPRINTS } from '../data/defaultBlocks';
import { useAuth } from './AuthContext';

interface CMSContextType {
  pages: Page[];
  templates: PageTemplate[];
  getPageById: (id: string) => Page | undefined;
  getPageBySlug: (slug: string) => Page | undefined;
  createPage: (title: string, slug?: string, templateId?: string) => Page;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => Page;
  
  // Block manipulation for Drag and Drop builder
  addBlock: (pageId: string, type: BlockType, targetIndex?: number) => void;
  updateBlock: (pageId: string, blockId: string, updates: Partial<Block>) => void;
  removeBlock: (pageId: string, blockId: string) => void;
  moveBlock: (pageId: string, fromIndex: number, toIndex: number) => void;
  
  // Collaborative Approval Workflow
  submitForReview: (pageId: string, authorComment?: string) => void;
  approveAndPublish: (pageId: string, reviewerComment?: string) => void;
  rejectPage: (pageId: string, feedbackComment: string) => void;
  unpublishPage: (pageId: string) => void;
  addReviewComment: (pageId: string, commentText: string, statusChange?: PageStatus) => void;
  
  // SEO optimization
  updateSeo: (pageId: string, seoUpdates: Partial<SeoSettings>) => void;
  calculateSeoScore: (page: Page) => number;
  
  // Analytics tracking
  recordPageView: (pageId: string) => void;
  getAnalyticsSummary: () => AnalyticsSummary;
  
  // Reset demo data helper
  resetToSeedData: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const PAGES_STORAGE_KEY = 'cms_app_pages_v1';
const TEMPLATES_STORAGE_KEY = 'cms_app_templates_v1';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [pages, setPages] = useState<Page[]>(() => {
    try {
      const stored = localStorage.getItem(PAGES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading pages from localStorage', e);
    }
    return SEED_PAGES;
  });

  const [templates] = useState<PageTemplate[]>(() => {
    try {
      const stored = localStorage.getItem(TEMPLATES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading templates from localStorage', e);
    }
    return SEED_TEMPLATES;
  });

  // Sync pages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
    } catch (e) {
      console.error('Failed saving pages to localStorage', e);
    }
  }, [pages]);

  const getPageById = (id: string) => pages.find((p) => p.id === id);

  const getPageBySlug = (slug: string) => {
    const cleanSlug = slug.replace(/^\/+|\/+$/g, '').toLowerCase();
    return pages.find((p) => p.slug.toLowerCase() === cleanSlug);
  };

  const calculateSeoScore = (page: Page): number => {
    let score = 50; // base score

    // Meta Title length (optimal: 30 - 65 chars)
    const titleLen = page.seo.metaTitle?.length || 0;
    if (titleLen >= 30 && titleLen <= 65) {
      score += 15;
    } else if (titleLen > 10) {
      score += 8;
    }

    // Meta Description length (optimal: 100 - 160 chars)
    const descLen = page.seo.metaDescription?.length || 0;
    if (descLen >= 80 && descLen <= 170) {
      score += 15;
    } else if (descLen > 30) {
      score += 8;
    }

    // Focus Keywords
    if (page.seo.focusKeywords && page.seo.focusKeywords.length > 0) {
      score += 10;
      // Check if keyword appears in title or description
      const firstKw = page.seo.focusKeywords[0]?.toLowerCase();
      if (firstKw && page.seo.metaTitle.toLowerCase().includes(firstKw)) {
        score += 5;
      }
    }

    // Page content blocks check
    if (page.blocks.length >= 3) {
      score += 5;
    }

    return Math.min(100, Math.max(10, score));
  };

  const createPage = (title: string, slug?: string, templateId?: string): Page => {
    const generatedSlug = slug
      ? slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const selectedTemplate = templateId ? templates.find((t) => t.id === templateId) : null;

    const newBlocks: Block[] = selectedTemplate
      ? JSON.parse(JSON.stringify(selectedTemplate.blocks)).map((b: Block) => ({
          ...b,
          id: 'block_' + Math.random().toString(36).substring(2, 9),
        }))
      : [
          BLOCK_BLUEPRINTS[0].createDefault(), // Hero
          BLOCK_BLUEPRINTS[1].createDefault(), // Features
          BLOCK_BLUEPRINTS[6].createDefault(), // CTA
        ];

    const newPage: Page = {
      id: 'page_' + Date.now().toString(36),
      title: title.trim() || 'Untitled Page',
      slug: generatedSlug || 'page-' + Date.now().toString(36),
      authorId: currentUser?.id || 'anonymous',
      authorName: currentUser?.name || 'Content Editor',
      status: 'draft',
      templateId: templateId || undefined,
      views: 0,
      uniqueVisitors: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: selectedTemplate?.defaultSeo
        ? { ...selectedTemplate.defaultSeo, metaTitle: title }
        : {
            metaTitle: `${title} | My Website`,
            metaDescription: `Discover more about ${title}. Managed with our React CMS.`,
            focusKeywords: [title.toLowerCase().slice(0, 15)],
            noIndex: false,
            score: 70,
          },
      comments: [
        {
          id: 'cm_' + Date.now().toString(36),
          userId: currentUser?.id || 'system',
          userName: currentUser?.name || 'System',
          userRole: currentUser?.role || 'editor',
          comment: `Page initialized${selectedTemplate ? ` using template "${selectedTemplate.name}"` : ''}.`,
          statusChange: 'draft',
          createdAt: new Date().toISOString(),
        },
      ],
      blocks: newBlocks,
    };

    newPage.seo.score = calculateSeoScore(newPage);

    setPages((prev) => [newPage, ...prev]);
    return newPage;
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        if (updates.seo || updates.title || updates.blocks) {
          updated.seo = {
            ...updated.seo,
            score: calculateSeoScore(updated),
          };
        }
        return updated;
      })
    );
  };

  const deletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const duplicatePage = (id: string): Page => {
    const existing = pages.find((p) => p.id === id);
    if (!existing) throw new Error('Page not found');

    const duplicated: Page = {
      ...JSON.parse(JSON.stringify(existing)),
      id: 'page_' + Date.now().toString(36),
      title: `${existing.title} (Copy)`,
      slug: `${existing.slug}-copy-${Math.floor(Math.random() * 900 + 100)}`,
      status: 'draft',
      views: 0,
      uniqueVisitors: 0,
      authorId: currentUser?.id || existing.authorId,
      authorName: currentUser?.name || existing.authorName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: undefined,
      comments: [
        {
          id: 'cm_' + Date.now().toString(36),
          userId: currentUser?.id || 'system',
          userName: currentUser?.name || 'System',
          userRole: currentUser?.role || 'editor',
          comment: `Cloned from page "${existing.title}".`,
          statusChange: 'draft',
          createdAt: new Date().toISOString(),
        },
      ],
    };

    setPages((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  // Block management
  const addBlock = (pageId: string, type: BlockType, targetIndex?: number) => {
    const blueprint = BLOCK_BLUEPRINTS.find((b) => b.type === type) || BLOCK_BLUEPRINTS[0];
    const newBlock = blueprint.createDefault();

    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        const updatedBlocks = [...p.blocks];
        if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= updatedBlocks.length) {
          updatedBlocks.splice(targetIndex, 0, newBlock);
        } else {
          updatedBlocks.push(newBlock);
        }
        return {
          ...p,
          blocks: updatedBlocks,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const updateBlock = (pageId: string, blockId: string, updates: Partial<Block>) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          blocks: p.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const removeBlock = (pageId: string, blockId: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          blocks: p.blocks.filter((b) => b.id !== blockId),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const moveBlock = (pageId: string, fromIndex: number, toIndex: number) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        if (fromIndex < 0 || fromIndex >= p.blocks.length || toIndex < 0 || toIndex >= p.blocks.length) {
          return p;
        }
        const updatedBlocks = [...p.blocks];
        const [movedItem] = updatedBlocks.splice(fromIndex, 1);
        updatedBlocks.splice(toIndex, 0, movedItem);
        return {
          ...p,
          blocks: updatedBlocks,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // Workflow Approvals
  const submitForReview = (pageId: string, authorComment?: string) => {
    const comment: ReviewComment = {
      id: 'cm_' + Date.now().toString(36),
      userId: currentUser?.id || 'editor',
      userName: currentUser?.name || 'Author',
      userRole: currentUser?.role || 'editor',
      comment: authorComment || 'Page submitted for editorial approval.',
      statusChange: 'pending_review',
      createdAt: new Date().toISOString(),
    };

    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          status: 'pending_review',
          comments: [comment, ...p.comments],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const approveAndPublish = (pageId: string, reviewerComment?: string) => {
    const comment: ReviewComment = {
      id: 'cm_' + Date.now().toString(36),
      userId: currentUser?.id || 'admin',
      userName: currentUser?.name || 'Admin',
      userRole: currentUser?.role || 'admin',
      comment: reviewerComment || 'Approved and published to production website.',
      statusChange: 'published',
      createdAt: new Date().toISOString(),
    };

    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          status: 'published',
          publishedAt: new Date().toISOString(),
          comments: [comment, ...p.comments],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const rejectPage = (pageId: string, feedbackComment: string) => {
    const comment: ReviewComment = {
      id: 'cm_' + Date.now().toString(36),
      userId: currentUser?.id || 'admin',
      userName: currentUser?.name || 'Admin',
      userRole: currentUser?.role || 'admin',
      comment: feedbackComment || 'Changes requested before publishing approval.',
      statusChange: 'draft',
      createdAt: new Date().toISOString(),
    };

    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          status: 'draft',
          comments: [comment, ...p.comments],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const unpublishPage = (pageId: string) => {
    const comment: ReviewComment = {
      id: 'cm_' + Date.now().toString(36),
      userId: currentUser?.id || 'admin',
      userName: currentUser?.name || 'Admin',
      userRole: currentUser?.role || 'admin',
      comment: 'Page unpublished and converted back to draft status.',
      statusChange: 'draft',
      createdAt: new Date().toISOString(),
    };

    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          status: 'draft',
          comments: [comment, ...p.comments],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const addReviewComment = (pageId: string, commentText: string, statusChange?: PageStatus) => {
    const comment: ReviewComment = {
      id: 'cm_' + Date.now().toString(36),
      userId: currentUser?.id || 'user',
      userName: currentUser?.name || 'Team Member',
      userRole: currentUser?.role || 'editor',
      comment: commentText,
      statusChange,
      createdAt: new Date().toISOString(),
    };

    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          status: statusChange || p.status,
          comments: [comment, ...p.comments],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // SEO updates
  const updateSeo = (pageId: string, seoUpdates: Partial<SeoSettings>) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        const updatedSeo = { ...p.seo, ...seoUpdates };
        const updatedPage = { ...p, seo: updatedSeo };
        updatedPage.seo.score = calculateSeoScore(updatedPage);
        return updatedPage;
      })
    );
  };

  // Analytics tracking
  const recordPageView = (pageId: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          views: (p.views || 0) + 1,
          uniqueVisitors: (p.uniqueVisitors || 0) + 1,
        };
      })
    );
  };

  const getAnalyticsSummary = (): AnalyticsSummary => {
    const totalViews = pages.reduce((acc, p) => acc + (p.views || 0), 0);
    const totalUniqueVisitors = pages.reduce((acc, p) => acc + (p.uniqueVisitors || 0), 0);
    const totalPublished = pages.filter((p) => p.status === 'published').length;
    const totalPendingReview = pages.filter((p) => p.status === 'pending_review').length;

    const topPages = [...pages]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        views: p.views || 0,
      }));

    // Realistic daily trend distribution
    const recentViewsDaily = [
      { date: 'Mon', views: Math.round(totalViews * 0.12) },
      { date: 'Tue', views: Math.round(totalViews * 0.15) },
      { date: 'Wed', views: Math.round(totalViews * 0.18) },
      { date: 'Thu', views: Math.round(totalViews * 0.22) },
      { date: 'Fri', views: Math.round(totalViews * 0.19) },
      { date: 'Sat', views: Math.round(totalViews * 0.08) },
      { date: 'Sun', views: Math.round(totalViews * 0.06) },
    ];

    return {
      totalViews,
      totalUniqueVisitors,
      totalPublished,
      totalPendingReview,
      topPages,
      recentViewsDaily,
      deviceBreakdown: {
        desktop: 62,
        mobile: 31,
        tablet: 7,
      },
    };
  };

  const resetToSeedData = () => {
    localStorage.removeItem(PAGES_STORAGE_KEY);
    localStorage.removeItem(TEMPLATES_STORAGE_KEY);
    setPages(SEED_PAGES);
  };

  return (
    <CMSContext.Provider
      value={{
        pages,
        templates,
        getPageById,
        getPageBySlug,
        createPage,
        updatePage,
        deletePage,
        duplicatePage,
        addBlock,
        updateBlock,
        removeBlock,
        moveBlock,
        submitForReview,
        approveAndPublish,
        rejectPage,
        unpublishPage,
        addReviewComment,
        updateSeo,
        calculateSeoScore,
        recordPageView,
        getAnalyticsSummary,
        resetToSeedData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
