export interface ProjectTheme {
  accent: string
  accentDim: string
  accentGlow: string
  subtitle: string
  motif: 'video' | 'civic' | 'research'
  stack?: string[]
  stages?: { label: string; description: string }[]
}

export interface ProjectDetail {
  slug: string
  title: string
  tag: string
  language?: string
  theme: ProjectTheme
  statementOfPurpose: string
  objective: string
  overview: string[]
  github?: string
  liveUrl?: string
  demo?: {
    type: 'video-embed'
    src: string
    title: string
  }
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'oakstone',
    title: 'Oakstone Smart Video Tool',
    tag: 'Work',
    language: 'TypeScript / Python',
    theme: {
      accent: '#a78bfa',
      accentDim: 'rgba(167, 139, 250, 0.12)',
      accentGlow: 'rgba(167, 139, 250, 0.25)',
      subtitle: 'AI-Native Video Learning Platform',
      motif: 'video',
      stack: ['Next.js', 'Flask', 'PostgreSQL', 'AWS Lambda', 'Bedrock', 'Transcribe', 'S3', 'pgvector'],
    },
    statementOfPurpose:
      'Educational publishers need a way to turn long-form video lectures into searchable, chapterized learning experiences without manual editing overhead. Oakstone exists to close that gap — giving publishers a single platform to upload, process, and embed AI-enriched video content for learners.',
    objective:
      'Build an end-to-end video platform that automates transcription, chapter generation, summarization, and quiz creation, while providing embeddable players and publisher analytics — all running reliably on AWS infrastructure.',
    overview: [
      'Contributed to a three-tier architecture: a stateless Flask API on AWS Lambda, an async transcription worker on EC2/Fargate, and PostgreSQL (with pgvector) as the durable metadata store.',
      'Implemented the upload-to-ready pipeline: presigned S3 uploads, Amazon Transcribe for speech-to-text, Amazon Bedrock for chapter segmentation and summaries, and Titan embeddings for RAG-based transcript search.',
      'Worked on the Next.js frontend (App Router) for publisher dashboards and embeddable video players with HLS streaming support.',
      'Helped design the pipeline job queue system using PostgreSQL and SQS dual-write for reliable long-running media processing.',
      'Integrated quiz generation, view analytics bucketing, and embed origin restrictions for publisher content security.',
      'Built Canopy AI, a RAG-based Ask-AI assistant that answers learner questions against course transcripts (Titan embeddings + pgvector + Bedrock), with source citations that deep-link straight to the cited moment in the video.',
    ],
    demo: {
      type: 'video-embed',
      src: 'https://video.oakstone.dev.ebix.com/embed/1be68b3f-3772-4375-ab23-08e44cf896d1?panels=*&from=portal',
      title: 'Oakstone Smart Video Tool demo',
    },
  },
  {
    slug: 'ali-2026-registration',
    title: 'ALI 2026 Registration',
    tag: 'Web',
    language: 'Python / React',
    theme: {
      accent: '#60a5fa',
      accentDim: 'rgba(96, 165, 250, 0.12)',
      accentGlow: 'rgba(96, 165, 250, 0.22)',
      subtitle: 'Voter Registration & Field Outreach',
      motif: 'civic',
      stack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Prisma', 'Docker', 'Google Sheets'],
    },
    statementOfPurpose:
      'Voter outreach campaigns need a fast, reliable way to confirm registrations and retrieve voter information on demand. This platform serves canivotenj.com — giving field organizers and volunteers a self-service tool to look up and verify voter registration status in New Jersey.',
    objective:
      'Deliver a production-ready voter registration confirmation system with a React frontend, FastAPI backend, and PostgreSQL database — deployable via Docker locally or on AWS RDS, with optional Google Sheets logging for campaign analytics.',
    overview: [
      'Built a React (Vite) frontend for just-in-time voter information retrieval with a clean, field-ready interface.',
      'Developed a FastAPI (Python) REST API for voter lookup, validation, and data serving.',
      'Designed the PostgreSQL schema with Prisma for migrations and type-safe database access.',
      'Containerized the full stack with Docker Compose, including separate dev and production compose configurations.',
      'Implemented an optional Node.js XLSX import script for bulk voter data ingestion.',
      'Added Google Sheets integration for logging lookups via service account authentication.',
      'Structured environment configuration for local Docker defaults and AWS RDS deployment paths.',
    ],
    github: 'https://github.com/bc2026/ali2026-registration',
    liveUrl: 'https://canivotenj.com',
  },
  {
    slug: 'argonne-summer-2025',
    title: 'Argonne Summer 2025',
    tag: 'Research',
    language: 'Python',
    theme: {
      accent: '#fbbf24',
      accentDim: 'rgba(251, 191, 36, 0.12)',
      accentGlow: 'rgba(251, 191, 36, 0.2)',
      subtitle: 'Electrochemical Data Processing Pipeline',
      motif: 'research',
      stages: [
        { label: '01', description: 'Left-derivative region detection' },
        { label: '02', description: 'Median-based region merging' },
        { label: '03', description: 'Outlier removal & alignment' },
      ],
    },
    statementOfPurpose:
      'Electrochemical and ICP-MS experimental data from Argonne National Lab required automated processing to detect voltage regions, merge related segments, and remove outliers before analysis. Manual processing introduced timing inconsistencies that skewed results — this project aimed to replace that with a reproducible, code-driven pipeline.',
    objective:
      'Engineer a three-stage Python data processing pipeline that accurately detects voltage region boundaries, merges related segments using statistical comparison, and removes outlier datapoints — producing graphs and datasets aligned with manually processed reference data.',
    overview: [
      'Stage 1 — Region detection: implemented left-derivative analysis to identify voltage transition points in time-series electrochemical data.',
      'Stage 2 — Region merging: applied statistical median comparison with dynamic threshold-based clustering to consolidate related voltage regions.',
      'Stage 3 — Outlier removal: built filtering logic to strip anomalous datapoints before visualization and export.',
      'Joined ICP-MS and electrochemical datasets using relational mapping between measurement series.',
      'Diagnosed and resolved a timing discrepancy between automated and manual processing — identified a 24-second offset (60.40 min vs. exactly 3600 s) causing 120 extra datapoints across three cycles.',
      'Adjusted the processing period to T = 3624 seconds, aligning automated output graphs with manually processed reference data.',
      'Documented findings and communicated results to the research team with before/after graph comparisons.',
    ],
    github: 'https://github.com/bc2026/ArgonneSummer2025',
  },
]

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug)
}

export function getProjectTheme(slug: string): ProjectTheme | undefined {
  return getProjectBySlug(slug)?.theme
}
