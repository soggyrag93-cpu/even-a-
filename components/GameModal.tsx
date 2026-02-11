
import React, { useEffect, useState } from 'react';
import { Game } from '../types';
import { X, Maximize2, RotateCcw, Info, Share2, ShieldCheck } from 'lucide-react';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0); // For refreshing

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    const element = document.getElementById('game-container');
    if (!element) return;

    if (!isFullscreen) {
      if (element.requestFullscreen) element.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 sm:rounded-3xl overflow-hidden border border-slate-800 flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-500/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white heading-font leading-none mb-1">{game.title}</h2>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Unblocked Gaming Experience</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefresh}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              title="Reload Game"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleFullscreen}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-800 mx-1 hidden sm:block"></div>
            <button 
              onClick={onClose}
              className="p-2.5 bg-slate-800 text-slate-400 hover:text-white hover:bg-pink-600 rounded-xl transition-all"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div id="game-container" className="flex-1 bg-black relative">
          <iframe 
            key={iframeKey}
            src={game.url}
            className="w-full h-full border-none"
            allow="autoplay; fullscreen; keyboard"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
          ></iframe>
        </div>

        {/* Footer/Info Bar */}
        <div className="hidden sm:flex items-center justify-between px-6 py-3 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Press <b>F11</b> for true browser fullscreen</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
                Share
             </button>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                CONNECTION STABLE
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
