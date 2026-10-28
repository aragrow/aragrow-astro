// Fixed-price reviews. Each one has its own page and is listed on /how-i-work.
// `caseStudyId` links the review to the case study it grew out of.

import { caseStudies, caseStudyHref } from './case-studies';

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

const reviewList: Review[] = [
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
  {
    slug: 'access-control-review',
    name: 'Access Control Review',
    seoTitle: 'Access Control Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review of who has access to what, how access is added and removed as people join and leave, and whether every change is recorded. $1,500, about 10 hours.',
    intro:
      "When people join and leave, their access to your systems should change with them. In many growing companies it depends on emails, spreadsheets and whoever remembers. This review shows who has access to what, how it gets added and removed, and whether there's a record of every change.",
    summary: "For companies that can't say for sure whether former employees still have access.",
    forWhom: [
      'Your company has several locations, brands or business units, and access spans more than one of them.',
      'New hires and departures are handled through emails, spreadsheets or whoever remembers.',
      "You're facing an audit, or an acquisition is about to make the setup harder to track.",
      "Nobody can answer \"Does anyone who left still have access?\" with confidence.",
    ],
    whatIDo: [
      'Map how access is granted and removed today, from hire to exit, including who signs off and where it is recorded.',
      'Check a sample of key systems against recent departures to see whether access was actually removed.',
      'Find the gaps, such as a missing audit trail, shared accounts, access that never expires and steps that depend on one person.',
    ],
    deliverables: [
      'A written map of your hire-to-exit access process, with the gaps marked',
      'A ranked list of fixes, starting with the biggest exposure',
      'A recommendation on whether a simple internal tool, an existing product or a process change is the right fix',
    ],
    price: '$1,500',
    scope: 'about 10 hours, covering up to 10 key systems',
    scopeNote:
      "This is a process and ownership review, not a security audit. It doesn't include penetration testing or compliance certifications such as SOC 2. If you need those, I'll help you scope the work and choose a specialist firm.",
    proof: {
      text: 'At a broadcasting company with about 2,000 employees across 75 business units, nobody could reliably track who held which access. A simple system with a full audit trail went into everyday use and saved about 100 hours a month.',
      linkText: 'Read the access control case study',
      caseStudyId: 'access-control-new-developer',
    },
  },
  {
    slug: 'disaster-recovery-review',
    name: 'Disaster Recovery Review',
    seoTitle: 'Disaster Recovery Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review of your disaster recovery plan: what would fail, how you switch to a standby copy and back, and who owns each step. $1,500, about 10 hours.',
    intro:
      'Having backups is not the same as having a recovery plan. A plan names who does what when a server or site fails, how you switch to a standby copy and how you switch back without losing data. This review checks whether yours would work when you need it.',
    summary: 'For companies that have backups but no recovery plan anyone has walked through.',
    forWhom: [
      'Your sites or systems run on servers you host or manage yourself.',
      'An outage at the wrong moment would cost you customers, audience or revenue.',
      "Recovery steps live in one person's head, or in a document nobody has opened in a year.",
      "More than one team would need to act, and it isn't clear who goes first.",
    ],
    whatIDo: [
      'Map what could fail, from web servers to databases, and what each failure would take offline.',
      'Review how you would switch to a standby copy of production and switch back without losing data.',
      'Assign every step to an owner and check that each team knows who to call.',
    ],
    deliverables: [
      'A written recovery plan, or a gap list for the plan you already have',
      'An owner for every step, with clear lines of communication',
      'A failover test plan you can run during low traffic',
    ],
    price: '$1,500',
    scope: 'about 10 hours',
    scopeNote:
      "This review covers the plan and who owns each step. It doesn't include building standby infrastructure or running the failover test. If you need that work, I'll help you scope it and find the right specialist.",
    proof: {
      text: 'At a broadcasting company with 7 news websites, I represented the development team on a disaster recovery committee. We mapped every recovery step to an owner across the network and development teams and scheduled a weekend failover test.',
      linkText: 'Read the disaster recovery case study',
      caseStudyId: 'disaster-recovery-plan',
    },
  },
  {
    slug: 'key-person-risk-review',
    name: 'Key Person Risk Review',
    seoTitle: 'Key Person Risk Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review of where critical technical knowledge sits with one person, and a plan for the day that person leaves. $1,500, about 10 hours.',
    intro:
      "If one developer, vendor or contractor left tomorrow, someone would still have to keep your site and systems running. This review finds where critical knowledge sits with one person and builds the plan for the day they're gone, before that day comes.",
    summary: 'For companies where one person is the only one who knows how a key system works.',
    forWhom: [
      'One developer, vendor or contractor is the only person who knows how a key system works.',
      'Documentation is thin, out of date or missing.',
      "You've recently launched something new that the rest of the team doesn't know well yet.",
      "If that person resigned today, you wouldn't know who to call first.",
    ],
    whatIDo: [
      'Map which systems depend on one person, and what breaks or stalls if that person leaves.',
      "Review what's written down and what the rest of the team can already handle on its own.",
      'Build a departure plan: who steps in, what outside help to call and how knowledge gets handed over.',
    ],
    deliverables: [
      'A list of key person risks, ranked by business impact',
      'A departure plan for each high-risk role, with a first call and a handoff outline',
      'A short list of documentation and cross-training to start now',
    ],
    price: '$1,500',
    scope: 'about 10 hours',
    scopeNote:
      "This review doesn't include recruiting or hiring. If you need outside help, I'll help you scope it and evaluate the agencies or candidates.",
    proof: {
      text: 'At a broadcasting company, the WordPress developer who built a new station site resigned the day after it went live. Within hours, a local agency sent the resume of a part-time senior developer, and the team owned the site within the first month, with no rollback and no impact on the audience.',
      linkText: 'Read the resignation case study',
      caseStudyId: 'developer-resignation-after-launch',
    },
  },
  {
    slug: 'architecture-decision-review',
    name: 'Architecture Decision Review',
    seoTitle: 'Architecture Decision Review | AraGrow LLC',
    seoDescription:
      'A fixed-price, senior outside read on a technical decision your team is split on or a design you are about to approve, with the reasoning written down. $1,500, about 10 hours.',
    intro:
      'When your team or a vendor is split on a technical approach, the project can stall, or the decision goes to whoever pushes hardest. This review gives every option a fair hearing and leaves you with a documented decision your team can stand behind and come back to later.',
    summary: 'For teams stuck between two technical approaches, or about to approve a design.',
    forWhom: [
      'Your team is split on how to build something important, and the project is stalling.',
      "A vendor or architect has proposed a design, and you're not sure whether to approve it.",
      'The wrong choice could mean lost data, downtime or an expensive rebuild.',
      'Past technical decisions were made in meetings nobody wrote down.',
    ],
    whatIDo: [
      "Hear every side, including the one that seems least likely, and put the options side by side.",
      'Weigh each option against what matters most to your business, such as data integrity, cost and how hard it is to change later.',
      'Write up the recommendation and the reasoning, so it can be revisited if requirements change.',
    ],
    deliverables: [
      'A side-by-side comparison of the options, with pros, cons and risks',
      'A clear recommendation, with the reasoning written down',
      'A decision record your team can come back to when requirements change',
    ],
    price: '$1,500',
    scope: 'about 10 hours',
    scopeNote:
      "I give you the recommendation and the reasoning. The final call stays with you, and the review doesn't include building the chosen design.",
    proof: {
      text: "At a broadcasting company, the network architect and the development team disagreed on how to build an in-house system where the wrong choice could corrupt data. Every option got a full hearing and the decision was documented. When requirements changed, the notes let the team bring back the architect's best ideas.",
      linkText: 'Read the team disagreement case study',
      caseStudyId: 'team-disagreement-decision',
    },
  },
  {
    slug: 'vendor-accountability-review',
    name: 'Vendor Accountability Review',
    seoTitle: 'Vendor Accountability Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review of every technology vendor you depend on: who owns each relationship, where issues stall and where costs creep. $1,500, about 10 hours.',
    intro:
      'Most growing companies rely on a mix of vendors, from hosting and data feeds to payroll, accounting and outside developers. When nobody owns those relationships, problems bounce between vendors and costs creep up. This review maps every vendor you depend on and gives each one a clear owner.',
    summary: 'For companies where vendor problems bounce around because nobody owns the relationship.',
    forWhom: [
      'You rely on several technology vendors, and nobody owns all of those relationships.',
      'Support tickets and vendor issues sit unresolved because nobody is sure who should push.',
      "You're paying for tools or services you're not sure you still use.",
      'You bring in outside specialists, but scope and hand-offs are loose.',
    ],
    whatIDo: [
      'List every technology vendor you depend on, what each one does and what it costs.',
      'Find where issues stall, where services overlap and which contracts renew soon.',
      'Assign an owner and an escalation path for each vendor, and set simple rules for bringing in specialists.',
    ],
    deliverables: [
      'A vendor map with cost, contract dates and an owner for each relationship',
      'A list of overlaps, stalled issues and cost savings worth pursuing',
      'An escalation path for each critical vendor',
    ],
    price: '$1,500',
    scope: 'about 10 hours, covering up to 15 vendors',
    scopeNote:
      "This review doesn't include negotiating contracts or switching vendors. If the review shows a change is worth making, that can be the next piece of work.",
    proof: {
      text: 'At a broadcasting company, I was the single technical contact for the hosting provider, the Associated Press feed, enterprise systems such as NetSuite and ADP, and on-demand specialists. Every vendor knew who to contact, and problems stopped bouncing between people.',
      linkText: 'Read the vendor management case study',
      caseStudyId: 'vendor-management',
    },
  },
  {
    slug: 'data-migration-review',
    name: 'Data Migration Review',
    seoTitle: 'Data Migration Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review before you move finance, HR or payroll data into a new system: what to move, how much history, and which reports must work on day one. $1,500, about 10 hours.',
    intro:
      "When you replace an accounting, HR or payroll system, the software is the easy part. The data decides whether reports are right and people get paid correctly on day one. This review plans the move before anyone starts exporting spreadsheets.",
    summary: 'For companies about to replace an accounting, HR or payroll system.',
    forWhom: [
      "You're replacing or upgrading an accounting, ERP, HR or payroll system.",
      "Nobody has decided how much history to move, or in how much detail.",
      'Finance or HR depends on reports that have to work from the first day.',
      'Compliance reporting relies on data in the old system.',
    ],
    whatIDo: [
      'Learn how each team actually uses the current system, and which reports and data they depend on.',
      'Decide with you what to move: full detail, summaries or current records only, and for how many years.',
      'Map the old data to the new system and flag where it will not translate cleanly.',
    ],
    deliverables: [
      'A migration plan covering what moves, in how much detail and who signs off',
      'A list of the reports that must work at launch, with an owner for each',
      'A list of data problems to fix before the move',
    ],
    price: '$1,500',
    scope: 'about 10 hours, for one system',
    scopeNote:
      "This review plans the migration. It doesn't include running the data loads or configuring the new system. If you want help with that work, we can scope it once the plan is set.",
    proof: {
      text: 'At a broadcasting company with about 2,000 employees, I owned the data migration to Dynamics GP, NetSuite, ADP Payroll and ADP Recruitment, including about 20 years of accounting records. Finance and HR had reports they could rely on from launch.',
      linkText: 'Read the data migration case study',
      caseStudyId: 'finance-hr-data-migration',
    },
  },
  {
    slug: 'release-process-review',
    name: 'Release Process Review',
    seoTitle: 'Release Process Review | AraGrow LLC',
    seoDescription:
      'A fixed-price review of how changes reach your live site: version control, test environments, caching and who can push what. $1,500, about 10 hours.',
    intro:
      "If changes go straight to your live site by hand, every update is a small risk, and the errors land on your customers. This review looks at how changes move from a developer's machine to the public and sets up a process that catches mistakes first.",
    summary: 'For teams that still make changes to the live site by hand.',
    forWhom: [
      "Changes go straight to the live site, with no test environment in between.",
      "Code isn't in version control, or not all of it is.",
      'Release errors keep reaching customers and take time to fix.',
      "You pay for a hosting platform but work around its tools instead of using them.",
    ],
    whatIDo: [
      'Walk through how a change gets from a developer to the live site today, step by step.',
      'Check version control, test environments, caching and who has access to push to production.',
      'Design a release process that fits your team and your hosting platform, with every change tracked and tested.',
    ],
    deliverables: [
      'A map of your current release process, with the risky steps marked',
      'A recommended process, from version control to the live site',
      'A short list of caching and performance fixes for traffic spikes',
    ],
    price: '$1,500',
    scope: 'about 10 hours',
    scopeNote:
      "This review designs the process. It doesn't include migrating your sites or setting up the tooling. If you want help with that work, we can scope it once the plan is set.",
    proof: {
      text: "At a broadcasting company with 7 news sites, we moved from manual releases with no Git and no test environment to a tracked, three-environment process on Pantheon. The team was named one of Pantheon's Best in WebOps Top 20 in 2023.",
      linkText: 'Read the WebOps case study',
      caseStudyId: 'webops-release-process',
    },
  },
];

// Listed in the same order as the case studies they come from.
const caseStudyOrder = (r: Review) => caseStudies.findIndex((s) => s.id === r.proof.caseStudyId);
export const reviews = [...reviewList].sort((a, b) => caseStudyOrder(a) - caseStudyOrder(b));

export const reviewHref = (slug: string) => `/${slug}`;
export const reviewProofHref = (r: Review) => caseStudyHref(r.proof.caseStudyId);
