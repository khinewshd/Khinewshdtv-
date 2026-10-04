import React, { useState } from 'react';
import {
  Flame,
  Radio,
  Play,
  TrendingUp,
  MapPin,
  Calendar,
  CloudSun,
  Video,
  FileText,
  Building,
  Shield,
  ArrowRight,
  ArrowLeft,
  Vote,
  ExternalLink,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS, CATEGORY_NAMES } from '../data/translations';
import { ArticleCard } from './ArticleCard';
import { AdBanner } from './AdBanner';
import { NewsCategory } from '../types';

export const HomePage: React.FC = () => {
  const {
    articles,
    language,
    setCurrentView,
    setLiveStreamOpen,
  } = useNews();

  const t = UI_TRANSLATIONS[language];

  // Poll state
  const [pollVoted, setPollVoted] = useState(false);
  const [pollVote, setPollVote] = useState<'yes' | 'no' | null>(null);

  // Filter sections
  const leadStory = articles.find((a) => a.isFeatured) || articles[0];
  const heroSubStories = articles.filter((a) => a.id !== leadStory?.id).slice(0, 3);

  const karachiBeatStories = articles.filter(
    (a) => a.category === 'Karachi' || a.location.toLowerCase().includes('karachi')
  );

  const videoVlogStories = articles.filter(
    (a) => a.category === 'Videos' || a.category === 'Vlogs' || a.category === 'Interviews' || a.videoUrl
  );

  const businessStories = articles.filter((a) => a.category === 'Business');
  const crimeStories = articles.filter((a) => a.category === 'Crime');
  const propertyStories = articles.filter((a) => a.category === 'Property');

  const mostReadStories = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  const handleVote = (choice: 'yes' | 'no') => {
    setPollVote(choice);
    setPollVoted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Header Advertisement Slot */}
      <AdBanner position="header" />

      {/* 1. HERO TOP STORIES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
          <h2 className="text-lg sm:text-xl font-black text-slate-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
            <span>{t.topStories}</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {new Date().toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </div>

        {/* Hero Grid: Big Lead + 3 Side Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Grand Lead Story */}
          {leadStory && (
            <div className="lg:col-span-7">
              <ArticleCard article={leadStory} variant="lead" />
            </div>
          )}

          {/* Sub Lead Columns */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {heroSubStories.map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}

            {/* Live Broadcast Feature Card */}
            <div
              onClick={() => setLiveStreamOpen(true)}
              className="group cursor-pointer bg-gradient-to-r from-red-600 to-slate-950 text-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase bg-red-800 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                    LIVE TRANSMISSION
                  </span>
                  <h4 className="text-sm font-bold mt-0.5 font-urdu">
                    کے ایچ آئی نیوز ایچ ڈی ٹی وی لائیو دیکھیں
                  </h4>
                </div>
              </div>
              <Radio className="w-5 h-5 text-red-300 animate-pulse shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. KARACHI DESK & LOCAL CIVIC BEAT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-950 font-urdu">
              {t.karachiBeat} (Karachi City News)
            </h2>
          </div>
          <button
            onClick={() => setCurrentView({ type: 'category', category: 'Karachi' })}
            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
          >
            <span>تمام کراچی خبریں</span>
            {language === 'en' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {karachiBeatStories.slice(0, 3).map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      </section>

      {/* In-Feed Sponsored Banner */}
      <AdBanner position="in_feed" />

      {/* 3. MULTI-COLUMN SECTION: BUSINESS, CRIME & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Crime Beat & Business Desk */}
        <div className="lg:col-span-8 space-y-8">
          {/* Crime & Law & Order */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span>جرائم و امن و امان (Crime & Justice)</span>
              </h3>
              <button
                onClick={() => setCurrentView({ type: 'category', category: 'Crime' })}
                className="text-xs font-bold text-slate-500 hover:text-red-600"
              >
                مزید
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {crimeStories.map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </section>

          {/* Business & Economy (PSX) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>{t.businessEconomy} (PSX & Markets)</span>
              </h3>
              <button
                onClick={() => setCurrentView({ type: 'category', category: 'Business' })}
                className="text-xs font-bold text-slate-500 hover:text-red-600"
              >
                مزید
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessStories.map((art) => (
                <ArticleCard key={art.id} article={art} variant="standard" />
              ))}
            </div>
          </section>
        </div>

        {/* Right 4 Cols: Sidebar with Most Read, Live Poll & Ad */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Most Read Articles */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <h3 className="font-black text-sm text-slate-950 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>{t.mostRead}</span>
              <Flame className="w-4 h-4 text-red-600 fill-red-600" />
            </h3>
            <div className="space-y-1">
              {mostReadStories.map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => setCurrentView({ type: 'article', articleId: art.id })}
                  className="flex items-start gap-2.5 py-2 cursor-pointer group hover:bg-slate-50 px-1 rounded transition-colors"
                >
                  <span className="font-mono font-black text-red-600 text-lg w-5 text-center">
                    0{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 group-hover:text-red-600 line-clamp-2 font-urdu">
                      {language === 'ur' ? art.titleUr : language === 'ar' ? art.titleAr : art.titleEn}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {art.views.toLocaleString()} reads
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Public Opinion Poll */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Vote className="w-4 h-4" />
              <span>کے ایچ آئی عوامی رائے شماری (Daily Poll)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold leading-relaxed font-urdu">
              کیا کراچی میں سیف سٹی پروجیکٹ کے فیز ون کے نفاذ سے اسٹریٹ کرائم میں کمی واقع ہوگی؟
            </h4>

            {!pollVoted ? (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleVote('yes')}
                  className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  ہاں (Yes)
                </button>
                <button
                  onClick={() => handleVote('no')}
                  className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors"
                >
                  نہیں (No)
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 pt-1 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>ہاں (Yes)</span>
                    <span className="font-mono font-bold">81%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[81%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>نہیں (No)</span>
                    <span className="font-mono font-bold">19%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[19%]"></div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 text-center pt-1 font-mono">
                  کل ووٹ: 14,820 · آپ کا ووٹ درج ہو چکا ہے
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Advertisement Slot */}
          <AdBanner position="sidebar" />
        </aside>
      </div>

      {/* 4. EXCLUSIVE VIDEOS & VLOGS SECTION */}
      <section className="bg-slate-950 text-white rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-red-500" />
            <h2 className="text-lg sm:text-xl font-black font-urdu">
              {t.exclusiveVideos} (Karachi News Digital)
            </h2>
          </div>
          <button
            onClick={() => setCurrentView({ type: 'category', category: 'Videos' })}
            className="text-xs font-bold text-red-400 hover:underline"
          >
            تمام ویڈیوز
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoVlogStories.map((art) => (
            <ArticleCard key={art.id} article={art} variant="video" />
          ))}
        </div>
      </section>

      {/* 5. PROPERTY & REALTY SHOWCASE */}
      {propertyStories.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-900" />
              <h2 className="text-lg sm:text-xl font-black text-slate-950 font-urdu">
                {t.propertyRealty} (Karachi Corridors)
              </h2>
            </div>
            <button
              onClick={() => setCurrentView({ type: 'category', category: 'Property' })}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              تمام پراپرٹی رپورٹس
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {propertyStories.map((art) => (
              <ArticleCard key={art.id} article={art} variant="standard" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
