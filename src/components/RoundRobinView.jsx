import React from 'react';
import { Table, Trophy, Play, CheckCircle2, Sparkles, Calendar, Clock, Gamepad2 } from 'lucide-react';
import { playSound } from '../utils/sound';

export default function RoundRobinView({ matches, teams, onSelectMatch, onSimulateMatch, onSimulateAll }) {
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

  return (
    <div className="space-y-8">
      {/* Standings Table Section */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 cyber-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Round-Robin League Standings
          </h3>
          <button 
            onClick={onSimulateAll}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-orbitron font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-black" /> Auto-Simulate League
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase font-orbitron">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Team</th>
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
                  <td className="py-3.5 px-4 font-orbitron font-bold text-white flex items-center gap-2">
                    <span className="text-base">{item.team.logo}</span>
                    <span>{item.team.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">[{item.team.tag}]</span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-300">{item.played}</td>
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

      {/* Fixtures Schedule Grid */}
      <div className="space-y-4">
        <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
          <Table className="w-5 h-5 text-cyan-400" /> Structured League Fixtures ({matches.length} Matches)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match, i) => {
            const winnerTeam = match.winnerId === match.team1?.id ? match.team1 : (match.winnerId === match.team2?.id ? match.team2 : null);

            return (
              <div 
                key={match.id}
                onClick={() => { playSound('click'); onSelectMatch(match); }}
                className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/50 cursor-pointer transition space-y-3 cyber-card"
              >
                {/* Header Row: Match # + Game + Schedule + Status */}
                <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-bold text-cyan-300">{match.matchNum || `MATCH #${i+1}`}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 flex items-center gap-1 font-semibold text-[11px]">
                      <Gamepad2 className="w-3 h-3 text-cyan-400" /> {match.game || 'FIFA 26'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" /> {match.date || 'Oct 15'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {match.time || '18:00 IST'}
                    </span>
                  </div>
                </div>

                {/* Teams Row */}
                <div className="flex items-center justify-between gap-2 py-1">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-xl">{match.team1?.logo || '🛡️'}</span>
                    <span className="font-orbitron text-xs font-bold text-white truncate">{match.team1?.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">[{match.team1?.tag}]</span>
                  </div>

                  <div className="px-3 py-1 rounded bg-black/60 border border-white/10 font-mono text-sm font-bold text-cyan-300">
                    {match.status === 'COMPLETED' ? `${match.score1} : ${match.score2}` : 'VS'}
                  </div>

                  <div className="flex items-center gap-2 min-w-0 flex-1 justify-end text-right">
                    <span className="text-[10px] text-slate-400 font-mono">[{match.team2?.tag}]</span>
                    <span className="font-orbitron text-xs font-bold text-white truncate">{match.team2?.name}</span>
                    <span className="text-xl">{match.team2?.logo || '⚔️'}</span>
                  </div>
                </div>

                {/* Footer Status & Result */}
                <div className="flex justify-between items-center text-[11px] font-mono pt-2 border-t border-white/5">
                  {winnerTeam ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Winner: {winnerTeam.name}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Status: {match.status}</span>
                  )}

                  {match.status !== 'COMPLETED' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound('generate');
                        onSimulateMatch(match.id);
                      }}
                      className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 font-mono text-xs flex items-center gap-1 transition"
                    >
                      <Play className="w-3 h-3" /> Sim Match
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
