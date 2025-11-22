export const APP_NAME = "GSQTV";

// User provided URLs
export const VOD_CONFIG_URL = "https://tv.gaoops.com/api/tvbox/config?format=json";
export const IPTV_M3U_URL = "https://iptv.gaoops.top/m3u";

// Fallback mock data for UI demonstration if CORS blocks the external APIs in the browser
export const MOCK_CHANNELS = [
  { id: '1', name: 'CCTV-1', url: 'http://39.134.65.162/PLTV/88888888/224/3221225618/index.m3u8', group: 'CCTV' },
  { id: '2', name: 'CCTV-6 电影', url: 'http://39.134.65.162/PLTV/88888888/224/3221225618/index.m3u8', group: 'CCTV' }, // Placeholder stream
  { id: '3', name: '湖南卫视', url: 'http://39.134.65.162/PLTV/88888888/224/3221225618/index.m3u8', group: '卫视' },
];

export const MOCK_DOUBAN_DATA = [
  { id: 1, title: "肖申克的救赎", rating: 9.7, cover: "https://picsum.photos/300/450?random=1", year: "1994" },
  { id: 2, title: "霸王别姬", rating: 9.6, cover: "https://picsum.photos/300/450?random=2", year: "1993" },
  { id: 3, title: "阿甘正传", rating: 9.5, cover: "https://picsum.photos/300/450?random=3", year: "1994" },
  { id: 4, title: "泰坦尼克号", rating: 9.4, cover: "https://picsum.photos/300/450?random=4", year: "1997" },
  { id: 5, title: "千与千寻", rating: 9.4, cover: "https://picsum.photos/300/450?random=5", year: "2001" },
  { id: 6, title: "美丽人生", rating: 9.5, cover: "https://picsum.photos/300/450?random=6", year: "1997" },
  { id: 7, title: "星际穿越", rating: 9.3, cover: "https://picsum.photos/300/450?random=7", year: "2014" },
  { id: 8, title: "楚门的世界", rating: 9.3, cover: "https://picsum.photos/300/450?random=8", year: "1998" },
];
