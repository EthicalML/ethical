export interface FormSectionStat {
  value: string;
  label: string;
}

export interface FormSectionSector {
  name: string;
  value: string;
}

export interface FormSectionCopy {
  homeEyebrow: string;
  contactEyebrow: string;
  intro: string;
  sectorEyebrow: string;
  issuesEyebrow: string;
  form: {
    title: string;
    fields: Array<{
      label: string;
      name: string;
      type: 'text' | 'email';
      placeholder: string;
      autocomplete: string;
      wide?: boolean;
    }>;
    interests: Array<{
      value: string;
      label: string;
      checked: boolean;
    }>;
    button: string;
    disclaimer: string;
    confirmation: string;
    demoConfirmation: string;
    error: string;
  };
}

export const contactFormTitle = 'Contact us, Subscribe or Apply.';

export const contactFormCopy: FormSectionCopy = {
  homeEyebrow: '05 — NETWORK & NEWSLETTER',
  contactEyebrow: 'ONE FORM / MANY WAYS IN',
  intro:
    'Responsible technology requires changes to models and to the systems around them. Membership includes the Ethical AI Network and the Machine Learning Engineer newsletter.',
  sectorEyebrow: 'WHO IS HERE',
  issuesEyebrow: 'RECENT ISSUES',
  form: {
    title: 'Contact form',
    fields: [
      {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Alex Moreau',
        autocomplete: 'name',
      },
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'you@organisation.org',
        autocomplete: 'email',
      },
      {
        label: 'Organisation & role',
        name: 'organisation',
        type: 'text',
        placeholder: 'Institution — role',
        autocomplete: 'organization-title',
        wide: true,
      },
      {
        label: 'Further information',
        name: 'furtherInformation',
        type: 'text',
        placeholder: 'Context, motivation or relevant links',
        autocomplete: 'off',
        wide: true,
      },
    ],
    interests: [
      {
        value: 'network',
        label: 'Apply to join the Ethical AI Network',
        checked: false,
      },
      {
        value: 'newsletter',
        label: 'Subscribe to the ML Engineer newsletter',
        checked: true,
      },
      {
        value: 'frameworks',
        label: 'Request the AI-RFX Templates',
        checked: false,
      },
    ],
    button: 'Send',
    disclaimer:
      'We only use your details to reply and to send what you asked for. Unsubscribe any time.',
    confirmation: 'Thank you. Your details have been sent to the Institute.',
    demoConfirmation: 'The form is in demo mode. No endpoint is configured and nothing was sent.',
    error: 'We could not send your details. Please try again or email hello@ethical.institute.',
  },
};

export const networkSectors: FormSectionSector[] = [
  { name: 'Universities & research', value: '24%' },
  { name: 'Technology companies', value: '22%' },
  { name: 'Financial services', value: '17%' },
  { name: 'Government & public bodies', value: '14%' },
  { name: 'Startups & scale-ups', value: '13%' },
];

export const networkStats: FormSectionStat[] = [
  { value: '1,034', label: 'NETWORK MEMBERS' },
  { value: '70,412', label: 'NEWSLETTER SUBSCRIBERS' },
  { value: '393', label: 'ISSUES PUBLISHED' },
];
