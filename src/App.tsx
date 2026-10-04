/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NewsProvider, useNews } from './context/NewsContext';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { HomePage } from './components/HomePage';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { BreakingArchiveView } from './components/BreakingArchiveView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LiveStreamModal } from './components/LiveStreamModal';
import { SmartSearchModal } from './components/SmartSearchModal';
import { PushNotificationBanner } from './components/PushNotificationBanner';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useNews();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* Top Header & Navigation */}
      <Header />

      {/* Breaking News Real-time Ticker */}
      <BreakingTicker />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView.type === 'home' && <HomePage />}
        {currentView.type === 'article' && (
          <ArticleView articleId={currentView.articleId} />
        )}
        {currentView.type === 'category' && (
          <CategoryView category={currentView.category} />
        )}
        {currentView.type === 'breaking_archive' && <BreakingArchiveView />}
        {currentView.type === 'admin' && <AdminDashboard />}
      </main>

      {/* Modals & Overlays */}
      <LiveStreamModal />
      <SmartSearchModal />
      <PushNotificationBanner />

      {/* Broadcast Newsroom Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <NewsProvider>
      <AppContent />
    </NewsProvider>
  );
}
