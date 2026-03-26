export interface Ending {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  achievedThrough: string;
  image: string;
}

export const endings: Ending[] = [
  {
    id: 'A',
    title: 'NEW BASES OF COOPERATION',
    subtitle: 'Spring 2031 — A New Architecture Emerges',
    body: "Allied coalition creates genuine counterweight. Not through confrontation, but through demonstration of superior model. Network of networks. China powerful but no longer inevitable.\n\nThe alliances held. Not because they were forced to, but because they chose to. Sarah Chen's bet on American credibility paid off. Maya Patel's technology consortium became the backbone of a new digital order. James Nakamura's drones patrolled shared waters.\n\nLi Jian submitted a report that told the truth. Anna Karlsson built the security architecture she'd always envisioned.\n\nThe world was still dangerous. Competition remained fierce. But the rules held. And that, in 2031, was everything.",
    achievedThrough:
      'Consistent alliance-building choices, multilateral coordination, shared technological development.',
    image: '/assets/new_bases_cooperation_ending.webp',
  },
  {
    id: 'B',
    title: 'TRUNDLING ALONG',
    subtitle: 'Spring 2031 — The World Continues Sideways',
    body: "West fails to cohere. Not through collapse, but through persistent failure to choose. Three years of drift become five, then ten. World looks like 2029, just more so.\n\nThe crisis passed. Another replaced it. The pattern held: mobilize, hesitate, accommodate, repeat. Sarah Chen wrote memos that were read and filed. Maya Patel's technology remained dominant but contested. James Nakamura's company survived by staying ambiguous.\n\nLi Jian's daughter came home from Cambridge. They didn't talk about politics. Anna Karlsson retired early.\n\nNothing collapsed. Nothing was resolved. The future arrived, as futures do, without asking permission.",
    achievedThrough:
      'Inconsistent choices, prioritizing short-term comfort, avoiding hard decisions, fragmented responses.',
    image: '/assets/trundling_along_ending.webp',
  },
  {
    id: 'C',
    title: 'THE CRUCIBLE',
    subtitle: 'Spring 2031 — The World Holds Its Breath',
    body: "High tension, near-miss conflicts, deterrence barely holds. Genuine Cold War 2.0. Trade routes militarized. Trust replaced by verification. Not war, but not peace anyone wanted.\n\nThe South China Sea hardened into a front line. Every transit, a negotiation. Every negotiation, a test. Sarah Chen spent her days managing crises that previous decades would have called emergencies.\n\nMaya Patel's AI systems detected threats no human analyst could. James Nakamura's drones watched the waters, always watching.\n\nLi Jian was transferred to a western province. Anna Karlsson's worst predictions proved optimistic.\n\nThe world was safe. Technically. But it was the safety of a cage—all parties inside, none willing to be the first to leave.",
    achievedThrough:
      'Confrontational choices, military-forward postures, escalation during Manila crisis.',
    image: '/assets/the_crucible_ending.webp',
  },
  {
    id: 'D',
    title: 'STRATEGIC JUDO',
    subtitle: 'Spring 2031 — Using Strength Against Itself',
    body: "Combined agility of many turns China's strengths into weaknesses. Superior value proposition demonstrated. China forced to compete for influence, not command it. Competition makes everyone better.\n\nThe breakthrough came not from confrontation but from connection. Maya Patel's consortium made Chinese tech alternatives unnecessary. James Nakamura's precision systems made coercion costly. Anna Karlsson's security architecture made NATO's reach transcontinental.\n\nSarah Chen never fired a shot. She didn't need to.\n\nLi Jian watched the Central Committee debate whether to continue a strategy that was no longer working. For the first time in years, he allowed himself to hope.\n\nThe contest continued. But the rules had changed. And changing the rules, it turned out, was the whole game.",
    achievedThrough:
      'Creative asymmetric responses, tech-industrial coordination, genuine partnership alternatives.',
    image: '/assets/strategic_judo_ending.webp',
  },
];

export const getEnding = (id: string): Ending | undefined =>
  endings.find((e) => e.id === id);
