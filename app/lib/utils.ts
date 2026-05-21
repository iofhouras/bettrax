import { Bet, BetStatus } from './types';

export function convertOdds(odds: number, from: 'american' | 'decimal' | 'fractional', to: 'american' | 'decimal' | 'fractional'): number {
  let decimal: number;

  // Convert to decimal first
  if (from === 'american') {
    if (odds > 0) {
      decimal = 1 + (odds / 100);
    } else {
      decimal = 1 + (100 / Math.abs(odds));
    }
  } else if (from === 'decimal') {
    decimal = odds;
  } else {
    // Fractional e.g. 5/2 = 2.5
    // For simplicity, assume input is decimal for fractional in this demo
    decimal = odds;
  }

  // Convert from decimal to target
  if (to === 'american') {
    if (decimal >= 2) {
      return Math.round((decimal - 1) * 100);
    } else {
      return Math.round(-100 / (decimal - 1));
    }
  } else if (to === 'decimal') {
    return Math.round(decimal * 100) / 100;
  } else {
    // Fractional
    const frac = decimal - 1;
    return Math.round(frac * 100) / 100; // Simplified
  }
}

export function calculateProfit(stake: number, odds: number, status: BetStatus): number {
  if (status === 'won') {
    const decimal = odds > 0 ? 1 + (odds / 100) : 1 + (100 / Math.abs(odds));
    return Math.round((decimal - 1) * stake * 100) / 100;
  } else if (status === 'lost') {
    return -stake;
  } else if (status === 'push' || status === 'cancelled') {
    return 0;
  }
  return 0; // pending
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatOdds(odds: number, format: 'american' | 'decimal' | 'fractional' = 'american'): string {
  if (format === 'american') {
    return odds > 0 ? `+${odds}` : `${odds}`;
  } else if (format === 'decimal') {
    const decimal = odds > 0 ? 1 + (odds / 100) : 1 + (100 / Math.abs(odds));
    return decimal.toFixed(2);
  } else {
    const decimal = odds > 0 ? 1 + (odds / 100) : 1 + (100 / Math.abs(odds));
    const frac = decimal - 1;
    return `${frac.toFixed(1)}/1`;
  }
}

export function getStatusColor(status: BetStatus): string {
  switch (status) {
    case 'won': return 'status-won';
    case 'lost': return 'status-lost';
    case 'pending': return 'status-pending';
    case 'push': return 'status-push';
    case 'cancelled': return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    default: return 'bg-zinc-800 text-zinc-400';
  }
}

export function calculateWinRate(bets: Bet[]): number {
  const settled = bets.filter(b => b.status === 'won' || b.status === 'lost');
  if (settled.length === 0) return 0;
  const wins = settled.filter(b => b.status === 'won').length;
  return Math.round((wins / settled.length) * 100);
}

export function getCurrentStreak(bets: Bet[]): { type: 'win' | 'loss'; count: number } {
  const sorted = [...bets]
    .filter(b => b.status === 'won' || b.status === 'lost')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sorted.length === 0) return { type: 'win', count: 0 };
  
  const firstStatus = sorted[0].status;
  let count = 0;
  for (const bet of sorted) {
    if (bet.status === firstStatus) {
      count++;
    } else {
      break;
    }
  }
  return { 
    type: firstStatus === 'won' ? 'win' : 'loss', 
    count 
  };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}