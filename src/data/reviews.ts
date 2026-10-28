// Fixed-price reviews. Each one has its own page and is listed on /how-i-work.
// `caseStudyId` links the review to the case study it grew out of.

import { caseStudyHref } from './case-studies';

export interface Review {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  summary: string;
  forWhom: string[];
  whatIDo: string[];
  deliverables: string[];
  price: string;
  scope: string;
  scopeNote?: string;
  proof: { text: string; linkText: string; caseStudyId: string };
}

export const reviews: Review[] = [
  {
    slug: 'hosting-cost-review',
    name: 'Hosting Cost Review',
    seoTitle: 'Hosting Cost Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review of what self-hosting really costs, compared with managed hosting options sized for your traffic. $1,500, about 10 hours.',
    intro:
      'If your sites run on servers your team manages, the hosting bill is only part of what you pay. Staff time, security, caching, backups and weekend on-call calls rarely show up in one place. This review puts them in one place and compares the total with managed options that fit your traffic.',
    summary: 'For companies that self-host and have not priced the full cost of it in years.',
    forWhom: [
      'Your websites or databases run in your own data center or on servers your team maintains.',
      'One person holds most of the knowledge about how the setup works.',
      'Your team gets called on weekends when traffic spikes or something breaks.',
      'Nobody has added up the full cost of hosting in the last few years.',
    ],
    whatIDo: [
      'Add up the real cost of your current setup: staff time, servers, security, caching, backups and on-call.',
      'Compare it with two or three managed hosting options sized for your traffic, including spikes.',
      'Flag the risks of moving, including downtime during the switch, data migration and vendor lock-in.',
    ],
    deliverables: [
      'A written cost comparison of your current setup and the managed options',
      'A recommendation on whether to move, and to which option',
      'A migration outline if moving makes sense',
    ],
    price: '$1,500',
    scope: 'about 10 hours over two weeks',
    scopeNote:
      "This is a cost and vendor review. It doesn't include designing or building new infrastructure. If you need that, I'll help you find and evaluate the right specialist.",
    proof: {
      text: 'At a broadcasting company with 7 websites, this kind of review showed that self-hosting cost about $250,000 a year. Managed hosting cost about $125,000 and ended weekend on-call calls.',
      linkText: 'Read the hosting case study',
      caseStudyId: 'broadcasting-managed-hosting',
    },
  },
  {
    slug: 'launch-risk-review',
    name: 'Launch Risk Review',
    seoTitle: 'Launch Risk Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review of your launch plan before a major feature, plugin or vendor tool goes live on a site that cannot go down. $1,500, about 10 hours.',
    intro:
      'A new plugin or feature can pass every test and still fail on launch day, because staging rarely carries production-scale data. This review checks your launch plan against the way your site actually runs, before your customers or readers find the problem.',
    summary: 'For teams about to launch something major on a site that cannot go down.',
    forWhom: [
      "You're about to launch a major feature, plugin or vendor tool.",
      'A failure would be visible to your customers or readers.',
      'Testing has happened, but not with production-scale data.',
      "You're deciding whether to fix a weak tool, buy one off the shelf or pay for a custom build.",
    ],
    whatIDo: [
      'Check whether testing used data and traffic close to production.',
      'Review the rollout plan: which site goes first, what gets monitored and how fast the change can be switched off.',
      'Where a tool looks weak, give you a build-vs-buy recommendation with the costs side by side.',
    ],
    deliverables: [
      'A go or no-go checklist for launch day',
      'The specific risks found, ranked, with a fix for each',
      'A build-vs-buy recommendation, if one is needed',
    ],
    price: '$1,500',
    scope: 'about 10 hours',
    proof: {
      text: 'At a broadcasting company, a newsroom tool passed development and staging, then made stories disappear on the main news site 90 minutes after launch. The site was stable within about an hour, and a custom replacement later rolled out to all seven stations.',
      linkText: 'Read the launch incident case study',
      caseStudyId: 'newsroom-incident-build-vs-buy',
    },
  },
];

export const reviewHref = (slug: string) => `/${slug}`;
export const reviewProofHref = (r: Review) => caseStudyHref(r.proof.caseStudyId);
