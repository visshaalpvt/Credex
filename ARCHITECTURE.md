# System Architecture — Credex AI Spend Audit

## High-Level Overview

The application is built as a modern, high-performance Next.js 15 web application. It follows a client-side first approach for privacy and speed, with optional backend integrations for lead capture and public report sharing.

## Component Architecture

### 1. Frontend Layer (Next.js)
- **App Router**: Handles routing and layouts.
- **Client Components**: All interactive elements (Form, Dashboard, Charts) use Framer Motion for premium animations.
- **Server Components**: Used for static landing page sections and public report rendering.

### 2. Audit Engine (Business Logic)
- Located in `src/lib/audit-engine.ts`.
- Pure function that takes `AuditItem[]` and returns `AuditResult`.
- Logic is separated from the UI to allow for unit testing and future API-side execution.

### 3. Data Persistence
- **LocalStorage**: Primary persistence for user data during the audit flow.
- **Supabase (Planned)**: For storing shared reports and lead information.

### 4. Design System
- Built on **Tailwind CSS v4**.
- Uses **shadcn/ui** for accessible, themeable components.
- Custom premium dark mode tokens defined in `globals.css`.

## Data Flow

1. **User Input**: User adds tools in the Audit Page. Data is synced to `localStorage` on every change.
2. **Analysis**: On "Generate Audit", the `performAudit` function runs.
3. **Gating**: Results Page checks for `userEmail` in `localStorage`. If missing, `LeadCaptureModal` is shown.
4. **Visualization**: Data is passed to Recharts components for visual breakdown.
5. **Insights**: Audit data is summarized into a human-readable format.

## API Endpoints (Planned)

- `POST /api/audit`: Store audit data and generate share link.
- `POST /api/lead`: Store contact info.
- `GET /api/audit/[id]`: Retrieve shared audit data.
