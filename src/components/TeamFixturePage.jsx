import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Shield, Plus, Trophy, RefreshCw, Sparkles, 
  Trash2, Edit, Check, AlertCircle, Download, Swords, Layers, Star 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BracketView from './BracketView';
import RoundRobinView from './RoundRobinView';
import MatchModal from './MatchModal';
import { playSound } from '../utils/sound';
import { 
  INITIAL_PRESET_TEAMS, TEAM_LOGOS, TEAM_COLORS, 
  PLAYER_ROLES, PLAYER_RANKS 
} from '../utils/sampleData';

export default function TeamFixturePage() {
  // State initialization with localStorage fallback
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('nexus_teams');
    return saved ? JSON.parse(saved) : INITIAL_PRESET_TEAMS;
  });

  const [activeTab, setActiveTab] = useState('fixtures'); // 'teams' | 'fixtures'
  const [fixtureFormat, setFixtureFormat] = useState('single'); // 'single' | 'roundrobin'
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('nexus_matches');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [champion, setChampion] = useState(null);

  // New Team Form State
  const [newTeam, setNewTeam] = useState({
    name: '',
    tag: '',
    logo: '⚡',
    color: '#00f3ff'
  });

  // New Player Form State
  const [newPlayer, setNewPlayer] = useState({
    teamId: '',
    name: '',
    tag: '',
    role: 'Entry Fragger',
    rank: 'Radiant',
    rating: 95,
    country: '🇺🇸'
  });

  const [formError, setFormError] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nexus_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('nexus_matches', JSON.stringify(matches));
  }, [matches]);

  // If no matches exist on initial load, auto-generate single elimination fixtures
  useEffect(() => {
    if (teams.length === 5 && matches.length === 0) {
      generateFixtures(teams, 'single');
    }
  }, []);

  // Handler: Quick Load 5 Sample Teams
  const handleQuickLoadPresets = () => {
    playSound('generate');
    setTeams(INITIAL_PRESET_TEAMS);
    generateFixtures(INITIAL_PRESET_TEAMS, fixtureFormat);
    setFormError('');
  };

  // Handler: Reset All Teams & Matches
  const handleReset = () => {
    if (window.confirm('Reset all teams, rosters, and fixtures?')) {
      playSound('click');
      setTeams([]);
      setMatches([]);
      setChampion(null);
      localStorage.removeItem('nexus_teams');
      localStorage.removeItem('nexus_matches');
    }
  };

  // Handler: Create Custom Team
  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.tag) {
      setFormError('Please fill out Team Name and Tag.');
      return;
    }
    if (teams.length >= 5) {
      setFormError('Maximum 5 teams allowed in this tournament format.');
      return;
    }

    playSound('click');
    const created = {
      id: `team-${Date.now()}`,
      name: newTeam.name,
      tag: newTeam.tag.toUpperCase(),
      logo: newTeam.logo,
      color: newTeam.color,
      members: []
    };

    const updated = [...teams, created];
    setTeams(updated);
    setNewTeam({ name: '', tag: '', logo: '⚡', color: '#00f3ff' });
    setFormError('');

    if (updated.length === 5) {
      generateFixtures(updated, fixtureFormat);
    }
  };

  // Handler: Add Player to Team
  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayer.teamId || !newPlayer.name || !newPlayer.tag) {
      setFormError('Please select a team and enter player name & tag.');
      return;
    }

    const targetTeam = teams.find(t => t.id === newPlayer.teamId);
    if (!targetTeam) return;

    if (targetTeam.members.length >= 5) {
      setFormError(`Team ${targetTeam.name} already has 5 members.`);
      return;
    }

    playSound('click');
    const playerObj = {
      id: `player-${Date.now()}`,
      name: newPlayer.name,
      tag: newPlayer.tag,
      role: newPlayer.role,
      rank: newPlayer.rank,
      rating: parseInt(newPlayer.rating) || 90,
      country: newPlayer.country
    };

    const updatedTeams = teams.map(t => {
      if (t.id === newPlayer.teamId) {
        return { ...t, members: [...t.members, playerObj] };
      }
      return t;
    });

    setTeams(updatedTeams);
    setNewPlayer({ teamId: '', name: '', tag: '', role: 'Entry Fragger', rank: 'Radiant', rating: 95, country: '🇺🇸' });
    setFormError('');
  };

  // Handler: Remove Player
  const handleRemovePlayer = (teamId, playerId) => {
    playSound('click');
    setTeams(teams.map(t => {
      if (t.id === teamId) {
        return { ...t, members: t.members.filter(m => m.id !== playerId) };
      }
      return t;
    }));
  };

  // Handler: Generate Fixtures
  const generateFixtures = (currentTeams = teams, format = fixtureFormat) => {
    playSound('generate');
    if (currentTeams.length < 2) {
      setFormError('At least 2 teams are required to generate fixtures.');
      return;
    }

    setChampion(null);

    if (format === 'single') {
      // 5-Team Single Elimination Bracket:
      // Match 1 (Quarter): Team 4 vs Team 5 -> Winner advances to Semi 2
      // Match 2 (Semi 1): Team 1 vs Team 2 -> Winner to Grand Final, Loser to 3rd Place Match
      // Match 3 (Semi 2): Team 3 vs Winner M1 -> Winner to Grand Final, Loser to 3rd Place Match
      // Match 4 (3rd Place Match): Loser M2 vs Loser M3
      // Match 5 (Grand Final): Winner M2 vs Winner M3

      const t1 = currentTeams[0] || null;
      const t2 = currentTeams[1] || null;
      const t3 = currentTeams[2] || null;
      const t4 = currentTeams[3] || null;
      const t5 = currentTeams[4] || null;

      const newMatches = [
        {
          id: 'm1',
          round: 1,
          roundName: 'Quarterfinal (Play-In)',
          team1: t4,
          team2: t5,
          score1: 0,
          score2: 0,
          status: 'UPCOMING',
          winnerId: null,
          loserId: null
        },
        {
          id: 'm2',
          round: 2,
          roundName: 'Semifinal 1',
          team1: t1,
          team2: t2,
          score1: 0,
          score2: 0,
          status: 'UPCOMING',
          winnerId: null,
          loserId: null
        },
        {
          id: 'm3',
          round: 2,
          roundName: 'Semifinal 2',
          team1: t3,
          team2: null, // Will be filled by winner of M1
          score1: 0,
          score2: 0,
          status: 'UPCOMING',
          winnerId: null,
          loserId: null
        },
        {
          id: 'm4',
          round: 3,
          roundName: '3rd Place Bronze Match',
          team1: null, // Loser M2
          team2: null, // Loser M3
          score1: 0,
          score2: 0,
          status: 'UPCOMING',
          winnerId: null,
          loserId: null
        },
        {
          id: 'm5',
          round: 3,
          roundName: 'Grand Final Championship',
          team1: null, // Winner M2
          team2: null, // Winner M3
          score1: 0,
          score2: 0,
          status: 'UPCOMING',
          winnerId: null,
          loserId: null
        }
      ];

      setMatches(newMatches);
    } else {
      // Round-Robin League (10 Matches total for 5 teams)
      const list = [...currentTeams];
      const rrMatches = [];
      let matchCount = 1;

      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          rrMatches.push({
            id: `rr-${matchCount}`,
            round: 1,
            roundName: `Match #${matchCount}`,
            team1: list[i],
            team2: list[j],
            score1: 0,
            score2: 0,
            status: 'UPCOMING',
            winnerId: null,
            loserId: null
          });
          matchCount++;
        }
      }

      setMatches(rrMatches);
    }
  };

  // Handler: Update Match Score & Advance Bracket Winners
  const handleUpdateScore = (matchId, score1, score2) => {
    let updatedMatches = matches.map(m => {
      if (m.id === matchId) {
        const t1Wins = score1 > score2;
        const winnerId = t1Wins ? m.team1?.id : (score2 > score1 ? m.team2?.id : null);
        const loserId = t1Wins ? m.team2?.id : (score2 > score1 ? m.team1?.id : null);
        return {
          ...m,
          score1,
          score2,
          status: 'COMPLETED',
          winnerId,
          loserId
        };
      }
      return m;
    });

    // Advance winners in Single Elimination Bracket logic
    if (fixtureFormat === 'single') {
      const m1 = updatedMatches.find(m => m.id === 'm1');
      const m2 = updatedMatches.find(m => m.id === 'm2');
      const m3 = updatedMatches.find(m => m.id === 'm3');
      const m4 = updatedMatches.find(m => m.id === 'm4');
      const m5 = updatedMatches.find(m => m.id === 'm5');

      // If M1 finishes, Winner M1 advances to M3 team2
      if (m1 && m1.winnerId) {
        const winnerTeam1 = teams.find(t => t.id === m1.winnerId);
        updatedMatches = updatedMatches.map(m => m.id === 'm3' ? { ...m, team2: winnerTeam1 } : m);
      }

      // If M2 and M3 finish, advance to Grand Final (M5) and 3rd Place (M4)
      const m2Completed = m2 && m2.winnerId;
      const m3Completed = m3 && m3.winnerId;

      if (m2Completed || m3Completed) {
        const winner2 = teams.find(t => t.id === m2?.winnerId);
        const loser2 = teams.find(t => t.id === m2?.loserId);
        const winner3 = teams.find(t => t.id === m3?.winnerId);
        const loser3 = teams.find(t => t.id === m3?.loserId);

        updatedMatches = updatedMatches.map(m => {
          if (m.id === 'm5') {
            return {
              ...m,
              team1: winner2 || m.team1,
              team2: winner3 || m.team2
            };
          }
          if (m.id === 'm4') {
            return {
              ...m,
              team1: loser2 || m.team1,
              team2: loser3 || m.team2
            };
          }
          return m;
        });
      }

      // Check Grand Final Winner (M5)
      const currentM5 = updatedMatches.find(m => m.id === 'm5');
      if (currentM5 && currentM5.winnerId) {
        const grandChamp = teams.find(t => t.id === currentM5.winnerId);
        if (grandChamp) {
          setChampion(grandChamp);
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }
      }
    }

    setMatches(updatedMatches);
    if (selectedMatch && selectedMatch.id === matchId) {
      setSelectedMatch(updatedMatches.find(m => m.id === matchId));
    }
  };

  // Handler: Simulate Single Match
  const handleSimulateMatch = (matchId) => {
    const target = matches.find(m => m.id === matchId);
    if (!target || !target.team1 || !target.team2) return;

    // Simulate map scores e.g. 2-1 or 2-0
    const score1 = Math.floor(Math.random() * 3);
    const score2 = score1 === 2 ? Math.floor(Math.random() * 2) : 2;

    handleUpdateScore(matchId, score1, score2);
  };

  // Handler: Simulate All Matches
  const handleSimulateAll = () => {
    playSound('generate');
    matches.forEach(m => {
      if (m.team1 && m.team2 && m.status !== 'COMPLETED') {
        handleSimulateMatch(m.id);
      }
    });
  };

  // Export JSON
  const handleExportJSON = () => {
    playSound('click');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ teams, matches, champion }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nexus_tournament_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Top Header Controls Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 cyber-glass flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-orbitron font-black text-2xl text-white flex items-center gap-2">
            <Swords className="w-6 h-6 text-cyan-400" /> TOURNAMENT CONTROL HUB
          </h2>
          <p className="text-xs text-slate-400">Manage 5 teams, 25 roster slots, generate fixtures & simulate matches.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleQuickLoadPresets}
            className="px-4 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-orbitron font-bold text-xs hover:bg-cyan-500/30 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" /> Quick Load Sample Teams
          </button>
          <button 
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-xl bg-slate-800 border border-white/10 text-slate-300 font-orbitron font-bold text-xs hover:bg-white/10 transition flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-400" /> Export JSON
          </button>
          <button 
            onClick={handleReset}
            className="px-3 py-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 transition"
            title="Reset All Data"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {formError && (
        <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/40 text-pink-300 text-xs font-mono flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 text-pink-400" /> {formError}
        </div>
      )}

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { playSound('click'); setActiveTab('fixtures'); }}
            className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
              activeTab === 'fixtures' ? 'bg-cyan-500 text-black shadow-lg glow-cyan' : 'bg-slate-900/60 text-slate-400 border border-white/10'
            }`}
          >
            <Trophy className="w-4 h-4" /> Tournament Fixtures ({matches.length})
          </button>
          <button 
            onClick={() => { playSound('click'); setActiveTab('teams'); }}
            className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
              activeTab === 'teams' ? 'bg-cyan-500 text-black shadow-lg glow-cyan' : 'bg-slate-900/60 text-slate-400 border border-white/10'
            }`}
          >
            <Users className="w-4 h-4" /> Teams & Rosters ({teams.length}/5)
          </button>
        </div>

        {/* Fixture Format Selector */}
        {activeTab === 'fixtures' && (
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/10 text-xs font-orbitron">
            <button 
              onClick={() => {
                setFixtureFormat('single');
                generateFixtures(teams, 'single');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                fixtureFormat === 'single' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Single Elimination
            </button>
            <button 
              onClick={() => {
                setFixtureFormat('roundrobin');
                generateFixtures(teams, 'roundrobin');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                fixtureFormat === 'roundrobin' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Round-Robin League
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: FIXTURES & BRACKET VIEW */}
      {activeTab === 'fixtures' && (
        <div>
          {matches.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
              <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="font-orbitron font-bold text-lg text-slate-300">No Fixtures Generated Yet</h3>
              <p className="text-xs text-slate-400">Add 5 teams or click Quick Load Sample Teams to create fixtures instantly.</p>
              <button 
                onClick={handleQuickLoadPresets}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-orbitron font-bold text-xs hover:bg-cyan-400 transition"
              >
                Quick Load 5 Teams
              </button>
            </div>
          ) : (
            fixtureFormat === 'single' ? (
              <BracketView 
                matches={matches} 
                onSelectMatch={(m) => setSelectedMatch(m)}
                onSimulateMatch={handleSimulateMatch}
                onSimulateAll={handleSimulateAll}
                champion={champion}
              />
            ) : (
              <RoundRobinView 
                matches={matches}
                teams={teams}
                onSelectMatch={(m) => setSelectedMatch(m)}
                onSimulateMatch={handleSimulateMatch}
                onSimulateAll={handleSimulateAll}
              />
            )
          )}
        </div>
      )}

      {/* TAB 2: TEAMS & PLAYERS MANAGEMENT */}
      {activeTab === 'teams' && (
        <div className="space-y-8">
          
          {/* Create Team & Add Player Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Form 1: Create Team */}
            <form onSubmit={handleCreateTeam} className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4 cyber-card">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" /> Create New Team ({teams.length}/5)
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Team Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Cyber Vipers"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Team Tag (3 Chars)</label>
                  <input 
                    type="text" 
                    maxLength="4"
                    placeholder="e.g. CVP"
                    value={newTeam.tag}
                    onChange={(e) => setNewTeam({ ...newTeam, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-cyan-500 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Team Emblem</label>
                  <select 
                    value={newTeam.logo} 
                    onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {TEAM_LOGOS.map((logo, i) => (
                      <option key={i} value={logo}>{logo} Emblem {i+1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Primary Color</label>
                  <div className="flex gap-2 items-center">
                    {TEAM_COLORS.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setNewTeam({ ...newTeam, color: c })}
                        className={`w-6 h-6 rounded-full border transition ${newTeam.color === c ? 'scale-125 border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={teams.length >= 5}
                className="w-full py-2.5 rounded-xl bg-cyan-500 disabled:opacity-50 text-black font-orbitron font-bold text-xs hover:bg-cyan-400 transition"
              >
                + Add Team
              </button>
            </form>

            {/* Form 2: Add Player to Team */}
            <form onSubmit={handleAddPlayer} className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4 cyber-card">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-pink-400" /> Add Player to Roster
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Select Team</label>
                  <select 
                    value={newPlayer.teamId}
                    onChange={(e) => setNewPlayer({ ...newPlayer, teamId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="">Select Team...</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.logo} {t.name} ({t.members.length}/5)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Player Real Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alex Mercer"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">In-Game Tag</label>
                  <input 
                    type="text" 
                    placeholder="Kage#001"
                    value={newPlayer.tag}
                    onChange={(e) => setNewPlayer({ ...newPlayer, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Role</label>
                  <select 
                    value={newPlayer.role}
                    onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-pink-500"
                  >
                    {PLAYER_ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Flag/Country</label>
                  <input 
                    type="text" 
                    placeholder="🇺🇸"
                    value={newPlayer.country}
                    onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-pink-500 text-center"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-pink-500 text-white font-orbitron font-bold text-xs hover:bg-pink-400 transition"
              >
                + Add Player Member
              </button>
            </form>

          </div>

          {/* Teams Roster Display Grid */}
          <div className="space-y-6">
            <h3 className="font-orbitron font-bold text-xl text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" /> TOURNAMENT SQUADS ({teams.length} TEAMS)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map(team => (
                <div 
                  key={team.id}
                  className="rounded-2xl bg-slate-900/80 border p-5 space-y-4 cyber-card relative overflow-hidden"
                  style={{ borderColor: `${team.color}40` }}
                >
                  {/* Top Team Card Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-black/50 border border-white/10" style={{ borderColor: team.color }}>
                        {team.logo}
                      </span>
                      <div>
                        <h4 className="font-orbitron font-bold text-base text-white">{team.name}</h4>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                          [{team.tag}] • {team.members.length}/5 Players
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Player Roster Members */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">5-Player Roster:</span>
                    {team.members.map((m, idx) => (
                      <div key={m.id} className="flex justify-between items-center p-2 rounded-lg bg-black/40 border border-white/5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{m.country}</span>
                          <div>
                            <div className="font-semibold text-slate-200 flex items-center gap-1">
                              {m.name} 
                              {idx === 0 && <Star className="w-3 h-3 text-amber-400 fill-amber-400" title="Captain" />}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{m.tag}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300">
                            {m.role}
                          </span>
                          <button 
                            onClick={() => handleRemovePlayer(team.id, m.id)}
                            className="text-slate-500 hover:text-pink-400 p-1 transition"
                            title="Remove player"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Empty Slots Fillers */}
                    {Array.from({ length: Math.max(0, 5 - team.members.length) }).map((_, i) => (
                      <div key={i} className="p-2 rounded-lg border border-dashed border-white/10 text-center text-slate-600 text-xs font-mono">
                        + Empty Slot ({team.members.length + i + 1}/5)
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Match Details Modal */}
      {selectedMatch && (
        <MatchModal 
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onUpdateScore={handleUpdateScore}
        />
      )}

    </div>
  );
}
