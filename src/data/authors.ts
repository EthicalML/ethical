export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  aboutAnchor: string;
  portrait: string;
  affiliation?: string;
  sameAs: string[];
}

// Keyed by the author's name so a content entry can name its author as a plain
// string. Every `sameAs` URL was checked to resolve for this specific person.
export const authors: Record<string, Author> = {
  'Alejandro Saucedo': {
    slug: 'alejandro-saucedo',
    name: 'Alejandro Saucedo',
    role: 'Co-founder & Scientific Advisor',
    bio: 'Co-founder and Scientific Advisor at the Institute, Director of Markets AI, Data & Platform at Zalando SE, appointed AI Expert at the United Nations and Board Member at the ACM.',
    aboutAnchor: '/about/#alejandro-saucedo',
    portrait: '/images/people/alejandro-saucedo.jpg',
    affiliation: 'Zalando SE',
    sameAs: ['https://www.linkedin.com/in/axsaucedo/', 'https://github.com/axsaucedo'],
  },
  'Lucy Yu': {
    slug: 'lucy-yu',
    name: 'Lucy Yu',
    role: 'Co-founder & Strategic Advisor',
    bio: 'Co-founder and Strategic Advisor at the Institute, CEO of the Centre for Net Zero and a Non-Executive Director at Connected Places Catapult and E3G.',
    aboutAnchor: '/about/#lucy-yu',
    portrait: '/images/people/lucy-yu.jpg',
    affiliation: 'Centre for Net Zero',
    sameAs: [
      'https://www.linkedin.com/in/lucyyu1/',
      'https://openuk.uk/profiles/lucy-yu-2/',
      'https://cp.catapult.org.uk/team/lucy-yu/',
    ],
  },
};
