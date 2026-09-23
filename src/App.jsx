import React, { useState } from 'react';
import { Swords, Trophy, Volume2, VolumeX, Shield, Radio, Sparkles, ExternalLink } from 'lucide-react';
import LandingPage from './components/LandingPage';
import TeamFixturePage from './components/TeamFixturePage';
import { isSoundEnabled, setSoundEnabled, playSound } from './utils/sound';

export default function App() {
  const [activePage, setActivePage] = useState('landing'); // 'landing' | 'fixtures'
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound('click');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] bg-cyber-grid text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Top Cyber Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090a0f]/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { playSound('click'); setActivePage('landing'); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Swords className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-orbitron font-black text-xl tracking-wider text-white leading-none flex items-center gap-1.5">
                NEXUS<span className="text-cyan-400">ARENA</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">ESPORTS LEAGUE 2026</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 md:gap-4 bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => { playSound('click'); setActivePage('landing'); }}
              className={`px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider transition ${
                activePage === 'landing' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              Landing Page
            </button>
            <button 
              onClick={() => { playSound('click'); setActivePage('fixtures'); }}
              className={`px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 ${
                activePage === 'fixtures' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" /> Teams & Fixtures
            </button>
          </nav>

          {/* Audio & External Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border transition ${
                soundOn ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' : 'bg-slate-900 border-white/10 text-slate-500'
              }`}
              title={soundOn ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <a 
              href="https://github.com/sahaja152007-hub/esports-tournament-portal" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8">
        {activePage === 'landing' ? (
          <LandingPage onNavigateToFixtures={() => setActivePage('fixtures')} />
        ) : (
          <TeamFixturePage />
        )}
      </main>

    </div>
  );
}
