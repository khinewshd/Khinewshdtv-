import React, { useState } from 'react';
import { X, Volume2, VolumeX, Maximize2, Radio, Play, Pause, Flame } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { UI_TRANSLATIONS } from '../data/translations';

export const LiveStreamModal: React.FC = () => {
  const { liveStreamOpen, setLiveStreamOpen, language, breakingArticles } = useNews();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!liveStreamOpen) return null;

  const t = UI_TRANSLATIONS[language];
  const tickerHeadline = breakingArticles[0]
    ? language === 'ur'
      ? breakingArticles[0].titleUr
      : language === 'ar'
      ? breakingArticles[0].titleAr
      : breakingArticles[0].titleEn
    : 'کے ایچ آئی نیوز ایچ ڈی ٹی وی: کراچی سے براہِ راست 24 گھنٹے نشریات جاری ہیں۔';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded tracking-wider">
                LIVE ON AIR
              </span>
            </div>
            <span className="font-bold text-sm sm:text-base">
              KHI NEWS HD TV · کراچی براہِ راست نشریات
            </span>
          </div>

          <button
            onClick={() => setLiveStreamOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* Mock Broadcast Feed Backdrop */}
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80"
            alt="KHI News Studio Live Feed"
            className="w-full h-full object-cover opacity-60"
          />

          {/* Broadcast Studio Graphics Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
            {/* Top Left Watermark */}
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white font-black text-sm px-2 py-1 rounded shadow">
                KHI NEWS HD
              </div>
              <div className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                KARACHI 24/7
              </div>
            </div>

            {/* Lower Third News Broadcast Graphic */}
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-extrabold text-xs px-2 py-0.5 rounded shadow flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  بریکنگ نیوز
                </span>
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded">
                  HEADLINES
                </span>
              </div>
              <div className="bg-slate-900/90 border-l-4 border-red-600 px-4 py-2.5 rounded-r backdrop-blur-md text-white shadow-xl">
                <p className="text-sm sm:text-base font-bold font-urdu leading-relaxed">
                  {tickerHeadline}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-black/60 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-black/60 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Info Footer */}
        <div className="p-3 bg-slate-900 text-slate-400 text-xs flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
          <span>سگنل کوالٹی: 1080p 60fps HD Broadcast · Karachi Earth Station</span>
          <span className="text-slate-300">Offical Web: khinewshd.tv · Satellite & Digital</span>
        </div>
      </div>
    </div>
  );
};
