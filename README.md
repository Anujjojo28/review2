# NexusCMS - Collaborative Content Management System

A high-performance Content Management System built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. NexusCMS empowers non-technical teams and content authors to design, optimize, collaborate on, and publish web experiences with zero technical roadblocks.

---

## 🌟 Key Features & Project Modules

### 1. 🛡️ Admin Module
- **Executive Operations Dashboard**: Quick overview of total pageviews, unique visitors, live published pages, and pending approvals.
- **Visual Drag-and-Drop Page Builder**:
  - Flexible canvas with modular component blocks (Hero, Features Grid, Rich Text, Stats Counter, Image Banner, Testimonials, FAQ Accordion, Call-to-Action, and Contact Form).
  - Drag and drop blocks onto the canvas and easily reorder blocks up or down.
  - Multi-device viewport toggling: **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)**.
  - Real-time side inspector for headlines, body copy, call-to-action buttons, background colors, text colors, padding, and list items.
- **Collaborative Approval Workflow**:
  - Multi-tier editorial quality control: `Draft` &rarr; `Pending Review` &rarr; `Approved / Published` (or `Rejected / Changes Requested`).
  - Admins can inspect submitted pages, write reviewer feedback notes, approve and publish directly, or request changes.
- **Built-in SEO Tools & Diagnostics**:
  - Real-time SEO Health Score (0-100) with rating badges.
  - Meta Title & Meta Description editors with optimal character count indicators.
  - Focus keyword density tracking.
  - Live **Google SERP** search result snippet mockup.
  - Live **OpenGraph Social Card** preview for social networks.
  - Robots indexing toggle (`index, follow` vs `noindex, nofollow`).
- **Real-Time Analytics Dashboard**:
  - Pageviews counter, unique visitors, bounce rate, and average reading time.
  - Interactive 7-day traffic trend chart.
  - Viewport/Device distribution breakdown (Desktop, Mobile, Tablet).
  - Top-performing pages leaderboard with live preview links.
- **User Roles & Permissions (RBAC)**:
  - Role management for **Admin**, **Editor**, and **Viewer**.
  - Dynamic role promotion and instant testing identity switcher.
- **Curated Templates Center**:
  - Jumpstart page creation with pre-built blueprints (Modern SaaS Landing, Editorial Blog, Company About & Contact).

---

### 2. ✍️ User / Editor Module
- **Personalized Workspace**:
  - Displays drafts and pages authored by the user.
  - Track review status in real time: Drafts in progress, pages submitted for review, and approved published pages.
- **Collaborative Submission**:
  - Authors can compose pages in the visual builder and click **"Submit for Review"** with custom reviewer notes.
  - View administrator feedback comments and edit drafts for re-submission.

---

### 3. 🌐 Public Website / Viewer Module
- **Live Dynamic Page Rendering**:
  - High-speed client-side rendering of all published pages (`/home`, `/about-us`, etc.).
  - Dynamic navigation bar linking to all published pages.
  - Interactive components: Expandable FAQ accordions, working contact inquiry forms with submission toasts, and CTA buttons.
  - Automatic pageview and analytics recording on every visit.

---

### 4. 🔐 Login & Signup (Local Storage Authentication)
- Full client-side authentication persisted in `localStorage`.
- New user registration with role selection.
- Credential validation and session persistence across browser refreshes.
- **Pre-configured Demo Accounts**:
  - **Admin**: `admin@cms.com` / `password123` (Sarah Connor - Full Admin Access)
  - **Editor**: `editor@cms.com` / `password123` (David Miller - Content Author)
  - **Viewer**: `user@cms.com` / `password123` (Elena Rostova - Public Reader)
- One-click quick login buttons to switch roles without retyping credentials.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation & Launch
```bash
# 1. Navigate to the project directory
cd cms-react-vite

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev

# 4. Open in browser (typically http://localhost:5173)
```

### Production Build
```bash
npm run build
```

---

## ☁️ Vercel Deployment Guide

This project is fully optimized and configured for seamless deployment on [Vercel](https://vercel.com).

### Included Vercel Configuration (`vercel.json`)
A `vercel.json` file is included in the project root with the following Single Page Application (SPA) rewrite rules to ensure dynamic routes and page slugs resolve cleanly without 404 errors:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deployment Method 1: Instant Vercel CLI (Recommended)
```bash
# 1. From inside the project folder:
cd cms-react-vite

# 2. Run the production build to verify everything compiles:
npm run build

# 3. Deploy using the Vercel CLI:
npx vercel --prod
```
Follow the terminal prompts:
- Confirm directory: `.`
- Link to existing project: `N`
- Project name: `nexus-cms-react-vite` (or your chosen name)
- In which directory is your code located: `./`
- Default settings for Vite will be automatically detected (`dist` output folder, `npm run build`).

### Deployment Method 2: Git Repository & Vercel Dashboard
1. Initialize Git and commit the files:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial release of NexusCMS React + Vite"
   ```
2. Push your repository to GitHub, GitLab, or Bitbucket.
3. Visit [vercel.com/new](https://vercel.com/new) and select **Import Git Repository**.
4. Vercel automatically detects the **Vite** framework preset:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or `cms-react-vite`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your application will be live at `https://<your-project>.vercel.app` in less than a minute!

---

## 📁 Project Architecture & File Organization

```
cms-react-vite/
├── vercel.json                  # Vercel SPA routing rewrite configuration
├── package.json                 # Dependencies and scripts (React 19, Vite, Tailwind v4, Lucide)
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── tsconfig.json                # TypeScript root configuration
├── tsconfig.app.json            # TypeScript bundler compiler options
├── index.html                   # HTML entry point with meta tags & Google fonts
└── src/
    ├── types/
    │   └── index.ts             # TypeScript interfaces (User, Page, Block, SEO, Template, Comment, Analytics)
    ├── data/
    │   ├── defaultBlocks.ts     # Component block blueprints & factory functions
    │   └── seedData.ts          # Sample pages, users, templates, and analytics
    ├── context/
    │   ├── AuthContext.tsx      # LocalStorage user authentication & session management
    │   └── CMSContext.tsx       # Page CRUD, reordering, workflow approvals, SEO scoring, analytics
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.tsx       # Top bar with role switchers, mode toggle & profile
    │   │   ├── Sidebar.tsx      # Left navigation for Admin and Editor operations
    │   │   ├── NewPageModal.tsx # Fast page creator modal with template picker
    │   │   └── DevicePreviewBar.tsx # Desktop, Tablet, Mobile responsive preview switcher
    │   └── builder/
    │       ├── BlockLibrary.tsx # Palette of draggable / clickable component blocks
    │       ├── BlockRenderer.tsx# Live renderer for Hero, Features, Text, Stats, Banner, Quotes, FAQ, Form
    │       ├── BlockInspector.tsx# Side property editor (colors, copy, padding, alignment, items)
    │       └── SeoInspector.tsx # Real-time SEO scorecard, SERP preview, and OpenGraph card
    ├── pages/
    │   ├── admin/
    │   │   ├── Dashboard.tsx    # Executive KPI overview & recent activity
    │   │   ├── PageList.tsx     # Comprehensive table with filters, search, and batch actions
    │   │   ├── PageEditor.tsx   # Visual Drag-and-Drop Page Builder
    │   │   ├── WorkflowApprovals.tsx # Collaborative review queue with feedback notes
    │   │   ├── AnalyticsView.tsx# Pageviews, visitor graphs, and audience viewports
    │   │   ├── TemplatesView.tsx# Pre-built design blueprints library
    │   │   ├── UsersView.tsx    # RBAC user & role management
    │   │   ├── SeoAuditView.tsx # Site-wide SEO audit and recommendations
    │   │   └── VercelDeployView.tsx # In-app deployment guide and verification
    │   ├── user/
    │   │   └── MySubmissions.tsx# Personalized workspace for Editors & Contributors
    │   ├── public/
    │   │   ├── PublicLayout.tsx # Live website public layout with dynamic navbar
    │   │   └── LivePage.tsx     # Dynamic slug-based renderer with view tracker
    │   └── auth/
    │       ├── LoginPage.tsx    # Sign in with email/password & 1-click demo role switches
    │       └── SignupPage.tsx   # Registration with role assignment
    ├── App.tsx                  # Root state router and module controller
    ├── main.tsx                 # Application mounting point
    └── index.css                # Tailwind CSS v4 directives & custom scrollbars
```
