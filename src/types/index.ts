export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

export type PageStatus = 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';

export type BlockType = 
  | 'hero' 
  | 'features' 
  | 'content' 
  | 'image_banner' 
  | 'testimonials' 
  | 'cta' 
  | 'faq' 
  | 'contact'
  | 'stats';

export interface Block {
  id: string;
  type: BlockType;
  title: string;
  subtitle?: string;
  content?: string;
  buttonText?: string;
  buttonUrl?: string;
  imageUrl?: string;
  items?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    subtitle?: string;
    rating?: number;
    avatar?: string;
  }>;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    align?: 'left' | 'center' | 'right';
  };
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex: boolean;
  score?: number;
}

export interface ReviewComment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;
  comment: string;
  statusChange?: PageStatus;
  createdAt: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  authorName: string;
  status: PageStatus;
  blocks: Block[];
  seo: SeoSettings;
  comments: ReviewComment[];
  templateId?: string;
  views: number;
  uniqueVisitors: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Landing' | 'Blog' | 'Business' | 'Portfolio' | 'Product';
  thumbnailUrl: string;
  blocks: Block[];
  defaultSeo: SeoSettings;
}

export interface AnalyticsSummary {
  totalViews: number;
  totalUniqueVisitors: number;
  totalPublished: number;
  totalPendingReview: number;
  topPages: Array<{
    id: string;
    title: string;
    slug: string;
    views: number;
  }>;
  recentViewsDaily: Array<{
    date: string;
    views: number;
  }>;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
}
