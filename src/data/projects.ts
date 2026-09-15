export interface Project {
  title: string
  description: string
  href: string
  tag: string
  external: boolean
  language?: string
  slug?: string
}

export const projects: Project[] = [
  {
    title: 'Oakstone Smart Video Tool',
    description: 'AI-powered video editing and presentation platform built at Ebix.',
    href: '/projects/oakstone',
    tag: 'Work',
    external: false,
    slug: 'oakstone',
  },
  {
    title: 'ALI 2026 Registration',
    description: 'Voter registration platform for canivotenj.com.',
    href: '/projects/ali-2026-registration',
    tag: 'Web',
    external: false,
    language: 'Python',
    slug: 'ali-2026-registration',
  },
  {
    title: 'Argonne Summer 2025',
    description:
      'Three-stage data processing pipeline with left-derivative region detection, median-based clustering, and outlier removal.',
    href: '/projects/argonne-summer-2025',
    tag: 'Research',
    external: false,
    language: 'Python',
    slug: 'argonne-summer-2025',
  },
  {
    title: 'Vikunja CLI',
    description:
      'Rust terminal client for Vikunja with a keyboard-first, three-pane workspace inspired by modern dev tools.',
    href: 'https://github.com/bc2026/vikunja-cli',
    tag: 'Open Source',
    external: true,
    language: 'Rust',
  },
  {
    title: 'Jazba Website',
    description: 'Vue.js website deployed on Vercel.',
    href: 'https://jazba-website.vercel.app',
    tag: 'Web',
    external: true,
    language: 'Vue',
  },
  {
    title: 'Denoising SIA IML',
    description: 'Machine learning research project on signal denoising using SIA IML methods.',
    href: 'https://github.com/bc2026/DenoisingSIAIML',
    tag: 'ML',
    external: true,
    language: 'Python',
  },
  {
    title: 'Reddit Sentiment Analysis',
    description: 'Sentiment analysis pipeline for Reddit data.',
    href: 'https://github.com/bc2026/ali-reddit-sentiment-analysis',
    tag: 'ML',
    external: true,
    language: 'Python',
  },
  {
    title: 'Viewhigher',
    description: 'Hackathon project built at QuackHacks.',
    href: 'https://github.com/bc2026/Viewhigher_QuackHacks',
    tag: 'Hackathon',
    external: true,
    language: 'Python',
  },
  {
    title: 'Quant Bio App',
    description: 'Interactive quantitative biology application built with Jupyter and Voila.',
    href: 'https://github.com/bc2026/voila-quantbio-app',
    tag: 'Bioinformatics',
    external: true,
    language: 'Python',
  },
  {
    title: 'EzReadz',
    description: 'Reading application built with JavaScript.',
    href: 'https://github.com/bc2026/EzReadz',
    tag: 'Web',
    external: true,
    language: 'JavaScript',
  },
  {
    title: 'EZLynx Automation',
    description:
      'Automates sending texts through EZLynx given a spreadsheet with policy number, name, and date.',
    href: 'https://github.com/bc2026/EZLynx-Automation',
    tag: 'Automation',
    external: true,
  },
  {
    title: 'Craigslist Scraper',
    description: 'Web scraper for Craigslist listings.',
    href: 'https://github.com/bc2026/craigslist_scraper',
    tag: 'Tools',
    external: true,
    language: 'Python',
  },
  {
    title: 'TDSP Heatmaps',
    description: 'Data visualization project using heatmaps for technical data science portfolio work.',
    href: 'https://github.com/bc2026/TDSP-Project-Heatmaps',
    tag: 'Data',
    external: true,
  },
  {
    title: 'UnCrash Philly',
    description: 'Civic technology project focused on traffic safety in Philadelphia.',
    href: 'https://github.com/bc2026/UnCrashPhilly',
    tag: 'Civic',
    external: true,
  },
  {
    title: 'LLM Integration Plugin',
    description: 'IntelliJ plugin template for integrating large language models into IDE workflows.',
    href: 'https://github.com/bc2026/TechnicalDebt_LLMIntegration',
    tag: 'Tools',
    external: true,
    language: 'Kotlin',
  },
  {
    title: 'Music Recommender',
    description:
      'Music recommender system built with imperative programming and mutable data types.',
    href: 'https://github.com/bc2026/cs115-music-recommender',
    tag: 'ML',
    external: true,
    language: 'Python',
  },
  {
    title: 'Stats Game',
    description:
      'Interactive game demonstrating the law of large numbers for an applied statistics course.',
    href: 'https://github.com/bc2026/stats-game',
    tag: 'Education',
    external: true,
    language: 'Python',
  },
]
