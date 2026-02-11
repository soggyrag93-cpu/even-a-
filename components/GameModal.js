
import React, { useEffect, useState } from 'react';
import htm from 'htm';
import { X, Maximize2, RotateCcw, ShieldCheck } from 'lucide-react';

const html = htm.bind(React.createElement);

const GameModal = ({ game, onClose }) => {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return html`
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick=${onClose}></div>
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 sm:rounded-3xl overflow-hidden border border-slate-800 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <${ShieldCheck} className="w-6 h-6 text-indigo-500" />
            <h2 className="text-xl font-bold text-white">${game.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick=${() => setIframeKey(k => k + 1)} className="p-2 text-slate-400 hover:text-white"><${RotateCcw} /></button>
            <button onClick=${onClose} className="p-2 bg-slate-800 text-slate-400 rounded-xl"><${X} /></button>
          </div>
        </div>
        <div className="flex-1 bg-black">
          <iframe 
            key=${iframeKey}
            src=${game.url}
            className="w-full h-full border-none"
            allow="autoplay; fullscreen; keyboard"
          ></iframe>
        </div>
      </div>
    </div>
  `;
};

export default GameModal;
