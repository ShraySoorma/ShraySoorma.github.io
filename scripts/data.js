/* All page content lives here. Edit this file, not index.html. */

window.SITE = {
  name: 'Shray Soorma',
  url: 'https://shraysoorma.github.io',

  /* To add your resume, drop the PDF at assets/resume.pdf and uncomment:
       { label: 'Resume', value: 'Download PDF', href: 'assets/resume.pdf' },
     It is left out for now so the page does not ship a dead link. */
  links: [
    { label: 'Email',    value: 'shraysoorma27@gmail.com',     href: 'mailto:shraysoorma27@gmail.com', primary: true },
    { label: 'GitHub',   value: 'github.com/ShraySoorma',      href: 'https://github.com/ShraySoorma' },
    { label: 'LinkedIn', value: 'linkedin.com/in/shray-soorma', href: 'https://www.linkedin.com/in/shray-soorma/' },
    { label: 'Studio',   value: 'dezignrco.com',               href: 'https://dezignrco.com' },
    { label: 'Product',  value: 'charlore.ai',                 href: 'https://charlore.ai' }
  ]
};

window.EXPERIENCE = [
  {
    "company": "IBM / Kyndryl Inc.",
    "title": "Senior Software Engineer",
    "dates": "Jan 2026 - Current",
    "bullets": [
      "Own the centralized payment engine behind all ADOT MVD transaction processing (1M+ transactions monthly), covering transaction orchestration, secure API design, and observability improvements that reduced payment failures across citizen-facing services.",
      "Led the migration of legacy ADOT applications to modern .NET, re-architecting aging systems into maintainable, cloud-ready services while preserving continuity for live citizen-facing workflows.",
      "Designed, built, and shipped 4+ client-facing web applications end-to-end, owning architecture, API design, and deployment for high-traffic state services.",
      "Lead technical design reviews and mentor junior engineers across web application teams, setting standards for API design, testing, and release practices.",
      "Drove adoption of automated regression testing (Playwright, GitHub Actions, Vitest) across client-facing applications, reducing production regressions by 45% and improving release confidence in high-traffic workflows."
    ]
  },
  {
    "company": "IBM / Kyndryl Inc.",
    "title": "Software Engineer",
    "dates": "Aug 2023 - Dec 2025",
    "bullets": [
      "Designed and implemented scalable AWS cloud architectures (EC2, S3, Lambda, RDS) with cross-functional teams, supporting business-critical applications serving 100K+ users while optimizing for performance, security, and cost.",
      "Built and deployed RESTful APIs using Node.js, Express.js, and AWS API Gateway connecting mobile and web clients across multiple Kyndryl solutions with secure, reliable data exchange."
    ]
  },
  {
    "company": "IBM / Kyndryl Inc.",
    "title": "Software Engineer Intern (2x)",
    "dates": "Summers 2022 & 2023",
    "bullets": [
      "Built the React interface for an internal generative AI tool with an Nginx proxy on GCP (25% server performance gain), and implemented semantic search for an employee search engine using sentence-transformer NLP models."
    ]
  }
];

/* Hidden for now. Flip to true to put experience.txt back in the nav, ls,
   help and tab completion. The roles below stay here either way, and the
   nav entry in index.html needs uncommenting too. */
window.SHOW_EXPERIENCE = false;

window.EDUCATION = {
  "school": "Arizona State University",
  "degree": "BS Computer Science",
  "note": "GPA 3.7"
};

window.PROJECTS = [
  {
    "id": "charlore",
    "name": "Charlore",
    "issue": "The Episode Factory",
    "logline": "Serialized AI video platform. Define a series once, then generate full episodes, script to finished render, in any aspect ratio.",
    "body": [
      "A series bible locks the world, cast, and visual style, then each episode flows through script, scene board, reference-consistent character images, Kling image-to-video clips, and ElevenLabs voiceover before a QStash-queued ffmpeg worker assembles the final render.",
      "Workspaces carry owner, admin, and member roles with invite links, generation is metered in credits, and Stripe runs Free, Creator, and Studio plans plus one-time credit packs.",
      "Finished episodes upload to TikTok as drafts, and a SwiftUI iOS companion app works as a studio remote over Bearer-token auth."
    ],
    "highlights": [
      "Pluggable providers: OpenAI, Anthropic, fal Kling, ElevenLabs",
      "QStash-queued ffmpeg worker renders finished episodes in any aspect ratio",
      "Stripe plans plus credit packs meter video, image, and voice",
      "TikTok draft upload and a SwiftUI iOS studio remote"
    ],
    "stack": [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Auth.js",
      "Stripe",
      "QStash",
      "ffmpeg",
      "fal.ai",
      "ElevenLabs",
      "SwiftUI",
      "Tailwind CSS"
    ],
    "burst": "BOOM",
    "status": "live",
    "link": "https://charlore.ai",
    "repoPublic": false
  },
  {
    "id": "dezignrco",
    "name": "dezignrco",
    "issue": "The Studio",
    "logline": "Web design studio. Client sites designed, built, and shipped, plus the in-house tooling that runs the studio.",
    "body": [
      "Sites are assembled from a component and template system, themed per client, and deployed as static builds with managed image handling, uptime checks, and incident history."
    ],
    "highlights": [
      "Client sites designed, built, and deployed end to end",
      "In-house builder and template system behind the work",
      "Uptime monitoring with incident history per site",
      "Client portal for review, comments, and sign off"
    ],
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Prisma",
      "Cloudflare Pages",
      "Cloudinary",
      "Tailwind CSS"
    ],
    "burst": "ZAP",
    "status": "live",
    "link": "https://dezignrco.com",
    "repoPublic": false
  },
  {
    "id": "apron",
    "name": "HeartyPot",
    "issue": "The Neighborhood Kitchen",
    "logline": "Marketplace where home cooks sell homemade food to neighbors, with map discovery, pickup ordering, and a native iOS app.",
    "body": [
      "One Next.js backend serves web and a SwiftUI iOS app through the same REST API, using a dual-auth helper that accepts Supabase cookie sessions and Bearer JWTs so every mutation works on both clients.",
      "Customers find cooks on a PostGIS-backed map, order against per-cook pickup windows and daily capacity, and message cooks over Supabase Realtime, with Stripe Connect destination charges and a 10 percent platform fee built and ready.",
      "The iOS side runs on ApronKit, a hand-rolled Swift package with its own REST client, Supabase auth, and Realtime websocket client, no SDK."
    ],
    "highlights": [
      "Dual-auth REST API shared by web and native iOS",
      "PostGIS map discovery with clustered MapKit pins",
      "Stripe Connect destination charges, 10 percent fee",
      "Hand-rolled Swift Realtime websocket client, no SDK"
    ],
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "PostGIS",
      "Supabase",
      "Stripe Connect",
      "SwiftUI",
      "MapKit",
      "MapLibre GL",
      "Resend"
    ],
    "burst": "BAM",
    "status": "in build",
    "link": null,
    "repoPublic": false,
    "linkNote": "Launching soon"
  }
];

window.AUTHOR = {
  "tagline": "Full-stack engineer who ships whole products solo",
  "work": "SWE @Kyndryl",
  "origin": [
    "Shray builds complete products alone: web apps, native desktop and iOS clients, AI pipelines, and the billing that makes them businesses.",
    "The same playbook repeats across his work, a typed TypeScript stack, a real relational schema, and automation for everything repetitive.",
    "He is at home wiring third-party rails, Stripe subscriptions and Connect, Cloudflare deploys, and model providers from Claude to Kling.",
    "The pattern behind it all: find a manual workflow, then build the machine that runs it every day."
  ],
  "bubble": "If I have to do it twice, I build the machine that does it daily.",
  "epigraph": {
    "text": "Simplicity is prerequisite for reliability.",
    "author": "Edsger W. Dijkstra",
    "source": "EWD498, 1975"
  },
  "arsenal": {
    "Languages": [
      "TypeScript",
      "JavaScript",
      "Python",
      "Swift",
      "Rust",
      "C#",
      ".NET",
      "SQL"
    ],
    "Frontend": [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "Recharts",
      "Socket.io"
    ],
    "Backend and data": [
      "Node.js",
      "Express",
      "Fastify",
      "ASP.NET",
      "Prisma",
      "Drizzle ORM",
      "PostgreSQL",
      "PostGIS",
      "MySQL",
      "Redis",
      "SQLite",
      "Supabase",
      "WebSockets"
    ],
    "AI and media": [
      "Claude API",
      "OpenAI API",
      "Gemini",
      "LangChain",
      "LangGraph",
      "fal.ai",
      "ElevenLabs",
      "ffmpeg",
      "sharp"
    ],
    "Desktop and mobile": [
      "Tauri 2",
      "Electron",
      "SwiftUI",
      "MapKit",
      "WebContainers"
    ],
    "Infra and tooling": [
      "AWS",
      "Docker",
      "Kubernetes",
      "Cloudflare Pages",
      "Fly.io",
      "Vercel",
      "GitHub Actions",
      "Stripe",
      "QStash",
      "Resend",
      "Playwright",
      "Vitest",
      "launchd"
    ]
  }
};
