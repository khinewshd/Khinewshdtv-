import React, { useState } from 'react';
import { Search, Sparkles, X, Loader2, ArrowRight, ArrowLeft, Filter, MapPin, Calendar } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS, CATEGORY_NAMES } from '../data/translations';
import { NewsCategory } from '../types';
import { ArticleCard } from './ArticleCard';

export const SmartSearchModal: React.FC = () => {
  const {
    smartSearchOpen,
    setSmartSearchOpen,
    articles,
    language,
    setCurrentView,
  } = useNews();

  const [query, setQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [hasSearched, setHasSearched] = useState(false);

  if (!smartSearchOpen) return null;

  const t = UI_TRANSLATIONS[language];

  const suggestedQuestions = [
    'کراچی میں آج کیا ہوا؟',
    'What are today’s top Karachi stories?',
    'ما هي أهم أخبار كراتشي اليوم؟',
    'ریڈ لائن بی آر ٹی کی تازہ ترین صورتحال کیا ہے؟',
    'کراچی سیف سٹی پروجیکٹ کے بارے میں بتائیں',
    'PSX stock exchange update',
  ];

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery !== undefined ? searchQuery : query;
    if (!q.trim()) return;

    setHasSearched(true);
    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ai/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          articles,
        }),
      });

      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setAiAnswer(data.answer);
      setMatchedIds(data.matchedArticleIds || []);
    } catch (err) {
      console.error('Smart search error:', err);
      // Fallback local matching
      const qLower = q.toLowerCase();
      const localMatches = articles.filter(
        (a) =>
          a.titleUr.includes(q) ||
          a.titleEn.toLowerCase().includes(qLower) ||
          a.contentUr.includes(q) ||
          a.contentEn.toLowerCase().includes(qLower)
      );
      setMatchedIds(localMatches.map((a) => a.id));
      setAiAnswer(
        language === 'ur'
          ? `کے ایچ آئی نیوز ریکارڈز کے مطابق درج ذیل رپورٹس آپ کی تلاش سے مطابقت رکھتی ہیں۔`
          : `Based on KHI NEWS HD TV archives, here are the stories matching your inquiry.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const matchedArticles = articles.filter((a) => {
    if (matchedIds.length > 0 && !matchedIds.includes(a.id)) return false;
    if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base">
              {t.smartSearch} · KHI NEWS HD TV
            </h3>
          </div>
          <button
            onClick={() => setSmartSearchOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.askAiPlaceholder}
                className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none shadow-xs font-urdu"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={isAiLoading || !query.trim()}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
            >
              {isAiLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{t.searchButton}</span>
            </button>
          </form>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500">تجویز کردہ سوالات:</span>
            {suggestedQuestions.map((qText, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(qText);
                  handleSearch(qText);
                }}
                className="text-[11px] bg-white border border-slate-200 hover:border-red-400 text-slate-700 hover:text-red-600 px-2.5 py-1 rounded-md transition-colors"
              >
                {qText}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-5">
          {/* AI Synthesized News Briefing */}
          {aiAnswer && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>کے ایچ آئی نیوز اے آئی بریفنگ</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-urdu font-medium">
                {aiAnswer}
              </p>
            </div>
          )}

          {/* Faceted Category Filter */}
          {hasSearched && (
            <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-2">
              <span className="font-bold">
                {matchedArticles.length} متعلقہ خبریں ملیں
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-xs text-slate-700"
              >
                <option value="all">تمام شعبے (All)</option>
                <option value="Karachi">کراچی</option>
                <option value="Business">کاروبار</option>
                <option value="Crime">جرائم</option>
                <option value="Weather">موسم</option>
                <option value="Property">پراپرٹی</option>
              </select>
            </div>
          )}

          {/* Matched Articles List */}
          <div className="space-y-3">
            {matchedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  setSmartSearchOpen(false);
                  setCurrentView({ type: 'article', articleId: article.id });
                }}
                className="cursor-pointer"
              >
                <ArticleCard article={article} variant="compact" />
              </div>
            ))}

            {hasSearched && matchedArticles.length === 0 && !isAiLoading && (
              <p className="text-center text-xs text-slate-500 py-6">
                کوئی خبر دستیاب نہیں ہے۔ براہ کرم مختلف الفاظ یا سوال کے ساتھ دوبارہ کوشش کریں۔
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
