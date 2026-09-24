export type MatchStatus = "scheduled" | "live" | "final";

export type Team = {
  slug: string;
  name: string;
  short: string;
  region: string;
  game: string;
  wins: number;
  losses: number;
  points: number;
  captain: string;
  roster: { handle: string; name: string; role: string; rating: string }[];
};

export type Match = {
  id: string;
  round: string;
  a: string;
  b: string;
  date: string;
  time: string;
  status: MatchStatus;
  score?: string;
};

export const teams: Team[] = [
  {
    slug: "nmims-mumbai-knights",
    name: "NMIMS Mumbai Knights",
    short: "NMK",
    region: "Mumbai Main Campus",
    game: "Valorant",
    wins: 6,
    losses: 1,
    points: 18,
    captain: "kairo",
    roster: [
      { handle: "kairo", name: "Kai Romero", role: "Duelist · Captain", rating: "1.24" },
      { handle: "svelt", name: "Nils Svensson", role: "Controller", rating: "1.11" },
      { handle: "pyre", name: "Amara Odu", role: "Initiator", rating: "1.08" },
      { handle: "linec", name: "Tom Lineker", role: "Sentinel", rating: "1.02" },
      { handle: "quinta", name: "Ana Quintero", role: "Flex", rating: "0.98" },
    ],
  },
  {
    slug: "nmims-shirpur-cyberstorm",
    name: "NMIMS Shirpur Cyberstorm",
    short: "NSC",
    region: "Shirpur Campus",
    game: "Valorant",
    wins: 5,
    losses: 2,
    points: 15,
    captain: "mosaic",
    roster: [
      { handle: "mosaic", name: "Ravi Menon", role: "Initiator · Captain", rating: "1.19" },
      { handle: "halide", name: "Jo Park", role: "Duelist", rating: "1.14" },
      { handle: "vantage", name: "Ben Ostrom", role: "Sentinel", rating: "1.05" },
      { handle: "kiln", name: "Dani Whitfield", role: "Controller", rating: "1.01" },
      { handle: "orbit", name: "Sam Achebe", role: "Flex", rating: "0.96" },
    ],
  },
  {
    slug: "nmims-navi-mumbai-strikers",
    name: "NMIMS Navi Mumbai Strikers",
    short: "NNS",
    region: "Navi Mumbai Campus",
    game: "Valorant",
    wins: 4,
    losses: 3,
    points: 12,
    captain: "tundra",
    roster: [
      { handle: "tundra", name: "Elin Haugen", role: "Sentinel · Captain", rating: "1.12" },
      { handle: "clave", name: "Marco Bello", role: "Duelist", rating: "1.09" },
      { handle: "ember", name: "Kate Nwosu", role: "Initiator", rating: "1.03" },
      { handle: "grist", name: "Paul Ma", role: "Controller", rating: "0.99" },
      { handle: "shale", name: "Ivy Larsen", role: "Flex", rating: "0.94" },
    ],
  },
  {
    slug: "nmims-hyderabad-vipers",
    name: "NMIMS Hyderabad Vipers",
    short: "NHV",
    region: "Hyderabad Campus",
    game: "Valorant",
    wins: 1,
    losses: 6,
    points: 3,
    captain: "delta",
    roster: [
      { handle: "delta", name: "Owen Reyes", role: "Controller · Captain", rating: "1.04" },
      { handle: "harlow", name: "Zoe Harlow", role: "Duelist", rating: "1.00" },
      { handle: "nautic", name: "Ari Bloom", role: "Initiator", rating: "0.95" },
      { handle: "keel", name: "Mo Farrah", role: "Sentinel", rating: "0.91" },
      { handle: "drift", name: "Lena Voss", role: "Flex", rating: "0.88" },
    ],
  },
  {
    slug: "nmims-bengaluru-titans",
    name: "NMIMS Bengaluru Titans",
    short: "NBT",
    region: "Bengaluru Campus",
    game: "Valorant",
    wins: 4,
    losses: 3,
    points: 12,
    captain: "sap",
    roster: [
      { handle: "sap", name: "Ruth Alder", role: "Duelist · Captain", rating: "1.16" },
      { handle: "birchy", name: "Cole Birch", role: "Initiator", rating: "1.07" },
      { handle: "tapline", name: "Ines Duval", role: "Sentinel", rating: "1.00" },
      { handle: "grove", name: "Neel Kapoor", role: "Controller", rating: "0.97" },
      { handle: "amber", name: "Faye Jansen", role: "Flex", rating: "0.93" },
    ],
  },
];

export const teamBySlug = (slug: string) => teams.find((t) => t.slug === slug);

export const teamByName = (name: string) =>
  teams.find((t) => t.name === name) ?? {
    short: name.slice(0, 2).toUpperCase(),
    name,
    slug: "",
    region: "NMIMS Campus",
  };

export const rounds: { round: string; matches: Match[] }[] = [
  {
    round: "Round 1 · Group A",
    matches: [
      {
        id: "m1",
        round: "Round 1 · Group A",
        a: "NMIMS Mumbai Knights",
        b: "NMIMS Shirpur Cyberstorm",
        date: "Feb 21",
        time: "19:00",
        status: "final",
        score: "2 : 0",
      },
      {
        id: "m2",
        round: "Round 1 · Group A",
        a: "NMIMS Navi Mumbai Strikers",
        b: "NMIMS Hyderabad Vipers",
        date: "Feb 21",
        time: "21:00",
        status: "final",
        score: "2 : 1",
      },
    ],
  },
  {
    round: "Round 2 · Group A",
    matches: [
      {
        id: "m3",
        round: "Round 2 · Group A",
        a: "NMIMS Mumbai Knights",
        b: "NMIMS Navi Mumbai Strikers",
        date: "Feb 22",
        time: "18:30",
        status: "scheduled",
      },
      {
        id: "m4",
        round: "Round 2 · Group A",
        a: "NMIMS Bengaluru Titans",
        b: "NMIMS Hyderabad Vipers",
        date: "Feb 22",
        time: "20:30",
        status: "scheduled",
      },
    ],
  },
  {
    round: "Semifinal",
    matches: [
      {
        id: "m5",
        round: "Semifinal",
        a: "NMIMS Navi Mumbai Strikers",
        b: "NMIMS Bengaluru Titans",
        date: "Feb 23",
        time: "18:00",
        status: "live",
        score: "1 : 1",
      },
      {
        id: "m6",
        round: "Semifinal",
        a: "NMIMS Mumbai Knights",
        b: "NMIMS Shirpur Cyberstorm",
        date: "Feb 23",
        time: "20:00",
        status: "scheduled",
      },
    ],
  },
  {
    round: "Grand Final",
    matches: [
      {
        id: "m7",
        round: "Grand Final",
        a: "NMIMS Mumbai Knights",
        b: "NMIMS Shirpur Cyberstorm",
        date: "Feb 25",
        time: "19:00",
        status: "scheduled",
      },
    ],
  },
];

export const tournaments = [
  {
    slug: "nmims-valorant-championship",
    game: "Valorant · Open",
    name: "NMIMS Inter-Campus Valorant Clash",
    meta: "Feb 21-25 · 16 Campus Teams · ₹50,000",
    status: "Registration open",
  },
  {
    slug: "nmims-fifa-cup",
    game: "FC 24 / FIFA",
    name: "NMIMS Campus Solo Showdown",
    meta: "Feb 28 · 32 Players · ₹15,000",
    status: "Registration open",
  },
  {
    slug: "nmims-rocket-league",
    game: "Rocket League",
    name: "NMIMS Inter-Campus 3v3 Cup",
    meta: "Mar 6 · 12 Campus Teams · ₹20,000",
    status: "Registration open",
  },
];

export const rewards = [
  {
    place: "1st · Champion",
    prize: "₹25,000",
    detail: "NMIMS Championship Trophy, Gold Medals & All-Campus Bragging Rights.",
  },
  {
    place: "2nd · Runner-up",
    prize: "₹15,000",
    detail: "Silver Medals, Featured Team Profile & Inter-College Finals Slot.",
  },
  {
    place: "3rd · Semifinal",
    prize: "₹10,000",
    detail: "Bronze Medals & Campus Esports Excellence Grant.",
  },
];

export const regions = [
  { name: "Mumbai Main Campus", meta: "12 Departments · 48 Players" },
  { name: "Shirpur Campus", meta: "8 Departments · 36 Players" },
  { name: "Navi Mumbai Campus", meta: "10 Departments · 42 Players" },
  { name: "Bengaluru Campus", meta: "6 Departments · 28 Players" },
  { name: "Hyderabad Campus", meta: "7 Departments · 24 Players" },
  { name: "Indore Campus", meta: "5 Departments · 20 Players" },
];

export const standings = [...teams].sort((a, b) => b.points - a.points);
