import React from 'react';
import { useNews } from '../context/NewsContext';
import { CATEGORY_NAMES, UI_TRANSLATIONS } from '../data/translations';
import { NewsCategory } from '../types';
import { ArticleCard } from './ArticleCard';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';

interface CategoryViewProps {
  category: NewsCategory;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category }) => {
  const { articles, language, setCurrentView } = useNews();
  const t = UI_TRANSLATIONS[language];
  const catName = CATEGORY_NAMES[category]?.[language] || category;

  const categoryArticles = articles.filter(
    (a) => a.category === category || a.tags.includes(category)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Category Header */}
      <div className="border-b-2 border-red-600 pb-3 flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentView({ type: 'home' })}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 font-bold mb-1 transition-colors"
          >
            {language === 'en' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            <span>{t.latestNews}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 flex items-center gap-2">
            <span>{catName}</span>
            <span className="text-xs font-mono font-normal text-slate-400">
              ({categoryArticles.length} خبریں)
            </span>
          </h1>
        </div>
      </div>

      {/* Grid of Articles */}
      {categoryArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-2">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-medium">اس شعبے میں مزید خبریں جلد اپ ڈیٹ کی جائیں گی۔</p>
          <button
            onClick={() => setCurrentView({ type: 'home' })}
            className="text-xs text-red-600 font-bold hover:underline"
          >
            مرکزی صفحہ پر واپس جائیں
          </button>
        </div>
      )}
    </div>
  );
};
