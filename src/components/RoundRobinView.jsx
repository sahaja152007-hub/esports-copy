import React, { useState } from 'react';
import { Table, Trophy, Play, CheckCircle2, Sparkles, Calendar, Clock, Gamepad2, Filter } from 'lucide-react';
import { playSound } from '../utils/sound';

export default function RoundRobinView({ matches, teams, onSelectMatch, onSimulateMatch, onSimulateAll }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'completed'

  const filteredMatches = matches.filter(m => {
    if (filter === 'upcoming') return m.status === 'UPCOMING';
    if (filter === 'completed') return m.status === 'COMPLETED';
    return true;
  });

  // Calculate Standings Table from matches
  const standings = teams.map(team => {
    let played = 0;
    let wins = 0;
    let losses = 0;
    let points = 0;
    let roundsWon = 0;
    let roundsLost = 0;

    matches.forEach(m => {
      if (m.status === 'COMPLETED') {
        if (m.team1?.id === team.id) {
          played++;
          roundsWon += m.score1;
          roundsLost += m.score2;
          if (m.winnerId === team.id) {
            wins++;
            points += 3;
          } else {
            losses++;
          }
        } else if (m.team2?.id === team.id) {
          played++;
          roundsWon += m.score2;
          roundsLost += m.score1;
          if (m.winnerId === team.id) {
            wins++;
            points += 3;
          } else {
            losses++;
          }
        }
      }
    });

    return {
      team,
      played,
      wins,
      losses,
      points,
      diff: roundsWon - roundsLost
    };
  });

  // Sort by Points descending, then by diff
  standings.sort((a, b) => b.points - a.points || b.diff - a.diff);

  const formatMatchName = (id, num, index) => {
    if (num) return num.toUpperCase();
    return `MATCH ${String(index + 1).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Standings Table Section */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-white/10 cyber-card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="font-orbitron font-bold text-base sm:text-lg text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" /> Round-Robin League Standings
          </h3>
          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-orbitron font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition shadow-lg flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-black" /> Auto-Simulate League
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase font-orbitron">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Full Team Name</th>
                <th className="py-3 px-4 text-center">Played</th>
                <th className="py-3 px-4 text-center">Wins</th>
                <th className="py-3 px-4 text-center">Losses</th>
                <th className="py-3 px-4 text-center">Diff</th>
                <th className="py-3 px-4 text-right font-bold text-cyan-400">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {standings.map((item, idx) => (
                <tr key={item.team.id} className={`hover:bg-white/5 transition ${idx === 0 ? 'bg-amber-500/10' : ''}`}>
                  <td className="py-3.5 px-4 font-bold">
                    {idx === 0 ? <span className="text-amber-400">🥇 1st</span> : `#${idx + 1}`}
                  </td>
                  <td className="py-3.5 px-4 font-orbitron font-bold text-white flex items-center gap-2.5">
                    <span className="text-xl p-1 rounded-lg bg-black/40 border border-white/10">{item.team.logo}</span>
                    <span className="text-sm font-bold">{item.team.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-300 font-bold">{item.played}</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">{item.wins}</td>
                  <td className="py-3.5 px-4 text-center text-pink-400 font-bold">{item.losses}</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">{item.diff > 0 ? `+${item.diff}` : item.diff}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-cyan-300 text-base">{item.points} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixtures Schedule Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 cyber-card">
          <h3 className="font-orbitron font-bold text-base sm:text-lg text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-cyan-400 shrink-0" /> League Fixtures ({matches.length} Matches)
          </h3>

          {/* Status Filter Buttons */}
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
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((match, i) => {
            const isTeam1Winner = match.winnerId === match.team1?.id;
            const isTeam2Winner = match.winnerId === match.team2?.id;
            const winnerTeam = isTeam1Winner ? match.team1 : (isTeam2Winner ? match.team2 : null);

            return (
              <div 
                key={match.id}
                onClick={() => { playSound('click'); onSelectMatch(match); }}
                className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/50 cursor-pointer transition space-y-3.5 cyber-card"
              >
                {/* 1. MATCH HEADER */}
                <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2.5">
                  <span className="font-orbitron font-black text-sm text-cyan-300 tracking-wider">
                    {formatMatchName(match.id, match.matchNum, i)}
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
                    {match.status !== 'COMPLETED' && (
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

                {/* 2. MATCHUP: TEAM A VS TEAM B */}
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-3">
                  {/* Team A */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0 p-1 rounded-lg bg-slate-900 border border-white/10">
                        {match.team1?.logo || '🛡️'}
                      </span>
                      <div className="font-orbitron font-bold text-sm text-slate-100 truncate">
                        {match.team1?.name || 'TBD'}
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
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0 p-1 rounded-lg bg-slate-900 border border-white/10">
                        {match.team2?.logo || '⚔️'}
                      </span>
                      <div className="font-orbitron font-bold text-sm text-slate-100 truncate">
                        {match.team2?.name || 'TBD'}
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
                    <span className="text-cyan-300 font-semibold truncate max-w-full">🎮 {match.game || 'FIFA 26'}</span>
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

                {/* 4. WINNER BANNER */}
                {winnerTeam && (
                  <div className="pt-2 border-t border-white/10 text-center text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Winner: <strong className="text-white font-orbitron">{winnerTeam.name}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
