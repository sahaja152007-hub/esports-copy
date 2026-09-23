import React, { useState } from 'react';
import { Swords, Trophy } from 'lucide-react';
import HomePage from './components/HomePage';
import TeamFixturePage from './components/TeamFixturePage';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'fixtures'

  return (
    <div className="min-h-screen bg-[#090a0f] bg-cyber-grid text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090a0f]/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActivePage('home')}
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
              onClick={() => setActivePage('home')}
              className={`px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider transition ${
                activePage === 'home' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setActivePage('fixtures')}
              className={`px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 ${
                activePage === 'fixtures' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" /> Teams & Fixtures
            </button>
          </nav>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-6">
        {activePage === 'home' ? (
          <HomePage onNavigateToFixtures={() => setActivePage('fixtures')} />
        ) : (
          <TeamFixturePage />
        )}
      </main>

    </div>
  );
}
