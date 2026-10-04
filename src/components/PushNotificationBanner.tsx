import React from 'react';
import { Bell, Flame, X } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const PushNotificationBanner: React.FC = () => {
  const { activeToast, dismissToast, setCurrentView } = useNews();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-50 max-w-sm w-full bg-slate-950 text-white rounded-2xl p-4 shadow-2xl border border-red-600/40 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-600 text-white rounded-xl shrink-0">
          <Flame className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold">
              KHI NEWS ALERT
            </span>
            <button
              onClick={dismissToast}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h5 className="font-bold text-xs sm:text-sm mt-0.5 line-clamp-1 font-urdu">
            {activeToast.title}
          </h5>
          <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {activeToast.message}
          </p>
        </div>
      </div>
    </div>
  );
};
