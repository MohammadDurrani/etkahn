export interface ProjectMediaData {
  image?: string;
  srcset?: string;
  sizes?: string;
  alt?: string;
  caption?: string;
  poster?: string;
  video?: { webm?: string; mp4?: string };
  ratio?: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  challenge?: string;
  approach?: string;
  result?: string;
  media?: ProjectMediaData;
}

export const projects: Project[] = [
  {
    id: 'pankaj-mishra', name: 'Pankaj Mishra',
    summary: 'An Astro rebuild for an author’s books, essays, and media.',
    challenge: 'Replace an unreliable WordPress site and give readers a clear way to find the author’s work.',
    approach: 'Rebuilt the site in Astro around writings, books, media, biography, and contact. The existing email setup stayed in place.',
    result: 'The site is live, and Etkahn continues to handle updates and fixes.',
    media: {
      image: '/media/projects/pankaj-home.webp',
      alt: 'Pankaj Mishra’s website homepage, showing his portrait, biography, and forthcoming book.',
      caption: 'The redesigned Pankaj Mishra homepage.',
    },
  },
  {
    id: 'aureon-hub', name: 'Aureon Hub',
    summary: 'A project for a business working in digital engineering and construction technology.',
    // The earlier portfolio marks the case study as a draft. Confirm permission, scope, and outcomes before expanding it.
  },
  {
    id: 'goldfinch-construction', name: 'Goldfinch Construction',
    summary: 'A modernization engagement for an existing construction business website.',
    challenge: 'Modernize an existing web presence for a construction business.',
    // Confirm permission, development scope, and delivery status before publishing a fuller account.
  },
];
