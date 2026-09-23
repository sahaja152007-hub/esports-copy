import React from 'react';
import { X, Trophy, Swords, Shield, Crosshair, UserCheck, Flame } from 'lucide-react';
import { playSound } from '../utils/sound';

export default function MatchModal({ match, onClose, onUpdateScore }) {
  if (!match) return null;

  const team1 = match.team1;
  const team2 = match.team2;

  const handleScoreChange = (t1Score, t2Score) => {
    playSound('click');
    onUpdateScore(match.id, parseInt(t1Score) || 0, parseInt(t2Score) || 0);
  };

  const handleQuickWinner = (winnerTeam) => {
    playSound('win');
    if (winnerTeam === 'team1') {
      onUpdateScore(match.id, 2, 1);
    } else {
      onUpdateScore(match.id, 1, 2);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f121e] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl glow-cyan">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            <span className="font-orbitron font-bold text-sm sm:text-lg text-white">MATCH DETAILS - {match.roundName}</span>
          </div>
          <button 
            onClick={() => { playSound('click'); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Teams Arena Banner */}
        <div className="my-4 sm:my-6 flex flex-col sm:grid sm:grid-cols-7 items-center text-center bg-slate-900/80 p-4 sm:p-6 rounded-xl border border-white/5 gap-4 sm:gap-2">
          {/* Team 1 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-1.5">
            <div 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg border border-white/20"
              style={{ backgroundColor: team1?.color ? `${team1.color}22` : '#1e293b', borderColor: team1?.color || '#00f3ff' }}
            >
              {team1?.logo || '🛡️'}
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">{team1?.name || 'TBD'}</h3>
          </div>

          {/* VS & Score Inputs */}
          <div className="sm:col-span-1 flex flex-col items-center justify-center gap-1.5">
            <span className="font-orbitron font-black text-xl sm:text-2xl text-slate-500">VS</span>
            <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 font-mono font-bold text-lg sm:text-xl text-cyan-400">
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score1} 
                onChange={(e) => handleScoreChange(e.target.value, match.score2)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-cyan-300 border-b border-cyan-500/50"
              />
              <span>:</span>
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score2} 
                onChange={(e) => handleScoreChange(match.score1, e.target.value)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-pink-300 border-b border-pink-500/50"
              />
            </div>
          </div>

          {/* Team 2 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-1.5">
            <div 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg border border-white/20"
              style={{ backgroundColor: team2?.color ? `${team2.color}22` : '#1e293b', borderColor: team2?.color || '#ff0055' }}
            >
              {team2?.logo || '⚔️'}
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">{team2?.name || 'TBD'}</h3>
          </div>
        </div>

        {/* Quick Win Selection Buttons */}
        {team1 && team2 && (
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <button 
              onClick={() => handleQuickWinner('team1')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 font-orbitron text-xs font-semibold flex items-center justify-center gap-2 transition min-h-[44px]"
            >
              <Trophy className="w-4 h-4 text-cyan-400" /> Declare {team1.name} Winner
            </button>
            <button 
              onClick={() => handleQuickWinner('team2')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 font-orbitron text-xs font-semibold flex items-center justify-center gap-2 transition min-h-[44px]"
            >
              <Trophy className="w-4 h-4 text-pink-400" /> Declare {team2.name} Winner
            </button>
          </div>
        )}

        {/* Lineup rosters preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
            <h4 className="font-orbitron font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> {team1?.name || 'Team 1'} Roster
            </h4>
            <ul className="space-y-1 text-slate-400">
              {team1?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-slate-200">{m.country} {m.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 font-mono">{m.role}</span>
                </li>
              )) || <li className="italic text-slate-600">No roster added yet</li>}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
            <h4 className="font-orbitron font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-pink-400" /> {team2?.name || 'Team 2'} Roster
            </h4>
            <ul className="space-y-1 text-slate-400">
              {team2?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-slate-200">{m.country} {m.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-500/10 text-pink-300 font-mono">{m.role}</span>
                </li>
              )) || <li className="italic text-slate-600">No roster added yet</li>}
            </ul>
          </div>
        </div>

        {/* Map Pool & Bans */}
        <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-slate-400">Map Pick: <strong className="text-amber-300">Haven / Ascent (BO3)</strong></span>
          </div>
          <span className="font-mono text-cyan-400">Best of 3 Series</span>
        </div>

        {/* Close Button */}
        <div className="mt-4 sm:mt-6 flex justify-end">
          <button 
            onClick={() => { playSound('click'); onClose(); }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-orbitron font-bold text-xs hover:bg-cyan-400 transition min-h-[44px]"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
