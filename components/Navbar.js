
import React, { useState } from 'react';
import htm from 'htm';
import { Search, Gamepad2, Menu, X, Bell } from 'lucide-react';

const html = htm.bind(React.createElement);

const Navbar = ({ onSearch, searchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return html`
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform">
              <${Gamepad2} className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold heading-font tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Nova<span className="text-indigo-500">Arcade</span>
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <${Search} className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Find a game..."
                value=${searchQuery}
                onChange=${(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors">Home</button>
            <button className="text-slate-400 hover:text-white transition-colors">Hot</button>
            <button className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl active:scale-95">Sign In</button>
          </div>

          <div className="md:hidden">
            <button onClick=${() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-400">
              ${isMenuOpen ? html`<${X} />` : html`<${Menu} />`}
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;
};

export default Navbar;
