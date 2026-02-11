
import React, { useState, useMemo, useEffect } from 'react';
import htm from 'htm';
import { GameCategory } from './constants.js';
import { GAMES } from './data/games.js';
import Navbar from './components/Navbar.js';
import GameCard from './components/GameCard.js';
import GameModal from './components/GameModal.js';
import Categories from './components/Categories.js';
import { Search, Trophy, Gamepad2, Sparkles } from 'lucide-react';

const html = htm.bind(React.createElement);

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(GameCategory.ALL);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nova-favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) { console.warn(e); }
  }, []);

  const toggleFavorite = (gameId) => {
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

  const featuredGame = GAMES[4];

  return html`
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 pb-20">
      <${Navbar} onSearch=${setSearchQuery} searchQuery=${searchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        ${searchQuery === '' && selectedCategory === GameCategory.ALL ? html`
          <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-8 md:p-12">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold mb-6">
                  <${Sparkles} className="w-4 h-4" />
                  <span>Trending Now</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold heading-font mb-4 tracking-tight leading-tight">
                  Unleash the <br/><span className="text-yellow-300">Gamer</span> Within.
                </h1>
                <p className="text-lg text-indigo-50 opacity-90 mb-8 max-w-md">
                  High-speed, unblocked, and free. Play the best curated web games directly in your browser.
                </p>
                <button onClick=${() => setSelectedGame(featuredGame)} className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95 flex items-center gap-3">
                  <${Gamepad2} className="w-5 h-5" />
                  Play Featured Game
                </button>
              </div>
              <div className="hidden md:block relative">
                <img src=${featuredGame.thumbnail} className="relative z-20 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/20" />
              </div>
            </div>
          </section>
        ` : null}

        <section className="mb-10">
          <h2 className="text-2xl font-bold heading-font flex items-center gap-3 mb-6">
            <${Trophy} className="text-yellow-400" /> Game Categories
          </h2>
          <${Categories} selectedCategory=${selectedCategory} onSelectCategory=${setSelectedCategory} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold heading-font">
              ${searchQuery ? `Search results for "${searchQuery}"` : `${selectedCategory} Games`}
            </h2>
            <span className="text-slate-400 text-sm">${filteredGames.length} games available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${filteredGames.map(game => html`
              <${GameCard} key=${game.id} game=${game} onClick=${() => setSelectedGame(game)} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${() => toggleFavorite(game.id)} />
            `)}
          </div>
        </section>
      </main>

      ${selectedGame && html`<${GameModal} game=${selectedGame} onClose=${() => setSelectedGame(null)} />`}
    </div>
  `;
};

export default App;
