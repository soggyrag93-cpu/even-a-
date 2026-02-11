
import React from 'react';
import { Star, Play, Heart, Flame } from 'lucide-react';

const GameCard = ({ game, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="group relative bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-7 h-7 fill-current" />
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {game.plays > 10000 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-600 text-[10px] font-bold uppercase rounded-lg shadow-lg">
              <Flame className="w-3 h-3" />
              Hot
            </div>
          )}
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-950/60 backdrop-blur-md text-[10px] font-bold uppercase rounded-lg border border-white/10">
            {game.category}
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(e);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border border-white/10 transition-all duration-300 ${
            isFavorite ? 'bg-pink-600 text-white border-pink-500' : 'bg-slate-950/40 text-white/70 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-slate-100 truncate group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold">{game.rating}</span>
          </div>
        </div>
        <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
          {game.description}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            {game.plays.toLocaleString()} Plays
          </span>
          <button className="text-indigo-400 text-xs font-bold hover:underline">
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
