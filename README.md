# DHANUSH G — Personal Developer Portfolio

A cinematic, modern, editorial-style personal developer portfolio built with **React 19 / 18 + Vite**, **React Router v6**, and **GSAP ScrollTrigger**. Designed around a signature **Midnight Black (`#0A0A0A`)**, **Electric Red (`#F0273D`)**, and **Acid Green (`#B7FF38`)** aesthetic, featuring a **Scroll-Driven Circular Mask Reveal** for project showcases inspired by Awwwards Deferred Damage.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Modular Project Architecture

```text
protfoli/
├── public/
│   ├── images/              # Optimized project & profile media assets
│   │   ├── dhanush_avatar.jpg
│   │   ├── project_traffic_ai.jpg
│   │   ├── project_railway_crowd.jpg
│   │   └── project_agronex.jpg
│   └── resume.pdf           # Optional downloadable resume file
│
├── src/
│   ├── assets/              # Bundled image and SVG assets
│   │   └── images/
│   │
│   ├── components/          # Reusable atomic UI components
│   │   ├── Navbar/          # Fixed blurred navbar with active link indicator & mobile drawer
│   │   ├── Footer/          # Minimal editorial footer with status badge & social links
│   │   ├── Button/          # Multi-variant button (Primary Red, Outline, Acid Green, Audio tone)
│   │   ├── ProjectCard/     # Editorial case-study cards with telemetry badges
│   │   ├── ScrollReveal/    # Scroll-triggered entrance animations using GSAP
│   │   └── Loader/          # Minimal monogram loading spinner
│   │
│   ├── pages/               # Routed page views
│   │   ├── Home/            # Landing page assembling hero, circular reveal, previews & CTA
│   │   ├── About/           # Editorial biography, philosophy, and verified credentials
│   │   ├── Projects/        # Full archive with category filtering (ML, Graph, Full-Stack)
│   │   ├── ProjectDetails/  # Dynamic case study route (/projects/:slug) with deep dive
│   │   ├── Skills/          # Organized competency matrix across 4 domains
│   │   ├── Achievements/    # 500+ LeetCode spotlight, hackathon podium, academics
│   │   ├── Contact/         # Interactive message transmission form & 1-click copy cards
│   │   └── NotFound/        # Custom 404 traversal error page
│   │
│   ├── sections/            # Full-page architectural sections
│   │   ├── Hero/            # Bold display typography, live telemetry counters, animated line
│   │   ├── FeaturedProjects/# Signature scroll-driven circular mask reveal (GSAP ScrollTrigger)
│   │   ├── Experience/      # Education timeline & campus leadership cards
│   │   └── ContactCTA/      # Closing banner with direct channels
│   │
│   ├── animations/          # Centralized animation logic
│   │   ├── circularReveal.js# GSAP pinned circular clip-path expansion engine
│   │   ├── scrollAnimations.js# Reusable fade-in & reveal helpers
│   │   └── transitions.js   # Web Audio tone synthesizer & navigation transitions
│   │
│   ├── data/                # Centralized data sources (easily edit your content here!)
│   │   ├── projects.js      # All project details, metrics, highlights, links, and cover images
│   │   ├── skills.js        # Categorized skill badges and proficiency highlights
│   │   ├── achievements.js  # LeetCode metrics, awards, and education history
│   │   └── socialLinks.js   # Direct links to GitHub, LinkedIn, LeetCode, Email, Phone
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollProgress.js# Live scroll percentage tracker
│   │   └── useReducedMotion.js # Accessibility support for prefers-reduced-motion
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx   # Shared master layout with ambient orbs, nav, and footer
│   │   └── MainLayout.css
│   │
│   ├── styles/              # Design system & tokens
│   │   ├── variables.css    # Colors (#0A0A0A, #F0273D, #B7FF38), typography, spacing
│   │   ├── typography.css   # Space Grotesk, Plus Jakarta Sans, JetBrains Mono styles
│   │   ├── utilities.css    # Red lines, green status pulses, roman badges
│   │   └── global.css       # CSS reset and root foundations
│   │
│   ├── App.jsx              # React Router v6 route configuration
│   └── main.jsx             # React 18 root mounting
│
├── index.html               # Vite HTML entry point with Google Fonts
├── package.json             # Project dependencies (react, react-router-dom, gsap, vite)
└── vite.config.js           # Vite build configuration with React plugin
```

---

## 🛠️ How to Customize Your Portfolio

### 1. Change Projects
Edit [`src/data/projects.js`](src/data/projects.js). Add or edit titles, slugs, summaries, metrics, bullet points, cover images, and GitHub URLs. The `/projects/:slug` case study pages will automatically generate.

### 2. Change Skills
Edit [`src/data/skills.js`](src/data/skills.js). You can add or rename domains and individual skills along with their highlights.

### 3. Change Achievements & Education
Edit [`src/data/achievements.js`](src/data/achievements.js) to update LeetCode counts, contest ratings, awards, or academic CGPA.

### 4. Change Contact Details & Social Handles
Edit [`src/data/socialLinks.js`](src/data/socialLinks.js). Updates your email, phone, GitHub, LinkedIn, and LeetCode handles site-wide.

### 5. Change Theme Colors & Design Tokens
Edit [`src/styles/variables.css`](src/styles/variables.css):
- Primary accent: `--red-primary: #F0273D;`
- Secondary accent: `--green-acid: #B7FF38;`
- Background: `--bg-black: #0A0A0A;`

### 6. Adjust Circular Mask Reveal Animation Speed & Easing
Edit [`src/animations/circularReveal.js`](src/animations/circularReveal.js). You can adjust scroll scrub sensitivity, ease curves, initial portal radius, and duration multipliers.
