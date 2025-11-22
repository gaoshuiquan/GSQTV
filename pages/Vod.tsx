import React, { useEffect, useState } from 'react';
import { fetchVodConfig } from '../services/api';
import { VodConfig } from '../types';
import { Database, Film, Globe, AlertTriangle } from 'lucide-react';

const Vod: React.FC = () => {
  const [config, setConfig] = useState<VodConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVodConfig().then(data => {
      setConfig(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-2xl text-slate-500">正在加载配置源...</div>;

  return (
    <div className="h-full overflow-y-auto p-8 pb-32">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">点播源配置</h1>
        <p className="text-slate-400">
            已加载外部配置：<span className="font-mono bg-slate-800 px-2 py-1 rounded text-xs text-blue-400">tv.gaoops.com</span>
        </p>
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3 items-start text-yellow-200 text-sm max-w-3xl">
           <AlertTriangle className="shrink-0" size={20} />
           <p>
             注意：这是一个Web预览版。真实的TVBox配置通常包含自定义爬虫(jar/spider)文件，无法在纯Web环境中直接执行。
             下方列出了解析到的站点列表，在Android APP版本中，点击即可直接浏览对应站点的资源。
           </p>
        </div>
      </header>

      {config && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {config.sites.map((site, idx) => (
            <div 
              key={idx} 
              className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/50 transition-all cursor-pointer group"
              tabIndex={0}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {site.type === 3 ? <Globe size={20} /> : <Database size={20} />}
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
                    Type: {site.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{site.name}</h3>
              <p className="text-xs text-slate-500 truncate mb-4">key: {site.key}</p>
              
              <button className="w-full py-2 bg-slate-700 hover:bg-blue-600 rounded text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  查看资源
              </button>
            </div>
          ))}
        </div>
      )}

      {(!config || config.sites.length === 0) && (
          <div className="text-center py-20">
              <Film size={64} className="mx-auto text-slate-700 mb-4" />
              <p className="text-slate-500">未能解析到有效的点播源</p>
          </div>
      )}
    </div>
  );
};

export default Vod;