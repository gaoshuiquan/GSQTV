import React from 'react';
import { ViewState } from '../types';
import { Home, Tv, Film, Search, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: ViewState.HOME, icon: Home, label: "首页" },
    { id: ViewState.IPTV, icon: Tv, label: "直播" },
    { id: ViewState.VOD, icon: Film, label: "点播" },
    { id: ViewState.SEARCH, icon: Search, label: "搜索" },
    { id: ViewState.SETTINGS, icon: Settings, label: "设置" },
  ];

  return (
    <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full transition-all duration-300 z-50">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="font-bold text-white text-xl">G</span>
        </div>
        <h1 className="text-2xl font-bold tracking-wider hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          GSQTV
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`
                flex items-center gap-4 p-3 rounded-xl transition-all duration-200 outline-none
                focus:ring-4 focus:ring-blue-500/50 focus:bg-slate-800
                hover:bg-slate-800
                ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-slate-100'}
              `}
              tabIndex={0}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`font-medium text-lg hidden md:block ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 text-center md:text-left">
        <p className="text-xs text-slate-600 hidden md:block">Version 1.0.0 Web</p>
      </div>
    </div>
  );
};

export default Sidebar;