import React, { useState } from 'react';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import { getAiRecommendations } from '../services/gemini';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResult, setAiResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAiResult('');
    
    // Simulate local search delay
    setTimeout(async () => {
         // In a real app, we would search the VOD/IPTV database here.
         // For this demo, we call Gemini for recommendations.
         const recommendation = await getAiRecommendations(query);
         setAiResult(recommendation);
         setLoading(false);
    }, 500);
  };

  return (
    <div className="h-full p-8 flex flex-col items-center pt-20">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">全网搜索</h1>
        
        <form onSubmit={handleSearch} className="relative mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入电影名、导演或 '我想看恐怖片'..."
            className="w-full bg-slate-800 text-white text-xl px-6 py-4 pl-14 rounded-full border border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 outline-none transition-all placeholder:text-slate-500"
            autoFocus
          />
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold transition-colors"
          >
            搜索
          </button>
        </form>

        {loading && (
            <div className="flex justify-center gap-2 text-blue-400 animate-pulse">
                <Sparkles size={20} /> 正在咨询 AI 推荐引擎...
            </div>
        )}

        {aiResult && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-2 mb-4 text-blue-400">
                    <Sparkles size={20} />
                    <span className="font-bold text-sm uppercase tracking-widest">Gemini AI 推荐</span>
                </div>
                <p className="text-lg text-slate-200 leading-relaxed">
                    {aiResult}
                </p>
                <div className="mt-6 flex gap-4">
                    <button className="px-4 py-2 bg-slate-700 rounded-lg text-sm hover:bg-slate-600">在点播源中查找</button>
                    <button className="px-4 py-2 bg-slate-700 rounded-lg text-sm hover:bg-slate-600">在豆瓣查看</button>
                </div>
            </div>
        )}
        
        {!loading && !aiResult && (
            <div className="text-center text-slate-500 mt-20">
                <p>支持 T9 键盘搜索 (开发中)</p>
                <p className="mt-2 text-sm">尝试输入心情，让 AI 为你推荐</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Search;