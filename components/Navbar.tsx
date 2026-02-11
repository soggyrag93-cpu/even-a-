
import React from 'react';
import { Search, Gamepad2, Menu, X, Bell } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, searchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold heading-font tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Nova<span className="text-indigo-500">Arcade</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl leading-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all sm:text-sm"
                placeholder="Find a game to play..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors font-medium">Home</button>
            <button className="text-slate-400 hover:text-white transition-colors font-medium">Hot</button>
            <button className="text-slate-400 hover:text-white transition-colors font-medium">Newest</button>
            <div className="w-px h-6 bg-slate-800 mx-2"></div>
            <button className="relative p-2 text-slate-400 hover:text-indigo-400 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-4 py-2 text-left text-slate-400 hover:bg-slate-900 rounded-lg">Home</button>
            <button className="px-4 py-2 text-left text-slate-400 hover:bg-slate-900 rounded-lg">Hot</button>
            <button className="px-4 py-2 text-left text-slate-400 hover:bg-slate-900 rounded-lg">Newest</button>
            <button className="px-4 py-2 text-left text-slate-400 hover:bg-slate-900 rounded-lg">Favorites</button>
          </div>
          <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
