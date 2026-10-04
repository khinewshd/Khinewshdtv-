import React from 'react';
import { Play, Flame, Clock, Share2, MapPin } from 'lucide-react';
import { Article, Language } from '../types';
import { useNews } from '../context/NewsContext';
import { CATEGORY_NAMES } from '../data/translations';

interface ArticleCardProps {
  article: Article;
  variant?: 'lead' | 'standard' | 'compact' | 'video';
  showCategory?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  showCategory = true,
}) => {
  const { language, setCurrentView } = useNews();

  const title =
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

  const categoryName = CATEGORY_NAMES[article.category]?.[language] || article.category;

  const handleClick = () => {
    setCurrentView({ type: 'article', articleId: article.id });
  };

  // Format relative or clean time
  const timeAgo = (dateStr: string) => {
    try {
      const diffMs = Date.now() - new Date(dateStr).getTime();
      const diffHours = Math.floor(diffMs / 3600000);
      if (diffHours < 1) return language === 'ur' ? 'ابھی ابھی' : language === 'ar' ? 'الآن' : 'Just now';
      if (diffHours < 24) {
        return language === 'ur'
          ? `${diffHours} گھنٹے قبل`
          : language === 'ar'
          ? `قبل ${diffHours} ساعات`
          : `${diffHours}h ago`;
      }
      return new Date(dateStr).toLocaleDateString(
        language === 'ur' ? 'ur-PK' : language === 'ar' ? 'ar-SA' : 'en-US',
        { month: 'short', day: 'numeric' }
      );
    } catch {
      return dateStr;
    }
  };

  // Lead Hero Story
  if (variant === 'lead') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {article.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-1 rtl:mr-1 rtl:ml-0" />
              </div>
            </div>
          )}
          {article.isBreaking && (
            <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded shadow flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>{language === 'ur' ? 'بریکنگ' : language === 'ar' ? 'عاجل' : 'BREAKING'}</span>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Clean unboxed metadata (zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
              <span className="text-red-600 font-bold uppercase tracking-wider">{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {article.location.split('-')[0].trim()}
              </span>
              <span aria-hidden="true">·</span>
              <span>{timeAgo(article.publishedAt)}</span>
            </div>

            <h2
              className={`font-black text-slate-950 group-hover:text-red-700 transition-colors mb-3 leading-snug ${
                language === 'ur'
                  ? 'font-urdu text-xl sm:text-2xl leading-relaxed'
                  : 'font-latin text-xl sm:text-2xl'
              }`}
            >
              {title}
            </h2>

            {hook && (
              <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed font-normal">
                {hook}
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{article.reporter}</span>
            <span>{article.views.toLocaleString()} {language === 'ur' ? 'مشاہدات' : language === 'ar' ? 'مشاهدة' : 'reads'}</span>
          </div>
        </div>
      </article>
    );
  }

  // Video Card Variant
  if (variant === 'video') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer bg-slate-900 text-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5 rtl:mr-0.5 rtl:ml-0" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 bg-black/80 text-[11px] font-mono px-2 py-0.5 rounded text-white font-bold">
            VIDEO
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5 font-medium">
              <span className="text-red-400 font-bold">{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{timeAgo(article.publishedAt)}</span>
            </div>

            <h3
              className={`font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 ${
                language === 'ur' ? 'font-urdu text-base leading-relaxed' : 'font-latin text-sm sm:text-base'
              }`}
            >
              {title}
            </h3>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{article.reporter}</span>
            <span>{article.views.toLocaleString()} views</span>
          </div>
        </div>
      </article>
    );
  }

  // Compact Thumbnail Variant (for Sidebars & Most Read)
  if (variant === 'compact') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer flex gap-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
      >
        <div className="relative w-20 h-16 sm:w-24 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {article.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Play className="w-4 h-4 fill-white text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
              <span className="text-red-600 font-bold">{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{timeAgo(article.publishedAt)}</span>
            </div>

            <h4
              className={`font-bold text-slate-900 group-hover:text-red-600 line-clamp-2 transition-colors ${
                language === 'ur' ? 'font-urdu text-sm leading-snug' : 'font-latin text-xs sm:text-sm'
              }`}
            >
              {title}
            </h4>
          </div>
        </div>
      </article>
    );
  }

  // Standard News Card Variant
  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={article.imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {article.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow">
              <Play className="w-4 h-4 fill-white ml-0.5 rtl:mr-0.5 rtl:ml-0" />
            </div>
          </div>
        )}
        {article.isBreaking && (
          <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
            {language === 'ur' ? 'بریکنگ' : language === 'ar' ? 'عاجل' : 'BREAKING'}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            {showCategory && (
              <>
                <span className="text-red-600 font-bold uppercase tracking-wider">{categoryName}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <span>{timeAgo(article.publishedAt)}</span>
          </div>

          <h3
            className={`font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2 ${
              language === 'ur' ? 'font-urdu text-base sm:text-lg leading-relaxed' : 'font-latin text-sm sm:text-base'
            }`}
          >
            {title}
          </h3>

          {hook && (
            <p className="mt-2 text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {hook}
            </p>
          )}
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{article.reporter.split('(')[0].trim()}</span>
          <span>{article.views.toLocaleString()} {language === 'ur' ? 'ویوز' : 'views'}</span>
        </div>
      </div>
    </article>
  );
};
