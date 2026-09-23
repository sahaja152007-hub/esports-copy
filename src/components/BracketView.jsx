import React from 'react';
import { Trophy, Swords, Calendar, Clock, CheckCircle2, Play, Sparkles, Gamepad2 } from 'lucide-react';
import { playSound } from '../utils/sound';

export default function BracketView({ matches, onSelectMatch, onSimulateMatch, onSimulateAll, champion }) {
  const round1Matches = matches.filter(m => m.round === 1);
  const round2Matches = matches.filter(m => m.round === 2);
  const round3Matches = matches.filter(m => m.round === 3);

  const getMatchCardClass = (status) => {
    if (status === 'COMPLETED') return 'border-emerald-500/50 bg-slate-900/90 shadow-emerald-950/40';
    if (status === 'LIVE') return 'border-cyan-400 bg-cyan-950/30 glow-cyan animate-pulse';
    return 'border-white/10 bg-slate-900/70 hover:border-cyan-500/50';
  };

  return (
    <div className="space-y-6">
      {/* Bracket Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-white/10 cyber-card">
        <div>
          <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Single Elimination Knockout Tree
          </h3>
          <p className="text-xs text-slate-400">Structured match fixtures with schedule, discipline, and live winner advancement.</p>
        </div>
        <button 
          onClick={onSimulateAll}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-orbitron font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition shadow-lg flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-black" /> Auto-Simulate Tournament
        </button>
      </div>

      {/* Champion Banner */}
      {champion && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border-2 border-amber-400 glow-gold text-center relative overflow-hidden animate-bounce-short">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{champion.logo || '🏆'}</span>
            <div>
              <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-bold">NMIMS 2026 GRAND CHAMPION</span>
              <h2 className="font-orbitron font-black text-3xl text-amber-300 drop-shadow-md">{champion.name} [{champion.tag}]</h2>
            </div>
            <span className="text-4xl">{champion.logo || '🏆'}</span>
          </div>
        </div>
      )}

      {/* Visual Bracket Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[900px] grid grid-cols-3 gap-6 relative items-start">

          {/* Round 1: Play-In Quarterfinal */}
          <div className="space-y-4">
            <div className="text-center font-orbitron font-bold text-xs tracking-wider text-cyan-400 uppercase py-2 bg-slate-900/90 rounded-lg border border-cyan-500/30">
              Round 1: Play-In Match
            </div>

            {round1Matches.map((m) => (
              <StructuredMatchCard 
                key={m.id} 
                match={m} 
                onSelectMatch={onSelectMatch} 
                onSimulateMatch={onSimulateMatch}
                cardClass={getMatchCardClass(m.status)}
              />
            ))}

            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs text-slate-400 font-mono">
              <span className="text-cyan-300 font-bold">Seeds #1, #2, #3</span> receive automatic Bye to Semifinals
            </div>
          </div>

          {/* Round 2: Semifinals */}
          <div className="space-y-4">
            <div className="text-center font-orbitron font-bold text-xs tracking-wider text-pink-400 uppercase py-2 bg-slate-900/90 rounded-lg border border-pink-500/30">
              Round 2: Semifinals
            </div>

            {round2Matches.map((m) => (
              <StructuredMatchCard 
                key={m.id} 
                match={m} 
                onSelectMatch={onSelectMatch} 
                onSimulateMatch={onSimulateMatch}
                cardClass={getMatchCardClass(m.status)}
              />
            ))}
          </div>

          {/* Round 3: Finals */}
          <div className="space-y-4">
            <div className="text-center font-orbitron font-bold text-xs tracking-wider text-amber-400 uppercase py-2 bg-slate-900/90 rounded-lg border border-amber-500/30">
              Round 3: Grand Finals
            </div>

            {round3Matches.map((m) => (
              <StructuredMatchCard 
                key={m.id} 
                match={m} 
                onSelectMatch={onSelectMatch} 
                onSimulateMatch={onSimulateMatch}
                cardClass={getMatchCardClass(m.status)}
                isFinal={m.roundName.includes('Grand')}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function StructuredMatchCard({ match, onSelectMatch, onSimulateMatch, cardClass, isFinal = false }) {
  const isTeam1Winner = match.winnerId && match.winnerId === match.team1?.id;
  const isTeam2Winner = match.winnerId && match.winnerId === match.team2?.id;
  const winnerTeam = isTeam1Winner ? match.team1 : (isTeam2Winner ? match.team2 : null);

  return (
    <div className={`relative rounded-xl border p-4 transition-all ${cardClass} ${isFinal ? 'glow-gold border-amber-400/60' : ''}`}>
      {/* Top Header Row: Match # + Game + Schedule + Status */}
      <div className="flex flex-wrap justify-between items-center mb-3 text-[11px] font-mono border-b border-white/10 pb-2 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-orbitron font-bold text-cyan-300">{match.matchNum || match.id.toUpperCase()}</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 flex items-center gap-1 font-semibold">
            <Gamepad2 className="w-3 h-3 text-cyan-400" /> {match.game || 'Valorant'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="flex items-center gap-1 text-[10px]">
            <Calendar className="w-3 h-3 text-slate-500" /> {match.date || 'Oct 15'}
          </span>
          <span className="flex items-center gap-1 text-[10px]">
            <Clock className="w-3 h-3 text-slate-500" /> {match.time || '18:00 IST'}
          </span>

          {match.status === 'COMPLETED' && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Final
            </span>
          )}
          {match.status === 'UPCOMING' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                playSound('generate');
                onSimulateMatch(match.id);
              }}
              className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 flex items-center gap-1 transition"
            >
              <Play className="w-2.5 h-2.5" /> Sim
            </button>
          )}
        </div>
      </div>

      {/* Team 1 Row */}
      <div 
        onClick={() => { playSound('click'); onSelectMatch(match); }}
        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition mb-2 ${
          isTeam1Winner ? 'bg-cyan-500/20 border border-cyan-500/50 font-bold text-cyan-200' : 'bg-slate-950/60 hover:bg-white/5 border border-white/5'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xl shrink-0">{match.team1?.logo || '🛡️'}</span>
          <div className="truncate">
            <div className={`text-xs font-orbitron font-bold truncate ${isTeam1Winner ? 'text-cyan-300' : 'text-slate-200'}`}>
              {match.team1?.name || 'TBD'}
            </div>
            {match.team1 && <span className="text-[10px] text-slate-400 font-mono">[{match.team1.tag}]</span>}
          </div>
        </div>
        <span className="font-mono text-sm font-bold text-white px-2.5 py-0.5 rounded bg-black/60 shrink-0 ml-2">
          {match.score1}
        </span>
      </div>

      {/* Team 2 Row */}
      <div 
        onClick={() => { playSound('click'); onSelectMatch(match); }}
        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition ${
          isTeam2Winner ? 'bg-pink-500/20 border border-pink-500/50 font-bold text-pink-200' : 'bg-slate-950/60 hover:bg-white/5 border border-white/5'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xl shrink-0">{match.team2?.logo || '⚔️'}</span>
          <div className="truncate">
            <div className={`text-xs font-orbitron font-bold truncate ${isTeam2Winner ? 'text-pink-300' : 'text-slate-200'}`}>
              {match.team2?.name || 'TBD'}
            </div>
            {match.team2 && <span className="text-[10px] text-slate-400 font-mono">[{match.team2.tag}]</span>}
          </div>
        </div>
        <span className="font-mono text-sm font-bold text-white px-2.5 py-0.5 rounded bg-black/60 shrink-0 ml-2">
          {match.score2}
        </span>
      </div>

      {/* Winner Result Banner */}
      {winnerTeam && (
        <div className="mt-2.5 pt-2 border-t border-white/10 text-center text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-1 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Winner: {winnerTeam.name} [{winnerTeam.tag}]
        </div>
      )}
    </div>
  );
}
