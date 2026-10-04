import React, { useState, useEffect } from 'react';
import {
  Tv,
  Search,
  Sliders,
  Globe,
  Radio,
  Flame,
  Clock,
  CloudSun,
  TrendingUp,
  Menu,
  X,
  Volume2,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS, CATEGORY_NAMES } from '../data/translations';
import { Language, NewsCategory } from '../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    setLiveStreamOpen,
    setSmartSearchOpen,
    breakingArticles,
  } = useNews();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [karachiTimeStr, setKarachiTimeStr] = useState('');

  // Clock in Karachi timezone (Asia/Karachi, UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };
      const time = now.toLocaleTimeString(language === 'ur' ? 'ur-PK' : language === 'ar' ? 'ar-SA' : 'en-US', options);
      const date = now.toLocaleDateString(language === 'ur' ? 'ur-PK' : language === 'ar' ? 'ar-SA' : 'en-US', dateOptions);
      setKarachiTimeStr(`${date} · ${time}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const t = UI_TRANSLATIONS[language];

  const primaryNavCategories: NewsCategory[] = [
    'Karachi',
    'Sindh',
    'Pakistan',
    'Politics',
    'Crime',
    'Business',
    'Sports',
    'Videos',
    'Special Reports',
    'Property',
  ];

  const handleCategoryClick = (cat: NewsCategory) => {
    setSelectedCategory(cat);
    setCurrentView({ type: 'category', category: cat });
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    setSelectedCategory('All');
    setCurrentView({ type: 'home' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-colors">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Dateline & Karachi Weather */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>{karachiTimeStr || 'Karachi Time'}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-amber-400 font-medium border-l border-slate-700 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
              <CloudSun className="w-3.5 h-3.5" />
              <span>کراچی: 32°C · سمندری ہوا 18 km/h</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] border-l border-slate-700 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>PSX 100: 84,250 (+1.4%)</span>
            </div>
          </div>

          {/* Quick Actions & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto rtl:ml-0 rtl:mr-auto">
            {/* Live TV Button */}
            <button
              onClick={() => setLiveStreamOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-medium text-xs transition-colors"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              <span>{t.liveStream}</span>
            </button>

            {/* Newsroom CMS Desk Launcher */}
            <button
              onClick={() => setCurrentView({ type: 'admin' })}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                currentView.type === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Sliders className="w-3 h-3 text-amber-400" />
              <span>{t.newsroomDesk}</span>
            </button>

            {/* Language Switcher: Urdu | English | Arabic */}
            <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2 py-0.5 rounded transition-all font-medium ${
                  language === 'ur'
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="اردو"
              >
                اردو
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded transition-all font-medium ${
                  language === 'en'
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 py-0.5 rounded transition-all font-medium ${
                  language === 'ar'
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="العربية"
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Pakistani Newsroom Identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleHomeClick}>
          <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-lg text-white font-black text-xl tracking-tighter shadow-md border-b-2 border-red-800">
            KHI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-latin">
                KHI NEWS
              </span>
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide">
                HD TV
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold text-red-600 font-urdu">
                کے ایچ آئی نیوز
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
              {t.brandTagline}
            </p>
          </div>
        </div>

        {/* Right Header: Search & AI Smart Search Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSmartSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs sm:text-sm font-medium border border-slate-300 transition-colors"
          >
            <Search className="w-4 h-4 text-red-600" />
            <span className="hidden md:inline">{t.askAiPlaceholder}</span>
            <span className="inline md:hidden">{t.searchButton}</span>
          </button>

          {/* Breaking News Count Badge */}
          {breakingArticles.length > 0 && (
            <button
              onClick={() => setCurrentView({ type: 'breaking_archive' })}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-bold border border-red-200 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>{breakingArticles.length}</span>
              <span className="hidden sm:inline">{t.breakingNews}</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Category Bar (Desktop) */}
      <nav className="hidden lg:block border-t border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <ul className="flex items-center gap-1 py-1 overflow-x-auto text-xs font-bold text-slate-700">
            <li>
              <button
                onClick={handleHomeClick}
                className={`px-3 py-2 rounded transition-colors ${
                  currentView.type === 'home' && selectedCategory === 'All'
                    ? 'text-red-700 border-b-2 border-red-600 font-extrabold'
                    : 'hover:text-red-600'
                }`}
              >
                {t.latestNews}
              </button>
            </li>
            {primaryNavCategories.map((cat) => {
              const catName = CATEGORY_NAMES[cat][language];
              const isSelected = selectedCategory === cat;
              return (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-2 rounded transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'text-red-700 border-b-2 border-red-600 font-extrabold'
                        : 'hover:text-red-600'
                    }`}
                  >
                    {catName}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 py-1">
            <button
              onClick={() => setCurrentView({ type: 'breaking_archive' })}
              className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 fill-red-600" />
              <span>{t.urgentAlert}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={handleHomeClick}
              className="text-left rtl:text-right py-2 px-3 rounded hover:bg-slate-100 text-red-600 font-bold"
            >
              {t.latestNews}
            </button>
            {primaryNavCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="text-left rtl:text-right py-2 px-3 rounded hover:bg-slate-100 text-slate-700"
              >
                {CATEGORY_NAMES[cat][language]}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setLiveStreamOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded font-bold text-sm"
            >
              <Radio className="w-4 h-4" />
              <span>{t.liveStream}</span>
            </button>

            <button
              onClick={() => {
                setCurrentView({ type: 'admin' });
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-slate-900 text-white rounded font-bold text-sm"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>{t.newsroomDesk}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
