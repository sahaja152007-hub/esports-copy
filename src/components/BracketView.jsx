import React, { useState } from 'react';
import { Trophy, Swords, Calendar, Clock, CheckCircle2, Play, Sparkles, Gamepad2, Filter } from 'lucide-react';
import { playSound } from '../utils/sound';

export default function BracketView({ matches, onSelectMatch, onSimulateMatch, onSimulateAll, champion }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'completed'

  const filteredMatches = matches.filter(m => {
    if (filter === 'upcoming') return m.status === 'UPCOMING';
    if (filter === 'completed') return m.status === 'COMPLETED';
    return true;
  });

  const round1Matches = filteredMatches.filter(m => m.round === 1);
  const round2Matches = filteredMatches.filter(m => m.round === 2);
  const round3Matches = filteredMatches.filter(m => m.round === 3);

  const getMatchCardClass = (status) => {
    if (status === 'COMPLETED') return 'border-emerald-500/50 bg-slate-900/90 shadow-emerald-950/40';
    if (status === 'LIVE') return 'border-cyan-400 bg-cyan-950/40 glow-cyan animate-pulse';
    return 'border-white/10 bg-slate-900/80 hover:border-cyan-500/50';
  };

  return (
    <div className="space-y-6">
      {/* Bracket Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-white/10 cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">Single Elimination Bracket</h3>
            <p className="text-xs text-slate-400">Clear stage progression, matchup details, schedule, and results.</p>
          </div>
        </div>

        {/* Status Filter Buttons & Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-[11px] sm:text-xs font-orbitron w-full sm:w-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg transition font-bold text-center ${filter === 'all' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'}`}
            >
              All ({matches.length})
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg transition font-bold text-center ${filter === 'upcoming' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Upcoming ({matches.filter(m => m.status === 'UPCOMING').length})
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg transition font-bold text-center ${filter === 'completed' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Completed ({matches.filter(m => m.status === 'COMPLETED').length})
            </button>
          </div>

          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-orbitron font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition shadow-lg flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-black" /> Auto-Simulate
          </button>
        </div>
      </div>

      {/* Champion Banner */}
      {champion && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border-2 border-amber-400 glow-gold text-center relative overflow-hidden animate-bounce-short">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{champion.logo || '🏆'}</span>
            <div>
              <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-bold">NMIMS 2026 GRAND CHAMPION</span>
              <h2 className="font-orbitron font-black text-3xl text-amber-300 drop-shadow-md">{champion.name}</h2>
            </div>
            <span className="text-4xl">{champion.logo || '🏆'}</span>
          </div>
        </div>
      )}

      {/* Visual Bracket Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[920px] grid grid-cols-3 gap-6 relative items-start">

          {/* STAGE 1: QUARTER-FINALS */}
          <div className="space-y-4">
            <div className="text-center font-orbitron font-bold text-xs tracking-widest text-cyan-400 uppercase py-2.5 bg-slate-900/90 rounded-xl border border-cyan-500/30">
              QUARTER-FINALS
            </div>

            {round1Matches.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs text-slate-500 italic">
                No matches in this view
              </div>
            ) : (
              round1Matches.map((m) => (
                <ClearMatchCard 
                  key={m.id} 
                  match={m} 
                  onSelectMatch={onSelectMatch} 
                  onSimulateMatch={onSimulateMatch}
                  cardClass={getMatchCardClass(m.status)}
                />
              ))
            )}

            <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs text-slate-400 font-mono">
              <span className="text-cyan-300 font-bold">Seeds #1, #2, #3</span> receive automatic Bye to Semifinals
            </div>
          </div>

          {/* STAGE 2: SEMIFINALS */}
          <div className="space-y-4">
            <div className="text-center font-orbitron font-bold text-xs tracking-widest text-pink-400 uppercase py-2.5 bg-slate-900/90 rounded-xl border border-pink-500/30">
              SEMIFINALS
            </div>

            {round2Matches.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs text-slate-500 italic">
                No matches in this view
              </div>
            ) : (
              round2Matches.map((m) => (
                <ClearMatchCard 
                  key={m.id} 
                  match={m} 
                  onSelectMatch={onSelectMatch} 
                  onSimulateMatch={onSimulateMatch}
                  cardClass={getMatchCardClass(m.status)}
                />
              ))
            )}
          </div>

          {/* STAGE 3: FINALS */}
          <div className="space-y-4">
            <div className="text-center font-orbitron font-bold text-xs tracking-widest text-amber-400 uppercase py-2.5 bg-slate-900/90 rounded-xl border border-amber-500/30">
              FINALS
            </div>

            {round3Matches.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs text-slate-500 italic">
                No matches in this view
              </div>
            ) : (
              round3Matches.map((m) => (
                <ClearMatchCard 
                  key={m.id} 
                  match={m} 
                  onSelectMatch={onSelectMatch} 
                  onSimulateMatch={onSimulateMatch}
                  cardClass={getMatchCardClass(m.status)}
                  isFinal={m.roundName.includes('Grand')}
                />
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function ClearMatchCard({ match, onSelectMatch, onSimulateMatch, cardClass, isFinal = false }) {
  const isTeam1Winner = match.winnerId && match.winnerId === match.team1?.id;
  const isTeam2Winner = match.winnerId && match.winnerId === match.team2?.id;
  const winnerTeam = isTeam1Winner ? match.team1 : (isTeam2Winner ? match.team2 : null);

  const formatMatchName = (id, num) => {
    if (num) return num.toUpperCase();
    if (id === 'm1') return 'MATCH 01';
    if (id === 'm2') return 'MATCH 02';
    if (id === 'm3') return 'MATCH 03';
    if (id === 'm4') return 'MATCH 04';
    if (id === 'm5') return 'MATCH 05';
    return id.toUpperCase();
  };

  return (
    <div className={`relative rounded-2xl border p-4 transition-all ${cardClass} ${isFinal ? 'glow-gold border-amber-400/60' : ''}`}>
      {/* 1. MATCH NUMBER & STATUS HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <span className="font-orbitron font-black text-sm text-cyan-300 tracking-wider">
          {formatMatchName(match.id, match.matchNum)}
        </span>

        <div className="flex items-center gap-2">
          {match.status === 'COMPLETED' && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </span>
          )}
          {match.status === 'UPCOMING' && (
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-semibold border border-cyan-500/30">
              Upcoming
            </span>
          )}
          {match.status === 'UPCOMING' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                playSound('generate');
                onSimulateMatch(match.id);
              }}
              className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 font-mono text-[11px] font-bold flex items-center gap-1 transition"
            >
              <Play className="w-2.5 h-2.5" /> Sim
            </button>
          )}
        </div>
      </div>

      {/* 2. MATCHUP: TEAM A VS TEAM B (PROMINENT FULL TEAM NAMES) */}
      <div 
        onClick={() => { playSound('click'); onSelectMatch(match); }}
        className="p-3 rounded-xl bg-black/50 border border-white/5 hover:border-cyan-500/30 cursor-pointer transition space-y-2.5 mb-3"
      >
        {/* Team A */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl shrink-0 p-1 rounded-lg bg-slate-900 border border-white/10">
              {match.team1?.logo || '🛡️'}
            </span>
            <div className="truncate">
              <div className={`font-orbitron font-bold text-sm truncate ${isTeam1Winner ? 'text-cyan-300 font-black' : 'text-slate-100'}`}>
                {match.team1?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-base font-bold text-white px-2.5 py-0.5 rounded-lg bg-slate-900 border border-white/10 shrink-0">
            {match.score1}
          </span>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center gap-2 my-1">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-orbitron font-black text-[10px] tracking-widest border border-cyan-500/30">
            VS
          </span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {/* Team B */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl shrink-0 p-1 rounded-lg bg-slate-900 border border-white/10">
              {match.team2?.logo || '⚔️'}
            </span>
            <div className="truncate">
              <div className={`font-orbitron font-bold text-sm truncate ${isTeam2Winner ? 'text-pink-300 font-black' : 'text-slate-100'}`}>
                {match.team2?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-base font-bold text-white px-2.5 py-0.5 rounded-lg bg-slate-900 border border-white/10 shrink-0">
            {match.score2}
          </span>
        </div>
      </div>

      {/* 3. METADATA: GAME, DATE, TIME */}
      <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-white/5 text-center">
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-slate-500 uppercase">Game</span>
          <span className="text-cyan-300 font-semibold truncate max-w-full">🎮 {match.game || 'Valorant'}</span>
        </div>
        <div className="flex flex-col items-center border-x border-white/5">
          <span className="text-[9px] text-slate-500 uppercase">Date</span>
          <span className="text-slate-200 font-medium">📅 {match.date || '25 Sep 2026'}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-slate-500 uppercase">Time</span>
          <span className="text-amber-300 font-medium">⏰ {match.time || '6:00 PM'}</span>
        </div>
      </div>

      {/* 4. WINNER RESULT BANNER */}
      {winnerTeam && (
        <div className="mt-2.5 pt-2 border-t border-white/10 text-center text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Winner: <strong className="text-white font-orbitron">{winnerTeam.name}</strong>
        </div>
      )}
    </div>
  );
}
