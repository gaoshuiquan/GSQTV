
import React, { useState } from 'react';
import { Settings as SettingsIcon, Smartphone, Tv, Download, Info, Copy, Check } from 'lucide-react';
import { APP_NAME } from '../constants';

const Settings: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="h-full overflow-y-auto p-8 pb-32">
      <header className="mb-10 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <SettingsIcon size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{APP_NAME} 设置</h1>
            <p className="text-slate-400">版本 v1.0.0 (Web TV Edition)</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
        
        {/* About Section */}
        <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Info size={20} className="text-blue-400" />
            关于应用
          </h2>
          <div className="space-y-4 text-slate-300">
            <p>
              GSQTV 是一款专为 Android TV 设计的聚合媒体播放器。
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm text-slate-400">
              <li>集成豆瓣高分影视推荐</li>
              <li>支持 TVBox 格式点播源配置</li>
              <li>支持 M3U 格式 IPTV 直播源</li>
              <li>适配电视遥控器操作</li>
              <li>Gemini AI 智能搜索推荐</li>
            </ul>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Download size={20} className="text-green-400" />
            如何安装到电视
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-slate-700 p-3 rounded-lg h-fit shrink-0">
                <Tv size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">方法一：直接浏览器访问</h3>
                <p className="text-sm text-slate-400 mb-2">
                  在电视自带浏览器 (推荐 TVBro) 中输入本网页地址即可直接使用。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-slate-700 p-3 rounded-lg h-fit shrink-0">
                <Smartphone size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">方法二：生成 APK 安装包</h3>
                <p className="text-sm text-slate-400 mb-3">
                  复制下方的当前网址，使用 "Web2Apk" 工具生成 APK。
                </p>
                
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex items-center justify-between gap-2 mb-3">
                   <code className="text-xs text-blue-300 truncate flex-1">{currentUrl}</code>
                   <button 
                     onClick={handleCopy}
                     className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-md transition-colors"
                     title="复制网址"
                   >
                     {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                   </button>
                </div>

                <ol className="list-decimal list-inside text-xs text-slate-500 space-y-1 bg-slate-900/50 p-3 rounded-lg">
                  <li>点击上方按钮复制网址</li>
                  <li>使用电脑搜索 "Website 2 APK Builder" 或 "Web2Apk"</li>
                  <li>将网址粘贴进去，应用名填 "GSQTV"</li>
                  <li>生成 APK 并拷贝到 U 盘，插入电视安装</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="lg:col-span-2 bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
           <h2 className="text-lg font-bold text-white mb-4">当前数据源配置</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg">
                  <span className="text-xs text-slate-500 uppercase font-bold">点播源 (VOD)</span>
                  <code className="block mt-1 text-sm text-blue-400 break-all">
                    https://tv.gaoops.com/api/tvbox/config?format=json
                  </code>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg">
                  <span className="text-xs text-slate-500 uppercase font-bold">直播源 (IPTV)</span>
                  <code className="block mt-1 text-sm text-green-400 break-all">
                    https://iptv.gaoops.top/m3u
                  </code>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default Settings;
