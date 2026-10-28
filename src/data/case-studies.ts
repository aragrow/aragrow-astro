// Case studies shown on /case-studies. Add a new object to this array to add a case study.
// `id` becomes the anchor on the page (/case-studies/#<id>), so keep it stable once published.

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
  // Paragraphs shown after the results, for an outcome that is not a direct quote.
  closing?: string[];
  quote?: { text: string; attribution: string };
  // Ids of other case studies to link to at the end of this one.
  related?: string[];
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
    id: 'access-control-new-developer',
    title: 'From Untracked Access to Changes in Seconds',
    label: 'Prior role · Database Management & Technical Leadership',
    organization:
      'My former employer, a family-owned broadcasting company with about 2,000 employees across 75 business units, including TV and radio stations',
    role: 'Development Team Lead. With no CTO in place, I shared technical decision-making with the network manager.',
    problem: [
      'In our regular meetings, the IT director raised a growing concern. The company had no reliable way to track which assets and permissions each person held as employees joined and left. Access often spanned several business units, so former employees could keep permissions they should have lost. That was both a security risk and an audit exposure.',
    ],
    whatWeDid: [
      {
        lead: 'Plan.',
        text: 'I turned the concern into core requirements, then scoped a simple prototype to prove the approach before investing further.',
      },
      {
        lead: 'Build and mentor.',
        text: 'Instead of building it myself, I guided an infrastructure engineer who wanted to move into development. I coached him to design the database around how the business would actually use the data, so it could adapt as the company grew. We built in a full audit trail and role-based access, so each user could do only what their job required.',
      },
    ],
    results: [
      'The prototype went into everyday use across the business units',
      'About 100 hours saved every month across the company',
      'Much lower risk of former employees keeping access after leaving',
      'A flexible design that made it easier to bring acquired companies into the system',
      'The engineer continued growing as a developer',
    ],
    quote: {
      text: 'This has simplified the process of hiring and terminating employees to the point that it takes seconds vs. hours to communicate, track, and execute change.',
      attribution: 'Employee at one of the business units',
    },
  },
  {
    id: 'developer-resignation-after-launch',
    title: 'From Sudden Resignation to a Team That Owned the Site',
    label: 'Prior role · Web Development & Technical Leadership',
    organization:
      'My former employer, a family-owned broadcasting company with 7 websites and 5 million page views a month',
    role: 'Development Team Lead. With no CTO in place, I shared technical decision-making with the network manager.',
    problem: [
      'The company chose WordPress as its new CMS, and the whole team was new to it. We hired an experienced WordPress developer to build the first site, starting with our lowest-traffic station, and to teach the rest of the team along the way. Several months later, the site went live on a Monday. On Tuesday morning, his resignation letter, effective immediately, was on my desk. We had a brand-new live site and no one on staff who knew it well.',
    ],
    whatWeDid: [
      {
        lead: 'Act.',
        text: 'I went straight to the IT director and got approval to contact a local Minneapolis development agency. Within hours, they sent the resume of a senior WordPress developer available part time.',
      },
      {
        lead: 'Structure the engagement.',
        text: 'I negotiated a phased arrangement. For the first month, he worked on site three days a week alongside our team, teaching WordPress and our specific build. As the team took on more responsibility, he moved to an advisory role for the rest of a four-month engagement.',
      },
    ],
    results: [
      'No rollback to the old website',
      'No impact on the station or its audience',
      'The team taking ownership of the site within the first month',
      'A planned four-month consulting cost instead of a rushed hire',
      'Time to find and hire the right permanent replacement',
    ],
    quote: {
      text: 'Thank you for finding a workable solution in a difficult situation.',
      attribution: 'Station general manager',
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
  {
    id: 'vendor-management',
    title: 'From Scattered Vendors to One Accountable Lead',
    label: 'Prior role · Vendor Management & Technical Leadership',
    organization:
      'My former employer, a family-owned broadcasting company with 7 websites and 5 million page views a month',
    role: 'Development Team Lead. With no CTO in place, I shared technical decision-making with the network manager.',
    problem: [
      'The company depended on outside partners: specialists for SEO, design and short-term development, a hosting provider, the Associated Press news feed, and enterprise systems like ADP, NetSuite and Microsoft Dynamics GP. Without one accountable person, problems bounce between vendors, costs creep up and issues sit unresolved.',
    ],
    whatWeDid: [
      {
        lead: 'Specialists on demand.',
        text: 'I brought in SEO experts, graphic designers and extra developers for a few days or a single project, and managed their scope, timelines and hand-offs.',
      },
      {
        lead: 'Hosting.',
        text: 'I owned the hosting provider relationship from the WordPress implementation through the rest of my time there.',
      },
      {
        lead: 'Associated Press.',
        text: 'I was the technical contact with the AP. I kept our sites current with their API requirements and worked directly with them to resolve any issues with the feed.',
      },
      {
        lead: 'Enterprise systems.',
        text: 'I worked closely with ADP support to get our tickets resolved. For NetSuite, I owned reporting and data loads, and led the conversation with the vendor whenever data or reports had problems. I was also a point of contact with the Microsoft Dynamics GP vendor.',
      },
    ],
    results: [
      'Every vendor knew exactly who to contact when they needed information',
      'Faster issue resolution, because problems no longer bounced between people',
      'Cost savings from fewer delays and less time lost chasing answers',
      'Specialist skills brought in only when needed, instead of added headcount',
    ],
  },
  {
    id: 'team-disagreement-decision',
    title: 'From a Split Team to a Decision That Held Up',
    label: 'Prior role · Technical Leadership',
    organization:
      'My former employer, a family-owned broadcasting company with 7 websites and 5 million page views a month',
    role: 'Development Team Lead. With no CTO in place, I shared technical decision-making with the network manager.',
    problem: [
      'We were designing an in-house system, and my team split on the approach. Our network architect was convinced his solution was the right one. The development team, including me, had serious doubts. The stakes were high: the wrong choice could have led to data corruption. A split like that can also stall a project, or leave people disengaged long after the decision is made.',
    ],
    whatWeDid: [
      {
        lead: 'Listen.',
        text: 'I kept the discussion open and respectful. We put the options side by side, laid out the pros and cons of each and made sure every view got a full hearing, including the one I disagreed with.',
      },
      {
        lead: 'Decide.',
        text: 'As team lead, the call was mine. I weighed the options with data integrity as the top priority and made the decision. We documented the decision and the meeting notes, so we could look back at the reasoning later.',
      },
      {
        lead: 'Stay open.',
        text: "As the work went on, some requirements changed. Our notes let us revisit the architect's ideas, and several fit the new needs. The final application combined both approaches.",
      },
    ],
    results: [
      'A clear decision that protected data integrity',
      'An application the whole team was happy with',
      'Trust between the architect and the development team stayed strong after the disagreement',
      'A documented record that made it easy to adapt when requirements changed',
    ],
    closing: [
      'After the meeting, the network architect came to me and told me that, even though he and the development team disagreed, he felt heard.',
    ],
  },
  {
    id: 'disaster-recovery-plan',
    title: 'From Single Point of Failure to a Plan Everyone Owned',
    label: 'Prior role · Cloud Infrastructure & Technical Leadership',
    organization:
      'My former employer, a family-owned broadcasting company with 7 websites and 5 million page views a month',
    role: 'Development Team Lead. With no CTO in place, I shared technical decision-making with the network manager.',
    problem: [
      'The company planned to host its news websites in its own data center, on load-balanced web servers and a database server. For a newsroom, an outage during breaking news means lost audience and lost trust. Leadership needed to know what would happen if any part of that setup failed.',
    ],
    whatWeDid: [
      {
        lead: 'Plan.',
        text: 'In the early stages, I represented the development team on a disaster recovery committee with the IT director and the network and security compliance manager. Together we defined how to switch to a standby copy of production, with current code and data, and how to switch back without losing anything. As the plan took shape, the full development and network teams joined to take ownership of their steps.',
      },
      {
        lead: 'Coordinate.',
        text: 'No single team could run the plan alone. The network team owned some steps and my team owned others. We mapped every step to an owner and set clear lines of communication, so everyone knew the full plan and who to call.',
      },
      {
        lead: 'What happened next.',
        text: 'We scheduled a weekend failover test during low traffic. Before it ran, the company moved to fully managed hosting, and the provider took over recovery.',
      },
    ],
    results: [
      'A complete recovery plan, agreed across the IT department',
      'Every step assigned to a clear owner',
      'A failover test scheduled to confirm zero data loss',
    ],
    related: ['broadcasting-managed-hosting'],
  },
];

export const caseStudyHref = (id: string) => `/case-studies/#${id}`;
