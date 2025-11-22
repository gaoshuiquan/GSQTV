import React, { useState, useEffect, useMemo } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { IptvChannel } from '../types';
import { fetchIptvChannels } from '../services/api';
import { Tv, List, AlertCircle } from 'lucide-react';

const Iptv: React.FC = () => {
  const [channels, setChannels] = useState<IptvChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<IptvChannel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const data = await fetchIptvChannels();
        setChannels(data);
        if (data.length > 0) setSelectedChannel(data[0]);
      } catch (err) {
        setError("无法加载直播源");
      } finally {
        setIsLoading(false);
      }
    };
    loadChannels();
  }, []);

  const groupedChannels = useMemo(() => {
    const groups: Record<string, IptvChannel[]> = {};
    channels.forEach(ch => {
      const g = ch.group || '其他';
      if (!groups[g]) groups[g] = [];
      groups[g].push(ch);
    });
    return groups;
  }, [channels]);

  // Explicitly type the entries to avoid TypeScript "unknown" errors during map
  const channelGroups: [string, IptvChannel[]][] = Object.entries(groupedChannels);

  if (isLoading) {
    return <div className="h-full flex items-center justify-center text-xl text-slate-400">加载频道列表中...</div>;
  }

  if (error && channels.length === 0) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-red-400 gap-4">
            <AlertCircle size={48} />
            <p>{error}</p>
            <p className="text-sm text-slate-500">请检查网络连接或源地址是否有效</p>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden">
      {/* Player Area */}
      <div className="flex-1 bg-black relative flex flex-col">
        {selectedChannel ? (
          <VideoPlayer src={selectedChannel.url} className="flex-1" />
        ) : (
           <div className="flex-1 flex items-center justify-center bg-black text-slate-600">
             <Tv size={48} className="mb-2" />
             <span>选择频道开始播放</span>
           </div>
        )}
        <div className="p-4 bg-slate-900/90 backdrop-blur text-white border-t border-white/10">
            <h2 className="text-xl font-bold flex items-center gap-2">
                {selectedChannel?.logo && <img src={selectedChannel.logo} className="h-6 w-auto" alt="logo" />}
                {selectedChannel?.name || "未选择频道"}
            </h2>
            <p className="text-sm text-slate-400">{selectedChannel?.group} - {selectedChannel?.url}</p>
        </div>
      </div>

      {/* Channel List - Sidebar style on TV */}
      <div className="w-full md:w-80 bg-slate-800 border-l border-slate-700 flex flex-col h-1/3 md:h-full">
        <div className="p-4 border-b border-slate-700 flex items-center gap-2 shadow-sm z-10">
            <List size={20} />
            <span className="font-bold">频道列表 ({channels.length})</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {channelGroups.map(([group, groupChannels]) => (
            <div key={group} className="mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2 sticky top-0 bg-slate-800/95 backdrop-blur z-10">
                {group}
              </h3>
              {groupChannels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 outline-none
                    focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white
                    hover:bg-slate-700
                    ${selectedChannel?.id === channel.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300'}
                  `}
                  tabIndex={0}
                >
                  {channel.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Iptv;