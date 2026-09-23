import React, { useState, useEffect } from 'react';
import { Trophy, Swords, Flame, Users, Radio, ChevronRight, Sparkles, Globe } from 'lucide-react';

export default function HomePage({ onNavigateToFixtures }) {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 30 });
  const [activeTab, setActiveTab] = useState('fifa');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: Math.max(0, prev.minutes - 1) };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const gameModes = {
    fifa: {
      title: 'FIFA',
      subtitle: 'Competitive Football & Ultimate Team Showdown',
      desc: 'High-speed tactical football matches. Master precision passing, skill moves, tactical formations, and clutch penalty shootouts to dominate the pitch.',
      icon: '⚽',
      stats: { teams: '32 Players', map: 'Santiago Bernabéu', mode: 'Knockout / BO3' },
      accent: 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
    },
    minecraft: {
      title: 'MINECRAFT',
      subtitle: 'BedWars & Survival PvP Challenges',
      desc: 'Resource management, speed-building, and tactical PvP combat. Squads construct defensive fortresses, manage island economies, and eliminate opposing beds to survive.',
      icon: '⛏️',
      stats: { teams: '16 Squads', map: 'Craft Arena', mode: 'BedWars / Survival' },
      accent: 'border-amber-500 text-amber-400 bg-amber-950/20'
    },
    valorant: {
      title: 'VALORANT',
      subtitle: '5v5 Tactical FPS & Agent Abilities',
      desc: 'Precise gunplay meets hyper-tuned agent utility. Synchronize team entry executes, spike plant defenses, and strategic mid-round calls across 24-round regulation matches.',
      icon: '🎯',
      stats: { teams: '64 Teams', map: 'Haven / Ascent', mode: 'Best of 3 (BO3)' },
      accent: 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
    }
  };

  return (
    <div className="space-y-16 md:space-y-20 pb-16">

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-4 overflow-hidden pt-8">
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[110px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-widest glow-cyan">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> NMIMS 2026
          </div>

          {/* Main Title */}
          <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none">
            NEXUS <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">ARENA</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-300 font-sans leading-relaxed">
            The ultimate esports tournament hub. Create teams, manage 5-player rosters, generate dynamic knockout fixtures, and follow championship matches.
          </p>

          {/* Countdown Timer */}
          <div className="pt-2 pb-2 flex justify-center items-center gap-3 md:gap-6 font-orbitron">
            <div className="flex flex-col p-3 md:p-4 rounded-xl bg-slate-900/80 border border-white/10 min-w-[75px] md:min-w-[90px] shadow-lg">
              <span className="text-2xl md:text-4xl font-bold text-cyan-400 font-mono">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Days</span>
            </div>
            <span className="text-2xl text-slate-600 font-bold">:</span>
            <div className="flex flex-col p-3 md:p-4 rounded-xl bg-slate-900/80 border border-white/10 min-w-[75px] md:min-w-[90px] shadow-lg">
              <span className="text-2xl md:text-4xl font-bold text-cyan-400 font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Hours</span>
            </div>
            <span className="text-2xl text-slate-600 font-bold">:</span>
            <div className="flex flex-col p-3 md:p-4 rounded-xl bg-slate-900/80 border border-white/10 min-w-[75px] md:min-w-[90px] shadow-lg">
              <span className="text-2xl md:text-4xl font-bold text-pink-400 font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Mins</span>
            </div>
            <span className="text-2xl text-slate-600 font-bold">:</span>
            <div className="flex flex-col p-3 md:p-4 rounded-xl bg-slate-900/80 border border-white/10 min-w-[75px] md:min-w-[90px] shadow-lg">
              <span className="text-2xl md:text-4xl font-bold text-amber-400 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Secs</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <button 
              onClick={onNavigateToFixtures}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-orbitron font-black text-sm uppercase tracking-wider hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:-translate-y-0.5 shadow-xl glow-cyan flex items-center gap-3 cursor-pointer"
            >
              <Swords className="w-5 h-5 text-black" /> Manage Teams & Fixtures <ChevronRight className="w-4 h-4" />
            </button>
            <a 
              href="#modes"
              className="px-8 py-4 rounded-xl bg-slate-900/80 border border-white/15 text-slate-200 hover:text-white hover:border-cyan-500/50 font-orbitron font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-400" /> Explore Game Modes
            </a>
          </div>
        </div>
      </section>

      {/* Prize Pool Showcase Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 border border-cyan-500/30 cyber-glass shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> CHAMPIONSHIP REWARDS
              </span>
              <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white">
                $250,000 <span className="text-cyan-400">PRIZE POOL</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Competing teams fight for glory, official tournament trophies, and cash prize distribution across top tier standings.
              </p>
              
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                  <div className="text-xs text-amber-300 font-mono">1ST PLACE</div>
                  <div className="font-orbitron font-bold text-amber-400 text-lg">$125,000</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-400/10 border border-slate-400/30 text-center">
                  <div className="text-xs text-slate-300 font-mono">2ND PLACE</div>
                  <div className="font-orbitron font-bold text-slate-200 text-lg">$75,000</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-700/10 border border-amber-700/30 text-center">
                  <div className="text-xs text-amber-500 font-mono">3RD PLACE</div>
                  <div className="font-orbitron font-bold text-amber-500 text-lg">$50,000</div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 text-center cyber-card">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="font-orbitron font-black text-3xl text-white">128</div>
                <div className="text-xs font-mono text-slate-400 uppercase mt-1">Teams Registered</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 text-center cyber-card">
                <Radio className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <div className="font-orbitron font-black text-3xl text-white">50K+</div>
                <div className="text-xs font-mono text-slate-400 uppercase mt-1">Peak Concurrent Viewers</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 text-center cyber-card">
                <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <div className="font-orbitron font-black text-3xl text-white">32</div>
                <div className="text-xs font-mono text-slate-400 uppercase mt-1">Global Regions</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 text-center cyber-card">
                <Flame className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <div className="font-orbitron font-black text-3xl text-white">5</div>
                <div className="text-xs font-mono text-slate-400 uppercase mt-1">Pro Game Arenas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Game Modes Section */}
      <section id="modes" className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">COMPETITIVE DISCIPLINES</span>
          <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white">FEATURED GAME MODES</h2>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center flex-wrap gap-3 border-b border-white/10 pb-4">
          {Object.keys(gameModes).map(key => (
            <button 
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition ${
                activeTab === key ? 'bg-cyan-500 text-black shadow-lg glow-cyan' : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {gameModes[key].icon} {gameModes[key].title}
            </button>
          ))}
        </div>

        {/* Selected Mode Detail Card */}
        <div className={`p-8 rounded-2xl border ${gameModes[activeTab].accent} cyber-glass grid grid-cols-1 md:grid-cols-3 gap-6 items-center`}>
          <div className="md:col-span-2 space-y-3 text-left">
            <span className="text-3xl">{gameModes[activeTab].icon}</span>
            <h3 className="font-orbitron font-black text-2xl text-white">{gameModes[activeTab].title}</h3>
            <h4 className="text-sm font-mono text-cyan-300">{gameModes[activeTab].subtitle}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{gameModes[activeTab].desc}</p>
          </div>

          <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-slate-400">Tournament Scale:</span>
              <span className="text-white font-bold">{gameModes[activeTab].stats.teams}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-slate-400">Official Arena:</span>
              <span className="text-cyan-300 font-bold">{gameModes[activeTab].stats.map}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Match Format:</span>
              <span className="text-amber-300 font-bold">{gameModes[activeTab].stats.mode}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Footer Banner */}
      <footer className="border-t border-white/10 pt-10 text-center text-xs text-slate-500 space-y-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-4">OFFICIAL SPONSORS & PARTNERS</div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 font-orbitron font-bold text-sm tracking-widest text-slate-300">
            <span>NVIDIA RTX</span>
            <span>RAZER CHROMA</span>
            <span>INTEL CORE i9</span>
            <span>HYPERX</span>
            <span>DISCORD</span>
          </div>
        </div>

        <div className="pt-4 font-mono text-[11px] text-slate-600">
          © 2026 NEXUS ARENA ESPORTS. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
