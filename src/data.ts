export type Field = { id: string; label: string; value: string };
export type Achievement = { id: string; title: string; description: string; date: string; image?: string };
export type Experience = { id: string; role: string; org: string; period: string; description: string };
export type TabKind = 'home' | 'about' | 'achievements' | 'experience' | 'page' | 'manage';
export type Tab = { id: string; label: string; kind: TabKind; visible: boolean; body?: string; image?: string };
export type Theme = { ink: string; paper: string; accent: string };

export type SiteData = {
  greeting: string;
  name: string;
  tagline: string;
  thoughts: string[];
  photo?: string;
  bio: string;
  details: Field[];
  achievements: Achievement[];
  experience: Experience[];
  footer: Field[];
  tabs: Tab[];
  theme: Theme;
};

export const uid = () => Math.random().toString(36).slice(2, 10);

export const defaultData: SiteData = {
  greeting: 'Hey SAHIL',
  name: 'Sahil Dinesh Patil',
  tagline: 'Software developer in the making, ENTC engineer by training.',
  thoughts: [
    'I turn small curiosities into working software.',
    'Circuits taught me patience. Code taught me speed.',
    'Every great system begins as one honest line of code.',
    'Still learning, always building.',
  ],
  bio: 'I really love software development. Switch on "Edit site" to tell your story in your own words.',
  details: [
    { id: 'd1', label: 'Name', value: 'SAHIL DINESH PATIL' },
    { id: 'd2', label: 'Current education', value: 'B.Tech 3rd Year in ENTC' },
    { id: 'd3', label: 'College', value: 'SB Jain Institute of Technology, Research and Management' },
    { id: 'd4', label: 'High school', value: 'Science, Sindhi Hindi High School / Jr College' },
    { id: 'd5', label: 'School', value: 'Maharashtra State Board, Vinalaya High School' },
  ],
  achievements: [
    {
      id: 'a1',
      title: 'Your first achievement',
      description: 'Switch on "Edit site" to replace this with something you are proud of. You can add a photo too.',
      date: '2026',
    },
  ],
  experience: [
    {
      id: 'e1',
      role: 'Your role',
      org: 'Organization or project',
      period: 'Start to end',
      description: 'Describe what you built or learned. Edit or remove this entry.',
    },
  ],
  footer: [
    { id: 'f1', label: 'Admin', value: 'Sahil Dinesh Patil' },
    { id: 'f2', label: 'Email', value: 'your.email@example.com' },
    { id: 'f3', label: 'Phone', value: '+91 00000 00000' },
    { id: 'f4', label: 'Address', value: 'Add your address' },
  ],
  tabs: [
    { id: 'home', label: 'Home', kind: 'home', visible: true },
    { id: 'about', label: 'About us', kind: 'about', visible: true },
    { id: 'achievements', label: 'Achievements', kind: 'achievements', visible: true },
    { id: 'experience', label: 'Experience', kind: 'experience', visible: true },
    { id: 'manage', label: 'Manage', kind: 'manage', visible: true },
  ],
  theme: { ink: '#101A33', paper: '#F3F5F9', accent: '#C9A24B' },
};
