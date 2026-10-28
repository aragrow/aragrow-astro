// Case studies shown on /case-studies. Add a new object to this array to add a case study.
// `id` becomes the anchor on the page (/case-studies#<id>), so keep it stable once published.

export interface CaseStudy {
  id: string;
  title: string;
  label: string;
  organization: string;
  role: string;
  problem: string[];
  whatWeDid: string[];
  results: string[];
  quote?: { text: string; attribution: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'broadcasting-managed-hosting',
    title: 'From Staffing Crisis to $125K in Annual Savings',
    label: 'Prior role · Cloud Infrastructure',
    organization:
      'My former employer, a family-owned broadcasting company with 7 websites and 5 million page views a month',
    role: 'Development Team Lead. With no CTO in place, the network manager and I shared that responsibility.',
    problem: [
      "Fifteen days before going live, the company's network architect resigned. Its websites and databases ran in its own data center, and traffic was unpredictable. A quiet day could turn into a sudden surge when severe weather or breaking news hit. Replacing the role safely meant hiring two architects, a lead and a backup, at about $110,000 each.",
    ],
    whatWeDid: [
      'Instead of treating it as a hiring problem, I recommended to leadership that we use it as a chance to rethink hosting. Working with the network manager, we added up the real cost of self-hosting: two architects, infrastructure, a firewall and caching servers. It came to roughly $250,000 a year. We evaluated fully managed hosting providers and moved all seven sites and their databases to the best fit. The provider took over backups, security patching, firewall protection and CDN caching, and absorbed traffic spikes.',
    ],
    results: [
      'About $125,000 saved per year ($125,000 for managed hosting vs. an estimated $250,000 to self-host)',
      'No need to hire and keep two network architects',
      'Weekend on-call calls dropped from 2 to 4 per weekend to zero',
      'Fewer outages and faster pages, even during news and weather spikes',
    ],
    quote: {
      text: 'This has made a huge difference in our lives.',
      attribution: 'Member of the development team',
    },
  },
];

export const caseStudyHref = (id: string) => `/case-studies#${id}`;
