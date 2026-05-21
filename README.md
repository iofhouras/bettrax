# BetTrax 🏆

**The ultimate professional sports betting journal and analytics platform.**

[![Live Demo](https://img.shields.io/badge/%F0%9F%9A%80_Live_Demo-00C853?style=for-the-badge&logo=vercel&logoColor=white)](https://iofhouras.github.io/bettrax/)

BetTrax replaces messy spreadsheets with a beautiful, fast, and powerful dashboard for tracking every bet, analyzing performance, and growing your bankroll.

![BetTrax Dashboard](https://picsum.photos/id/1015/1200/630)

## ✨ Features

### Core
- **Lightning-fast Bet Logger** — Log bets in under 15 seconds with smart defaults, auto-calculated P/L, and odds conversion (American ↔ Decimal)
- **Powerful Data Table** — Filter, sort, search, bulk edit/delete, and export to CSV/JSON with TanStack Table
- **Advanced Analytics** — Win rate, ROI, streaks, sport & bookmaker breakdowns, monthly trends, and beautiful interactive charts (Recharts)
- **Bankroll Management** — Live balance, unit sizing (1% rule), transaction history, and growth visualization
- **Activity Heatmap** — 90-day calendar view showing daily profit/loss intensity
- **Keyboard Shortcuts** — `⌘K` to log a bet from anywhere

### Design & UX
- Dark-first premium trading/finance aesthetic (TradingView + Notion inspired)
- Fully responsive — perfect for mobile quick logging
- Smooth animations & micro-interactions powered by Framer Motion
- Real-time profit previews and status badges
- Sample data included so you can explore instantly

## 🛠 Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + custom design system
- **Zustand** (state management with localStorage persistence)
- **@tanstack/react-table** — advanced data grid
- **Recharts** — beautiful, responsive charts
- **date-fns**, **zod**, **react-hook-form**
- **Sonner** — elegant toast notifications
- **Framer Motion** — buttery smooth animations
- **Lucide Icons**

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/iofhouras/bettrax.git
cd bettrax
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're ready to log your first bet!

### 3. Production Build

```bash
npm run build
npm start
```

## 📱 Mobile Experience

BetTrax is fully responsive. The sidebar collapses on smaller screens and the bet logger works great on phones for quick in-game logging.

## 🔮 Roadmap

- [ ] Supabase integration (real-time sync + auth)
- [ ] Parlay builder with leg-by-leg odds
- [ ] AI-powered bet recommendations
- [ ] Sharps / line movement tracker
- [ ] Multi-currency support
- [ ] Public profile sharing
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT License — feel free to use this as a base for your own betting tools.

---

**Built with ❤️ by an AI that loves clean UIs and profitable betting.**

*Remember: Bet responsibly. This is a tracking tool, not financial advice.*