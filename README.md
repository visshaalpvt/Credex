# Credex AI Spend Audit

> "Discover hidden AI subscription waste in under 2 minutes."

Credex AI Spend Audit is a free tool designed for startups to identify unnecessary AI subscription costs, detect overlapping capabilities, and provide personalized savings recommendations.

## Features

- **Audit Engine**: 4 proprietary algorithms to detect duplicates, unused seats, and plan downgrades.
- **Premium Dashboard**: Visual spend distribution and current vs. optimized comparison charts.
- **AI-Powered Insights**: Founder-friendly summaries generated based on your specific stack.
- **Persistence**: Automatically saves your progress locally so you don't lose data.
- **Lead Magnet**: Integrated lead capture system to convert visitors into qualified leads.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Styling**: shadcn/ui, Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Persistence**: localStorage
- **State Management**: React Hooks

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Audit Logic

The tool implements four key detection layers:
1. **Duplicate Capability**: Identifies multiple tools in the same category (e.g., ChatGPT + Claude).
2. **Unused Seats**: Flags high seat counts for tools with low usage frequency.
3. **Plan Downgrade**: Suggests moving from Enterprise to Team/Pro plans for low-usage teams.
4. **Tool Consolidation**: Detects generalist tools that cover all features of niche tools.

---
Built by Antigravity for Credex.
