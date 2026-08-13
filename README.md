# Roshan Kumar Singh — Portfolio

A cinematic, production-ready developer portfolio built with React, TypeScript, and Vite. Showcases featured projects, skills, certifications, and a real-time contact form — with Cloudinary-powered image uploads, scan-style loading animations, and an AI-powered chatbot assistant (Senku) that answers visitor questions about Roshan's projects and skills.

**Live site:** [roshan-portfolio-indol.vercel.app](https://roshan-portfolio-indol.vercel.app)

---

## Features

### Portfolio sections
- **Hero** — Intro, stats, CV download, Senku AI chatbot assistant
- **About** — Mission statement and tech pillars
- **Skills** — Animated skill bars across AI/ML, development, data, and cloud
- **Projects** — Featured work with live links, GitHub, tech stack, and feature lists
- **Achievements** — Certifications gallery with credential details
- **Contact** — Real-time validated form with direct email delivery
- **Footer** — Social links and site navigation

### Interactive & visual
- Scan-style **preloader** with live `0% → 100%` progress and radar animation
- **Skeleton screen** transition before content reveal
- Framer Motion scroll animations, film grain, letterbox, and scroll progress
- Responsive layout for mobile, tablet, and desktop
- `prefers-reduced-motion` support

### Image upload (Cloudinary)
- Upload or replace **project** and **certificate** photos directly from the UI
- Images stored in Cloudinary (`portfolio-projects/`, `portfolio-certificates/`)
- Preview URLs cached in `localStorage` for instant display
- Icon-only **Replace** / **Remove** controls on each image card

### Dynamic content
- **Add More Projects** and **Add More Certificates** forms
- Custom entries saved in browser `localStorage` (visitor-specific)
- Remove button for user-added items

### Contact form
- React Hook Form + Zod validation (`onChange` mode)
- Sends via **FormSubmit** (browser → email) with optional **Web3Forms** fallback
- Mobile-optimized layout

---

## Tech stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4 |
| UI | shadcn/ui (Radix), Lucide icons, CVA |
| Animation | Framer Motion |
| AI Chat | Anthropic Claude (server-side API) |
| Forms | React Hook Form, Zod |
| Media | Cloudinary (direct browser upload) |
| API | Vercel serverless (`/api/upload`, `/api/contact`) |
| Deploy | Vercel |

---

## Project structure

```
roshan-portfolio/
├── api/                    # Vercel serverless routes
│   ├── chat.ts             # AI chatbot (Anthropic Claude)
│   ├── upload.ts           # Cloudinary upload fallback
│   └── contact.ts          # Contact form server fallback
├── lib/                    # Server-side helpers
│   ├── cloudinary-upload-server.ts
│   └── contact-send-server.ts
├── public/
│   ├── favicon.png
│   └── Roshan-Kumar-Singh-CV.pdf
├── src/
│   ├── components/
│   │   ├── sections/       # Hero, About, Skills, Projects, etc.
│   │   ├── projects/       # Project cards + AddProjectForm
│   │   ├── certificates/ # Certificate gallery + AddCertificateForm
│   │   ├── shared/         # PortfolioImageUploader
│   │   ├── layout/         # Preloader, Navigation, Skeleton
│   │   ├── avatar/         # Senku AI chatbot widget
│   │   └── effects/        # ScanOverlay, FilmGrain, etc.
│   ├── data/portfolio.ts   # Site content (projects, skills, personal info)
│   ├── hooks/              # Image upload, lists, motion helpers
│   └── lib/                # Cloudinary, contact, animations
├── .env.example
└── vercel.json
```

---

## Getting started

### Prerequisites
- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/roshan-1205/roshan-portfolio.git
cd roshan-portfolio
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

### Cloudinary (required for image upload)

1. Go to [Cloudinary API Keys](https://console.cloudinary.com/settings/api-keys) and copy your **Cloud name**
2. Create an **Unsigned** upload preset named `portfolio_unsigned`  
   (Settings → Upload → Upload presets → Add → Signing Mode: Unsigned)

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_unsigned

# Server fallback (local dev /api/upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> `VITE_` variables are embedded at build time. Set them in Vercel before deploying.

### Contact form (optional)

```env
CONTACT_TO_EMAIL=roshankumarsingh021@gmail.com
VITE_WEB3FORMS_ACCESS_KEY=          # optional Web3Forms fallback
WEB3FORMS_ACCESS_KEY=               # server-side fallback
```

FormSubmit sends to the email in `src/data/portfolio.ts`. On first use, check your inbox for a FormSubmit activation link.

### AI Chatbot - Senku (required for chat widget)

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
```

> Server-side only. **Never** prefix with `VITE_` — that would expose the key in the client bundle. Set this in Vercel → Project → Settings → Environment Variables.

---

## Deploy on Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables (`VITE_CLOUDINARY_*`, `CLOUDINARY_*`, contact vars)
4. Deploy

`vercel.json` rewrites all non-API routes to `index.html` for SPA routing.

---

## Customizing content

Edit **`src/data/portfolio.ts`** to update:

- Personal info, social links, CV path
- Navigation links
- Stats, about text, skill categories
- Featured projects and certifications

For permanent project/certificate images visible to all visitors, either upload via the UI and commit Cloudinary URLs to `portfolio.ts`, or set `imageUrl` on each item.

---

## Featured projects

| Project | Focus |
|---------|--------|
| VAANI | AI voice civic engagement |
| Vibely | Real-time social platform |
| PHARMILY | Healthcare management |
| FleetWatch | AI fleet fraud detection |
| AKS Beauty Hut | E-commerce |

---

## Author

**Roshan Kumar Singh**  
Early-career Full-Stack Developer · Applied AI · B.Tech CSE

- Portfolio: [roshan-portfolio-indol.vercel.app](https://roshan-portfolio-indol.vercel.app)
- GitHub: [@roshan-1205](https://github.com/roshan-1205)
- LinkedIn: [roshan-kumar-singh-1205-dev](https://linkedin.com/in/roshan-kumar-singh-1205-dev)
- Email: roshankumarsingh021@gmail.com

---

## License

Private portfolio project. All rights reserved.
