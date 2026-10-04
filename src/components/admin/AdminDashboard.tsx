import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Save,
  CheckCircle,
  AlertTriangle,
  Globe,
  Share2,
  FileText,
  Sliders,
  Flame,
  BarChart3,
  DollarSign,
  Shield,
  Bell,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  Check,
  Loader2,
  ExternalLink,
  Copy,
  Layers,
  Clock,
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import {
  Article,
  Language,
  NewsCategory,
  EditorialRole,
  ArticleStatus,
} from '../../types';
import { UI_TRANSLATIONS, CATEGORY_NAMES } from '../../data/translations';

export const AdminDashboard: React.FC = () => {
  const {
    articles,
    saveArticle,
    deleteArticle,
    publishStoryOnce,
    language: siteLang,
    userRole,
    setUserRole,
    adSlots,
    pushNotifications,
    sendPushNotification,
    auditLogs,
    setCurrentView,
  } = useNews();

  // Admin UI language independent toggle or sync
  const [adminLang, setAdminLang] = useState<Language>('ur');
  const [activeTab, setActiveTab] = useState<
    'editor' | 'articles' | 'breaking' | 'social' | 'monetization' | 'analytics' | 'audit' | 'seo'
  >('editor');

  // Article Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sourceLang, setSourceLang] = useState<Language>('ur');
  const [activeLangTab, setActiveLangTab] = useState<Language>('ur');

  // Fields for Urdu
  const [titleUr, setTitleUr] = useState('');
  const [hookUr, setHookUr] = useState('');
  const [contentUr, setContentUr] = useState('');

  // Fields for English
  const [titleEn, setTitleEn] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [contentEn, setContentEn] = useState('');

  // Fields for Arabic
  const [titleAr, setTitleAr] = useState('');
  const [summaryAr, setSummaryAr] = useState('');
  const [contentAr, setContentAr] = useState('');

  // Common Metadata
  const [category, setCategory] = useState<NewsCategory>('Karachi');
  const [location, setLocation] = useState('Karachi - Saddar');
  const [reporter, setReporter] = useState('KHI News Desk');
  const [source, setSource] = useState('KHI News Desk');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80'
  );
  const [videoUrl, setVideoUrl] = useState('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [priority, setPriority] = useState<'urgent' | 'high' | 'normal'>('normal');

  // AI & Editorial States
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiAssistantMsg, setAiAssistantMsg] = useState<string | null>(null);
  const [isSensitive, setIsSensitive] = useState(false);
  const [disclaimer, setDisclaimer] = useState(
    'یہ خبر دستیاب معلومات، متعلقہ ذرائع یا سرکاری اعلانات کی بنیاد پر شائع کی گئی ہے۔ مزید معلومات سامنے آنے پر خبر کو اپ ڈیٹ کیا جا سکتا ہے۔'
  );

  // Social Packages State
  const [socialFb, setSocialFb] = useState('');
  const [socialInsta, setSocialInsta] = useState('');
  const [socialTiktok, setSocialTiktok] = useState('');
  const [socialYtTitle, setSocialYtTitle] = useState('');
  const [socialYtDesc, setSocialYtDesc] = useState('');
  const [socialX, setSocialX] = useState('');
  const [socialWhatsapp, setSocialWhatsapp] = useState('');
  const [socialTelegram, setSocialTelegram] = useState('');

  // Push Notification state
  const [pushUr, setPushUr] = useState('');
  const [pushEn, setPushEn] = useState('');
  const [pushAr, setPushAr] = useState('');

  // Push Alert Form
  const [manualPushTitle, setManualPushTitle] = useState('');
  const [manualPushMsg, setManualPushMsg] = useState('');
  const [manualPushLang, setManualPushLang] = useState<Language | 'all'>('all');

  const categories: NewsCategory[] = [
    'Breaking News',
    'Latest News',
    'Karachi',
    'Sindh',
    'Pakistan',
    'World',
    'Politics',
    'Crime',
    'Business',
    'Sports',
    'Entertainment',
    'Technology',
    'Health',
    'Lifestyle',
    'Weather',
    'Videos',
    'Interviews',
    'Vlogs',
    'Special Reports',
    'Property',
  ];

  // Helper to load an article into editor
  const handleEditArticle = (art: Article) => {
    setEditingId(art.id);
    setTitleUr(art.titleUr || '');
    setHookUr(art.hookUr || '');
    setContentUr(art.contentUr || '');

    setTitleEn(art.titleEn || '');
    setSummaryEn(art.summaryEn || '');
    setContentEn(art.contentEn || '');

    setTitleAr(art.titleAr || '');
    setSummaryAr(art.summaryAr || '');
    setContentAr(art.contentAr || '');

    setCategory(art.category);
    setLocation(art.location);
    setReporter(art.reporter);
    setSource(art.source);
    setImageUrl(art.imageUrl);
    setVideoUrl(art.videoUrl || '');
    setIsBreaking(art.isBreaking);
    setIsFeatured(art.isFeatured);
    setPriority(art.priority);
    setIsSensitive(art.isSensitive);
    setDisclaimer(art.disclaimer || '');

    // Social
    setSocialFb(art.social?.facebook || '');
    setSocialInsta(art.social?.instagram || '');
    setSocialTiktok(art.social?.tiktok || '');
    setSocialYtTitle(art.social?.youtube?.title || '');
    setSocialYtDesc(art.social?.youtube?.description || '');
    setSocialX(art.social?.x || '');
    setSocialWhatsapp(art.social?.whatsapp || '');
    setSocialTelegram(art.social?.telegram || '');

    // Push
    setPushUr(art.pushNotification?.ur || '');
    setPushEn(art.pushNotification?.en || '');
    setPushAr(art.pushNotification?.ar || '');

    setActiveTab('editor');
  };

  // Clear form for new article
  const handleNewArticle = () => {
    setEditingId(null);
    setTitleUr('');
    setHookUr('');
    setContentUr('');
    setTitleEn('');
    setSummaryEn('');
    setContentEn('');
    setTitleAr('');
    setSummaryAr('');
    setContentAr('');
    setCategory('Karachi');
    setLocation('Karachi - Saddar');
    setIsBreaking(false);
    setIsFeatured(false);
    setIsSensitive(false);
    setSocialFb('');
    setSocialInsta('');
    setSocialTiktok('');
    setSocialYtTitle('');
    setSocialYtDesc('');
    setSocialX('');
    setSocialWhatsapp('');
    setSocialTelegram('');
    setPushUr('');
    setPushEn('');
    setPushAr('');
    setAiAssistantMsg(null);
  };

  // View Mode: 'tabs' or 'split' (side-by-side)
  const [viewMode, setViewMode] = useState<'tabs' | 'split'>('tabs');
  const [quickUrduPaste, setQuickUrduPaste] = useState('');
  const [isQuickConverting, setIsQuickConverting] = useState(false);

  // Dedicated single-target translator
  const handleTranslateSpecific = async (target: 'en' | 'ar') => {
    const textToTranslate = `${titleUr}\n\n${contentUr}`.trim();
    if (!textToTranslate) {
      alert(adminLang === 'ur' ? 'براہ کرم پہلے اردو سرخی یا متن درج کریں۔' : 'Please enter Urdu headline or content first.');
      return;
    }

    setIsAiProcessing(true);
    setAiAssistantMsg(null);

    try {
      // 1. Translate Title
      const titleRes = await fetch('/api/ai/quick-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: titleUr || contentUr.slice(0, 70), from: 'ur', to: target }),
      });
      const titleData = await titleRes.json();

      // 2. Translate Content
      const contentRes = await fetch('/api/ai/quick-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: contentUr || titleUr, from: 'ur', to: target }),
      });
      const contentData = await contentRes.json();

      if (target === 'en') {
        setTitleEn(titleData.translatedText || '');
        setSummaryEn((titleData.translatedText || '').slice(0, 150));
        setContentEn(contentData.translatedText || '');
        setActiveLangTab('en');
        setAiAssistantMsg('✓ اردو خبر کا انگریزی (English) میں کامیابی سے ترجمہ ہو گیا ہے۔');
      } else {
        setTitleAr(titleData.translatedText || '');
        setSummaryAr((titleData.translatedText || '').slice(0, 150));
        setContentAr(contentData.translatedText || '');
        setActiveLangTab('ar');
        setAiAssistantMsg('✓ اردو خبر کا عربی (العربية) میں کامیابی سے ترجمہ ہو گیا ہے۔');
      }
    } catch (err: any) {
      alert('Translation error: ' + err.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  // Quick Urdu News One-Click Converter from raw text
  const handleQuickUrduConvert = async () => {
    if (!quickUrduPaste.trim()) {
      alert('براہ کرم اپنی اردو خبر پیسٹ کریں۔');
      return;
    }

    setIsQuickConverting(true);
    const lines = quickUrduPaste.trim().split('\n').filter(l => l.trim().length > 0);
    const inferredTitle = lines[0].slice(0, 120);
    const inferredContent = lines.length > 1 ? lines.slice(1).join('\n\n') : lines[0];

    setTitleUr(inferredTitle);
    setContentUr(inferredContent);
    setHookUr(inferredContent.slice(0, 160));

    try {
      const res = await fetch('/api/ai/translate-and-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inferredTitle,
          hook: inferredContent.slice(0, 160),
          content: inferredContent,
          sourceLanguage: 'ur',
          category,
          location,
        }),
      });

      const data = await res.json();
      if (data.translations?.en) {
        setTitleEn(data.translations.en.title);
        setSummaryEn(data.translations.en.summary);
        setContentEn(data.translations.en.content);
      }
      if (data.translations?.ar) {
        setTitleAr(data.translations.ar.title);
        setSummaryAr(data.translations.ar.summary);
        setContentAr(data.translations.ar.content);
      }
      if (data.social) {
        setSocialFb(data.social.facebook || '');
        setSocialInsta(data.social.instagram || '');
        setSocialX(data.social.x || '');
        setSocialWhatsapp(data.social.whatsapp || '');
      }

      setQuickUrduPaste('');
      setAiAssistantMsg('✓ آپ کی اردو خبر انگریزی اور عربی میں خودکار تبدیل ہو چکی ہے!');
      setActiveLangTab('en');
    } catch (err: any) {
      alert('Quick convert error: ' + err.message);
    } finally {
      setIsQuickConverting(false);
    }
  };

  // Master AI One-Click Feature: Publish Once, Generate in 3 Languages
  const handleRunAiTranslationAndSyndication = async () => {
    const curTitle = (titleUr || titleEn || titleAr || contentUr.slice(0, 75)).trim();
    const curContent = (contentUr || contentEn || contentAr || curTitle).trim();
    const curHook = (hookUr || summaryEn || summaryAr || curContent.slice(0, 160)).trim();

    if (!curTitle && !curContent) {
      alert(
        adminLang === 'ur'
          ? 'براہ کرم پہلے اردو سرخی یا متن درج کریں۔'
          : 'Please enter Urdu headline or content first.'
      );
      return;
    }

    setIsAiProcessing(true);
    setAiAssistantMsg(null);

    try {
      const res = await fetch('/api/ai/translate-and-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: curTitle,
          hook: curHook,
          content: curContent,
          sourceLanguage: sourceLang || 'ur',
          category,
          location,
        }),
      });

      if (!res.ok) throw new Error('AI processing failed');
      const data = await res.json();

      // Populate English
      if (data.translations?.en) {
        setTitleEn(data.translations.en.title);
        setSummaryEn(data.translations.en.summary);
        setContentEn(data.translations.en.content);
      }

      // Populate Arabic
      if (data.translations?.ar) {
        setTitleAr(data.translations.ar.title);
        setSummaryAr(data.translations.ar.summary);
        setContentAr(data.translations.ar.content);
      }

      // Populate Urdu if source was not Urdu
      if (sourceLang !== 'ur' && data.translations?.ur) {
        setTitleUr(data.translations.ur.title);
        setHookUr(data.translations.ur.summary);
        setContentUr(data.translations.ur.content);
      }

      // Populate Social media
      if (data.social) {
        setSocialFb(data.social.facebook || '');
        setSocialInsta(data.social.instagram || '');
        setSocialTiktok(data.social.tiktok || '');
        setSocialYtTitle(data.social.youtube?.title || '');
        setSocialYtDesc(data.social.youtube?.description || '');
        setSocialX(data.social.x || '');
        setSocialWhatsapp(data.social.whatsapp || '');
        setSocialTelegram(data.social.telegram || '');
      }

      // Populate Push
      if (data.pushNotification) {
        setPushUr(data.pushNotification.ur || '');
        setPushEn(data.pushNotification.en || '');
        setPushAr(data.pushNotification.ar || '');
      }

      // Sensitivity check
      if (data.isSensitive) {
        setIsSensitive(true);
        if (data.suggestedDisclaimer) setDisclaimer(data.suggestedDisclaimer);
      }

      setAiAssistantMsg(
        `✓ کامیابی! اردو خبر انگریزی اور عربی میں تبدیل ہو چکی ہے۔\n🇬🇧 English: "${data.translations?.en?.title || ''}"\n🇸🇦 Arabic: "${data.translations?.ar?.title || ''}"`
      );
    } catch (err: any) {
      console.error(err);
      alert('AI processing encountered an issue: ' + err.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  // AI Assistant Toolbox (Headline generator, viral hook, rewrite, grammar, shorten, expand)
  const handleEditorialAction = async (action: string) => {
    const text = activeLangTab === 'ur' ? contentUr : activeLangTab === 'en' ? contentEn : contentAr;
    if (!text.trim()) {
      alert('Please enter or select text in current tab first.');
      return;
    }

    setIsAiProcessing(true);
    setAiAssistantMsg(null);

    try {
      const res = await fetch('/api/ai/editorial-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          text,
          language: activeLangTab,
        }),
      });

      const data = await res.json();
      if (action === 'generate-headlines') {
        setAiAssistantMsg(`تجویز کردہ سرخیاں:\n${data.result}`);
      } else if (action === 'generate-hook') {
        if (activeLangTab === 'ur') setHookUr(data.result.trim());
        else if (activeLangTab === 'en') setSummaryEn(data.result.trim());
        else setSummaryAr(data.result.trim());
        setAiAssistantMsg('✓ نیا ہک تیار کر لیا گیا۔');
      } else if (action === 'rewrite' || action === 'grammar' || action === 'shorten' || action === 'expand') {
        if (activeLangTab === 'ur') setContentUr(data.result);
        else if (activeLangTab === 'en') setContentEn(data.result);
        else setContentAr(data.result);
        setAiAssistantMsg(`✓ ${action.toUpperCase()} مکمل ہو گیا ہے۔`);
      }
    } catch (err: any) {
      alert('Assistant failed: ' + err.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  // Save / Publish
  const handleSaveArticle = (status: ArticleStatus = 'published') => {
    if (!titleUr.trim() && !titleEn.trim()) {
      alert('Title is required');
      return;
    }

    const artId = editingId || `khi-${Date.now()}`;
    const newArticle: Article = {
      id: artId,
      titleUr: titleUr || titleEn,
      titleEn: titleEn || titleUr,
      titleAr: titleAr || titleUr,
      hookUr,
      summaryEn,
      summaryAr,
      contentUr: contentUr || contentEn,
      contentEn: contentEn || contentUr,
      contentAr: contentAr || contentUr,
      category,
      tags: [category, location.split('-')[0].trim(), 'Karachi', 'KHI NEWS HD'],
      reporter,
      location,
      source,
      imageUrl,
      videoUrl: videoUrl || undefined,
      isBreaking,
      isFeatured,
      isDeveloping: false,
      priority,
      status,
      sourceLanguage: sourceLang,
      aiFlags: {
        urGenerated: sourceLang !== 'ur',
        enGenerated: sourceLang !== 'en',
        arGenerated: sourceLang !== 'ar',
        urReviewed: true,
        enReviewed: true,
        arReviewed: true,
      },
      seo: {
        ur: {
          title: `${titleUr || titleEn} | کے ایچ آئی نیوز ایچ ڈی ٹی وی`,
          metaDescription: hookUr || contentUr.slice(0, 150),
          keywords: ['کراچی', 'خبریں', 'کے ایچ آئی نیوز', category],
          slug: `karachi-news-${artId}`,
        },
        en: {
          title: `${titleEn || titleUr} | KHI NEWS HD TV`,
          metaDescription: summaryEn || contentEn.slice(0, 150),
          keywords: ['Karachi', 'News', 'KHI News HD TV', category],
          slug: `karachi-news-${artId}-en`,
        },
        ar: {
          title: `${titleAr || titleUr} | تلفزيون كراتشي`,
          metaDescription: summaryAr || contentAr.slice(0, 150),
          keywords: ['كراتشي', 'باكستان', category],
          slug: `karachi-news-${artId}-ar`,
        },
      },
      social: {
        facebook: socialFb || `🚨 KHI NEWS HD TV | ${titleUr}\n\n${hookUr}`,
        instagram: socialInsta || `🚨 ${titleUr}\n\n#Karachi #KHINewsHD`,
        tiktok: socialTiktok || `⚡ کراچی کی بڑی خبر: ${titleUr}`,
        youtube: {
          title: socialYtTitle || `${titleUr} | KHI NEWS HD TV`,
          description: socialYtDesc || contentUr,
          tags: ['Karachi News', 'KHI NEWS HD TV', category],
        },
        x: socialX || `🚨 BREAKING: ${titleUr.slice(0, 200)} #Karachi`,
        whatsapp: socialWhatsapp || `*🚨 KHI NEWS HD TV*\n\n${titleUr}`,
        telegram: socialTelegram || `📢 *KHI NEWS HD TV*\n${titleUr}`,
      },
      pushNotification: {
        ur: pushUr || `🚨 بریکنگ: ${titleUr.slice(0, 75)}`,
        en: pushEn || `🚨 Breaking: ${(titleEn || titleUr).slice(0, 75)}`,
        ar: pushAr || `🚨 عاجل: ${(titleAr || titleUr).slice(0, 75)}`,
      },
      isSensitive,
      disclaimer,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: editingId ? (articles.find((a) => a.id === editingId)?.views || 10) : 1,
      shares: 0,
      comments: editingId ? (articles.find((a) => a.id === editingId)?.comments || []) : [],
    };

    saveArticle(newArticle);

    if (isBreaking && status === 'published') {
      sendPushNotification(newArticle.pushNotification.ur, newArticle.hookUr, 'all', newArticle.id);
    }

    alert(
      adminLang === 'ur'
        ? `خبر کامیابی کے ساتھ ${status === 'published' ? 'شائع' : 'محفوظ'} کر دی گئی۔`
        : `Story successfully ${status === 'published' ? 'published' : 'saved'}.`
    );
    setActiveTab('articles');
  };

  const handleSendManualPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPushTitle.trim()) return;
    sendPushNotification(manualPushTitle, manualPushMsg, manualPushLang);
    setManualPushTitle('');
    setManualPushMsg('');
    alert('Push alert dispatched to subscribers.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* CMS Top Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-lg shadow">
            KHI
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black flex items-center gap-2">
              <span>KHI NEWS HD TV · نیوز روم سی ایم ایس</span>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Enterprise
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Publish Once, Automatically Syndicate Across Urdu, English, Arabic & 7 Social Platforms
            </p>
          </div>
        </div>

        {/* Roles & Admin Language Switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-medium">کردار:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as EditorialRole)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="editor_in_chief" className="bg-slate-900">Editor-in-Chief (ایڈیٹر ان چیف)</option>
              <option value="bureau_chief" className="bg-slate-900">Karachi Bureau Chief (بیورو چیف)</option>
              <option value="reporter" className="bg-slate-900">Senior Reporter (رپورٹر)</option>
              <option value="sub_editor" className="bg-slate-900">Sub-Editor (سب ایڈیٹر)</option>
              <option value="social_media_manager" className="bg-slate-900">Social Syndicator (سوشل میڈیا)</option>
              <option value="admin" className="bg-slate-900">Super Administrator</option>
            </select>
          </div>

          <button
            onClick={() => setCurrentView({ type: 'home' })}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-colors"
          >
            ویب سائٹ دیکھیں
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'editor'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ملٹی لنگوئل ایڈیٹر (3 Languages Editor)</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'articles'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>تمام خبریں ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'social'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>سوشل میڈیا سنڈیکیشن (7 Platforms)</span>
        </button>

        <button
          onClick={() => setActiveTab('breaking')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'breaking'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>بریکنگ نیوز کنٹرولر</span>
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'monetization'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>اشتہارات و آمدنی (Monetization)</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>ٹریفک تجزیات (Analytics)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>سیکیورٹی آڈٹ لاگ</span>
        </button>
      </div>

      {/* TAB 1: ADVANCED MULTILINGUAL ARTICLE EDITOR */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          {/* Top Action Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">بنیادی زبان (Source Language):</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setSourceLang('ur')}
                  className={`px-3 py-1 rounded transition-colors ${
                    sourceLang === 'ur' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-700'
                  }`}
                >
                  اردو (Original)
                </button>
                <button
                  onClick={() => setSourceLang('en')}
                  className={`px-3 py-1 rounded transition-colors ${
                    sourceLang === 'en' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setSourceLang('ar')}
                  className={`px-3 py-1 rounded transition-colors ${
                    sourceLang === 'ar' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-700'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* View Mode & Conversion Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-bold">
                <button
                  onClick={() => setViewMode('tabs')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === 'tabs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  ٹیبز ویو (Tabs)
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  آمنے سامنے (3-Cols Split)
                </button>
              </div>

              <button
                onClick={handleNewArticle}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
              >
                نیا مسودہ
              </button>

              <button
                onClick={handleRunAiTranslationAndSyndication}
                disabled={isAiProcessing}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-black rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                {isAiProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>انگریزی اور عربی میں خودکار تبدیل کریں</span>
              </button>
            </div>
          </div>

          {/* Quick Paste & Convert Urdu News Box */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-urdu">
                  فوری اردو خبر کنورٹر (Quick Urdu News One-Click Converter)
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                کسی بھی اردو خبر کا متن یہاں پیسٹ کریں، یہ خود بخود انگریزی اور عربی میں تبدیل ہو جائے گی
              </span>
            </div>

            <textarea
              rows={2}
              value={quickUrduPaste}
              onChange={(e) => setQuickUrduPaste(e.target.value)}
              placeholder="یہاں اپنی اردو خبر یا سرخی پیسٹ کریں (مثال: کراچی میں بارش کا نیا سلسلہ شروع، مختلف علاقوں میں بادل برس پڑے...)"
              className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-urdu leading-relaxed text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] text-slate-500">
                پہلی لائن کو سرخی اور باقی متن کو مکمل خبر بنا کر انگریزی و عربی ترجمہ تیار کیا جائے گا۔
              </span>

              <button
                type="button"
                onClick={handleQuickUrduConvert}
                disabled={isQuickConverting || !quickUrduPaste.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
              >
                {isQuickConverting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>فوری انگریزی اور عربی بنائیں (Convert Now)</span>
              </button>
            </div>
          </div>

          {/* AI Status / Feedback Message */}
          {aiAssistantMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3 text-xs font-medium whitespace-pre-line leading-relaxed shadow-xs flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">{aiAssistantMsg}</div>
            </div>
          )}

          {/* Translation Result Quick Status & Jumper */}
          {(titleEn || titleAr) && (
            <div className="bg-slate-900 text-white p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs border border-slate-800">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-amber-400 font-bold">ترجمہ شدہ مواد:</span>
                {titleEn && (
                  <button
                    onClick={() => setActiveLangTab('en')}
                    className="hover:underline flex items-center gap-1 text-slate-200 font-latin"
                  >
                    <span>🇬🇧 English:</span>
                    <span className="text-slate-400 font-medium truncate max-w-xs">{titleEn}</span>
                  </button>
                )}
                {titleAr && (
                  <button
                    onClick={() => setActiveLangTab('ar')}
                    className="hover:underline flex items-center gap-1 text-slate-200 font-arabic"
                  >
                    <span>🇸🇦 العربية:</span>
                    <span className="text-slate-400 font-medium truncate max-w-xs">{titleAr}</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLangTab('en')}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold"
                >
                  انگریزی دیکھیں
                </button>
                <button
                  onClick={() => setActiveLangTab('ar')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-bold"
                >
                  عربی دیکھیں
                </button>
              </div>
            </div>
          )}

          {/* 3-Language Tab Switcher (Visible in Tabs View) */}
          {viewMode === 'tabs' && (
            <div className="bg-slate-100 p-1.5 rounded-xl flex items-center gap-2 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveLangTab('ur')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeLangTab === 'ur'
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>اردو (Urdu Original)</span>
                {titleUr && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
              <button
                onClick={() => setActiveLangTab('en')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeLangTab === 'en'
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>English Translation</span>
                {titleEn ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">
                    ✓ Ready
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">
                    Empty
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveLangTab('ar')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeLangTab === 'ar'
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>الترجمة العربية (Arabic)</span>
                {titleAr ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">
                    ✓ Ready
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">
                    Empty
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Main Grid: Content Form + Side Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Multilingual Content Fields */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              {/* TABBED MODE */}
              {viewMode === 'tabs' && (
                <>
                  {/* Urdu Tab */}
                  {activeLangTab === 'ur' && (
                    <div className="space-y-4" dir="rtl">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          اردو سرخی (Urdu Headline) *
                        </label>
                        <input
                          type="text"
                          value={titleUr}
                          onChange={(e) => setTitleUr(e.target.value)}
                          placeholder="کراچی کی اہم پیش رفت کی مرکزی سرخی..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-urdu font-bold text-slate-950 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          مختصر ہک / خلاصہ (Short Hook)
                        </label>
                        <input
                          type="text"
                          value={hookUr}
                          onChange={(e) => setHookUr(e.target.value)}
                          placeholder="2 سے 3 سطری تعارف جو قارئین کو متوجہ کرے..."
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-urdu text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-bold text-slate-700">
                            مکمل اردو متن (Full Article) *
                          </label>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditorialAction('rewrite')}
                              className="text-[11px] text-red-600 hover:underline font-bold"
                            >
                              بہتر بنائیں (Polish)
                            </button>
                            <span className="text-slate-300">·</span>
                            <button
                              type="button"
                              onClick={() => handleEditorialAction('grammar')}
                              className="text-[11px] text-slate-600 hover:underline"
                            >
                              املا چیک کریں
                            </button>
                          </div>
                        </div>
                        <textarea
                          rows={10}
                          value={contentUr}
                          onChange={(e) => setContentUr(e.target.value)}
                          placeholder="خبر کی مکمل تفصیلات یہاں تحریر کریں..."
                          className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-urdu leading-relaxed text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      {/* Direct Translation Action Buttons for Urdu */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-bold text-slate-800 font-urdu">
                          اس اردو خبر کو فوری ترجمہ کریں:
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleTranslateSpecific('en')}
                            disabled={isAiProcessing || (!titleUr && !contentUr)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <span>🇬🇧 صرف انگریزی ترجمہ</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTranslateSpecific('ar')}
                            disabled={isAiProcessing || (!titleUr && !contentUr)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <span>🇸🇦 صرف عربی ترجمہ</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleRunAiTranslationAndSyndication}
                            disabled={isAiProcessing || (!titleUr && !contentUr)}
                            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-black transition-colors flex items-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>⚡ دونوں زبانوں میں تبدیل کریں</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* English Tab */}
                  {activeLangTab === 'en' && (
                    <div className="space-y-4" dir="ltr">
                      {!titleEn && titleUr && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs">
                          <span className="text-amber-800 font-medium">
                            Urdu article is ready, but English translation has not been created yet.
                          </span>
                          <button
                            type="button"
                            onClick={() => handleTranslateSpecific('en')}
                            disabled={isAiProcessing}
                            className="px-3 py-1 bg-red-600 text-white rounded font-bold"
                          >
                            Translate to English Now
                          </button>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          English Headline *
                        </label>
                        <input
                          type="text"
                          value={titleEn}
                          onChange={(e) => setTitleEn(e.target.value)}
                          placeholder="Professional English Headline for KHI NEWS..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-latin font-bold text-slate-950 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          English Summary / Hook
                        </label>
                        <input
                          type="text"
                          value={summaryEn}
                          onChange={(e) => setSummaryEn(e.target.value)}
                          placeholder="2-line executive summary..."
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-latin text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full English Dispatch
                        </label>
                        <textarea
                          rows={10}
                          value={contentEn}
                          onChange={(e) => setContentEn(e.target.value)}
                          placeholder="Full English news story body..."
                          className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-latin leading-relaxed text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Arabic Tab */}
                  {activeLangTab === 'ar' && (
                    <div className="space-y-4" dir="rtl">
                      {!titleAr && titleUr && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs">
                          <span className="text-amber-800 font-medium">
                            المقال الأردي جاهز، ولكن لم يتم إنشاء الترجمة العربية بعد.
                          </span>
                          <button
                            type="button"
                            onClick={() => handleTranslateSpecific('ar')}
                            disabled={isAiProcessing}
                            className="px-3 py-1 bg-red-600 text-white rounded font-bold"
                          >
                            ترجمة إلى العربية الآن
                          </button>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          العنوان باللغة العربية (Arabic Headline) *
                        </label>
                        <input
                          type="text"
                          value={titleAr}
                          onChange={(e) => setTitleAr(e.target.value)}
                          placeholder="العنوان الإخباري المهني لتلفزيون كراتشي..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-arabic font-bold text-slate-950 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          الموجز العربي (Arabic Hook / Summary)
                        </label>
                        <input
                          type="text"
                          value={summaryAr}
                          onChange={(e) => setSummaryAr(e.target.value)}
                          placeholder="موجز الخبر باللغة العربية..."
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-arabic text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          تفاصيل الخبر الكاملة بالعربية
                        </label>
                        <textarea
                          rows={10}
                          value={contentAr}
                          onChange={(e) => setContentAr(e.target.value)}
                          placeholder="النص الكامل باللغة العربية الفصحى..."
                          className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-arabic leading-relaxed text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 3-COLUMN SPLIT SIDE-BY-SIDE MODE */}
              {viewMode === 'split' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: Urdu */}
                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-3" dir="rtl">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-xs text-red-600">اردو (Urdu Original)</span>
                      <button
                        type="button"
                        onClick={handleRunAiTranslationAndSyndication}
                        className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold"
                      >
                        ⚡ ترجمہ کریں
                      </button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">سرخی</label>
                      <input
                        type="text"
                        value={titleUr}
                        onChange={(e) => setTitleUr(e.target.value)}
                        placeholder="اردو سرخی..."
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-urdu font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">مکمل خبر</label>
                      <textarea
                        rows={12}
                        value={contentUr}
                        onChange={(e) => setContentUr(e.target.value)}
                        placeholder="اردو متن..."
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-urdu"
                      />
                    </div>
                  </div>

                  {/* Column 2: English */}
                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-3" dir="ltr">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-xs text-blue-600">English (Translated)</span>
                      <button
                        type="button"
                        onClick={() => handleTranslateSpecific('en')}
                        className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold"
                      >
                        🇬🇧 Re-Translate
                      </button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Headline</label>
                      <input
                        type="text"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        placeholder="English headline..."
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-latin font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Story Text</label>
                      <textarea
                        rows={12}
                        value={contentEn}
                        onChange={(e) => setContentEn(e.target.value)}
                        placeholder="English story..."
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-latin"
                      />
                    </div>
                  </div>

                  {/* Column 3: Arabic */}
                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-3" dir="rtl">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-xs text-emerald-600">العربية (Translated)</span>
                      <button
                        type="button"
                        onClick={() => handleTranslateSpecific('ar')}
                        className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold"
                      >
                        🇸🇦 Re-Translate
                      </button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">العنوان</label>
                      <input
                        type="text"
                        value={titleAr}
                        onChange={(e) => setTitleAr(e.target.value)}
                        placeholder="العنوان العربي..."
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-arabic font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">النص</label>
                      <textarea
                        rows={12}
                        value={contentAr}
                        onChange={(e) => setContentAr(e.target.value)}
                        placeholder="النص العربي..."
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-arabic"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* AI Assistant Quick Tool Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">اے آئی اسسٹنٹ:</span>
                <button
                  type="button"
                  onClick={() => handleEditorialAction('generate-headlines')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium"
                >
                  5 سرخیوں کی تجاویز
                </button>
                <button
                  type="button"
                  onClick={() => handleEditorialAction('generate-hook')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium"
                >
                  وائرل ہک بنائیں
                </button>
                <button
                  type="button"
                  onClick={() => handleEditorialAction('shorten')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium"
                >
                  60 سیکنڈ بلیٹن ریڈ
                </button>
                <button
                  type="button"
                  onClick={() => handleEditorialAction('expand')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium"
                >
                  کراچی بیک گراؤنڈر شامل کریں
                </button>
              </div>
            </div>

            {/* Right Column: Metadata, Media, Editorial Flags & Publishing */}
            <div className="space-y-5">
              {/* Category, Location & Source */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  میٹا ڈیٹا و مقام (Metadata)
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    شعبہ (Category)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NewsCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORY_NAMES[cat]?.ur || cat} ({cat})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    مقام / بیٹ (Location)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Karachi - Saddar, University Rd, Clifton"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    رپورٹر (Reporter Name)
                  </label>
                  <input
                    type="text"
                    value={reporter}
                    onChange={(e) => setReporter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    تصویر کا لنک (Image URL)
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    ویڈیو لنک (YouTube / Broadcast URL)
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Urgency & Flags */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  ترجیحات و بریکنگ نیوز
                </h4>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span className="flex items-center gap-1 text-red-600">
                    <Flame className="w-3.5 h-3.5 fill-red-600" />
                    بریکنگ نیوز ٹکر پر فوری چلائیں
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span>مرکزی لیڈ اسٹوری بنائیں (Featured Hero)</span>
                </label>

                {/* Sensitive / Legal Guardrail */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-700">
                    <input
                      type="checkbox"
                      checked={isSensitive}
                      onChange={(e) => setIsSensitive(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>حساس خبر / الزام / قانونی وضاحت ضروری</span>
                  </label>

                  {isSensitive && (
                    <textarea
                      rows={2}
                      value={disclaimer}
                      onChange={(e) => setDisclaimer(e.target.value)}
                      className="w-full p-2 bg-amber-50 border border-amber-300 rounded text-xs font-urdu"
                    />
                  )}
                </div>
              </div>

              {/* Publish Controls */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-3">
                <h4 className="font-bold text-xs text-slate-200 uppercase tracking-wider">
                  ادارتی توثیق و اشاعت (Workflow)
                </h4>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveArticle('published')}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>تینوں زبانوں میں شائع کریں (Publish All 3)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveArticle('draft')}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
                  >
                    مسودہ محفوظ کریں (Save Draft)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARTICLES MANAGEMENT TABLE */}
      {activeTab === 'articles' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-black text-sm sm:text-base text-slate-900">
              کے ایچ آئی نیوز شائع شدہ و ڈرافٹ مضامین ({articles.length})
            </h3>
            <button
              onClick={() => {
                handleNewArticle();
                setActiveTab('editor');
              }}
              className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>نئی خبر شامل کریں</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left rtl:text-right">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">سرخی (Urdu Headline)</th>
                  <th className="p-3">انگلش ترجمہ (English)</th>
                  <th className="p-3">عربی ترجمہ (Arabic)</th>
                  <th className="p-3">شعبہ</th>
                  <th className="p-3">اسٹیٹس</th>
                  <th className="p-3">مشاہدات</th>
                  <th className="p-3 text-center">ایکشنز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold font-urdu text-sm text-slate-900 max-w-xs truncate">
                      {art.isBreaking && (
                        <span className="text-red-600 font-bold ml-1 font-sans text-xs">[بریکنگ]</span>
                      )}
                      {art.titleUr}
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs truncate font-latin">
                      {art.titleEn || '-'}
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs truncate font-arabic">
                      {art.titleAr || '-'}
                    </td>
                    <td className="p-3 font-bold text-slate-700">
                      {CATEGORY_NAMES[art.category]?.ur || art.category}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {art.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-600">
                      {art.views.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditArticle(art)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-700"
                          title="ترمیم کریں"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCurrentView({ type: 'article', articleId: art.id })}
                          className="p-1 hover:bg-slate-200 rounded text-slate-700"
                          title="ویب سائٹ پر دیکھیں"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('کیا آپ واقعی یہ خبر ڈیلیٹ کرنا چاہتے ہیں؟')) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-1 hover:bg-red-100 text-red-600 rounded"
                          title="ڈیلیٹ کریں"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL MEDIA SYNDICATION CENTER */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-red-600" />
                  <span>KHI NEWS HD TV سوشل میڈیا پبلشنگ سینٹر</span>
                </h3>
                <p className="text-xs text-slate-500">
                  آفیشل فیس بک، یوٹیوب، انسٹاگرام، ٹک ٹاک، ایکس اور واٹس ایپ چینل کے لیے خودکار مواد
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Facebook */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-blue-600 flex items-center gap-1.5">
                    <span className="font-black">FB</span> Facebook: KHI NEWS HD TV / khinewshdtv
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                    Connected
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={socialFb}
                  onChange={(e) => setSocialFb(e.target.value)}
                  placeholder="Facebook custom caption with hook and link..."
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-urdu"
                />
              </div>

              {/* Instagram */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-pink-600">
                    Instagram: @khinews
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                    Connected
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={socialInsta}
                  onChange={(e) => setSocialInsta(e.target.value)}
                  placeholder="Instagram viral caption & hashtags..."
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-urdu"
                />
              </div>

              {/* TikTok */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    TikTok: @khinews
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                    Connected
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={socialTiktok}
                  onChange={(e) => setSocialTiktok(e.target.value)}
                  placeholder="3-Second Hook & TikTok video description..."
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-urdu"
                />
              </div>

              {/* YouTube */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-red-600">
                    YouTube: Karachi News Digital
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                    Connected
                  </span>
                </div>
                <input
                  type="text"
                  value={socialYtTitle}
                  onChange={(e) => setSocialYtTitle(e.target.value)}
                  placeholder="YouTube Video SEO Title..."
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={socialYtDesc}
                  onChange={(e) => setSocialYtDesc(e.target.value)}
                  placeholder="YouTube SEO Description..."
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                />
              </div>

              {/* X / Twitter */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="font-bold text-xs text-slate-900">
                  𝕏 (Twitter): @khinewshdtv (Max 280 chars)
                </span>
                <textarea
                  rows={3}
                  value={socialX}
                  onChange={(e) => setSocialX(e.target.value)}
                  placeholder="Short urgent flash with link..."
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                />
              </div>

              {/* WhatsApp Channel */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="font-bold text-xs text-emerald-600">
                  WhatsApp Official Channel Alert
                </span>
                <textarea
                  rows={3}
                  value={socialWhatsapp}
                  onChange={(e) => setSocialWhatsapp(e.target.value)}
                  placeholder="WhatsApp alert with bold headlines..."
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-urdu"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BREAKING NEWS CONTROLLER */}
      {activeTab === 'breaking' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-600" />
              <span>بریکنگ نیوز کنٹرول پینل</span>
            </h3>

            {/* Manual Push Alert Composer */}
            <form onSubmit={handleSendManualPush} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-xs text-slate-800">
                فوری پش نوٹیفکیشن ارسال کریں (Web & Mobile Push Alert)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={manualPushTitle}
                    onChange={(e) => setManualPushTitle(e.target.value)}
                    placeholder="🚨 بریکنگ نیوز الرٹ سرخی..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-urdu font-bold"
                    required
                  />
                </div>
                <div>
                  <select
                    value={manualPushLang}
                    onChange={(e) => setManualPushLang(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="all">تمام زبانیں (Urdu, EN, AR)</option>
                    <option value="ur">صرف اردو</option>
                    <option value="en">صرف English</option>
                    <option value="ar">صرف العربية</option>
                  </select>
                </div>
              </div>
              <textarea
                rows={2}
                value={manualPushMsg}
                onChange={(e) => setManualPushMsg(e.target.value)}
                placeholder="نوٹیفکیشن کی تفصیلی عبارت جو صارفین کی اسکرین پر ظاہر ہوگی..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-urdu"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>الرٹ نشر کریں (Broadcast Alert)</span>
                </button>
              </div>
            </form>

            {/* Sent Notifications History */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-700">ارسال کردہ نوٹیفکیشنز لاگ</h4>
              <div className="space-y-2">
                {pushNotifications.map((pn) => (
                  <div key={pn.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 font-urdu">{pn.title}</p>
                      <p className="text-slate-600">{pn.message}</p>
                    </div>
                    <div className="text-right rtl:text-left text-[11px] text-slate-500 font-mono">
                      <span>{pn.recipientsCount.toLocaleString()} صارفین کو ارسال</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MONETIZATION & ADS */}
      {activeTab === 'monetization' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>اشتہارات و کیمپیئنز منیجر (Advertising & Monetization)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adSlots.map((ad) => (
                <div key={ad.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-600 uppercase">{ad.position}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {ad.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{ad.title}</h4>
                  <p className="text-xs text-slate-500">اسپانسر: {ad.sponsorName}</p>

                  <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">امپریشنز</span>
                      <span className="font-bold text-slate-900">{ad.impressions.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">کلکس</span>
                      <span className="font-bold text-emerald-600">{ad.clicks.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">کل قارئین (Total Visitors)</span>
              <span className="text-2xl font-black text-slate-900 font-mono">148,290</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">▲ +18.4% آج</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">صفحات کے مشاہدات (Page Views)</span>
              <span className="text-2xl font-black text-slate-900 font-mono">612,400</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">▲ +24.1%</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">زبانوں کی تقسیم (Languages)</span>
              <div className="text-xs text-slate-700 mt-2 space-y-1 font-mono">
                <div>اردو: 68%</div>
                <div>English: 22%</div>
                <div>العربية: 10%</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">شہر و جغرافیہ (Geography)</span>
              <div className="text-xs text-slate-700 mt-2 space-y-1">
                <div>کراچی (Karachi): 74%</div>
                <div>حیدرآباد و سندھ: 12%</div>
                <div>اسلام آباد و لاہور: 8%</div>
                <div>اوورسیز (دبئی، لندن): 6%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SECURITY & AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-800" />
            <span>نیوز روم سیکیورٹی اور ادارتی کارروائیوں کا ریکارڈ (Audit Trail)</span>
          </h3>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-red-600 ml-2 font-mono uppercase">[{log.action}]</span>
                  <span className="text-slate-800 font-medium">{log.details}</span>
                </div>
                <div className="text-slate-500 text-[11px] font-mono flex items-center gap-2">
                  <span>{log.userName} ({log.userRole})</span>
                  <span>·</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
