// ============================================================
// COMPLETE DECISION TREE — ALL 11 DECISIONS ACROSS 6 CHAPTERS
// Authored text preserved exactly. Trajectory logic from
// decision_tree_v2_fixed_endings.html
// ============================================================

export interface TrajectoryDelta {
  alliance_path?: number;
  tech_path?: number;
  escalation_path?: number;
  restraint_path?: number;
}

export interface MetricDelta {
  allianceTrust?: number;
  techEdge?: number;
  strategicCoherence?: number;
  domesticResilience?: number;
}

export interface DecisionChoice {
  id: 'A' | 'B' | 'C';
  title: string;
  description: string;
  impactLabels: string[];
  risk: string;
  metrics: MetricDelta;
  trajectory: TrajectoryDelta;
  consequence: {
    headline: string;
    body: string;
  };
}

export interface DecisionNode {
  id: string;
  chapter: number;
  characterId: string;
  characterName: string;
  decisionTitle: string;
  context: string;
  question: string;
  critical: boolean;
  heroImage: string;
  choices: DecisionChoice[];
}

export interface Chapter {
  number: number;
  name: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  decisions: DecisionNode[];
}

// ============================================================
// CHAPTER 1: THE LONG DRIFT — January 2029
// ============================================================

const chapter1: Chapter = {
  number: 1,
  name: 'The Long Drift',
  subtitle: 'January 2029',
  description:
    "Three years into 'managed decline.' A crisis in the South China Sea forces the first real test of allied cohesion. Three protagonists face defining choices about commitment, risk, and strategic priorities.",
  backgroundImage: '/assets/page_nine_south_china_sea_crisis.webp',
  decisions: [
    {
      id: '1.1',
      chapter: 1,
      characterId: 'sarah_chen',
      characterName: 'Sarah Chen',
      decisionTitle: 'Philippines Crisis Response',
      context:
        "IMMEDIATE: Chinese Coast Guard vessels have blocked Philippines resupply to Second Thomas Shoal for 48 hours. Manila formally invoked the US-Philippines Mutual Defense Treaty 2 hours ago.\n\nALLIED POSTURE: Japan and Australia are monitoring closely, awaiting US coordination. Both have assets that could be deployed within 24 hours, but won't move without American leadership.\n\nINTELLIGENCE ASSESSMENT: Beijing is testing whether US commitment to treaty allies remains credible after three years of strategic drift. Allied capitals are watching this as the defining moment.",
      question: 'What response do you recommend to the National Security Advisor?',
      critical: false,
      heroImage: '/assets/page_nine_south_china_sea_crisis.webp',
      choices: [
        {
          id: 'A',
          title: 'Aggressive Counter-Offer',
          description:
            "Recommend US provide immediate $5B infrastructure package to Philippines. Deploy naval assets for 'freedom of navigation' within 48 hours. Signal strong commitment, deter further Chinese action.",
          impactLabels: ['Alliance Trust +20', 'Fiscal Health −15', 'Domestic Support −10'],
          risk: "Congressional backlash, 'forever wars' narrative",
          metrics: { allianceTrust: 20, domesticResilience: -10 },
          trajectory: { alliance_path: 9, escalation_path: 3 },
          consequence: {
            headline: '48 Hours Later — Full Commitment',
            body: "Japan and Australia immediately pledge coordinated response. Philippine President publicly thanks US for 'unwavering commitment.' Beijing labels US a 'destabilizing force' but vessels begin gradual withdrawal. PLA Navy conducts an 'unrelated training exercise' 200 miles away. Congressional leaders question the $5B package, but allies take note.",
          },
        },
        {
          id: 'B',
          title: 'Japan-Led Coalition',
          description:
            'Encourage Japan-Australia-led response with US coordination role. Multilateral burden-sharing, builds allied self-reliance. Slower but more sustainable approach to regional security.',
          impactLabels: ['Alliance Trust +10', 'Multilateral Cohesion +15', 'Tech Advantage −5'],
          risk: 'Slower response, China moves first',
          metrics: { allianceTrust: 10, strategicCoherence: 15, techEdge: -5 },
          trajectory: { alliance_path: 6, tech_path: -3 },
          consequence: {
            headline: '72 Hours Later — Multilateral Coordination',
            body: "Allies appreciate the burden-sharing approach. Japan takes visible leadership. QUAD framework strengthened. New trilateral coordination mechanism established. Chinese vessels withdraw after 72 hours. Beijing claims 'voluntary completion of training mission.' The coordination takes longer than a unilateral response — but it holds.",
          },
        },
        {
          id: 'C',
          title: 'Strategic Restraint',
          description:
            'Diplomatic protest and economic pressure, but preserve resources for AI/tech competition. Signal priorities lie in long-term strategic advantage, not every regional dispute. Let Philippines handle locally.',
          impactLabels: ['Alliance Trust −25', 'Tech Advantage +15', 'Fiscal Health +10'],
          risk: 'Philippines drifts toward China, allies hedge',
          metrics: { allianceTrust: -25, techEdge: 15, domesticResilience: 10 },
          trajectory: { alliance_path: -9, tech_path: 6, restraint_path: 9 },
          consequence: {
            headline: '96 Hours Later — Consequences of Inaction',
            body: "Philippine President publicly questions US treaty commitment. Within 48 hours, three Asian capitals quietly reach out to Beijing about bilateral arrangements. Beijing celebrates 'successful assertion of sovereignty.' The anticipatory compliance you feared is becoming reality. Resources are preserved — but at a cost that may prove irreversible.",
          },
        },
      ],
    },
    {
      id: '1.2',
      chapter: 1,
      characterId: 'maya_patel',
      characterName: 'Dr. Maya Patel',
      decisionTitle: 'AI Model Licensing to Allies',
      context:
        "The board is split on licensing Sentinel-7 — Sentinel AI's most advanced model — to Five Eyes allies. Investors worry about IP leakage and competitive erosion. Allies argue that a fragmented AI ecosystem weakens collective deterrence. You have the deciding vote.",
      question: 'How do you vote on the licensing proposal?',
      critical: false,
      heroImage: '/assets/sf_hq_interior.webp',
      choices: [
        {
          id: 'A',
          title: 'License Broadly',
          description:
            'Share Sentinel-7 with all Five Eyes allies. Build a shared AI ecosystem. Strengthen interoperability and collective capability at the cost of some competitive edge.',
          impactLabels: ['Alliance Trust +15', 'Tech Edge −10'],
          risk: 'IP diffusion, reduced proprietary advantage',
          metrics: { allianceTrust: 15, techEdge: -10 },
          trajectory: { alliance_path: 4, tech_path: -2 },
          consequence: {
            headline: 'Sentinel-7 Goes Allied',
            body: 'The licensing deal closes within a week. British GCHQ and Australian Signals Directorate integrate Sentinel-7 within months. The allied AI ecosystem strengthens. Investors are nervous — stock dips 6% — but three new government contracts materialize from partners who now trust the platform.',
          },
        },
        {
          id: 'B',
          title: 'US-Only',
          description:
            'Maintain exclusive US access. Protect IP and competitive edge. Allies must develop their own systems or use degraded versions.',
          impactLabels: ['Alliance Trust −20', 'Tech Edge +20'],
          risk: 'Allies develop competing platforms, fragmentation accelerates',
          metrics: { allianceTrust: -20, techEdge: 20 },
          trajectory: { alliance_path: -4, tech_path: 6, restraint_path: 2 },
          consequence: {
            headline: 'Silicon Valley Keeps Its Edge',
            body: "The board is relieved. Stock climbs 8%. But within 60 days, UK and Australia announce a joint AI development program with European partners. The allied AI ecosystem is fragmenting. Sentinel AI leads — but it leads alone. And 'alone' in AI, Maya is beginning to understand, may not be enough.",
          },
        },
        {
          id: 'C',
          title: 'Allied AI Consortium',
          description:
            'Propose a joint development framework — shared governance, shared IP, shared breakthroughs. Slower, more complex, but builds something durable.',
          impactLabels: ['Alliance Trust +20', 'Tech Edge −5', 'Strategic Coherence +15'],
          risk: 'Coordination overhead, governance disputes',
          metrics: { allianceTrust: 20, techEdge: -5, strategicCoherence: 15 },
          trajectory: { alliance_path: 6 },
          consequence: {
            headline: 'Building Something Together',
            body: "The consortium proposal surprises everyone. Six allied AI labs agree within two months. It's slower — governance meetings, IP disputes, competing national interests. But something genuine is forming: a shared technical standard, a common security framework, a reason for allies to stay aligned not because they're told to, but because they've built something together.",
          },
        },
      ],
    },
    {
      id: '1.3',
      chapter: 1,
      characterId: 'james_nakamura',
      characterName: 'James Nakamura',
      decisionTitle: 'Chinese Contract vs. AUKUS Partnership',
      context:
        "A Chinese state-linked firm is offering $2 billion for Kōdo Robotics' next-generation autonomous systems. The deal would open the Chinese market and secure the company for a decade. Simultaneously, the AUKUS trilateral partnership has invited Kōdo to join its industrial base — access to classified technology, allied defense contracts, and a seat at the table shaping the Indo-Pacific's military architecture. One choice forecloses the other permanently.",
      question: "What is Kōdo Robotics' strategic direction?",
      critical: true,
      heroImage: '/assets/tokyo_robotics_factory.webp',
      choices: [
        {
          id: 'A',
          title: 'Accept Chinese Contract',
          description:
            "$2 billion guaranteed. Chinese market access for next decade. Company's financial future secured. But AUKUS door closes permanently.",
          impactLabels: ['Alliance Trust −20', 'Tech Edge −10'],
          risk: 'AUKUS foreclosed, technology transfer to adversary, reputational damage with allies',
          metrics: { allianceTrust: -20, techEdge: -10 },
          trajectory: { alliance_path: -9, restraint_path: 6 },
          consequence: {
            headline: 'The Chinese Deal Closes',
            body: "The $2B contract signs in Tokyo on a gray Tuesday. James's board celebrates. His government contact stops returning calls. Within a week, the Defense Ministry quietly removes Kōdo from the preferred supplier list. The AUKUS door closes. His father built this company for Japan — James wonders, watching the wire transfer confirmation, what his father would have said.",
          },
        },
        {
          id: 'B',
          title: 'Commit to AUKUS',
          description:
            "Decline the Chinese contract. Join the AUKUS industrial base. Access to classified allied technology, long-term defense contracts, and a role in shaping the region's security architecture.",
          impactLabels: ['Alliance Trust +25', 'Tech Edge +15', 'Strategic Coherence +20'],
          risk: 'Chinese market lost, short-term financial pressure, political controversy in Japan',
          metrics: { allianceTrust: 25, techEdge: 15, strategicCoherence: 20 },
          trajectory: { alliance_path: 9, tech_path: 6, escalation_path: 3 },
          consequence: {
            headline: "All In on the Alliance",
            body: "The Chinese delegation leaves without a deal. James's CFO requests an emergency board meeting. The next three months are difficult — margins tighten, the press asks questions, a Diet member makes a speech. But then the AUKUS contracts begin arriving. Not $2B all at once — but a stream of work that builds something more durable: a company at the center of allied defense, not just a supplier.",
          },
        },
        {
          id: 'C',
          title: 'Delay Decision',
          description:
            'Request 90 days to conduct due diligence. Maintain optionality while both sides wait.',
          impactLabels: ['Alliance Trust −10', 'Strategic Coherence −20'],
          risk: 'Both parties lose patience, Kōdo loses credibility with both sides',
          metrics: { allianceTrust: -10, strategicCoherence: -20 },
          trajectory: { alliance_path: -6, restraint_path: 3 },
          consequence: {
            headline: 'The Cost of Indecision',
            body: "The Chinese delegation grants 30 days — then walks. The AUKUS partners note the hesitation and reduce their offer. By the time James makes a decision, the moment has passed. Both sides have found alternatives. Kōdo Robotics remains independent — but diminished. In geopolitics, James is learning, a delayed 'no' and a delayed 'yes' can both become the same thing: nothing.",
          },
        },
      ],
    },
  ],
};

// ============================================================
// CHAPTER 2: ANTICIPATORY COMPLIANCE — March 2029
// ============================================================

const chapter2: Chapter = {
  number: 2,
  name: 'Anticipatory Compliance',
  subtitle: 'March 2029',
  description:
    "China wins without fighting — through 'anticipatory compliance.' Allies self-censor and accommodate to avoid economic retaliation. Three protagonists face choices about whether to push back, accommodate, or find a third way.",
  backgroundImage: '/assets/beijing_ministry_office.webp',
  decisions: [
    {
      id: '2.1',
      chapter: 2,
      characterId: 'li_jian',
      characterName: 'Li Jian',
      decisionTitle: 'Digital Silk Road AI Deployment',
      context:
        "The Central Committee has issued a directive: accelerate deployment of AI surveillance infrastructure to Southeast Asian partner nations as part of the Digital Silk Road initiative. The systems include facial recognition, social media monitoring, and predictive policing tools. A deputy warns privately that Western sanctions are likely if deployment proceeds on the announced timeline. Your daughter called again last night from Cambridge. She didn't ask about work.",
      question: 'What do you recommend to the Central Committee?',
      critical: false,
      heroImage: '/assets/beijing_ministry_office.webp',
      choices: [
        {
          id: 'A',
          title: 'Full Acceleration',
          description:
            'Execute the directive on schedule. Demonstrate party loyalty. The geopolitical competition requires decisive action, and hesitation signals weakness.',
          impactLabels: ['Escalation +6', 'Party Standing Maintained'],
          risk: 'Western sanctions, international condemnation, daughter at risk',
          metrics: {},
          trajectory: { escalation_path: 6 },
          consequence: {
            headline: 'The Directive Executes',
            body: "Deployment proceeds on schedule. Three Southeast Asian capitals receive the systems within 60 days. The Central Committee notes Li Jian's compliance favorably. Western intelligence services begin mapping the network. Two EU ambassadors request urgent meetings with their Chinese counterparts. Li Jian's daughter stops mentioning Cambridge in her calls. He notices she's choosing her words more carefully.",
          },
        },
        {
          id: 'B',
          title: 'Technical Delays',
          description:
            "Slow-walk the deployment, citing testing requirements and 'technical challenges.' Buy time for Western pressure to build without directly defying the directive.",
          impactLabels: ['Restraint +4', 'Reduced Tensions'],
          risk: 'Party suspicion, career risk if delays are identified as deliberate',
          metrics: {},
          trajectory: { restraint_path: 4 },
          consequence: {
            headline: 'Systems Pending Validation',
            body: "The technical delay report goes up the chain. Hardliners in the committee push back — but Li Jian's reputation for competence buys him six weeks. The Western intelligence services note the delay with cautious interest. Nothing is resolved. But sometimes six weeks is everything. His daughter calls on a Tuesday evening, and for the first time in months, they talk about something other than the weather.",
          },
        },
        {
          id: 'C',
          title: 'Civilian-Only Version',
          description:
            "Propose a modified deployment: economic infrastructure only. Strip surveillance components. Offer the partner nations a version that builds goodwill without triggering Western sanctions or endangering dissidents.",
          impactLabels: ['Tech Path +2', 'Restraint +2'],
          risk: 'Seen as weak by hardliners, partial compliance dissatisfies both sides',
          metrics: {},
          trajectory: { tech_path: 2, restraint_path: 2 },
          consequence: {
            headline: 'A Compromise Nobody Loves',
            body: "The civilian-only proposal is accepted — reluctantly. Hardliners in the committee call it 'incomplete.' Western observers call it 'a step.' Li Jian calls it the best outcome available in an impossible situation. The partner nations receive economic infrastructure without surveillance. It is not enough to satisfy anyone. But it is enough to prevent the worst. For now.",
          },
        },
      ],
    },
    {
      id: '2.2',
      chapter: 2,
      characterId: 'anna_karlsson',
      characterName: 'Anna Karlsson',
      decisionTitle: 'Chinese 5G Infrastructure Exclusion',
      context:
        "Sweden's government is debating whether to exclude Chinese telecommunications equipment from its national 5G infrastructure. The military case is clear: Chinese-manufactured equipment creates surveillance vulnerabilities in sensitive communications networks. But politicians are warning about economic retaliation — $4B in bilateral trade, supply chains for Swedish manufacturers, and Beijing's demonstrated willingness to punish perceived slights. As Sweden's newly joined NATO, your position carries weight in Brussels.",
      question: 'What position should Sweden advocate in NATO consultation?',
      critical: false,
      heroImage: '/assets/stockholm_planning_office.webp',
      choices: [
        {
          id: 'A',
          title: 'Full Exclusion',
          description:
            'Advocate for complete exclusion of Chinese equipment from all critical infrastructure. National security overrides economic considerations. Set a clear precedent.',
          impactLabels: ['Alliance Trust +20', 'Security Improved'],
          risk: 'Chinese economic retaliation, trade disruption',
          metrics: { allianceTrust: 20 },
          trajectory: { alliance_path: 6 },
          consequence: {
            headline: 'The Security Override',
            body: "Sweden becomes the first NATO member to implement full 5G exclusion with explicit national security justification. Beijing protests. Swedish exports to China drop 18% over the following quarter. But five other NATO members quietly begin their own exclusion reviews. Sometimes one country has to go first. Anna knew that. She didn't know it would feel this way.",
          },
        },
        {
          id: 'B',
          title: 'Hybrid Approach',
          description:
            'Allow Chinese equipment in civilian networks; mandate Western equipment in military and sensitive government networks. Preserve trade relationships while protecting the most critical systems.',
          impactLabels: ['Alliance Trust −5', 'Economic Balance Maintained'],
          risk: 'Security seams between civilian/military networks, vulnerable to exploitation',
          metrics: { allianceTrust: -5 },
          trajectory: { restraint_path: 4 },
          consequence: {
            headline: 'Managing Both Sides',
            body: "The hybrid approach satisfies the politicians. Trade relations hold. But NATO's technical staff quietly flags the 'seam problem' — the boundary between civilian and military networks is not as clean as the policy assumes. Anna files the assessment. She knows it will sit in an inbox. Sometimes the compromise everyone accepts is the one that fails slowly.",
          },
        },
        {
          id: 'C',
          title: 'Nordic Coalition',
          description:
            'Coordinate with Norway, Finland, and Denmark to implement collective exclusion. Shared burden, shared risk, and a multilateral precedent that is harder for Beijing to punish.',
          impactLabels: ['Alliance Trust +20', 'Strategic Coherence +20'],
          risk: 'Coordination delays, not all Nordic partners may agree',
          metrics: { allianceTrust: 20, strategicCoherence: 20 },
          trajectory: { alliance_path: 8 },
          consequence: {
            headline: 'The Nordic Framework',
            body: "Norway and Finland agree immediately. Denmark takes three weeks. But the Nordic 5G Framework becomes the template. Within six months, the Baltic states adopt a similar approach. Beijing cannot punish four countries simultaneously without consequences it's not prepared to accept. Anna watches the map change on the Stockholm planning screen and thinks: this is how it actually works.",
          },
        },
      ],
    },
    {
      id: '2.3',
      chapter: 2,
      characterId: 'sarah_chen',
      characterName: 'Sarah Chen',
      decisionTitle: 'Allied Self-Censorship Response',
      context:
        "Intelligence has confirmed what you suspected: three major European allies are actively self-censoring on Xinjiang, Hong Kong, and Taiwan in bilateral communications with Beijing — not because China asked them to, but because they're anticipating economic retaliation. 'Anticipatory compliance' is hollowing out the Western position without Beijing having to do anything. The President has asked for your recommendation on how to respond.",
      question: 'How should the President respond to allied self-censorship?',
      critical: false,
      heroImage: '/assets/situation_room_interior.webp',
      choices: [
        {
          id: 'A',
          title: 'Public Pressure',
          description:
            "Name and shame: publicly call out allies who are self-censoring. Demand alignment. Make the cost of accommodation visible.",
          impactLabels: ['Alliance Trust −15', 'Values Statement Made'],
          risk: 'Anti-American resentment, allies dig in, public fracture of Western front',
          metrics: { allianceTrust: -15 },
          trajectory: { escalation_path: 2 },
          consequence: {
            headline: 'Naming Names',
            body: "The President's statement names no countries directly — but the inference is clear. European capitals react with public umbrage and private acknowledgment. The self-censorship continues. But three ambassadors request private meetings. The message landed — just not the way it was intended. Some things can only be fixed quietly. Public pressure buys headlines but rarely changes behavior.",
          },
        },
        {
          id: 'B',
          title: 'Quiet Diplomacy',
          description:
            'Private conversations. Economic incentives. Make it easier for allies to hold firm by reducing the cost of doing so.',
          impactLabels: ['Alliance Trust +5', 'Relationships Preserved'],
          risk: 'Continued drift, no structural change, allies learn accommodation has no cost',
          metrics: { allianceTrust: 5 },
          trajectory: { restraint_path: 6 },
          consequence: {
            headline: 'The Patient Approach',
            body: "Three rounds of private meetings yield modest commitments. One ally agrees to restore language on Xinjiang in bilateral communiqués. Two others promise to 'reconsider their posture.' The self-censorship doesn't stop — but it slows. Sarah knows this is the kind of progress that takes years to accumulate and can be erased in a week. She takes it anyway.",
          },
        },
        {
          id: 'C',
          title: 'Economic Alternative',
          description:
            'Offer allies a competing trade framework that reduces their economic dependence on China. Make holding firm against Beijing economically viable, not just morally correct.',
          impactLabels: ['Alliance Trust +15', 'Strategic Coherence +20'],
          risk: 'Expensive, requires Congressional support, long-term commitment',
          metrics: { allianceTrust: 15, strategicCoherence: 20 },
          trajectory: { alliance_path: 6 },
          consequence: {
            headline: 'Changing the Calculus',
            body: "The trade framework proposal goes to Congress as the 'Allied Economic Security Act.' It takes six months to pass and emerges smaller than Sarah hoped. But it's real. Three European allies that had been quietly accommodating Beijing begin to recalibrate. The self-censorship hasn't ended — but for the first time, holding firm has a price tag attached that America is willing to pay.",
          },
        },
      ],
    },
  ],
};

// ============================================================
// CHAPTER 3: THE MANILA INCIDENT — May 2029 — CRITICAL
// ============================================================

const chapter3: Chapter = {
  number: 3,
  name: 'The Manila Incident',
  subtitle: 'May 2029 — CRITICAL BRANCHING POINT',
  description:
    'First genuine crisis. Chinese water cannons damage a Philippine Coast Guard vessel. All five protagonists must decide simultaneously. Their choices determine whether alliance coordination succeeds or fractures.',
  backgroundImage: '/assets/maritime_escalation_backplate.webp',
  decisions: [
    {
      id: '3.1',
      chapter: 3,
      characterId: 'sarah_chen',
      characterName: 'Sarah Chen',
      decisionTitle: 'Crisis Action — Military Transit',
      context:
        "FLASH TRAFFIC: Chinese water cannons have damaged a Philippine Coast Guard vessel at Second Thomas Shoal. Three Filipino sailors are injured. The Philippine President has invoked the Mutual Defense Treaty and is requesting immediate US military assistance. The Crisis Action Group convenes in 20 minutes. This is the test everyone knew was coming.",
      question: 'What action do you recommend to the President?',
      critical: true,
      heroImage: '/assets/emergency_briefing_room_backplate.webp',
      choices: [
        {
          id: 'A',
          title: 'Military Transit with Allies',
          description:
            'Recommend coordinated allied naval operation — US, Japanese, and Australian vessels escort Philippine resupply in a show of collective force. Signal that treaty commitments are real.',
          impactLabels: ['Alliance Trust +30', 'Strategic Coherence +20'],
          risk: 'Military confrontation, risk of miscalculation, escalation ladder',
          metrics: { allianceTrust: 30, strategicCoherence: 20 },
          trajectory: { alliance_path: 12, escalation_path: 8 },
          consequence: {
            headline: 'The Fleet Moves',
            body: "USS John McCain and two allied destroyers enter the South China Sea within 18 hours. The Philippine resupply proceeds under escort. Chinese vessels shadow but do not interfere. Manila calls it 'the moment the alliance proved itself.' Beijing calls it 'provocative.' The world calls it the first direct allied military coordination in the region in a decade. The escalation ladder is live — but the alliance held.",
          },
        },
        {
          id: 'B',
          title: 'Diplomatic Resolution',
          description:
            'Push for emergency UN Security Council session. International pressure, not military assets. Avoid direct confrontation while building multilateral legitimacy.',
          impactLabels: ['Alliance Trust −20', 'Escalation Avoided'],
          risk: "Seen as weak, China vetoes UNSC, allies conclude US won't act",
          metrics: { allianceTrust: -20, strategicCoherence: -15 },
          trajectory: { alliance_path: -12, restraint_path: 12 },
          consequence: {
            headline: 'The UN Gambit',
            body: "China vetoes the UNSC resolution within four hours. The diplomatic track collapses publicly. Manila is silent for 48 hours, then announces 'direct talks' with Beijing. Japan's defense ministry calls with a question, not a statement: 'What does this mean for our own alliance commitments?' Sarah doesn't have a good answer. Sometimes the diplomatic option is the right choice. This wasn't the time.",
          },
        },
        {
          id: 'C',
          title: 'Economic Pressure Campaign',
          description:
            'Deploy sanctions and financial restrictions — target Chinese entities involved in the blockade. Non-military response preserves escalation firewall while imposing costs.',
          impactLabels: ['Tech Edge +10', 'Escalation Contained'],
          risk: 'Retaliation against US businesses in China, seen as inadequate by allies',
          metrics: { techEdge: 10 },
          trajectory: { tech_path: 2, restraint_path: 4 },
          consequence: {
            headline: 'The Sanctions Play',
            body: "Treasury designates seven Chinese entities. Markets respond. Beijing retaliates with import restrictions on American agricultural exports. The injured Filipino sailors are still in hospital when the press conference announcing the sanctions happens. Manila's foreign minister says only: 'We appreciate all expressions of support.' The restraint communicates something. Not everyone hears it as strength.",
          },
        },
      ],
    },
    {
      id: '3.2',
      chapter: 3,
      characterId: 'james_nakamura',
      characterName: 'James Nakamura',
      decisionTitle: 'Emergency Defense Production',
      context:
        "Japan's Defense Ministry has made an emergency request: accelerate delivery of Kōdo Robotics' autonomous maritime surveillance drones for Japan Coast Guard deployment within 72 hours. The catch: fulfilling this request requires breaking three existing commercial contracts with South Korean and Taiwanese clients — triggering penalty clauses and potential litigation. His father's voice is in his head: 'A Japanese company keeps its word.' But Japan may need those drones.",
      question: 'Do you prioritize national defense over commercial commitments?',
      critical: true,
      heroImage: '/assets/tokyo_robotics_factory.webp',
      choices: [
        {
          id: 'A',
          title: 'Defense Priority',
          description:
            'Break the commercial contracts. Accept the lawsuits. Deliver the drones to Japan Coast Guard in 72 hours. National security comes first.',
          impactLabels: ['Alliance Trust +20', 'Strategic Coherence +25'],
          risk: 'Commercial lawsuits, damaged business reputation, potential precedent',
          metrics: { allianceTrust: 20, strategicCoherence: 25 },
          trajectory: { alliance_path: 9, escalation_path: 3 },
          consequence: {
            headline: 'The Drones Fly',
            body: "Kōdo Robotics delivers 24 autonomous surveillance drones to Japan Coast Guard within 68 hours. South Korean client files for arbitration. Taiwanese client requests an emergency meeting. The Japan Defense Ministry issues a statement praising Kōdo as 'a company that understands its obligations.' James's father would have hated breaking a contract. James thinks he would have understood why.",
          },
        },
        {
          id: 'B',
          title: 'Honor Contracts',
          description:
            'Maintain commercial commitments. Offer Defense Ministry a revised timeline of 3 weeks. Business integrity matters — breaking contracts damages trust with all clients, including future defense clients.',
          impactLabels: ['Alliance Trust −25', 'Business Integrity Preserved'],
          risk: "Defense Ministry disappointed, Japan's Coast Guard under-equipped during crisis",
          metrics: { allianceTrust: -25 },
          trajectory: { alliance_path: -9, restraint_path: 6 },
          consequence: {
            headline: 'A Contract Kept',
            body: "Kōdo Robotics holds to its commitments. The South Korean and Taiwanese clients are relieved. Japan's Coast Guard deploys older equipment during the crisis. The Defense Ministry contact goes quiet. A month later, James learns the ministry awarded a major surveillance contract to a competitor. Business integrity has a price — he paid it, and he is still not sure if that was the right call.",
          },
        },
        {
          id: 'C',
          title: 'Split Production',
          description:
            'Attempt to satisfy both — partial delivery to Defense Ministry, negotiate delay with commercial clients. Try to serve everyone without fully serving anyone.',
          impactLabels: ['Alliance Trust −10', 'Strategic Coherence −15'],
          risk: 'Quality concerns, neither client satisfied, legal and operational exposure',
          metrics: { allianceTrust: -10, strategicCoherence: -15 },
          trajectory: { restraint_path: 3 },
          consequence: {
            headline: 'Half Measures',
            body: "Twelve drones go to Defense Ministry. Twelve stay on commercial schedule. Both clients complain. The drones delivered to Japan Coast Guard have integration issues from the accelerated timeline. A commercial client threatens litigation anyway. In trying to satisfy everyone, Kōdo has satisfied no one. James spends a week on calls explaining decisions that satisfied neither his conscience nor his customers.",
          },
        },
      ],
    },
    {
      id: '3.3',
      chapter: 3,
      characterId: 'li_jian',
      characterName: 'Li Jian',
      decisionTitle: 'Surveillance Deployment Choice — Defining Moment',
      context:
        "DEFINING MOMENT: The Party has issued a classified directive ordering Li Jian to personally authorize the deployment of AI surveillance infrastructure targeting Filipino officials and activists during the crisis. The directive frames it as 'intelligence support operations.' Li Jian knows the systems will be used to identify and track pro-Western voices in the Philippines. His daughter called this morning from Cambridge — she didn't ask questions. But he heard something in her voice he recognized: she knows something is wrong.",
      question: 'Do you comply, sabotage, or resign?',
      critical: true,
      heroImage: '/assets/beijing_ministry_office.webp',
      choices: [
        {
          id: 'A',
          title: 'Comply Fully',
          description:
            'Execute the directive. Demonstrate loyalty. This is what the Party requires, and Li Jian has spent a career understanding that individual conscience has limits.',
          impactLabels: ['Party Loyalty Maintained', 'Escalation +12'],
          risk: "Daughter's safety if discovered, war crimes implications, personal moral cost",
          metrics: {},
          trajectory: { escalation_path: 12 },
          consequence: {
            headline: 'The Directive Executes',
            body: "The deployment proceeds. Fourteen Filipino activists are identified within the week. Li Jian files his report. The Central Committee notes his compliance. That night, his daughter calls and doesn't say anything for a long moment before asking about his health. He knows she knows. He answers her question about his health. He does not answer the question she didn't ask.",
          },
        },
        {
          id: 'B',
          title: 'Technical "Malfunction"',
          description:
            "Engineer a system failure — the AI surveillance deployment 'malfunctions' before it can be used operationally. Deniable. Risky. But it stops the deployment without a direct refusal.",
          impactLabels: ['Alliance Path +6', 'Escalation −8'],
          risk: 'If discovered, career over — or worse. Requires convincing technical cover story.',
          metrics: {},
          trajectory: { alliance_path: 6, escalation_path: -8 },
          consequence: {
            headline: 'System Failure — Classified',
            body: "The deployment fails due to 'incompatible encryption protocols' in the field infrastructure. Li Jian's technical team files a three-page report explaining the failure in impenetrable detail. The hardliners are frustrated but accept the explanation. His daughter calls on Thursday. They talk for an hour about her research. For the first time in months, he sleeps without the television on.",
          },
        },
        {
          id: 'C',
          title: 'Resign Position',
          description:
            "Submit formal resignation, citing 'health concerns.' A public refusal would be dangerous — but walking away withdraws Li Jian from the mechanism entirely. Moral clarity at maximum personal cost.",
          impactLabels: ['Alliance Path +9', 'Escalation −8'],
          risk: 'Suspicious circumstances, family at risk, loss of all influence over outcomes',
          metrics: {},
          trajectory: { alliance_path: 9, escalation_path: -8 },
          consequence: {
            headline: 'The Resignation',
            body: "Li Jian submits resignation citing 'health concerns' on a Friday afternoon. By Monday, state media has already moved on. He is gone before anyone notices he left. His daughter flies home from Cambridge within the week. They do not discuss why. Three months later, a Guardian journalist publishes a story about AI surveillance in Southeast Asia. Li Jian's name does not appear. But the story uses details that could only have come from someone who was there.",
          },
        },
      ],
    },
    {
      id: '3.4',
      chapter: 3,
      characterId: 'anna_karlsson',
      characterName: 'Anna Karlsson',
      decisionTitle: 'NATO Article 4 Consultation',
      context:
        "Three NATO members have invoked Article 4 — requesting consultation over the South China Sea crisis. The question before the alliance is fundamental: is the Indo-Pacific NATO's concern? As Sweden's military representative and the newest NATO member state, Anna's position carries symbolic weight. She can invoke collective solidarity and broaden NATO's scope — or argue for regional focus and preserve NATO's traditional theater. Either choice sets a precedent.",
      question: 'What position should Sweden advocate?',
      critical: false,
      heroImage: '/assets/stockholm_planning_office.webp',
      choices: [
        {
          id: 'A',
          title: 'NATO Solidarity',
          description:
            'Invoke collective security broadly. Argue that the Indo-Pacific crisis is a NATO concern because democracies are democracies everywhere, and a threat to one is a threat to all.',
          impactLabels: ['Alliance Trust +25'],
          risk: 'Overextension, allies divided on scope, Russian and Chinese narrative of encirclement',
          metrics: { allianceTrust: 25 },
          trajectory: { alliance_path: 9, escalation_path: 3 },
          consequence: {
            headline: 'NATO Looks East',
            body: "Sweden's position shifts the room. Seven other members join the solidarity statement. NATO issues a communiqué expressing 'deep concern' about Indo-Pacific stability. Beijing calls it 'hegemonic overreach.' The US thanks Sweden privately. Anna knows she has expanded NATO's scope in ways that will require new doctrine, new resources, new agreements. She files the assessment. The paperwork has barely begun.",
          },
        },
        {
          id: 'B',
          title: 'Regional Focus',
          description:
            "Argue that NATO's mandate remains Baltic, Arctic, and North Atlantic. The South China Sea is a regional problem requiring regional solutions. NATO should not overextend.",
          impactLabels: ['Alliance Trust −10', 'NATO Focus Maintained'],
          risk: "Appears to limit NATO's relevance, US disappointed, Indo-Pacific allies note the hesitation",
          metrics: { allianceTrust: -10 },
          trajectory: { restraint_path: 6 },
          consequence: {
            headline: 'NATO Stays Regional',
            body: "The Article 4 consultation concludes with a narrow statement focused on freedom of navigation 'globally' — a formulation that means different things to different members. Anna's position prevails. NATO remains focused on its traditional theater. Three months later, Japan's defense minister asks, not for the first time, what the alliance actually means for countries that are not members.",
          },
        },
        {
          id: 'C',
          title: 'New Security Pact',
          description:
            "Propose a new democratic security consultation architecture — not NATO expansion, but a parallel framework connecting NATO allies with Indo-Pacific democracies. Something new, rather than forcing the old structure to fit.",
          impactLabels: ['Alliance Trust +20', 'Strategic Coherence +20'],
          risk: 'Institutional complexity, slow to establish, US skeptical of parallel structures',
          metrics: { allianceTrust: 20, strategicCoherence: 20 },
          trajectory: { alliance_path: 9 },
          consequence: {
            headline: 'A New Architecture',
            body: "Sweden proposes the 'Democratic Security Consultation Framework' — a formal mechanism for NATO and Indo-Pacific democracies to share threat assessments and coordinate responses. Japan and Australia respond within 48 hours. The proposal will take two years and three summits to establish. But it exists. And sometimes that's the only way to build something permanent: announce it before it's ready, and then make it real.",
          },
        },
      ],
    },
    {
      id: '3.5',
      chapter: 3,
      characterId: 'maya_patel',
      characterName: 'Dr. Maya Patel',
      decisionTitle: 'Pentagon AI Deployment',
      context:
        "Pentagon emergency request: deploy Sentinel-7, Sentinel AI's most advanced model, to provide real-time threat detection on USS John McCain during South China Sea operations. The ask is real and urgent — Sentinel-7 would provide genuine tactical advantage. But if the vessel is compromised, damaged, or the AI systems captured, Chinese reverse engineering is not a hypothetical. Maya could save lives today and give away tomorrow's advantage. Or protect tomorrow and accept today's risk.",
      question: 'Do you deploy your most advanced AI to active operations?',
      critical: true,
      heroImage: '/assets/sf_hq_interior.webp',
      choices: [
        {
          id: 'A',
          title: 'Full Deployment',
          description:
            "Deploy Sentinel-7 at full capability. America's best AI for America's most critical operation. The mission comes first.",
          impactLabels: ['Alliance Trust +20', 'Tech Edge −15'],
          risk: 'Chinese reverse engineering if systems compromised, catastrophic IP loss',
          metrics: { allianceTrust: 20, techEdge: -15 },
          trajectory: { alliance_path: 6, tech_path: -6, escalation_path: 3 },
          consequence: {
            headline: 'Sentinel-7 Goes to Sea',
            body: "Sentinel-7 deploys to USS John McCain within 36 hours. Its threat detection catches two Chinese drone approaches that standard radar would have logged as background noise. No confrontation occurs. The system performs. Three weeks later, intelligence analysts note that China has acquired logs that match Sentinel-7's detection signatures. Maya isn't certain. But she's no longer uncertain.",
          },
        },
        {
          id: 'B',
          title: 'Degraded Version',
          description:
            'Deploy Sentinel-5 — two generations older, adequate for the mission, but not Sentinel-7. Protect the most advanced IP while still providing meaningful capability.',
          impactLabels: ['Alliance Trust +5', 'Tech Edge −5'],
          risk: "Sentinel-5 may be inadequate for evolving threats, Pentagon frustrated with 'downgrade'",
          metrics: { allianceTrust: 5, techEdge: -5 },
          trajectory: { restraint_path: 2 },
          consequence: {
            headline: 'The Backup Model Ships',
            body: "Sentinel-5 deploys to USS John McCain. Pentagon accepts the decision with professional disappointment. The system performs adequately — it catches two of the three Chinese drone approaches that Sentinel-7 would have detected all three. No confrontation occurs. After the operation, a senior Pentagon official calls Maya to 'discuss next steps.' She knows what they want. She hasn't decided if she'll give it to them.",
          },
        },
        {
          id: 'C',
          title: 'Conditional Deployment',
          description:
            'Deploy Sentinel-7, but with legal and security protocols — restricted data logging, automatic data destruction on compromise, and formal IP agreements. Accept 24-hour setup delay.',
          impactLabels: ['Alliance Trust +10', 'Tech Edge −8', 'Strategic Coherence +15'],
          risk: 'Bureaucratic delay during active crisis, protocols may not be enforceable in combat',
          metrics: { allianceTrust: 10, techEdge: -8, strategicCoherence: 15 },
          trajectory: { alliance_path: 3, tech_path: -3 },
          consequence: {
            headline: 'Protocols in Place',
            body: "Sentinel-7 deploys 28 hours after the request — with a legal agreement that has never been tested in practice and a data destruction protocol that military lawyers spent 18 hours negotiating. The system performs. The protocols hold — mostly. What Maya has done, she realizes, is invent a new category of thing: a corporate AI system with military deployment rules. The lawyers will argue about this for a decade.",
          },
        },
      ],
    },
  ],
};

// ============================================================
// CHAPTERS 5 & 6: THE LONG GAME & WINTER OF CHOICES
// ============================================================

const chapter56: Chapter = {
  number: 5,
  name: 'The Long Game & Winter of Choices',
  subtitle: 'August 2029 — February 2030',
  description:
    'Personal costs become real. Li Jian faces a whistleblower choice. Maya faces Chinese investor pressure. All five protagonists converge at Munich. A Chinese AI breakthrough forces a final strategic decision.',
  backgroundImage: '/assets/diplomatic_fallout_backplate.webp',
  decisions: [
    {
      id: '5.1',
      chapter: 5,
      characterId: 'li_jian',
      characterName: 'Li Jian',
      decisionTitle: 'Whistleblower Choice',
      context:
        "A Guardian journalist has contacted Li Jian through an encrypted channel. They know about AI surveillance deployments targeting dissidents in three countries. They know about the targeting lists. They are going to publish — the only question is whether Li Jian will go on record, confirm off-record and guide to additional sources, or decline entirely. His daughter's research fellowship at Cambridge is conditional on her good standing. She doesn't know he's making this decision.",
      question: 'Do you confirm allegations to the journalist?',
      critical: true,
      heroImage: '/assets/beijing_ministry_office.webp',
      choices: [
        {
          id: 'A',
          title: 'Full Disclosure',
          description:
            'Go on record. Provide documentation. Accept the consequences — for career, for family, for everything built over decades. Some things matter more.',
          impactLabels: ['Alliance Path +6', 'Escalation +3'],
          risk: "Career destroyed, family at risk, possible criminal charges under China's secrecy laws",
          metrics: {},
          trajectory: { alliance_path: 6, escalation_path: 3 },
          consequence: {
            headline: 'The Record',
            body: "Li Jian goes on record under a pseudonym, with documentation. The story publishes three weeks later. It is the most-read Guardian investigation in two years. Beijing issues a denial and begins an internal investigation for the leak. Li Jian's daughter calls from Cambridge the morning the story publishes. She doesn't mention the article. She says: 'I'm proud of you, Baba.' He doesn't ask how she knows.",
          },
        },
        {
          id: 'B',
          title: 'Background Only',
          description:
            'Confirm off the record. Guide the journalist to other sources. Stay in the system with deniability. It is not everything — but it is something.',
          impactLabels: ['Alliance Path +3'],
          risk: 'Limited impact, moral compromise, leak may be traced back anyway',
          metrics: {},
          trajectory: { alliance_path: 3 },
          consequence: {
            headline: 'Off the Record',
            body: "Li Jian confirms two details off the record and points the journalist toward three documents available in semi-public archives. The story publishes. It is less detailed than it would have been with full disclosure — but it is real. Beijing's internal investigation finds nothing traceable to Li Jian. He remains in his position. He reads the story twice. He thinks about what he didn't say. He is not sure whether that makes him complicit or careful.",
          },
        },
        {
          id: 'C',
          title: 'Decline',
          description:
            "Protect family. Refuse participation. The story will publish without him — he cannot stop it. But he can protect the people who didn't choose this.",
          impactLabels: ['Restraint +3'],
          risk: 'Story publishes anyway with less accuracy, no moral clarity, opportunity lost',
          metrics: {},
          trajectory: { restraint_path: 3 },
          consequence: {
            headline: 'Silence',
            body: "Li Jian declines. The story publishes two weeks later — thinner, less documented, easier to dismiss. Beijing issues a statement calling it 'fabricated propaganda.' His daughter calls on a Sunday morning. They talk about her research. She doesn't mention the story. He doesn't mention his decision. There are things that pass between parents and children without words. He is not certain what she knows. He is certain she is safe.",
          },
        },
      ],
    },
    {
      id: '5.2',
      chapter: 5,
      characterId: 'maya_patel',
      characterName: 'Dr. Maya Patel',
      decisionTitle: 'Chinese Investor Pressure',
      context:
        "The Chinese sovereign wealth fund that holds an 8% stake in Sentinel AI is demanding a board seat. Refuse, and they've made clear they will dump their position — triggering a stock crash — and fund a competing AI firm with Chinese government backing. Accept, and Sentinel AI gains stability at the cost of independence and the trust of every ally who relies on the company's AI systems remaining free of Chinese influence. The board has punted the decision to Maya.",
      question: 'Do you give Chinese investors board representation?',
      critical: true,
      heroImage: '/assets/sf_hq_interior.webp',
      choices: [
        {
          id: 'A',
          title: 'Accept Board Seat',
          description:
            'Standard corporate practice. Include confidentiality restrictions and recusal provisions. Stabilize the stock. Manage the relationship.',
          impactLabels: ['Tech Edge −25'],
          risk: 'Pentagon reviews all Sentinel AI contracts, allies lose trust, independence compromised',
          metrics: { techEdge: -25 },
          trajectory: { tech_path: -6, restraint_path: 4 },
          consequence: {
            headline: 'The Board Seat Accepted',
            body: "The board seat is granted with a 36-page governance agreement. The stock stabilizes. Pentagon's contract review begins within a week. Three allied governments request briefings on Sentinel AI's data governance. The Chinese board member attends his first meeting and says nothing of consequence. He doesn't need to. Maya watches the room and understands: presence is its own form of influence.",
          },
        },
        {
          id: 'B',
          title: 'Refuse',
          description:
            "Decline the board seat. Accept the financial hit. Maintain independence. If the stock crashes, it crashes — but Sentinel AI remains what it is.",
          impactLabels: ['Tech Edge +10', 'Strategic Coherence +20'],
          risk: "Stock drops 15-20%, funded competitor enters market, short-term pain",
          metrics: { techEdge: 10, strategicCoherence: 20 },
          trajectory: { alliance_path: 6, tech_path: 6 },
          consequence: {
            headline: 'The Refusal',
            body: "Sentinel AI's stock drops 18% in three days. The Chinese fund dumps their position. A Beijing-backed AI competitor announces a $3B funding round the following week. Maya is on CNBC explaining her decision to a skeptical anchor. But three government contracts accelerate. Two allied intelligence services reach out within a month. The short-term cost is real. The long-term positioning may have been worth it. Maya is not certain. She is certain she can live with the decision.",
          },
        },
        {
          id: 'C',
          title: 'Buyback Consortium',
          description:
            'Organize allied institutional investors — pension funds, sovereign wealth funds from democratic allies — to buy out the Chinese stake entirely before the demand escalates.',
          impactLabels: ['Tech Edge +15', 'Alliance Trust +20'],
          risk: 'Complex to execute, requires 30+ days to organize, Chinese fund may dump before buyout completes',
          metrics: { techEdge: 15, allianceTrust: 20 },
          trajectory: { alliance_path: 9, tech_path: 3, escalation_path: 3 },
          consequence: {
            headline: 'The Allied Buyout',
            body: "The buyout consortium takes 34 days and involves seven institutional investors from five allied nations. The Chinese fund exits with a modest return. Sentinel AI emerges with a shareholder base that reads like a map of democratic capitals. The story gets picked up by every major outlet. Maya finds herself explaining 'democratic capital' as a concept in three different languages. It's a good problem to have.",
          },
        },
      ],
    },
    {
      id: '6.1',
      chapter: 6,
      characterId: 'all_five',
      characterName: 'All Five Protagonists',
      decisionTitle: 'Munich Security Conference — The Dinner',
      context:
        "All five protagonists are in Munich for the annual Security Conference. For the first time, all five — Sarah, Maya, James, Li Jian (attending as an 'independent observer' after his resignation), and Anna — are in the same room. A private dinner has been arranged, off the record, no aides, no translators. The opportunity is unprecedented. So is the risk. What happens in this room will not be in the communiqué — but it may be the most consequential conversation of the decade.",
      question: 'How do you approach this unprecedented dinner?',
      critical: false,
      heroImage: '/assets/montage_all_five_characters.webp',
      choices: [
        {
          id: 'A',
          title: 'Candid Private',
          description:
            'No talking points. No performance. Speak vulnerabilities, admit what each country gets wrong, listen without diplomatic filters. Real conversation between people who understand what the stakes actually are.',
          impactLabels: ['Strategic Coherence +20'],
          risk: 'Exposure without reciprocal candor, diplomatic awkwardness, leaks',
          metrics: { strategicCoherence: 20 },
          trajectory: { alliance_path: 6 },
          consequence: {
            headline: 'Five Hours, No Aides',
            body: "The dinner runs five hours. The wine is better than expected. At some point — no one can say exactly when — it stops being a meeting and becomes a conversation. Anna says something about NATO she's never said publicly. James talks about his father. Maya admits she's been wrong about two things she built her career on. Sarah describes the moment she realized drift was irreversible without deliberate choice. Li Jian, who should not be in this room at all, listens more than he speaks. In the morning, nothing has changed. Everything has changed.",
          },
        },
        {
          id: 'B',
          title: 'Formal Exchange',
          description:
            'Professional distance. Talking points. Treat it as a structured diplomatic exchange. Useful, but bounded. Trust has to be earned before it can be given.',
          impactLabels: ['Restraint +2'],
          risk: 'Wasted opportunity, remains performative, no genuine trust built',
          metrics: {},
          trajectory: { restraint_path: 2 },
          consequence: {
            headline: 'A Useful Meeting',
            body: "The dinner is professional and productive. Positions are exchanged, areas of agreement identified, a joint statement drafted by staffers who weren't in the room. The five protagonists leave having accomplished something. But Sarah notices, walking back to her hotel, that she knows no more about any of them than she did before they sat down. The opportunity to build something human passed in the space between talking points.",
          },
        },
        {
          id: 'C',
          title: 'Coordination Channel',
          description:
            "Propose 'The Five' — an informal, encrypted direct communication channel between all five protagonists. Not a treaty, not a protocol. Just five people who can reach each other when the official channels are too slow or too political.",
          impactLabels: ['Strategic Coherence +30'],
          risk: 'Unprecedented, legally ambiguous, outside normal diplomatic structures',
          metrics: { strategicCoherence: 30 },
          trajectory: { alliance_path: 9 },
          consequence: {
            headline: "The Five",
            body: "'The Five' is established on a Thursday evening over dessert and what Anna calls 'diplomatically neutral schnapps.' The channel is encrypted. There are no minutes, no agenda, no formal status. Over the next 18 months, it will be used 23 times — to share intelligence, to warn about domestic political changes, to say things that can't be said through official channels. Three of those 23 conversations will matter enormously. The other twenty will matter too.",
          },
        },
      ],
    },
    {
      id: '6.2',
      chapter: 6,
      characterId: 'all_five',
      characterName: 'All Five Protagonists',
      decisionTitle: 'Chinese AI Breakthrough — The Wildcard',
      context:
        "BREAKING — Munich, Day 2: China's state media announces 'Tianhe-3,' described as a near-AGI system with capabilities exceeding any existing Western AI. Intelligence assessments are divided: 40% probability it's real, 60% probability it's strategic exaggeration designed to trigger a panicked overreaction. The conference ends in 14 hours. The five protagonists must decide how to respond before they leave Munich — because what happens in this room will frame the Western narrative for months.",
      question: "How do you respond to China's claimed breakthrough?",
      critical: true,
      heroImage: '/assets/montage_all_five_characters.webp',
      choices: [
        {
          id: 'A',
          title: 'Allied AI Initiative',
          description:
            "Announce a $20B crash program — pooled allied resources, joint development, shared breakthroughs. Respond to the claim at scale, regardless of whether it's real. Make the real thing happen.",
          impactLabels: ['Tech Edge +25', 'Alliance Trust +30'],
          risk: "Expensive, politically difficult, may be responding to bluff — but if it's real, this is the answer",
          metrics: { techEdge: 25, allianceTrust: 30 },
          trajectory: { alliance_path: 9, tech_path: 9, escalation_path: 3 },
          consequence: {
            headline: 'The Crash Program',
            body: "The Munich AI Initiative announcement comes at 11 PM on the last night of the conference. Six allied governments commit. Sentinel AI is named as the lead architecture firm. Kōdo Robotics joins the hardware consortium. Anna's assessment shapes the security framework. The $20B is not all real money — some is redirected, some is aspirational. But the political signal is unambiguous: the alliance is choosing to compete. Whether Tianhe-3 is real almost doesn't matter anymore.",
          },
        },
        {
          id: 'B',
          title: 'Skeptical Response',
          description:
            "Demand verification. Don't respond to Chinese propaganda with expensive programs. Strategic patience — assess the claim before committing resources.",
          impactLabels: ['Tech Edge −10', 'Restraint +6'],
          risk: "If it's real, you've lost 6-12 months. If it's not, you've saved resources — but appeared hesitant",
          metrics: { techEdge: -10 },
          trajectory: { tech_path: -3, restraint_path: 6 },
          consequence: {
            headline: 'Wait and Verify',
            body: "The Munich communiqué calls for 'a technical assessment committee' to evaluate China's claimed capabilities. Beijing calls it 'a demonstration of Western hesitation.' Intelligence takes three months to assess. The conclusion: Tianhe-3 is real, but overstated — perhaps 60% of the claimed capability. The window for a credible response has not closed. But it has narrowed.",
          },
        },
        {
          id: 'C',
          title: 'Values-Based Competition',
          description:
            "Emphasize what democratic AI offers that authoritarian AI cannot: transparency, accountability, trust. Make the competition about the model, not just the capability.",
          impactLabels: ['Tech Edge +5', 'Alliance Trust +15'],
          risk: 'May seem like rationalization if Tianhe-3 is real and superior, frame not accepted by all allies',
          metrics: { techEdge: 5, allianceTrust: 15 },
          trajectory: { alliance_path: 6, tech_path: 3 },
          consequence: {
            headline: 'The Democratic AI Frame',
            body: "The Munich statement frames the competition not as raw capability but as trustworthiness: 'AI systems that democratic governments can audit and citizens can trust.' It's a genuine distinction — and it lands. Three countries that had been considering Tianhe-3 integration in civilian infrastructure quietly pause their evaluations. The frame doesn't solve everything. But it redefines what 'winning' in AI competition means, in ways that may matter more than any single benchmark.",
          },
        },
      ],
    },
  ],
};

// ============================================================
// EXPORTED CHAPTER LIST AND LOOKUP HELPERS
// ============================================================

export const CHAPTERS: Chapter[] = [chapter1, chapter2, chapter3, chapter56];

export const getChapter = (chapterIndex: number): Chapter | undefined =>
  CHAPTERS[chapterIndex];

export const getDecisionById = (id: string): DecisionNode | undefined => {
  for (const ch of CHAPTERS) {
    const found = ch.decisions.find((d) => d.id === id);
    if (found) return found;
  }
  return undefined;
};

// Decisions from Decision 1.1 that have full narrative consequence panels
export const DECISION_1_1_FULL_CONSEQUENCES = {
  A: {
    title: 'You Chose: Aggressive Counter-Offer',
    subtitle: '48 Hours Later — Full Commitment',
    effects: [
      {
        label: 'Alliance Trust +20',
        value:
          "Japan and Australia immediately pledge coordinated response. Philippine President publicly thanks US for 'unwavering commitment.' Other regional allies take note.",
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
  B: {
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
  C: {
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
          "Resources preserved for AI competition. Sentinel AI receives additional federal funding. DOD accelerates autonomous systems procurement focused on 'high-end' threats.",
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
};
