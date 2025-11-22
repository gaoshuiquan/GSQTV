
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Iptv from './pages/Iptv';
import Vod from './pages/Vod';
import Search from './pages/Search';
import Settings from './pages/Settings';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home />;
      case ViewState.IPTV:
        return <Iptv />;
      case ViewState.VOD:
        return <Vod />;
      case ViewState.SEARCH:
        return <Search />;
      case ViewState.SETTINGS:
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 h-full overflow-hidden relative shadow-2xl shadow-black">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
