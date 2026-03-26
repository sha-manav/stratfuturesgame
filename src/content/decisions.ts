export interface MetricDelta {
  allianceTrust?: number;
  techEdge?: number;
  strategicCoherence?: number;
  domesticResilience?: number;
  multilateral?: boolean;
}

export interface DecisionChoice {
  id: string;
  label: string;
  title: string;
  description: string;
  impacts: MetricDelta;
  impactLabels: string[];
  risk: string;
}

export interface CharacterConsequence {
  characterId: string;
  image: string;
  story: string;
  dialogue: string;
}

export interface ChoiceConsequence {
  choiceId: string;
  title: string;
  subtitle: string;
  effects: { label: string; value: string; positive: boolean }[];
  chineseResponse: string;
  characters: CharacterConsequence[];
}

export interface Decision {
  id: string;
  heroImage: string;
  situationSummary: string;
  whatAtStake: string;
  previousContext: string;
  choices: DecisionChoice[];
  consequences: ChoiceConsequence[];
}

export const decisions: Decision[] = [
  {
    id: 'decision_1_1',
    heroImage: '/assets/page_nine_south_china_sea_crisis.webp',
    situationSummary:
      'IMMEDIATE: Chinese Coast Guard vessels have blocked Philippines resupply to Second Thomas Shoal for 48 hours. Manila formally invoked the US-Philippines Mutual Defense Treaty 2 hours ago.\n\nALLIED POSTURE: Japan and Australia are monitoring closely, awaiting US coordination. Both have assets that could be deployed within 24 hours, but won\'t move without American leadership.\n\nINTELLIGENCE ASSESSMENT: Beijing is testing whether US commitment to treaty allies remains credible after three years of strategic drift. Allied capitals are watching this as the defining moment.',
    whatAtStake:
      "Your recommendation will signal America's posture for the next decade. Choose aggressive coordination and risk confrontation. Choose restraint and risk allied confidence. Choose middle ground and risk appearing indecisive. Every option has costs.",
    previousContext:
      "Over the past three years, you've watched allies hedge their relationships with Beijing. Each small accommodation, each 'pragmatic' bilateral deal, has weakened collective resolve. This is the first real test since the drift began.",
    choices: [
      {
        id: 'A',
        label: 'A',
        title: 'Aggressive Counter-Offer',
        description:
          "Recommend US provide immediate $5B infrastructure package to Philippines. Deploy naval assets for 'freedom of navigation' within 48 hours. Signal strong commitment, deter further Chinese action.",
        impacts: {
          allianceTrust: 20,
          domesticResilience: -10,
          multilateral: false,
        },
        impactLabels: ['Alliance Trust +20', 'Fiscal Health −15', 'Domestic Support −10'],
        risk: "Congressional backlash, 'forever wars' narrative",
      },
      {
        id: 'B',
        label: 'B',
        title: 'Japan-Led Coalition',
        description:
          'Encourage Japan-Australia-led response with US coordination role. Multilateral burden-sharing, builds allied self-reliance. Slower but more sustainable approach to regional security.',
        impacts: {
          allianceTrust: 10,
          strategicCoherence: 15,
          techEdge: -5,
          multilateral: true,
        },
        impactLabels: ['Alliance Trust +10', 'Multilateral Cohesion +15', 'Tech Advantage −5'],
        risk: 'Slower response, China moves first',
      },
      {
        id: 'C',
        label: 'C',
        title: 'Strategic Restraint',
        description:
          'Diplomatic protest and economic pressure, but preserve resources for AI/tech competition. Signal priorities lie in long-term strategic advantage, not every regional dispute. Let Philippines handle locally.',
        impacts: {
          allianceTrust: -25,
          techEdge: 15,
          domesticResilience: 10,
          multilateral: false,
        },
        impactLabels: ['Alliance Trust −25', 'Tech Advantage +15', 'Fiscal Health +10'],
        risk: 'Philippines drifts toward China, allies hedge',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        title: 'You Chose: Aggressive Counter-Offer',
        subtitle: '48 Hours Later — Full Commitment',
        effects: [
          {
            label: 'Alliance Trust +20',
            value:
              'Japan and Australia immediately pledge coordinated response. Philippine President publicly thanks US for \'unwavering commitment.\' Other regional allies take note.',
            positive: true,
          },
          {
            label: 'Fiscal Health −15',
            value:
              'Congressional leaders question $5B package amid domestic infrastructure needs. Budget hawks demand spending offsets. Treasury warns about deficit implications.',
            positive: false,
          },
          {
            label: 'Domestic Support −10',
            value:
              "Progressive caucus criticizes 'forever wars mentality.' Conservative isolationists question Pacific commitments. Polling shows 58% opposed to 'entangling alliances.'",
            positive: false,
          },
        ],
        chineseResponse:
          "Beijing labels US 'destabilizing force' but vessels begin gradual withdrawal. PLA Navy conducts 'unrelated training exercise' 200 miles away.",
        characters: [
          {
            characterId: 'sarah',
            image: '/assets/page_ten_sarah_chen_office.webp',
            story:
              "The video call with allied counterparts felt different. For the first time in three years, Sarah saw genuine relief instead of skepticism. Tokyo's NSC advisor actually smiled.",
            dialogue: 'This is the America we remember. The one that shows up.',
          },
          {
            characterId: 'maya',
            image: '/assets/page_ten_maya_patel_call.webp',
            story:
              "The board was furious about the geopolitical instability. Stock down 4% on the news. But Maya noticed something else: three Asian partners who'd been hedging suddenly wanted to accelerate AI cooperation talks.",
            dialogue: 'Maybe... maybe credibility matters more than we thought.',
          },
          {
            characterId: 'james',
            image: '/assets/page_ten_james_nakamura.webp',
            story:
              "The Defense Ministry call came within hours. Not a request. An order. Accelerate autonomous maritime surveillance systems. Japan was betting on America's word. James hoped it wouldn't regret it.",
            dialogue: "We're all in now. No going back.",
          },
        ],
      },
      {
        choiceId: 'B',
        title: 'You Chose: Japan-Led Coalition',
        subtitle: '72 Hours Later — Multilateral Coordination',
        effects: [
          {
            label: 'Alliance Trust +10',
            value:
              'Allies appreciate burden-sharing approach. Japan takes visible leadership role, enhancing regional security architecture. Australia commits additional resources.',
            positive: true,
          },
          {
            label: 'Multilateral Cohesion +15',
            value:
              'QUAD framework strengthened. New trilateral coordination mechanism established. Sets precedent for allied self-reliance on security matters.',
            positive: true,
          },
          {
            label: 'Tech Advantage −5',
            value:
              'Technology sharing required for coordination slows some proprietary development. But creates interoperability benefits for long term.',
            positive: false,
          },
          {
            label: 'Response Speed −25',
            value:
              "Coordination takes 48 hours longer than unilateral approach. Chinese vessels withdraw, but Beijing claims 'voluntary completion of training mission.'",
            positive: false,
          },
        ],
        chineseResponse:
          "Chinese vessels withdraw after 72 hours. Beijing claims 'voluntary completion of training mission.' PLA Navy increases patrols elsewhere.",
        characters: [
          {
            characterId: 'sarah',
            image: '/assets/page_ten_sarah_chen_office.webp',
            story:
              'The multiparty calls were exhausting—five time zones, three languages, endless bureaucracy. But Sarah saw something emerge: genuine partnership. Not America dictating, but allies deciding together.',
            dialogue: 'This is what we should have been building all along.',
          },
          {
            characterId: 'james',
            image: '/assets/page_ten_james_nakamura.webp',
            story:
              "The Japanese government designated Kōdo Robotics as primary contractor for allied maritime surveillance. James's company at the center of multilateral defense cooperation. His father would have been proud.",
            dialogue: "We're not a supplier anymore. We're a partner.",
          },
          {
            characterId: 'maya',
            image: '/assets/page_ten_maya_patel_call.webp',
            story:
              'The call from Tokyo was unexpected. Could Sentinel AI partner with Japanese and Australian firms on joint AI development? Maya had always focused on US dominance. But maybe there was another model.',
            dialogue: 'What if we built this together from the start?',
          },
        ],
      },
      {
        choiceId: 'C',
        title: 'You Chose: Strategic Restraint',
        subtitle: '96 Hours Later — Consequences of Inaction',
        effects: [
          {
            label: 'Alliance Trust −25',
            value:
              'Philippine President publicly questions US treaty commitment. Japan and Australia issue carefully worded statements avoiding direct criticism—but begin bilateral security consultations.',
            positive: false,
          },
          {
            label: 'Tech Advantage +15',
            value:
              'Resources preserved for AI competition. Sentinel AI receives additional federal funding. DOD accelerates autonomous systems procurement focused on \'high-end\' threats.',
            positive: true,
          },
          {
            label: 'Fiscal Health +10',
            value:
              "No supplemental budget required. Congressional leadership praises 'fiscal responsibility' and 'strategic prioritization.' Deficit hawks satisfied.",
            positive: true,
          },
          {
            label: 'Allied Hedging −25',
            value:
              "Within 48 hours, three Asian capitals quietly reach out to Beijing about bilateral arrangements. The 'anticipatory compliance' you feared is becoming reality.",
            positive: false,
          },
        ],
        chineseResponse:
          "Beijing celebrates 'successful assertion of sovereignty.' CMSA vessels remain. Foreign Ministry notes 'US restraint' as evidence of changing regional balance.",
        characters: [
          {
            characterId: 'sarah',
            image: '/assets/page_ten_sarah_chen_office.webp',
            story:
              "The call with the Philippine ambassador was the worst conversation of Sarah's career. She used words like 'strategic calculus' and 'long-term priorities.' He used words like 'betrayal' and 'abandoned.'",
            dialogue: 'We thought American promises meant something.',
          },
          {
            characterId: 'maya',
            image: '/assets/page_ten_maya_patel_call.webp',
            story:
              "Sentinel AI's federal contracts were secure. Stock recovered within days. But Maya noticed several Asian partners quietly canceling meetings. They were looking for alternatives. Maybe Chinese ones.",
            dialogue: 'We won the budget battle. Did we lose the war?',
          },
          {
            characterId: 'james',
            image: '/assets/page_ten_james_nakamura.webp',
            story:
              "The Chinese offer returned, even larger this time. $2.5B. Beijing was sensing opportunity. James's board was divided. The Japanese government silent. America's position had created a vacuum.",
            dialogue: "If America won't lead, someone else will.",
          },
        ],
      },
    ],
  },
];

export const getDecision = (id: string): Decision | undefined =>
  decisions.find((d) => d.id === id);

export const getConsequence = (
  decisionId: string,
  choiceId: string
): ChoiceConsequence | undefined => {
  const decision = getDecision(decisionId);
  return decision?.consequences.find((c) => c.choiceId === choiceId);
};
