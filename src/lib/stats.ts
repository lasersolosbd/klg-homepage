// Sourced statistics used in page copy. Verified September 29, 2026. Re-check before reuse
// after early 2027; this area moves quickly. Full source notes live in the project doc
// "klg-nonprofit-ai-stats-2026.md".

export type Stat = {
  id: string;
  figure: string;
  claim: string;
  source: string;
  sourceShort: string;
  url: string;
  date: string;
};

export const STATS = {
  adoptionVsGovernance: {
    id: "adoption-vs-governance",
    figure: "98%",
    claim:
      "of nonprofits use AI in some capacity. Only 61% use it officially, and just 22% have a formal AI risk-management plan.",
    source: 'NTEN & The Bridgespan Group, "2026 State of Nonprofit AI: Adoption and Governance Report" (n=917)',
    sourceShort: "NTEN & Bridgespan, Sept 2026",
    url: "https://www.nten.org/publications/state-of-nonprofit-ai",
    date: "September 2026",
  },
  shadowAi: {
    id: "shadow-ai",
    figure: "53%",
    claim: "of nonprofit staff and executives report using AI tools their organization has not approved.",
    source: 'NTEN & The Bridgespan Group, "2026 State of Nonprofit AI: Adoption and Governance Report" (n=917)',
    sourceShort: "NTEN & Bridgespan, Sept 2026",
    url: "https://www.nten.org/publications/state-of-nonprofit-ai",
    date: "September 2026",
  },
  adoptionVsImpact: {
    id: "adoption-vs-impact",
    figure: "7%",
    claim: "of nonprofits report real strategic impact from AI, even though 92% use it.",
    source: 'Virtuous & Fundraising.AI, "The 2026 Nonprofit AI Adoption Report" (n=346)',
    sourceShort: "Virtuous & Fundraising.AI, 2026",
    url: "https://virtuous.org/resource/the-2026-nonprofit-ai-adoption-report-download/",
    date: "2026",
  },
  aiOverviewClicks: {
    id: "ai-overview-clicks",
    figure: "~37%",
    claim:
      "fewer clicks to any website on Google searches where an AI Overview appears (2.4% vs. 3.8% click-through, Feb 2026).",
    source: "Seer Interactive, longitudinal study of 2.43B impressions across 53 brands, Jan 2025–Feb 2026",
    sourceShort: "Seer Interactive, 2026",
    url: "https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update",
    date: "April 2026",
  },
  gatesRequirement: {
    id: "gates-requirement",
    figure: "Excluded",
    claim:
      'Gates Foundation Grand Challenges AI proposals are excluded if they "fail to demonstrate responsible AI practices, including attention to bias, privacy, transparency, and data governance."',
    source: 'Bill & Melinda Gates Foundation, Grand Challenges RFP "AI to Accelerate Charitable Giving"',
    sourceShort: "Gates Foundation Grand Challenges RFP",
    url: "https://gcgh.grandchallenges.org/challenge/artificial-intelligence-ai-accelerate-charitable-giving",
    date: "2026",
  },
  randFailure: {
    id: "rand-failure",
    figure: "80%+",
    claim: "of AI projects fail to deliver their intended results, roughly twice the rate of other IT projects.",
    source: 'RAND Corporation, Ryseff & Narayanan, "Why AI Projects Fail"',
    sourceShort: "RAND, 2025",
    url: "https://www.rand.org/pubs/presentations/PTA2680-1.html",
    date: "April 2025",
  },
} as const satisfies Record<string, Stat>;
