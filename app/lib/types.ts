export type BetStatus = 'pending' | 'won' | 'lost' | 'push' | 'cancelled';

export type BetType = 
  | 'moneyline' 
  | 'spread' 
  | 'total' 
  | 'prop' 
  | 'parlay' 
  | 'futures' 
  | 'teaser';

export type OddsFormat = 'american' | 'decimal' | 'fractional';

export interface Bet {
  id: string;
  date: string; // ISO string
  sport: string;
  league?: string;
  event: string;
  betType: BetType;
  selection: string;
  odds: number; // American odds (e.g. -110, +150)
  oddsFormat: OddsFormat;
  stake: number;
  bookmaker: string;
  status: BetStatus;
  profit: number;
  notes?: string;
  tags?: string[];
  imageUrl?: string;
  createdAt: string;
}

export interface BankrollTransaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'payout';
  amount: number;
  description: string;
  betId?: string;
}

export interface AnalyticsData {
  totalBets: number;
  winRate: number;
  totalProfit: number;
  roi: number;
  biggestWin: number;
  biggestLoss: number;
  currentStreak: { type: 'win' | 'loss'; count: number };
  avgOdds: number;
  bySport: Array<{ sport: string; bets: number; profit: number; roi: number }>;
  byBookmaker: Array<{ bookmaker: string; bets: number; profit: number; roi: number }>;
  monthlyTrend: Array<{ month: string; profit: number; bets: number }>;
}