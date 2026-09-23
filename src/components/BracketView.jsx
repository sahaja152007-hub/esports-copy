import React from 'react';
import { Trophy, Swords, Zap, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { playSound } from '../utils/sound';

export default function BracketView({ matches, onSelectMatch, onSimulateMatch, onSimulateAll, champion }) {
  const round1Matches = matches.filter(m => m.round === 1);
  const round2Matches = matches.filter(m => m.round === 2);
  const round3Matches = matches.filter(m => m.round === 3);

  const getMatchCardClass = (status) => {
    if (status === 'COMPLETED') return 'border-emerald-500/50 bg-slate-900/90 shadow-emerald-950/40';
    if (status === 'LIVE') return 'border-cyan-400 bg-cyan-950/30 glow-cyan animate-pulse';
    return 'border-white/10 bg-slate-900/60 hover:border-cyan-500/40';
  };

  return (
    <div className="space-y-6">
      {/* Bracket Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/10">
        <div>
          <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Knockout Tournament Tree
          </h3>
          <p className="text-xs text-slate-400">5 Teams Single Elimination Bracket with Live Winner Advancement</p>
        </div>
        <button 
          onClick={onSimulateAll}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-orbitron font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition shadow-lg flex items-center gap-2"
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
              <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-bold">2026 GRAND CHAMPION</span>
              <h2 className="font-orbitron font-black text-3xl text-amber-300 drop-shadow-md">{champion.name} [{champion.tag}]</h2>
            </div>
            <span className="text-4xl">{champion.logo || '🏆'}</span>
          </div>
        </div>
      )}

      {/* Visual Bracket Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[850px] grid grid-cols-3 gap-6 relative items-center">

          {/* Round 1: Play-In Quarterfinal */}
          <div className="space-y-6">
            <div className="text-center font-orbitron font-bold text-xs tracking-wider text-cyan-400 uppercase py-2 bg-slate-900/80 rounded-lg border border-cyan-500/20">
              Round 1: Play-In Match
            </div>

            {round1Matches.map((m) => (
              <MatchCard 
                key={m.id} 
                match={m} 
                onSelectMatch={onSelectMatch} 
                onSimulateMatch={onSimulateMatch}
                cardClass={getMatchCardClass(m.status)}
              />
            ))}

            <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5 text-center text-xs text-slate-500">
              <span className="font-mono text-cyan-300/80">Seeds #1, #2, #3</span> receive automatic Bye to Semifinals
            </div>
          </div>

          {/* Round 2: Semifinals */}
          <div className="space-y-6">
            <div className="text-center font-orbitron font-bold text-xs tracking-wider text-pink-400 uppercase py-2 bg-slate-900/80 rounded-lg border border-pink-500/20">
              Round 2: Semifinals
            </div>

            {round2Matches.map((m) => (
              <MatchCard 
                key={m.id} 
                match={m} 
                onSelectMatch={onSelectMatch} 
                onSimulateMatch={onSimulateMatch}
                cardClass={getMatchCardClass(m.status)}
              />
            ))}
          </div>

          {/* Round 3: Finals */}
          <div className="space-y-6">
            <div className="text-center font-orbitron font-bold text-xs tracking-wider text-amber-400 uppercase py-2 bg-slate-900/80 rounded-lg border border-amber-500/20">
              Round 3: Grand Finals
            </div>

            {round3Matches.map((m) => (
              <MatchCard 
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

function MatchCard({ match, onSelectMatch, onSimulateMatch, cardClass, isFinal = false }) {
  const isTeam1Winner = match.winnerId && match.winnerId === match.team1?.id;
  const isTeam2Winner = match.winnerId && match.winnerId === match.team2?.id;

  return (
    <div className={`relative rounded-xl border p-3.5 transition-all ${cardClass} ${isFinal ? 'glow-gold border-amber-400/60' : ''}`}>
      {/* Match Header info */}
      <div className="flex justify-between items-center mb-2.5 text-[11px] font-mono text-slate-400 border-b border-white/5 pb-1.5">
        <span className="font-semibold text-slate-300">{match.roundName}</span>
        <div className="flex items-center gap-1.5">
          {match.status === 'COMPLETED' && (
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-1">
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
        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition mb-1.5 ${
          isTeam1Winner ? 'bg-cyan-500/20 border border-cyan-500/50 font-bold text-cyan-200' : 'bg-slate-950/50 hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{match.team1?.logo || '🛡️'}</span>
          <span className={`text-xs font-orbitron ${isTeam1Winner ? 'text-cyan-300' : 'text-slate-200'}`}>
            {match.team1?.name || 'TBD'}
          </span>
        </div>
        <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-black/40">
          {match.score1}
        </span>
      </div>

      {/* Team 2 Row */}
      <div 
        onClick={() => { playSound('click'); onSelectMatch(match); }}
        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
          isTeam2Winner ? 'bg-pink-500/20 border border-pink-500/50 font-bold text-pink-200' : 'bg-slate-950/50 hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{match.team2?.logo || '⚔️'}</span>
          <span className={`text-xs font-orbitron ${isTeam2Winner ? 'text-pink-300' : 'text-slate-200'}`}>
            {match.team2?.name || 'TBD'}
          </span>
        </div>
        <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-black/40">
          {match.score2}
        </span>
      </div>
    </div>
  );
}
