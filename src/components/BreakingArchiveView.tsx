import React from 'react';
import { Flame, Clock, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { ArticleCard } from './ArticleCard';

export const BreakingArchiveView: React.FC = () => {
  const { breakingArticles, articles, language, setCurrentView } = useNews();
  const t = UI_TRANSLATIONS[language];

  const allUrgentStories = articles.filter(
    (a) => a.isBreaking || a.priority === 'urgent' || a.priority === 'high'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="border-b-2 border-red-600 pb-3 flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentView({ type: 'home' })}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 font-bold mb-1 transition-colors"
          >
            {language === 'en' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            <span>{t.latestNews}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-red-600 flex items-center gap-2">
            <Flame className="w-7 h-7 fill-red-600 text-red-600" />
            <span>{t.breakingNews} آرکائیو و ہنگامی بلیٹن</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUrgentStories.map((art) => (
          <ArticleCard key={art.id} article={art} variant="standard" />
        ))}
      </div>
    </div>
  );
};
