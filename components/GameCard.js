
import React from 'react';
import htm from 'htm';
import { Star, Play, Heart, Flame } from 'lucide-react';

const html = htm.bind(React.createElement);

const GameCard = ({ game, onClick, isFavorite, onToggleFavorite }) => {
  return html`
    <div className="group relative bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer" onClick=${onClick}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src=${game.thumbnail} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl">
            <${Play} className="w-7 h-7 fill-current" />
          </div>
        </div>
        <button 
          onClick=${(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className=${`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border ${isFavorite ? 'bg-pink-600 border-pink-500' : 'bg-slate-950/40 border-white/10'}`}
        >
          <${Heart} className=${`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-100 truncate">${game.title}</h3>
          <div className="flex items-center gap-1 text-yellow-400">
            <${Star} className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs">${game.rating}</span>
          </div>
        </div>
        <p className="text-slate-400 text-xs line-clamp-2">${game.description}</p>
      </div>
    </div>
  `;
};

export default GameCard;
