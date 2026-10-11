# বাজার দর | BazarDor

**BazarDor** is a Bengali-language market price guide that helps people quickly
check everyday product prices, see how prices are changing, and compare prices
reported across local markets.

## Technologies

| Area | Technology |
| --- | --- |
| Web framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS 4, HeroUI |
| Authentication | Better Auth |
| Database | MongoDB |
| Icons and notifications | React Icons, React Toastify |
| Market data | Programming Hero BazarDor API |

## Key features

1. **Today’s prices at a glance** — Browse current prices for everyday
   essentials, with product categories and units shown in Bengali.
2. **Price-change highlights** — Quickly find products whose prices have risen
   or fallen, with the percentage change displayed.
3. **Category browsing and sorting** — Explore products by category and sort
   them by price from high to low or low to high.
4. **Detailed product and market comparisons** — Review a product’s current,
   previous-day, previous-week, and previous-month prices, plus reported
   minimum and maximum prices by market and division.
5. **Accounts and profile management** — Register or sign in with email,
   Google, or GitHub, then update your profile name.

## Getting started

### Prerequisites

- Node.js and npm
- A MongoDB connection string
- Google and GitHub OAuth credentials if you want to enable those sign-in
  providers

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

### Environment variables

Create a `.env` file in the project root and set the values required by the
authentication configuration:

```env
BETTER_AUTH_MONGODB_URL=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Keep credentials private. Never commit real secrets to source control.

## Available scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Serve the production build
```
