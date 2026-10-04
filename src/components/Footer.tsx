import React, { useState } from 'react';
import { Mail, Check, Phone, MapPin, Tv, Globe, Shield, FileText } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS, CATEGORY_NAMES } from '../data/translations';
import { NewsCategory } from '../types';

export const Footer: React.FC = () => {
  const { language, setCurrentView } = useNews();
  const t = UI_TRANSLATIONS[language];
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setEmailInput('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const navCategories: NewsCategory[] = [
    'Karachi',
    'Sindh',
    'Pakistan',
    'Politics',
    'Crime',
    'Business',
    'Sports',
    'Entertainment',
    'Technology',
    'Weather',
    'Videos',
    'Property',
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 mt-16 border-t-4 border-red-600 transition-colors">
      {/* Newsletter / Alert Subscription Bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left rtl:md:text-right space-y-1">
            <h4 className="text-base sm:text-lg font-black text-white font-urdu">
              {t.newsletterTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.newsletterDesc}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2 max-w-md">
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={t.enterEmailOrPhone}
              className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl shrink-0 transition-colors"
            >
              {isSubscribed ? <Check className="w-4 h-4" /> : t.subscribe}
            </button>
          </form>
        </div>
        {isSubscribed && (
          <p className="text-center text-xs text-emerald-400 font-bold mt-3">
            ✓ {t.subscribedSuccess}
          </p>
        )}
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Information */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg text-white font-black text-lg flex items-center justify-center shadow">
              KHI
            </div>
            <div>
              <span className="font-black text-lg text-white">KHI NEWS</span>
              <span className="bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded ml-1">
                HD TV
              </span>
              <p className="text-[11px] text-slate-400 font-urdu">کے ایچ آئی نیوز ایچ ڈی ٹی وی</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            کراچی اور سندھ کا سب سے بڑا ملٹی لنگوئل ڈیجیٹل براڈکاسٹ نیوز روم۔ مستند، غیر جانبدار اور لمحہ بہ لمحہ باخبر رہنے کا واحد ادارہ۔
          </p>

          <div className="text-xs text-slate-400 space-y-1">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>{t.bureauAddress}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span dir="ltr">+92 21 111-KHI-NEWS</span>
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
            اہم شعبہ جات (Beats)
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {navCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCurrentView({ type: 'category', category: cat })}
                className="text-left rtl:text-right py-1 text-slate-400 hover:text-red-400 transition-colors"
              >
                {CATEGORY_NAMES[cat][language]}
              </button>
            ))}
          </div>
        </div>

        {/* Social Accounts & Broadcast Channels */}
        <div className="space-y-4">
          <h5 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
            آفیشل سوشل چینلز
          </h5>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="font-bold text-white">Facebook</span>
              <span className="text-red-400 font-mono">khinewshdtv</span>
            </div>
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="font-bold text-white">YouTube</span>
              <span className="text-red-400 font-mono">Karachi News Digital</span>
            </div>
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="font-bold text-white">Instagram</span>
              <span className="text-red-400 font-mono">khinews</span>
            </div>
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="font-bold text-white">TikTok</span>
              <span className="text-red-400 font-mono">khinews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & SEO Sitemap Link Bar */}
      <div className="bg-slate-900 border-t border-slate-800 py-4 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Google News Verified</span>
            <span aria-hidden="true">·</span>
            <span>Hreflang: ur, en, ar</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setCurrentView({ type: 'admin', subTab: 'seo' })}
              className="hover:underline text-slate-400"
            >
              XML Sitemap & SEO
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
