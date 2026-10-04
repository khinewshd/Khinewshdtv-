export type Language = 'ur' | 'en' | 'ar';

export type NewsCategory =
  | 'Breaking News'
  | 'Latest News'
  | 'Karachi'
  | 'Sindh'
  | 'Pakistan'
  | 'World'
  | 'Politics'
  | 'Crime'
  | 'Business'
  | 'Sports'
  | 'Entertainment'
  | 'Technology'
  | 'Health'
  | 'Lifestyle'
  | 'Weather'
  | 'Videos'
  | 'Interviews'
  | 'Vlogs'
  | 'Special Reports'
  | 'Property';

export type ArticleStatus =
  | 'draft'
  | 'ai_processing'
  | 'translation_ready'
  | 'editor_review'
  | 'approved'
  | 'scheduled'
  | 'published';

export type EditorialRole =
  | 'admin'
  | 'editor_in_chief'
  | 'bureau_chief'
  | 'sub_editor'
  | 'reporter'
  | 'social_media_manager';

export interface SeoPackage {
  title: string;
  metaDescription: string;
  keywords: string[];
  slug: string;
}

export interface SocialMediaPackage {
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: {
    title: string;
    description: string;
    tags: string[];
  };
  x: string;
  whatsapp: string;
  telegram: string;
}

export interface ArticleComment {
  id: string;
  author: string;
  city: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Article {
  id: string;
  // Multilingual Core Fields
  titleUr: string;
  titleEn: string;
  titleAr: string;
  
  hookUr: string;
  summaryEn: string;
  summaryAr: string;
  
  contentUr: string;
  contentEn: string;
  contentAr: string;

  // Metadata
  category: NewsCategory;
  subcategory?: string;
  tags: string[];
  reporter: string;
  location: string;
  source: string;
  
  // Media
  imageUrl: string;
  imageCaptionUr?: string;
  imageCaptionEn?: string;
  videoUrl?: string; // YouTube / Live URL
  galleryUrls?: string[];

  // Flags & Editorial Controls
  isBreaking: boolean;
  isFeatured: boolean;
  isDeveloping: boolean;
  priority: 'urgent' | 'high' | 'normal';
  status: ArticleStatus;

  // AI & Translation States
  sourceLanguage: Language;
  aiFlags: {
    enGenerated: boolean;
    arGenerated: boolean;
    urGenerated: boolean;
    enReviewed: boolean;
    arReviewed: boolean;
    urReviewed: boolean;
  };

  // SEO & Social
  seo: {
    ur: SeoPackage;
    en: SeoPackage;
    ar: SeoPackage;
  };
  social: SocialMediaPackage;
  pushNotification: {
    ur: string;
    en: string;
    ar: string;
  };

  // Sensitivity & Legal
  isSensitive: boolean;
  sensitivityReason?: string;
  disclaimer?: string;

  // Timestamps & Metrics
  publishedAt: string;
  updatedAt: string;
  views: number;
  shares: number;
  comments: ArticleComment[];
}

export interface AdSlot {
  id: string;
  title: string;
  position: 'header' | 'in_feed' | 'sidebar' | 'article_top' | 'article_body' | 'property_spotlight';
  imageUrl: string;
  targetUrl: string;
  sponsorName: string;
  status: 'active' | 'paused' | 'scheduled';
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
}

export interface PushNotificationRecord {
  id: string;
  title: string;
  message: string;
  language: Language | 'all';
  sentAt: string;
  recipientsCount: number;
  status: 'sent' | 'scheduled';
  articleId?: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  userName: string;
  userRole: EditorialRole;
  timestamp: string;
  details: string;
}
