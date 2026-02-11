
import React from 'react';
import { GameCategory } from '../types';
import { 
  LayoutGrid, 
  Zap, 
  Brain, 
  Trophy, 
  History, 
  ChessKnight, 
  Car 
} from 'lucide-react';

interface CategoriesProps {
  selectedCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
}

const CATEGORY_ICONS: Record<GameCategory, React.ReactNode> = {
  [GameCategory.ALL]: <LayoutGrid className="w-4 h-4" />,
  [GameCategory.ACTION]: <Zap className="w-4 h-4" />,
  [GameCategory.PUZZLE]: <Brain className="w-4 h-4" />,
  [GameCategory.SPORTS]: <Trophy className="w-4 h-4" />,
  [GameCategory.CLASSIC]: <History className="w-4 h-4" />,
  [GameCategory.STRATEGY]: <Zap className="w-4 h-4" />, // Mapping Lucide icons to best match
  [GameCategory.DRIVING]: <Car className="w-4 h-4" />,
};

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {Object.values(GameCategory).map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300
            ${selectedCategory === category 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 translate-y-[-2px]' 
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }
          `}
        >
          {CATEGORY_ICONS[category]}
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
