// Case studies shown on /case-studies. Add a new object to this array to add a case study.
// `id` becomes the anchor on the page (/case-studies#<id>), so keep it stable once published.

export interface CaseStudy {
  id: string;
  title: string;
  label: string;
  organization: string;
  role: string;
  problem: string[];
  // A plain string renders as a paragraph; `lead` renders as a bold lead-in before `text`.
  whatWeDid: (string | { lead: string; text: string })[];
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
      'Instead of treating it as a hiring problem, I recommended to the IT director that we use it as a chance to rethink hosting. Working with the network manager, we added up the real cost of self-hosting: two architects, infrastructure, a firewall and caching servers. It came to roughly $250,000 a year. We evaluated fully managed hosting providers and moved all seven sites and their databases to the best fit. The provider took over backups, security patching, firewall protection and CDN caching, and absorbed traffic spikes.',
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
  {
    id: 'newsroom-incident-build-vs-buy',
    title: 'From Newsroom Frustration to a Tool Built for Our Traffic',
    label: 'Prior role · Web Performance & Database Management',
    organization:
      'My former employer, a family-owned broadcasting company with 7 websites and 5 million page views a month',
    role: 'Development Team Lead. With no CTO in place, I shared technical decision-making with the network manager.',
    problem: [
      'The newsroom asked for a tool to control the order of stories on its sites. The goal was to install it on all seven stations, starting with the main one because that site had to work. It passed development testing and a week and a half of staging review. About 90 minutes after it went live on the main station, stories began disappearing and reappearing on its site. For a news organization, that is a credibility problem.',
    ],
    whatWeDid: [
      {
        lead: 'Contain.',
        text: 'I treated it as an incident. Using our monitoring tools, we confirmed the pattern, isolated the new tool as the cause and switched it off. The site was stable within about an hour.',
      },
      {
        lead: 'Diagnose.',
        text: 'We rebuilt staging as a full copy of production and reproduced the failure. The tool created heavy database load that only appeared at production scale, which is why earlier testing missed it.',
      },
      {
        lead: 'Decide.',
        text: "Fixing the tool would have cost more than replacing it, and it was outside the team's expertise. An off-the-shelf plugin was available for $100 a year, but the director of TV digital operations would not have been happy with the result. I pushed for a custom build even though it cost more, and made the case to leadership to bring in a specialist vendor to build a plugin designed for our scale.",
      },
    ],
    results: [
      'Main station site stable the same day',
      'Newsroom got the capability it asked for, built for our traffic',
      'Custom plugin rolled out to all seven stations',
      'Testing with production-scale data added before major releases',
      'Team stayed focused on core work instead of rewriting unfamiliar code',
    ],
  },
];

export const caseStudyHref = (id: string) => `/case-studies#${id}`;
