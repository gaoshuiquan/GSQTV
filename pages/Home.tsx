import React from 'react';
import MovieCard from '../components/MovieCard';
import { MOCK_DOUBAN_DATA } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 pb-32 space-y-12 scroll-smooth">
      
      {/* Hero Section */}
      <div className="w-full h-80 md:h-96 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 relative overflow-hidden flex items-center p-8 md:p-16 border border-white/10">
         <div className="relative z-10 max-w-2xl">
            <div className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-bold mb-4 shadow-lg">今日推荐</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">GSQTV 智能影院</h1>
            <p className="text-slate-300 text-lg mb-8 line-clamp-2">
              集成全网影视资源，支持IPTV直播与VOD点播。享受极速、高清的家庭影院体验。
            </p>
            <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 focus:ring-4 focus:ring-blue-500/50 transition-all outline-none" tabIndex={0}>
              立即观看
            </button>
         </div>
         <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://picsum.photos/1000/600?blur=4')] bg-cover bg-center opacity-20 mask-image-gradient"></div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold text-white border-l-4 border-blue-500 pl-3">豆瓣高分榜</h2>
           <button className="text-slate-400 text-sm hover:text-white focus:text-white outline-none">更多 &gt;</button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 -mx-2 snap-x">
           {MOCK_DOUBAN_DATA.map(item => (
             <MovieCard key={item.id} item={item} />
           ))}
           {MOCK_DOUBAN_DATA.map(item => (
             <MovieCard key={`dup-${item.id}`} item={{...item, id: item.id + 100}} />
           ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold text-white border-l-4 border-green-500 pl-3">近期热门</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 -mx-2 snap-x">
           {MOCK_DOUBAN_DATA.slice().reverse().map(item => (
             <MovieCard key={`rev-${item.id}`} item={item} />
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;