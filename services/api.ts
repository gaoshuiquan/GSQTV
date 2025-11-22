import { VodConfig, IptvChannel } from '../types';
import { VOD_CONFIG_URL, IPTV_M3U_URL, MOCK_CHANNELS } from '../constants';

export const fetchVodConfig = async (): Promise<VodConfig | null> => {
  try {
    const response = await fetch(VOD_CONFIG_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.warn("Failed to fetch VOD Config (likely CORS in browser env). Using fallback structure.", error);
    // Return a dummy structure so the UI works
    return {
      spider: "",
      sites: [
        { key: "douban", name: "豆瓣推荐", type: 3, api: "" },
        { key: "qq", name: "腾讯视频", type: 3, api: "" },
        { key: "iqiyi", name: "爱奇艺", type: 3, api: "" },
        { key: "mgtv", name: "芒果TV", type: 3, api: "" },
      ]
    };
  }
};

export const fetchIptvChannels = async (): Promise<IptvChannel[]> => {
  try {
    const response = await fetch(IPTV_M3U_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const text = await response.text();
    return parseM3u(text);
  } catch (error) {
    console.warn("Failed to fetch M3U (likely CORS in browser env). Using mock channels.", error);
    return MOCK_CHANNELS;
  }
};

// Simple M3U Parser
const parseM3u = (content: string): IptvChannel[] => {
  const lines = content.split('\n');
  const channels: IptvChannel[] = [];
  let currentChannel: Partial<IptvChannel> = {};

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith('#EXTINF:')) {
      const info = line.substring(8);
      const parts = info.split(',');
      currentChannel.name = parts[parts.length - 1].trim();
      
      // Extract Logo
      const logoMatch = line.match(/tvg-logo="([^"]*)"/);
      if (logoMatch) currentChannel.logo = logoMatch[1];

      // Extract Group
      const groupMatch = line.match(/group-title="([^"]*)"/);
      if (groupMatch) currentChannel.group = groupMatch[1];
      else currentChannel.group = "Undefined";

    } else if (line.startsWith('http')) {
      currentChannel.url = line;
      currentChannel.id = Math.random().toString(36).substr(2, 9);
      if (currentChannel.name && currentChannel.url) {
        channels.push(currentChannel as IptvChannel);
      }
      currentChannel = {};
    }
  });

  return channels;
};