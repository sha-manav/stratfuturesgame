export interface Character {
  id: string;
  name: string;
  role: string;
  location: string;
  color: string;
  accentClass: string;
  glowClass: string;
  portrait: string;
  sceneImage: string;
  locationImage: string;
}

export const characters: Character[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Deputy National Security Advisor',
    location: 'Washington DC — 05:30 EST',
    color: '#3B82F6',
    accentClass: 'text-blue-400',
    glowClass: 'glow-blue',
    portrait: '/assets/sarah_chen_portrait.webp',
    sceneImage: '/assets/page_two_sarah_chen.webp',
    locationImage: '/assets/situation_room_interior.webp',
  },
  {
    id: 'maya',
    name: 'Dr. Maya Patel',
    role: 'CEO, Sentinel AI',
    location: 'San Francisco — 02:30 PST',
    color: '#F59E0B',
    accentClass: 'text-amber-400',
    glowClass: 'glow-amber',
    portrait: '/assets/maya_patel_portrait.webp',
    sceneImage: '/assets/page_two_maya_patel.webp',
    locationImage: '/assets/sf_hq_interior.webp',
  },
  {
    id: 'james',
    name: 'James Nakamura',
    role: 'CEO, Kōdo Robotics',
    location: 'Tokyo — 19:30 JST',
    color: '#DC2626',
    accentClass: 'text-red-400',
    glowClass: 'glow-crimson',
    portrait: '/assets/james_nakamura_portrait.webp',
    sceneImage: '/assets/page_two_james_nakamura.webp',
    locationImage: '/assets/tokyo_robotics_factory.webp',
  },
  {
    id: 'lijian',
    name: 'Vice Minister Li Jian',
    role: 'Vice Minister',
    location: 'Beijing — 21:30 CST',
    color: '#10B981',
    accentClass: 'text-emerald-400',
    glowClass: 'glow-jade',
    portrait: '/assets/li_jian_portrait.webp',
    sceneImage: '/assets/page_two_li_jian.webp',
    locationImage: '/assets/beijing_ministry_office.webp',
  },
  {
    id: 'anna',
    name: 'Colonel Anna Karlsson',
    role: 'Swedish Armed Forces',
    location: 'Stockholm — 20:30 CET',
    color: '#94A3B8',
    accentClass: 'text-slate-300',
    glowClass: 'glow-silver',
    portrait: '/assets/anna_karlsson_portrait.webp',
    sceneImage: '/assets/page_two_anna_karlsson.webp',
    locationImage: '/assets/stockholm_planning_office.webp',
  },
];

export const getCharacter = (id: string): Character | undefined =>
  characters.find((c) => c.id === id);
