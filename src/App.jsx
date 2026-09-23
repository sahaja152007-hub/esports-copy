import React, { useState } from 'react';
import { Swords, Trophy, Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import TeamFixturePage from './components/TeamFixturePage';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'fixtures'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] bg-cyber-grid text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090a0f]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Swords className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-orbitron font-black text-lg sm:text-xl tracking-wider text-white leading-none flex items-center gap-1">
                NEXUS<span className="text-cyan-400">ARENA</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 tracking-widest uppercase block mt-0.5">ESPORTS LEAGUE 2026</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider transition ${
                activePage === 'home' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('fixtures')}
              className={`px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 ${
                activePage === 'fixtures' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" /> Teams & Fixtures
            </button>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-slate-300" />}
          </button>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t border-white/10 mt-3 animate-fade-in">
            <nav className="flex flex-col gap-2 font-orbitron font-bold text-xs uppercase tracking-wider">
              <button 
                onClick={() => handleNavClick('home')}
                className={`w-full py-3 px-4 rounded-xl text-left transition flex items-center gap-2 ${
                  activePage === 'home' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'bg-slate-900/80 text-slate-300 border border-white/5'
                }`}
              >
                <span>Home</span>
              </button>
              <button 
                onClick={() => handleNavClick('fixtures')}
                className={`w-full py-3 px-4 rounded-xl text-left transition flex items-center gap-2 ${
                  activePage === 'fixtures' ? 'bg-cyan-500 text-black shadow-md glow-cyan' : 'bg-slate-900/80 text-slate-300 border border-white/5'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" /> <span>Teams & Fixtures</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {activePage === 'home' ? (
          <HomePage onNavigateToFixtures={() => handleNavClick('fixtures')} />
        ) : (
          <TeamFixturePage />
        )}
      </main>

    </div>
  );
}
