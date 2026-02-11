
import React from 'react';
import htm from 'htm';
import { GameCategory } from '../constants.js';
import { LayoutGrid, Zap, Brain, Trophy, History, Car } from 'lucide-react';

const html = htm.bind(React.createElement);

const CATEGORY_ICONS = {
  [GameCategory.ALL]: LayoutGrid,
  [GameCategory.ACTION]: Zap,
  [GameCategory.PUZZLE]: Brain,
  [GameCategory.SPORTS]: Trophy,
  [GameCategory.CLASSIC]: History,
  [GameCategory.STRATEGY]: Zap,
  [GameCategory.DRIVING]: Car,
};

const Categories = ({ selectedCategory, onSelectCategory }) => {
  return html`
    <div className="flex flex-wrap items-center gap-3">
      ${Object.values(GameCategory).map((category) => html`
        <button
          key=${category}
          onClick=${() => onSelectCategory(category)}
          className=${`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${selectedCategory === category ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          <${CATEGORY_ICONS[category]} className="w-4 h-4" />
          ${category}
        </button>
      `)}
    </div>
  `;
};

export default Categories;
