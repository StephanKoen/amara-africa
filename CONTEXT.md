---

# Traivio — Project Context & Build State

## What Traivio Is
Traivio is an AI-powered corporate travel analytics SaaS 
platform built by Stephan Koen under Calibrate Travel & 
Analytics. It is a standalone independent product, separate 
from BTM (Bespoke Travel Management).

Live URL: https://traivio-murex.vercel.app
GitHub: StephanKoen/Traivio (main branch)
Deployed via: Vercel (auto-deploys from main branch)

## Tech Stack
- React + Vite (JSX not TSX)
- Recharts for charts
- Papaparse for CSV parsing
- SheetJS (xlsx) for Excel parsing
- jsPDF for PDF generation (pure programmatic — no html2canvas)
- Leaflet + react-leaflet for maps
- Lucide React for icons
- Inter font from Google Fonts
- PptxGenJS for PowerPoint export

## Design System
- Background: #F5F4FF
- Sidebar: #1a0533 (deep dark purple)
- Primary: #7C3AED
- Secondary: #8B5CF6
- Accent: #EC4899
- Cards: white, border 1px solid #EDE9FE, border-radius 14px
- Font: Inter (Google Fonts)
- Hero gradient: linear-gradient(135deg, #2D1B69, #7C3AED, #EC4899)

## Demo Configuration
- Demo user: Ristine (initials RI, Travel Manager)
- Organization: Acme Corporation (New York)
- Currency: USD ($ symbol everywhere — never ZAR or R)
- Total demo spend: ~$2.8M
- Demo data: US-centric routes, US vendors, US traveler names
- Demo data file: src/data/demoData.js

## Key Files & What They Do
src/App.jsx — main router, wraps everything in providers
src/context/TravelDataContext.jsx — global data state, 
  filteredRecords, filteredStats, isDemo flag, currency
src/context/AuthContext.jsx — demo auth (real Supabase auth pending)
src/data/demoData.js — 50 demo records + computeStats()
src/data/riskData.js — 12 risk events with lat/lng
src/data/newsData.js — 12 travel news items
src/utils/cfoReportPDF.js — pure jsPDF CFO executive report
src/utils/pdfExport.js — 7 preset report PDF generators
src/utils/pptxExport.js — PowerPoint export
src/utils/dataParser.js — CSV/Excel parser with column detection
src/utils/parseSpotnanaExport.js — Spotnana specific parser
src/utils/riskMatcher.js — matches risk events to bookings
src/utils/anthropicClient.js — shared API client with retry logic
src/components/DemoBanner.jsx — amber/green banner top of every page
src/components/UpgradeBanner.jsx — upgrade CTA bottom of every page
src/components/NewsTicker.jsx — scrolling news ticker
src/components/FilterPills.jsx — date/dept/region/traveler filters
src/components/TransactionModal.jsx — booking detail popup
src/components/Sidebar.jsx — navigation (TMC portal hidden)
src/components/Topbar.jsx — page header with actions
src/pages/Overview.jsx — main dashboard
src/pages/FareDiscrepancies.jsx
src/pages/FraudCompliance.jsx
src/pages/SavingsOpportunities.jsx
src/pages/UnusedCredits.jsx
src/pages/ContractOpportunities.jsx
src/pages/ReportsAnalytics.jsx — 7 preset reports + NL query
src/pages/PredictiveInsights.jsx
src/pages/AIAnalyst.jsx — Claude-powered chat
src/pages/RiskIntelligence.jsx — live map + alert feed
src/pages/UploadData.jsx — dual upload cards + Spotnana option
src/pages/Pricing.jsx — 3 tier pricing (pending)
src/pages/Settings.jsx — account settings (pending)

## Navigation Structure
MAIN: Overview, Upload data, Fare discrepancies, 
      Fraud & compliance, Savings
REPORTS: Reports & analytics, Unused credits, Contracts
INTELLIGENCE: Risk intelligence, Predictive insights, 
              AI analyst
TMC PORTAL: Hidden for now — code intact, just not in nav

## API Keys & Environment Variables
VITE_ANTHROPIC_API_KEY — set in Vercel (claude-sonnet-4-20250514)
VITE_SUPABASE_URL — pending setup
VITE_SUPABASE_ANON_KEY — pending setup
VITE_STRIPE_PUBLISHABLE_KEY — pending setup

## AI Configuration
Model: claude-sonnet-4-20250514
Retry logic: 3 retries on 529 errors (3s, 6s, 12s backoff)
AI Analyst system prompt: injects full data context in USD
All AI outputs must use USD — never ZAR or Rand

## Upload System
Three upload options on /upload:
1. Template Upload — 100% accurate, uses Traivio CSV/Excel template
2. Smart AI Upload — any format, AI column detection, 
   shows mapping confirmation screen with disclaimer
3. Spotnana All Transactions — auto-detected, skips mapping,
   header row is at index 6 (file has 5 metadata rows at top)
   Primary cost field: 'Gross Spend (Billing Currency)' ONLY
   Do NOT sum multiple cost columns

## PDF Reports
All PDFs use pure jsPDF (no html2canvas).
Currency must always come from stats.currency.
CFO Report: src/utils/cfoReportPDF.js
7 Preset Reports: src/utils/pdfExport.js
All reports show org name, date range, currency symbol.

## Known Issues / Pending Fixes
- Spotnana upload showing $27.8M (should be ~$5.5M) — 
  caused by summing multiple cost columns, fix: use only
  'Gross Spend (Billing Currency)'
- City pairs showing "undefined→undefined" for Spotnana 
  uploads — origin/destination not in Spotnana columns,
  needs extraction from Trip Name field
- PDF reports still showing Rand on some outputs —
  currency detection needs to pass stats.currency to 
  money() formatter
- Transaction detail modal not yet wired to all alert CTAs
- Supabase + Stripe not yet connected
- Date range filter pills work but don't persist on refresh

## Pending Build Queue (in order)
1. Fix Spotnana spend calculation + city pairs + PDF currency
2. Rich demo data update (Ristine, USD, $2.8M, US routes,
   rich fields: violationType, policyNote, purposeOfTravel)
3. Transaction detail modal wired to all alert click events
4. Supabase auth + database (schema.sql ready)
5. Stripe billing (3 plans: $299/$799/$1999)
6. Persona reports (CFO / Travel Manager / CEO / Risk)
7. traivio.ai domain connection

## Monetization Model
Free: one-time demo upload, no AI, no PDF
Starter: $299/month — 500 trips, all features
Professional: $799/month — 2000 trips, custom branding
TMC Plan: $1999/month — unlimited, white label
Enterprise: custom

## Business Context
- Owner: Stephan Koen (Cape Town, South Africa)
- Parent company: Calibrate Travel & Analytics
- Related business: BTM (Bespoke Travel Management) 
  runs on Spotnana platform
- Target market: Corporate travel managers + CFOs
- Key differentiator: AI that connects world events to 
  YOUR specific traveler bookings in real time
- TMC strategy: Hidden for now, referral model planned 
  with Solutions Travel (20% recurring commission)

## Git Branch Notes
All Claude Code work goes to claude/resume-interrupted-work-EyL56
Must merge to main for Vercel to auto-deploy to production.
After every session run:
  git checkout main
  git merge claude/resume-interrupted-work-EyL56
  git push origin main

## How To Start Every Session
Read this file first. Then run:
  git status
  npm run build
Confirm build is clean before making any changes.

---
