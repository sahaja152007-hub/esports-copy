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
    slug: "riverside-university",
    name: "Riverside University",
    short: "RU",
    region: "Pacific West",
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
    slug: "cedar-bay-institute",
    name: "Cedar Bay Institute",
    short: "CB",
    region: "Great Lakes",
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
    slug: "granite-hollow",
    name: "Granite Hollow",
    short: "GH",
    region: "Mountain West",
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
    slug: "meridian-bay-college",
    name: "Meridian Bay College",
    short: "MB",
    region: "Atlantic Coast",
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
    slug: "maple-crest",
    name: "Maple Crest",
    short: "MC",
    region: "Heartland",
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
    region: "",
  };

export const rounds: { round: string; matches: Match[] }[] = [
  {
    round: "Round 1 · Group A",
    matches: [
      {
        id: "m1",
        round: "Round 1 · Group A",
        a: "Riverside University",
        b: "Cedar Bay Institute",
        date: "Feb 21",
        time: "19:00",
        status: "final",
        score: "2 : 0",
      },
      {
        id: "m2",
        round: "Round 1 · Group A",
        a: "Granite Hollow",
        b: "Meridian Bay College",
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
        a: "Riverside University",
        b: "Granite Hollow",
        date: "Feb 22",
        time: "18:30",
        status: "scheduled",
      },
      {
        id: "m4",
        round: "Round 2 · Group A",
        a: "Maple Crest",
        b: "Meridian Bay College",
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
        a: "Granite Hollow",
        b: "Maple Crest",
        date: "Feb 23",
        time: "18:00",
        status: "live",
        score: "1 : 1",
      },
      {
        id: "m6",
        round: "Semifinal",
        a: "Riverside University",
        b: "Cedar Bay Institute",
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
        a: "Riverside University",
        b: "Cedar Bay Institute",
        date: "Feb 25",
        time: "19:00",
        status: "scheduled",
      },
    ],
  },
];

export const tournaments = [
  {
    slug: "pacific-west-clash",
    game: "Valorant · Open",
    name: "Pacific West Clash",
    meta: "Feb 21 · 16 teams · $8,000",
    status: "Registration open",
  },
  {
    slug: "great-lakes-invitational",
    game: "League of Legends",
    name: "Great Lakes Invitational",
    meta: "Feb 28 · 12 teams · $10,000",
    status: "Registration open",
  },
  {
    slug: "atlantic-coast-cup",
    game: "Rocket League",
    name: "Atlantic Coast Cup",
    meta: "Mar 6 · 8 teams · $6,000",
    status: "Registration open",
  },
];

export const rewards = [
  {
    place: "1st · Champion",
    prize: "$18,000",
    detail: "Winter Cup, all-region broadcast slot, and a season-long VEXA title.",
  },
  {
    place: "2nd · Runner-up",
    prize: "$9,500",
    detail: "Direct qualifier into the Summer Circuit and a featured team profile.",
  },
  {
    place: "3rd · Semifinal",
    prize: "$4,500",
    detail: "Campus scholarship grant and coaching review by the VEXA panel.",
  },
];

export const regions = [
  { name: "Pacific West", meta: "12 colleges · 48 teams" },
  { name: "Great Lakes", meta: "9 colleges · 36 teams" },
  { name: "Atlantic Coast", meta: "11 colleges · 42 teams" },
  { name: "Heartland", meta: "8 colleges · 28 teams" },
  { name: "Mountain West", meta: "7 colleges · 24 teams" },
  { name: "Southeast", meta: "4 colleges · 18 teams" },
];

export const standings = [...teams].sort((a, b) => b.points - a.points);
