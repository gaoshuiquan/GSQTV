import React from 'react';
import { MovieItem } from '../types';
import { Star } from 'lucide-react';

interface MovieCardProps {
  item: MovieItem;
  onClick?: (item: MovieItem) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, onClick }) => {
  return (
    <div 
      className="
        relative flex-shrink-0 w-40 md:w-48 aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 
        transition-all duration-300 group
        focus-within:ring-4 focus-within:ring-blue-500 focus-within:scale-110 focus-within:z-10
        hover:scale-105 hover:z-10 cursor-pointer
      "
      tabIndex={0}
      onClick={() => onClick && onClick(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick && onClick(item);
      }}
    >
      <img 
        src={item.cover} 
        alt={item.title} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
        <h3 className="font-bold text-white text-base leading-tight line-clamp-2">{item.title}</h3>
        <div className="flex items-center gap-1 mt-1 text-yellow-400">
          <Star size={12} fill="currentColor" />
          <span className="text-xs font-bold">{item.rating}</span>
          {item.year && <span className="text-xs text-slate-400 ml-2">{item.year}</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;