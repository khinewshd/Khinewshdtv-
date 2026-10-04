import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Printer,
  Copy,
  Check,
  MapPin,
  Clock,
  Calendar,
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  Send,
  ArrowLeft,
  ArrowRight,
  Globe,
  Radio,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS, CATEGORY_NAMES } from '../data/translations';
import { Language } from '../types';
import { ArticleCard } from './ArticleCard';
import { AdBanner } from './AdBanner';

interface ArticleViewProps {
  articleId: string;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ articleId }) => {
  const {
    articles,
    language,
    setLanguage,
    setCurrentView,
    postComment,
    likeComment,
  } = useNews();

  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentCity, setCommentCity] = useState('');
  const [commentText, setCommentText] = useState('');

  const article = articles.find((a) => a.id === articleId) || articles[0];
  const t = UI_TRANSLATIONS[language];

  // Article text per current language
  const headline =
    language === 'ur'
      ? article.titleUr
      : language === 'ar'
      ? article.titleAr
      : article.titleEn;

  const hook =
    language === 'ur'
      ? article.hookUr
      : language === 'ar'
      ? article.summaryAr
      : article.summaryEn;

  const bodyContent =
    language === 'ur'
      ? article.contentUr
      : language === 'ar'
      ? article.contentAr
      : article.contentEn;

  const categoryName = CATEGORY_NAMES[article.category]?.[language] || article.category;

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.isFeatured))
    .slice(0, 3);

  // Social Sharing
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`*${headline}*\n\n${hook}\n\nKHI NEWS HD TV: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnX = () => {
    const text = encodeURIComponent(`${headline} via @khinewshdtv`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(headline);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  // Text-To-Speech Listen to Story
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${headline}. ${hook}. ${bodyContent}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = language === 'ur' ? 'ur-PK' : language === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    postComment(article.id, commentName.trim(), commentCity.trim(), commentText.trim());
    setCommentText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Navigation Breadcrumb & Back */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500 font-medium">
        <button
          onClick={() => setCurrentView({ type: 'home' })}
          className="flex items-center gap-1.5 text-slate-700 hover:text-red-600 font-bold transition-colors"
        >
          {language === 'en' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          <span>{t.latestNews}</span>
        </button>

        {/* In-page language switcher: اردو | English | العربية */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 rtl:mr-1 rtl:ml-0" />
          <span className="text-[11px] font-semibold text-slate-600 hidden sm:inline">
            {language === 'ur' ? 'خبر کی زبان بدلیں:' : language === 'ar' ? 'لغة المادة:' : 'Story Language:'}
          </span>
          <button
            onClick={() => setLanguage('ur')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
              language === 'ur' ? 'bg-red-600 text-white font-bold shadow-sm' : 'text-slate-700 hover:bg-white'
            }`}
          >
            اردو
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
              language === 'en' ? 'bg-red-600 text-white font-bold shadow-sm' : 'text-slate-700 hover:bg-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
              language === 'ar' ? 'bg-red-600 text-white font-bold shadow-sm' : 'text-slate-700 hover:bg-white'
            }`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* Main Article Header */}
      <header className="space-y-4">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium flex-wrap">
          <span className="text-red-600 font-extrabold uppercase tracking-wide">
            {categoryName}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {article.location}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {new Date(article.publishedAt).toLocaleDateString(
              language === 'ur' ? 'ur-PK' : language === 'ar' ? 'ar-SA' : 'en-US',
              { dateStyle: 'long' }
            )}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.views.toLocaleString()} {language === 'ur' ? 'مشاہدات' : 'views'}</span>
        </div>

        {/* Headline */}
        <h1
          className={`font-black text-slate-950 tracking-tight leading-tight ${
            language === 'ur'
              ? 'font-urdu-headline text-2xl sm:text-4xl text-slate-950'
              : 'font-latin text-2xl sm:text-4xl text-slate-900'
          }`}
        >
          {headline}
        </h1>

        {/* Hook / Lead Paragraph */}
        {hook && (
          <p
            className={`text-slate-700 font-medium border-l-4 rtl:border-l-0 rtl:border-r-4 border-red-600 pl-4 rtl:pl-0 rtl:pr-4 py-1 ${
              language === 'ur' ? 'font-urdu text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}
          >
            {hook}
          </p>
        )}

        {/* Byline & Interactive Utility Row */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              {article.reporter.charAt(0)}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{article.reporter}</p>
              <p className="text-[11px] text-slate-500">{article.source}</p>
            </div>
          </div>

          {/* Action Tools: Listen, Share, Print */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isSpeaking
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-600" />}
              <span>{isSpeaking ? 'روکیں' : t.listenStory}</span>
            </button>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={shareOnWhatsApp}
                className="p-1.5 hover:bg-emerald-500 hover:text-white rounded text-emerald-600 transition-colors"
                title="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={shareOnFacebook}
                className="p-1.5 hover:bg-blue-600 hover:text-white rounded text-blue-600 transition-colors"
                title="Share on Facebook"
              >
                <span className="font-black text-xs px-0.5">fb</span>
              </button>
              <button
                onClick={shareOnX}
                className="p-1.5 hover:bg-black hover:text-white rounded text-slate-900 transition-colors"
                title="Share on X"
              >
                <span className="font-black text-xs px-0.5">𝕏</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="p-1.5 hover:bg-slate-300 rounded text-slate-700 transition-colors"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="space-y-2">
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-sm border border-slate-200">
          <img
            src={article.imageUrl}
            alt={headline}
            className="w-full h-full object-cover"
          />
        </div>
        {(article.imageCaptionUr || article.imageCaptionEn) && (
          <p className="text-xs text-slate-500 italic px-2">
            📷 {language === 'ur' ? article.imageCaptionUr : article.imageCaptionEn}
          </p>
        )}
      </div>

      {/* Editorial Legal Disclaimer for Sensitive Crime / Allegation Reports */}
      {article.isSensitive && article.disclaimer && (
        <div className="bg-amber-50 border-l-4 rtl:border-l-0 rtl:border-r-4 border-amber-500 p-4 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg space-y-1">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>{t.legalDisclaimerTitle}</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed font-urdu">
            {article.disclaimer}
          </p>
        </div>
      )}

      {/* Article Body */}
      <div
        className={`text-slate-800 space-y-5 border-b border-slate-200 pb-8 ${
          language === 'ur'
            ? 'font-urdu text-lg sm:text-xl leading-loose'
            : language === 'ar'
            ? 'font-arabic text-base sm:text-lg leading-loose'
            : 'font-latin text-base sm:text-lg leading-relaxed'
        }`}
      >
        {bodyContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
          </p>
        ))}
      </div>

      {/* In-Article Advertisement */}
      <AdBanner position="in_feed" />

      {/* Comments Section */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2 text-slate-900 font-black text-lg sm:text-xl">
          <MessageSquare className="w-5 h-5 text-red-600" />
          <span>{t.comments}</span>
          <span className="text-xs font-mono font-normal text-slate-500">
            ({article.comments?.length || 0})
          </span>
        </div>

        {/* Comment Input Form */}
        <form onSubmit={handleCommentSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder={t.enterName}
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder={t.enterCity}
              value={commentCity}
              onChange={(e) => setCommentCity(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <textarea
            rows={3}
            placeholder={t.commentPlaceholder}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs sm:text-sm font-bold transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.submitComment}</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-3">
          {article.comments && article.comments.length > 0 ? (
            article.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{comment.author}</span>
                    {comment.city && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{comment.city}</span>
                      </>
                    )}
                  </div>
                  <span>
                    {new Date(comment.createdAt).toLocaleDateString(
                      language === 'ur' ? 'ur-PK' : 'en-US'
                    )}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-urdu">
                  {comment.content}
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs text-slate-500">
                  <button
                    onClick={() => likeComment(article.id, comment.id)}
                    className="flex items-center gap-1 hover:text-red-600 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic py-2">
              {language === 'ur'
                ? 'ابھی تک کوئی تبصرہ موجود نہیں۔ آپ پہلے شخص بنیں جو رائے پیش کریں!'
                : 'No comments posted yet. Be the first to share your thoughts!'}
            </p>
          )}
        </div>
      </section>

      {/* Related News Section */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <h3 className="font-black text-slate-950 text-lg sm:text-xl">
            {t.relatedStories}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} variant="standard" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
