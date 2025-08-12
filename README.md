# Quantro Dashboard

A modern, responsive cryptocurrency dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Track real-time market data, monitor the Fear & Greed Index, and make informed trading decisions.

## Features

- **Real-time Market Data**: Live cryptocurrency prices and market statistics from CoinGecko API
- **Fear & Greed Index**: Market sentiment analysis from Alternative.me API
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with persistent preferences
- **TypeScript**: Full type safety and better development experience
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Framework**: Next.js 14 with Pages Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **APIs**: CoinGecko, Alternative.me Fear & Greed Index

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quantro-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

The dashboard uses two external APIs:

1. **CoinGecko API** - For cryptocurrency market data
   - Endpoint: `https://api.coingecko.com/api/v3/coins/markets`
   - Data: Top 20 cryptocurrencies by market cap

2. **Alternative.me Fear & Greed Index** - For market sentiment
   - Endpoint: `https://api.alternative.me/fng/`
   - Data: Current market sentiment score and classification

## Project Structure

```
quantro-dashboard/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with header and dark mode toggle
│   ├── CoinTable.tsx   # Responsive table for cryptocurrency data
│   └── CoinRow.tsx     # Individual coin row component
├── pages/              # Next.js pages
│   ├── _app.tsx        # App wrapper
│   ├── index.tsx       # Landing page
│   └── dashboard.tsx   # Main dashboard with live data
├── styles/             # Global styles
│   └── globals.css     # Tailwind directives and custom styles
├── types/              # TypeScript type definitions
│   └── index.ts        # API response types
├── utils/              # Utility functions
│   └── format.ts       # Number formatting utilities
└── public/             # Static assets
```

## Features in Detail

### Fear & Greed Index
- Real-time sentiment score (0-100)
- Color-coded classification:
  - Green (70+): Greed/Extreme Greed
  - Yellow (40-69): Neutral/Fear
  - Red (<40): Extreme Fear
- Last updated timestamp

### Market Data Table
- Top 20 cryptocurrencies by market cap
- Columns: Rank, Coin (logo + name), Price, 24h Change, Market Cap, Volume
- Responsive design with mobile card layout
- Color-coded price changes (green for positive, red for negative)

### Dark Mode
- Toggle button in header
- Persistent preference stored in localStorage
- Smooth transitions between themes

## Deployment

This project is ready to deploy to Vercel with no additional configuration required:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

No environment variables are needed as the APIs used are public and don't require authentication.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- Real-time price updates with WebSocket
- Historical price charts
- Portfolio tracking
- Price alerts
- Additional technical indicators
- Integration with trading APIs
