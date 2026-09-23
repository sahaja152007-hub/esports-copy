// Preset Sample Teams & Players for Quick Load

export const INITIAL_PRESET_TEAMS = [
  {
    id: 'team-1',
    name: 'Cyber Ninjas',
    tag: 'CNJ',
    logo: '🥷',
    color: '#00f3ff', // Cyan
    captainId: 'p1',
    members: [
      { id: 'p1', name: 'Alex Mercer', tag: 'Kage#001', role: 'Captain', rank: 'Radiant', rating: 98, country: '🇺🇸' },
      { id: 'p2', name: 'Kenji Sato', tag: 'Blade#007', role: 'Entry Fragger', rank: 'Immortal 3', rating: 95, country: '🇯🇵' },
      { id: 'p3', name: 'Elena Rostova', tag: 'Valkyrie#101', role: 'Sniper', rank: 'Radiant', rating: 97, country: '🇸🇪' },
      { id: 'p4', name: 'Marcus Chen', tag: 'Aegis#404', role: 'Support', rank: 'Immortal 2', rating: 91, country: '🇸🇬' },
      { id: 'p5', name: 'Liam O\'Connor', tag: 'Cipher#999', role: 'Flex', rank: 'Immortal 3', rating: 93, country: '🇮🇪' },
    ]
  },
  {
    id: 'team-2',
    name: 'Quantum Vipers',
    tag: 'QVP',
    logo: '🐍',
    color: '#10b981', // Emerald Green
    captainId: 'p6',
    members: [
      { id: 'p6', name: 'Sarah Connor', tag: 'Toxic#777', role: 'Captain', rank: 'Radiant', rating: 99, country: '🇨🇦' },
      { id: 'p7', name: 'Dmitri Volkov', tag: 'Venom#202', role: 'Entry Fragger', rank: 'Radiant', rating: 96, country: '🇩🇪' },
      { id: 'p8', name: 'Chloe Dubois', tag: 'Spectre#303', role: 'Sniper', rank: 'Immortal 3', rating: 94, country: '🇫🇷' },
      { id: 'p9', name: 'Hassan Al-Mansoor', tag: 'Mirage#505', role: 'Support', rank: 'Immortal 2', rating: 90, country: '🇦🇪' },
      { id: 'p10', name: 'Mateo Silva', tag: 'Fangs#606', role: 'Flex', rank: 'Immortal 3', rating: 92, country: '🇧🇷' },
    ]
  },
  {
    id: 'team-3',
    name: 'Astral Titans',
    tag: 'AST',
    logo: '🛡️',
    color: '#ff0055', // Magenta
    captainId: 'p11',
    members: [
      { id: 'p11', name: 'Viktor Vance', tag: 'Hyperion#111', role: 'Captain', rank: 'Radiant', rating: 97, country: '🇬🇧' },
      { id: 'p12', name: 'Kai Tanaka', tag: 'Nova#888', role: 'Entry Fragger', rank: 'Immortal 3', rating: 95, country: '🇯🇵' },
      { id: 'p13', name: 'Isabella Rossi', tag: 'Comet#444', role: 'Sniper', rank: 'Radiant', rating: 96, country: '🇮🇹' },
      { id: 'p14', name: 'Tariq Johnson', tag: 'Atlas#222', role: 'Support', rank: 'Immortal 1', rating: 89, country: '🇺🇸' },
      { id: 'p15', name: 'Sven Lindqvist', tag: 'Orbit#333', role: 'Flex', rank: 'Immortal 3', rating: 93, country: '🇳🇴' },
    ]
  },
  {
    id: 'team-4',
    name: 'Neon Phoenix',
    tag: 'NPX',
    logo: '🔥',
    color: '#ffbe00', // Gold
    captainId: 'p16',
    members: [
      { id: 'p16', name: 'Aria Montgomery', tag: 'Blaze#555', role: 'Captain', rank: 'Radiant', rating: 98, country: '🇦🇺' },
      { id: 'p17', name: 'Lucas Kim', tag: 'Ignite#777', role: 'Entry Fragger', rank: 'Radiant', rating: 97, country: '🇰🇷' },
      { id: 'p18', name: 'Zoe Martinez', tag: 'Ember#888', role: 'Sniper', rank: 'Immortal 3', rating: 93, country: '🇲🇽' },
      { id: 'p19', name: 'Devon Wright', tag: 'Ash#123', role: 'Support', rank: 'Immortal 2', rating: 91, country: '🇺🇸' },
      { id: 'p20', name: 'Youssef Benali', tag: 'Inferno#999', role: 'Flex', rank: 'Immortal 3', rating: 94, country: '🇲🇦' },
    ]
  },
  {
    id: 'team-5',
    name: 'Shadow Syndicate',
    tag: 'SHD',
    logo: '💀',
    color: '#a855f7', // Purple
    captainId: 'p21',
    members: [
      { id: 'p21', name: 'Nikhil Sharma', tag: 'Phantom#000', role: 'Captain', rank: 'Radiant', rating: 99, country: '🇮🇳' },
      { id: 'p22', name: 'Grace Taylor', tag: 'Reaper#666', role: 'Entry Fragger', rank: 'Radiant', rating: 96, country: '🇬🇧' },
      { id: 'p23', name: 'David Park', tag: 'Eclipse#777', role: 'Sniper', rank: 'Immortal 3', rating: 95, country: '🇰🇷' },
      { id: 'p24', name: 'Mia Kowalski', tag: 'Wraith#444', role: 'Support', rank: 'Immortal 2', rating: 92, country: '🇵🇱' },
      { id: 'p25', name: 'Carlos Mendez', tag: 'Shade#555', role: 'Flex', rank: 'Immortal 3', rating: 93, country: '🇪🇸' },
    ]
  }
];

export const TEAM_LOGOS = ['🥷', '🐍', '🛡️', '🔥', '💀', '⚡', '🐉', '🐺', '🦅', '🎯'];
export const TEAM_COLORS = ['#00f3ff', '#10b981', '#ff0055', '#ffbe00', '#a855f7', '#3b82f6', '#ec4899', '#f97316'];
export const PLAYER_ROLES = ['Captain', 'Entry Fragger', 'Sniper', 'Support', 'Flex'];
export const PLAYER_RANKS = ['Radiant', 'Immortal 3', 'Immortal 2', 'Immortal 1', 'Ascendant'];
