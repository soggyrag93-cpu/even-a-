
import React, { useState, useMemo, useEffect } from 'react';
import { Game, GameCategory } from './types';
import { GAMES } from './data/games';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';
import Categories from './components/Categories';
import { Search, Trophy, Gamepad2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>(GameCategory.ALL);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('nova-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (gameId: string) => {
    const newFavorites = favorites.includes(gameId)
      ? favorites.filter(id => id !== gameId)
      : [...favorites, gameId];
    setFavorites(newFavorites);
    localStorage.setItem('nova-favorites', JSON.stringify(newFavorites));
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === GameCategory.ALL || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredGame = GAMES[4]; // Doodle Jump as example featured

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 pb-20">
      <Navbar 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Hero Section - Only show when not searching/filtering */}
        {searchQuery === '' && selectedCategory === GameCategory.ALL && (
          <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-8 md:p-12">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Trending Now</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold heading-font mb-4 tracking-tight leading-tight">
                  Unleash the <br/><span className="text-yellow-300">Gamer</span> Within.
                </h1>
                <p className="text-lg text-indigo-50 opacity-90 mb-8 max-w-md">
                  High-speed, unblocked, and free. Play the best curated web games directly in your browser with zero lag.
                </p>
                <button 
                  onClick={() => setSelectedGame(featuredGame)}
                  className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95 flex items-center gap-3"
                >
                  <Gamepad2 className="w-5 h-5" />
                  Play Featured Game
                </button>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
                <img 
                  src={featuredGame.thumbnail} 
                  alt="Featured" 
                  className="relative z-20 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
                />
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl"></div>
          </section>
        )}

        {/* Categories Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold heading-font flex items-center gap-3">
              <Trophy className="text-yellow-400" />
              Game Categories
            </h2>
          </div>
          <Categories 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </section>

        {/* Game Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold heading-font">
              {searchQuery ? `Search results for "${searchQuery}"` : `${selectedCategory} Games`}
            </h2>
            <span className="text-slate-400 text-sm">{filteredGames.length} games available</span>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={() => setSelectedGame(game)}
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={() => toggleFavorite(game.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="bg-slate-900 p-6 rounded-full mb-4">
                <Search className="w-12 h-12" />
              </div>
              <p className="text-xl font-medium">No games found matching your criteria</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory(GameCategory.ALL);}}
                className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Game Modal Iframe */}
      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold heading-font text-indigo-500 mb-4">NovaArcade</div>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            The ultimate unblocked destination for students and casual gamers. Optimized for performance and safety.
          </p>
          <div className="flex justify-center gap-6 text-slate-400 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          <p className="mt-8 text-slate-600 text-xs">
            © {new Date().getFullYear()} NovaArcade. All rights reserved. Game content belongs to respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
