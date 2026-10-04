import React, { useEffect } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface AdBannerProps {
  position: 'header' | 'in_feed' | 'sidebar' | 'property_spotlight';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const { adSlots, recordAdClick, language } = useNews();
  const t = UI_TRANSLATIONS[language];

  const ad = adSlots.find((slot) => slot.position === position && slot.status === 'active');

  if (!ad) return null;

  const handleClick = () => {
    recordAdClick(ad.id);
  };

  if (position === 'header') {
    return (
      <div className={`w-full max-w-5xl mx-auto px-4 my-3 ${className}`}>
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-2 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-[10px] text-slate-400 px-1 mb-1 font-mono uppercase">
            <span>{t.advertisement}</span>
            <span>{ad.sponsorName}</span>
          </div>
          <a
            href={ad.targetUrl}
            onClick={handleClick}
            className="group relative block w-full max-h-24 sm:max-h-28 overflow-hidden rounded-lg"
          >
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent p-3 flex flex-col justify-center text-white">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {t.sponsored}
              </span>
              <h4 className="text-xs sm:text-sm font-bold truncate group-hover:underline">
                {ad.title}
              </h4>
            </div>
          </a>
        </div>
      </div>
    );
  }

  if (position === 'sidebar') {
    return (
      <div className={`bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono uppercase">
          <span>{t.advertisement}</span>
          <span>Sponsored</span>
        </div>
        <a
          href={ad.targetUrl}
          onClick={handleClick}
          className="group block relative rounded-lg overflow-hidden aspect-[4/3] bg-slate-100"
        >
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end text-white">
            <span className="text-[10px] text-amber-400 font-bold uppercase">{ad.sponsorName}</span>
            <h5 className="text-xs font-bold leading-tight line-clamp-2 group-hover:underline">
              {ad.title}
            </h5>
          </div>
        </a>
      </div>
    );
  }

  // in_feed or property_spotlight
  return (
    <div className={`my-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-700 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
          <div className="flex items-center gap-2 justify-center sm:justify-start rtl:sm:justify-end text-[11px] text-amber-400 font-bold">
            <Tag className="w-3.5 h-3.5" />
            <span>{t.sponsored} · {ad.sponsorName}</span>
          </div>
          <h4 className="text-sm sm:text-base font-bold">{ad.title}</h4>
          <p className="text-xs text-slate-300 max-w-lg">
            کراچی اور ملک بھر میں باوقار رئیل اسٹیٹ منصوبوں اور سرمایہ کاری کے محفوظ مواقع۔
          </p>
        </div>
        <a
          href={ad.targetUrl}
          onClick={handleClick}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors flex items-center gap-1.5"
        >
          <span>معلومات حاصل کریں</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
