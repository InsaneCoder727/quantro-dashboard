# Quantro Technologies - Crypto Dashboard

A professional cryptocurrency investment dashboard built with Next.js, TypeScript, and Tailwind CSS. Track real-time market data, sentiment analysis, interactive charts, and stay updated with the latest crypto news.

## 🚀 Features

### 📊 **Live Market Data**
- Real-time prices for top 50 cryptocurrencies
- Auto-refresh every 60 seconds
- Market cap, volume, and 24h change tracking
- Responsive table with mobile card view

### 🧠 **Sentiment Analysis**
- Fear & Greed Index integration
- Interactive gauge visualization
- Color-coded sentiment indicators
- Real-time sentiment updates

### 📈 **Interactive Charts**
- Historical price data visualization
- Multiple timeframes (1D, 7D, 30D, 90D, 1Y)
- Coin selection dropdown
- Responsive chart components

### 📰 **Crypto News Feed**
- Latest cryptocurrency news
- Auto-refresh every 5 minutes
- Clickable links to full articles
- Time-ago timestamps

### 🎨 **Modern UI/UX**
- Dark/Light mode toggle
- Responsive sidebar navigation
- Mobile-first design
- Professional styling with Tailwind CSS

### ⚡ **Performance Optimized**
- SWR for data fetching and caching
- Auto-refresh without page reloads
- Optimized for speed and reliability
- Error handling and retry logic

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.x (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd quantro-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
quantro-dashboard/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with sidebar
│   ├── Header.tsx      # Header with theme toggle
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── CoinTable.tsx   # Cryptocurrency table
│   ├── CoinRow.tsx     # Individual coin row
│   ├── SentimentWidget.tsx  # Fear & Greed Index
│   ├── NewsFeed.tsx    # Crypto news feed
│   └── PriceChart.tsx  # Interactive charts
├── pages/              # Next.js pages
│   ├── index.tsx       # Landing page
│   ├── dashboard.tsx   # Main dashboard
│   ├── prices.tsx      # Prices page
│   ├── sentiment.tsx   # Sentiment analysis
│   ├── charts.tsx      # Price charts
│   ├── news.tsx        # News feed
│   └── portfolio.tsx   # Portfolio (coming soon)
├── utils/              # Utility functions
│   ├── api.ts          # SWR hooks and API functions
│   └── format.ts       # Number formatting utilities
├── types/              # TypeScript type definitions
│   └── index.ts        # API response types
└── styles/             # Global styles
    └── globals.css     # Tailwind directives
```

## 🔌 API Endpoints

### CoinGecko API
- **Market Data**: `https://api.coingecko.com/api/v3/coins/markets`
- **Historical Data**: `https://api.coingecko.com/api/v3/coins/{id}/market_chart`
- **Rate Limit**: 50 calls/minute (free tier)

### Alternative.me API
- **Fear & Greed Index**: `https://api.alternative.me/fng/`
- **Rate Limit**: No strict limits

### CryptoPanic API
- **Crypto News**: `https://cryptopanic.com/api/v1/posts/`
- **Rate Limit**: 1000 calls/day (free tier)

## 🎯 Key Features

### Auto-Refresh
- Market data refreshes every 60 seconds
- Sentiment data refreshes every 5 minutes
- News feed refreshes every 5 minutes
- All updates happen without page reload

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Table transforms to cards on small screens
- Touch-friendly interface

### Dark Mode
- Persistent theme preference
- Smooth transitions
- Optimized for both light and dark themes

### Error Handling
- Graceful error states
- Retry mechanisms
- User-friendly error messages
- Fallback content

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. No additional configuration needed

### Manual Deployment
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for API keys (if needed):
```env
# Currently using free APIs - no keys required
NEXT_PUBLIC_APP_NAME=Quantro Technologies
```

### Customization
- Modify `tailwind.config.js` for theme customization
- Update `next.config.js` for build optimization
- Edit `utils/api.ts` for API endpoint changes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the documentation
- Review existing issues
- Create a new issue with details

---

**Built with ❤️ by Quantro Technologies**
