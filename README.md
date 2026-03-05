# Do Good

A mobile app prototype for connecting people with charities and causes they care about. Built with React and Vite.

## About

**Do Good** helps users discover and support charitable causes through donations, volunteering, fundraising, and events. The prototype includes:

- **Home screen** — Search for causes, browse trending causes (Hurricane Jesse, Pediatric Leukemia, Wildfires), nearby charities, and recently supported organizations
- **Cause flow** — Select a trending cause, choose how to help (Donate, Volunteer, Fundraise, Attend an event), then browse the most impactful charities for that cause
- **Donation flow** — Multi-step checkout: select charity → choose amount → set frequency → enter payment → confirmation with impact summary
- **Volunteer flow** — Browse open volunteer opportunities by charity with real-time openings
- **Profile** — Summary of charitable activity including total donated, hours volunteered, active recurring donations, giving breakdown by cause, and recent activity
- **Good Job** — A Spotify Wrapped-style year-in-review celebrating the user's charitable impact with animated slides
- **Side menu** — Navigation with Home, Favorites, Impact Report, Tax Documents, Settings, and Help

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd do-good-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

### Preview Production Build

```bash
npm run preview
```

## Design

- **Color palette**: Background `#ede7e3`, Primary `#16697a`, Secondary `#489fb5`, Tertiary `#82c0cc`, Accent `#ffa62b`
- **Typography**: Nunito (headings), DM Sans (body)
- **Layout**: Mobile-first, max-width 420px

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- No external UI libraries — all components are custom-built

## Note

This is a **prototype for demonstration purposes only**. No real payments are processed, no real data sources are connected, and it is not intended for app store deployment.
