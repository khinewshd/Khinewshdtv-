import React, { useState, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Pause, Play, AlertCircle } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS } from '../data/translations';

export const BreakingTicker: React.FC = () => {
  const { breakingArticles, language, setCurrentView } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    if (!breakingArticles.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingArticles.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [breakingArticles.length, isPaused]);

  if (!breakingArticles.length) return null;

  const currentStory = breakingArticles[currentIndex];
  const headline =
    language === 'ur'
      ? currentStory.titleUr
      : language === 'ar'
      ? currentStory.titleAr
      : currentStory.titleEn;

  const handleStoryClick = () => {
    setCurrentView({ type: 'article', articleId: currentStory.id });
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingArticles.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + breakingArticles.length) % breakingArticles.length);
  };

  return (
    <div
      className="bg-red-600 text-white relative z-30 shadow-inner select-none transition-colors border-y border-red-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-6 py-2 gap-3">
        {/* Animated Badge */}
        <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded text-xs font-black tracking-wide shrink-0">
          <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
          <span>{t.breakingNews}</span>
          <span className="hidden sm:inline bg-red-500 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
            {currentIndex + 1}/{breakingArticles.length}
          </span>
        </div>

        {/* Headline Link */}
        <div className="flex-1 overflow-hidden min-w-0">
          <button
            onClick={handleStoryClick}
            className={`w-full text-left rtl:text-right text-xs sm:text-sm font-bold hover:underline truncate cursor-pointer transition-opacity duration-300 ${
              language === 'ur' ? 'font-urdu leading-normal text-sm sm:text-base' : 'font-latin'
            }`}
          >
            {currentStory.isDeveloping && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded mr-2 rtl:mr-0 rtl:ml-2 shrink-0">
                {t.developingStory}
              </span>
            )}
            <span>{headline}</span>
          </button>
        </div>

        {/* Ticker Controls */}
        <div className="flex items-center gap-1 shrink-0 text-white/90">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:bg-red-700 rounded transition-colors"
            title={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={prevStory}
            className="p-1 hover:bg-red-700 rounded transition-colors"
            title="Previous story"
          >
            <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
          <button
            onClick={nextStory}
            className="p-1 hover:bg-red-700 rounded transition-colors"
            title="Next story"
          >
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
