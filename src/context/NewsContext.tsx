import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  Language,
  NewsCategory,
  EditorialRole,
  AdSlot,
  PushNotificationRecord,
  AuditLogItem,
  ArticleComment,
} from '../types';
import { INITIAL_ARTICLES, INITIAL_AD_SLOTS } from '../data/initialArticles';

export type ViewState =
  | { type: 'home' }
  | { type: 'article'; articleId: string }
  | { type: 'category'; category: NewsCategory }
  | { type: 'admin'; subTab?: string }
  | { type: 'breaking_archive' };

interface NewsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  articles: Article[];
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  selectedCategory: NewsCategory | 'All';
  setSelectedCategory: (cat: NewsCategory | 'All') => void;
  breakingArticles: Article[];
  liveStreamOpen: boolean;
  setLiveStreamOpen: (open: boolean) => void;
  smartSearchOpen: boolean;
  setSmartSearchOpen: (open: boolean) => void;
  userRole: EditorialRole;
  setUserRole: (role: EditorialRole) => void;
  adSlots: AdSlot[];
  recordAdClick: (adId: string) => void;
  pushNotifications: PushNotificationRecord[];
  sendPushNotification: (title: string, message: string, lang: Language | 'all', articleId?: string) => void;
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, details: string) => void;
  saveArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  publishStoryOnce: (
    sourceLanguage: Language,
    storyData: {
      id?: string;
      title: string;
      hook: string;
      content: string;
      category: NewsCategory;
      location: string;
      reporter: string;
      source: string;
      imageUrl: string;
      videoUrl?: string;
      isBreaking: boolean;
      isFeatured: boolean;
      priority: 'urgent' | 'high' | 'normal';
    }
  ) => Promise<{ success: boolean; article?: Article; error?: string }>;
  postComment: (articleId: string, author: string, city: string, content: string) => void;
  likeComment: (articleId: string, commentId: string) => void;
  activeToast: { title: string; message: string; lang: Language } | null;
  dismissToast: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ur');
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('khi_news_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'home' });
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'All'>('All');
  const [liveStreamOpen, setLiveStreamOpen] = useState(false);
  const [smartSearchOpen, setSmartSearchOpen] = useState(false);
  const [userRole, setUserRole] = useState<EditorialRole>('editor_in_chief');
  const [adSlots, setAdSlots] = useState<AdSlot[]>(INITIAL_AD_SLOTS);
  const [pushNotifications, setPushNotifications] = useState<PushNotificationRecord[]>([
    {
      id: 'pn-1',
      title: '🚨 ریڈ لائن بی آر ٹی اپ ڈیٹ',
      message: 'کراچی: یونیورسٹی روڈ پر 24 گھنٹے کام کی منظوری، پہلی بسیں اگلے ماہ پہنچیں گی',
      language: 'ur',
      sentAt: new Date(Date.now() - 3600000).toISOString(),
      recipientsCount: 45200,
      status: 'sent',
      articleId: 'khi-101',
    },
  ]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    {
      id: 'log-1',
      action: 'ARTICLE_PUBLISHED',
      userName: 'Tariq Mehmood',
      userRole: 'bureau_chief',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      details: 'Published Red Line BRT Karachi story across Urdu, English, and Arabic',
    },
  ]);
  const [activeToast, setActiveToast] = useState<{ title: string; message: string; lang: Language } | null>(null);

  // Sync HTML lang and dir attribute
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const htmlEl = document.documentElement;
    htmlEl.lang = lang;
    htmlEl.dir = lang === 'en' ? 'ltr' : 'rtl';
  };

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.lang = language;
    htmlEl.dir = language === 'en' ? 'ltr' : 'rtl';
  }, [language]);

  // Persist articles
  useEffect(() => {
    localStorage.setItem('khi_news_articles', JSON.stringify(articles));
  }, [articles]);

  const breakingArticles = articles.filter(
    (a) => (a.isBreaking || a.priority === 'urgent') && a.status === 'published'
  );

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      action,
      userName: userRole === 'editor_in_chief' ? 'Editor-in-Chief' : userRole.toUpperCase(),
      userRole,
      timestamp: new Date().toISOString(),
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const recordAdClick = (adId: string) => {
    setAdSlots((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, clicks: ad.clicks + 1 } : ad))
    );
  };

  const sendPushNotification = (
    title: string,
    message: string,
    lang: Language | 'all',
    articleId?: string
  ) => {
    const newPN: PushNotificationRecord = {
      id: `pn-${Date.now()}`,
      title,
      message,
      language: lang,
      sentAt: new Date().toISOString(),
      recipientsCount: Math.floor(Math.random() * 20000) + 30000,
      status: 'sent',
      articleId,
    };
    setPushNotifications((prev) => [newPN, ...prev]);
    setActiveToast({
      title,
      message,
      lang: lang === 'all' ? language : lang,
    });
    addAuditLog('PUSH_NOTIFICATION_SENT', `Sent alert "${title}" to ${lang.toUpperCase()} subscribers`);
  };

  const dismissToast = () => setActiveToast(null);

  const saveArticle = (article: Article) => {
    setArticles((prev) => {
      const idx = prev.findIndex((a) => a.id === article.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...article, updatedAt: new Date().toISOString() };
        return copy;
      }
      return [{ ...article, publishedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...prev];
    });
    addAuditLog('ARTICLE_SAVED', `Updated story "${article.titleUr || article.titleEn}" [Status: ${article.status}]`);
  };

  const deleteArticle = (id: string) => {
    const target = articles.find((a) => a.id === id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
    addAuditLog('ARTICLE_DELETED', `Deleted story "${target?.titleUr || id}"`);
  };

  // Master Core Feature: Publish Once, Automatically Publish in 3 Languages
  const publishStoryOnce = async (
    sourceLanguage: Language,
    storyData: {
      id?: string;
      title: string;
      hook: string;
      content: string;
      category: NewsCategory;
      location: string;
      reporter: string;
      source: string;
      imageUrl: string;
      videoUrl?: string;
      isBreaking: boolean;
      isFeatured: boolean;
      priority: 'urgent' | 'high' | 'normal';
    }
  ): Promise<{ success: boolean; article?: Article; error?: string }> => {
    try {
      // Call server-side Gemini API
      const res = await fetch('/api/ai/translate-and-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: storyData.title,
          hook: storyData.hook,
          content: storyData.content,
          sourceLanguage,
          category: storyData.category,
          location: storyData.location,
        }),
      });

      if (!res.ok) {
        throw new Error(`AI processing failed with status ${res.status}`);
      }

      const data = await res.json();
      const articleId = storyData.id || `khi-${Date.now()}`;

      // Assemble complete 3-language unified article
      const newArticle: Article = {
        id: articleId,
        titleUr: sourceLanguage === 'ur' ? storyData.title : data.translations?.ur?.title || storyData.title,
        titleEn: sourceLanguage === 'en' ? storyData.title : data.translations?.en?.title || storyData.title,
        titleAr: sourceLanguage === 'ar' ? storyData.title : data.translations?.ar?.title || storyData.title,

        hookUr: sourceLanguage === 'ur' ? storyData.hook : data.translations?.ur?.summary || storyData.hook,
        summaryEn: sourceLanguage === 'en' ? storyData.hook : data.translations?.en?.summary || storyData.hook,
        summaryAr: sourceLanguage === 'ar' ? storyData.hook : data.translations?.ar?.summary || storyData.hook,

        contentUr: sourceLanguage === 'ur' ? storyData.content : data.translations?.ur?.content || storyData.content,
        contentEn: sourceLanguage === 'en' ? storyData.content : data.translations?.en?.content || storyData.content,
        contentAr: sourceLanguage === 'ar' ? storyData.content : data.translations?.ar?.content || storyData.content,

        category: storyData.category,
        tags: [storyData.category, storyData.location.split('-')[0].trim(), 'KHI NEWS HD TV'],
        reporter: storyData.reporter || 'KHI News Staff',
        location: storyData.location || 'Karachi, Pakistan',
        source: storyData.source || 'KHI News Desk',

        imageUrl:
          storyData.imageUrl ||
          'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
        videoUrl: storyData.videoUrl,

        isBreaking: storyData.isBreaking,
        isFeatured: storyData.isFeatured,
        isDeveloping: false,
        priority: storyData.priority,
        status: 'published',
        sourceLanguage,

        aiFlags: {
          urGenerated: sourceLanguage !== 'ur',
          enGenerated: sourceLanguage !== 'en',
          arGenerated: sourceLanguage !== 'ar',
          urReviewed: true,
          enReviewed: true,
          arReviewed: true,
        },

        seo: {
          ur: data.translations?.ur || {
            title: `${storyData.title} | کے ایچ آئی نیوز ایچ ڈی ٹی وی`,
            metaDescription: storyData.hook || storyData.content.slice(0, 150),
            keywords: ['کراچی', 'خبریں', 'کے ایچ آئی نیوز'],
            slug: `karachi-news-${articleId}`,
          },
          en: data.translations?.en || {
            title: `${data.translations?.en?.title || storyData.title} | KHI NEWS HD TV`,
            metaDescription: data.translations?.en?.summary || storyData.content.slice(0, 150),
            keywords: ['Karachi', 'Breaking News', 'KHI News'],
            slug: `karachi-news-${articleId}-en`,
          },
          ar: data.translations?.ar || {
            title: `${data.translations?.ar?.title || storyData.title} | تلفزيون كراتشي`,
            metaDescription: data.translations?.ar?.summary || storyData.content.slice(0, 150),
            keywords: ['كراتشي', 'باكستان', 'أخبار عاجلة'],
            slug: `karachi-news-${articleId}-ar`,
          },
        },

        social: data.social || {
          facebook: `🚨 KHI NEWS HD TV | ${storyData.title}\n\n${storyData.hook}`,
          instagram: `🚨 ${storyData.title}\n\n#Karachi #KHINewsHD`,
          tiktok: `⚡ کراچی کی بڑی خبر: ${storyData.title}`,
          youtube: {
            title: `${storyData.title} | KHI NEWS HD TV`,
            description: storyData.content,
            tags: ['Karachi News', 'KHI News HD TV'],
          },
          x: `🚨 BREAKING: ${storyData.title.slice(0, 200)} #Karachi`,
          whatsapp: `*🚨 KHI NEWS HD TV ALERT*\n\n${storyData.title}`,
          telegram: `📢 *KHI NEWS HD TV* — ${storyData.title}`,
        },

        pushNotification: data.pushNotification || {
          ur: `🚨 بریکنگ نیوز: ${storyData.title.slice(0, 75)}`,
          en: `🚨 Breaking News: ${(data.translations?.en?.title || storyData.title).slice(0, 75)}`,
          ar: `🚨 عاجل: ${(data.translations?.ar?.title || storyData.title).slice(0, 75)}`,
        },

        isSensitive: Boolean(data.isSensitive),
        sensitivityReason: data.sensitivityReason,
        disclaimer:
          data.suggestedDisclaimer ||
          'یہ خبر دستیاب سرکاری و پولیس ذرائع کی بنیاد پر شائع کی گئی ہے۔ مزید معلومات سامنے آنے پر خبر کو اپ ڈیٹ کیا جائے گا۔',

        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 1,
        shares: 0,
        comments: [],
      };

      saveArticle(newArticle);

      // If breaking, trigger push alert simulation
      if (storyData.isBreaking) {
        sendPushNotification(
          newArticle.pushNotification.ur,
          newArticle.hookUr || newArticle.contentUr.slice(0, 100),
          'all',
          newArticle.id
        );
      }

      addAuditLog(
        'ONE_CLICK_3_LANG_PUBLISHED',
        `Successfully syndicated story "${newArticle.titleUr}" into Urdu, English, and Arabic + Social Packages`
      );

      return { success: true, article: newArticle };
    } catch (err: any) {
      console.error('publishStoryOnce error:', err);
      return { success: false, error: err.message || 'Syndication failed' };
    }
  };

  const postComment = (articleId: string, author: string, city: string, content: string) => {
    const newComment: ArticleComment = {
      id: `comm-${Date.now()}`,
      author: author || 'قارئین کے ایچ آئی',
      city: city || 'کراچی',
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          return {
            ...a,
            comments: [newComment, ...(a.comments || [])],
          };
        }
        return a;
      })
    );
  };

  const likeComment = (articleId: string, commentId: string) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          return {
            ...a,
            comments: a.comments.map((c) =>
              c.id === commentId ? { ...c, likes: c.likes + 1 } : c
            ),
          };
        }
        return a;
      })
    );
  };

  return (
    <NewsContext.Provider
      value={{
        language,
        setLanguage,
        articles,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        breakingArticles,
        liveStreamOpen,
        setLiveStreamOpen,
        smartSearchOpen,
        setSmartSearchOpen,
        userRole,
        setUserRole,
        adSlots,
        recordAdClick,
        pushNotifications,
        sendPushNotification,
        auditLogs,
        addAuditLog,
        saveArticle,
        deleteArticle,
        publishStoryOnce,
        postComment,
        likeComment,
        activeToast,
        dismissToast,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
