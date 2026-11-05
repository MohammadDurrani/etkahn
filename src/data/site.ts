export const email = 'hello@etkahn.com';
export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export const services = [
  {
    id: 'websites', title: 'Websites & digital experiences',
    summary: 'Give people a clearer, faster way to find you, understand your offer, and take the next step.',
    problem: 'Your site feels dated, is difficult to update, or makes visitors work too hard on mobile. Or you’re starting from scratch and need to decide what belongs on the site in the first place.',
    offer: ['Website planning, design, and development', 'Astro, WordPress, and CMS integration', 'Mobile usability, accessibility, and performance'],
    outcome: 'A site people can use easily and your team can keep current.',
  },
  {
    id: 'software', title: 'Custom software & tools',
    summary: 'Replace spreadsheet workarounds with tools shaped around the work your team actually does.',
    problem: 'A useful process has grown around spreadsheets, shared folders, or software that only partly fits. The workaround takes time and makes it harder to see what’s happening.',
    offer: ['Custom web applications and internal tools', 'Dashboards and focused utilities', 'Interfaces built around your team’s workflow'],
    outcome: 'A focused tool that fits the job and is easier for your team to use.',
  },
  {
    id: 'integrations', title: 'Integrations, automation & AI',
    summary: 'Connect the systems you already use and give repetitive work a reliable way to run.',
    problem: 'The same information gets typed into several tools. Reports take hours to assemble, or handoffs break because nobody knows which system is up to date.',
    offer: ['API integrations and data synchronization', 'Scripts, workflow automation, and bots', 'AI-assisted tools for well-defined tasks'],
    outcome: 'Fewer manual handoffs, with clear checks where a person still needs to make a decision.',
  },
  {
    id: 'support', title: 'Repairs, improvements & support',
    summary: 'Recover a broken site, modernize an existing system, or get a dependable pair of hands.',
    problem: 'A site is slow or unreliable, the original developer is unavailable, or maintenance has fallen behind. You need to understand what’s wrong before committing to a rebuild.',
    offer: ['Technical investigation, repairs, and modernization', 'Performance, security, and maintenance reviews', 'Documentation, handover, and ongoing support'],
    outcome: 'A more reliable system and a clear record of what changed and what needs attention.',
  },
];

export const process = [
  { title: 'Understand the problem', detail: 'We look at what’s in place, who uses it, and where the work gets stuck.' },
  { title: 'Agree on scope', detail: 'We explain the options and agree on what we’ll deliver, how we’ll check it, and what it will cost.' },
  { title: 'Build and communicate', detail: 'You see progress as the work takes shape. We raise decisions and tradeoffs while there’s time to act on them.' },
  { title: 'Test, deliver, and hand over', detail: 'We test the agreed workflows and pass on the access, documentation, and context you need to run the system.' },
  { title: 'Support and improve', detail: 'Where it makes sense, we can stay involved to maintain the work and improve it as your needs change.' },
];
