'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { BetForm } from '@/components/BetForm';
import { BetTable } from '@/components/BetTable';
import { Analytics } from '@/components/Analytics';
import { Bankroll } from '@/components/Bankroll';
import { useBetStore } from '@/app/lib/store';
import { formatCurrency } from '@/app/lib/utils';
import { Toaster, toast } from 'sonner';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar 
} from 'lucide-react';
import { format } from 'date-fns';

export default function BetTraxDashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'bets' | 'analytics' | 'bankroll'>('dashboard');
  const [isBetFormOpen, setIsBetFormOpen] = useState(false);
  const { bets, bankroll, getAnalytics } = useBetStore();
  const analytics = getAnalytics();

  const recentBets = [...bets]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Keyboard shortcut: Cmd/Ctrl + K to open bet form
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsBetFormOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddBet = () => {
    setIsBetFormOpen(true);
  };

  const winRate = analytics.winRate;
  const totalProfit = analytics.totalProfit;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onViewChange={(view) => setCurrentView(view as any)} 
        onAddBet={handleAddBet} 
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-72">
        {/* Top Navigation Bar */}
        <div className="h-16 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl flex items-center px-8 fixed right-0 left-72 z-40">
          <div className="flex-1 flex items-center gap-4">
            <div className="text-sm text-zinc-400">Welcome back, Jordan</div>
            <div className="px-3 py-1 text-[10px] bg-emerald-500/10 text-emerald-400 rounded-full font-mono tracking-widest">LIVE • 12 ACTIVE BETS</div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-zinc-900 px-4 py-1.5 rounded-2xl border border-zinc-800">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-mono text-xs">SYNCED</span>
            </div>
            
            <button 
              onClick={() => {
                const { exportData } = useBetStore.getState();
                exportData();
                toast.success("Data exported successfully");
              }}
              className="text-xs px-4 py-2 border border-zinc-700 rounded-2xl hover:bg-zinc-900"
            >
              EXPORT ALL DATA
            </button>
          </div>
        </div>

        <div className="pt-16 p-8 max-w-[1480px] mx-auto">
          {/* DASHBOARD VIEW */}
          {currentView === 'dashboard' && (
            <div className="space-y-10">
              {/* Hero Stats */}
              <div>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="uppercase tracking-[3px] text-xs text-zinc-500">MAY 20, 2026 • 9:41 PM</div>
                    <h1 className="text-7xl font-semibold tracking-tighter mt-1">Good evening, Jordan.</h1>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-zinc-500">CURRENT BANKROLL</div>
                    <div className="text-6xl font-semibold tabular-nums tracking-tight text-emerald-400 mt-1">
                      {formatCurrency(bankroll)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { 
                      icon: TrendingUp, 
                      label: "TOTAL PROFIT", 
                      value: formatCurrency(totalProfit), 
                      change: `${analytics.roi}% ROI`, 
                      positive: totalProfit >= 0 
                    },
                    { 
                      icon: Target, 
                      label: "WIN RATE", 
                      value: `${winRate}%`, 
                      change: `${analytics.settledBets} bets settled`, 
                      positive: winRate > 52 
                    },
                    { 
                      icon: Award, 
                      label: "BIGGEST WIN", 
                      value: formatCurrency(analytics.biggestWin), 
                      change: "This month", 
                      positive: true 
                    },
                    { 
                      icon: Calendar, 
                      label: "CURRENT STREAK", 
                      value: `${analytics.currentStreak.count} ${analytics.currentStreak.type.toUpperCase()}`, 
                      change: "Keep it going!", 
                      positive: analytics.currentStreak.type === 'win' 
                    },
                  ].map((stat, index) => (
                    <div key={index} className="bet-card bg-zinc-900 border border-zinc-800 rounded-3xl p-8 group">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-zinc-500 mb-4">{stat.label}</div>
                          <div className={`text-5xl font-semibold tabular-nums tracking-tighter ${stat.positive ? 'text-white' : 'text-red-400'}`}>
                            {stat.value}
                          </div>
                        </div>
                        <stat.icon className="w-8 h-8 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <div className="mt-8 text-sm text-zinc-500">{stat.change}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions + Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Quick Log */}
                <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-9 flex flex-col">
                  <div className="text-xl font-semibold mb-4">Quick Bet Logger</div>
                  <p className="text-zinc-400 text-sm max-w-xs">Log bets in seconds. All the details you need for perfect tracking.</p>
                  
                  <button 
                    onClick={handleAddBet}
                    className="mt-auto w-full py-4 bg-white text-black rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-zinc-100 active:scale-[0.985] transition-all text-sm"
                  >
                    LOG A NEW BET NOW
                  </button>
                  
                  <div className="text-[10px] text-center text-zinc-500 mt-4">⌘K to open anywhere</div>
                </div>

                {/* Recent Bets */}
                <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-9">
                  <div className="flex items-center justify-between mb-6">
                    <div className="font-semibold">Recent Activity</div>
                    <button 
                      onClick={() => setCurrentView('bets')}
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      VIEW ALL BETS →
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentBets.length > 0 ? recentBets.map((bet, index) => (
                      <div key={index} className="flex items-center justify-between py-4 border-b border-zinc-800 last:border-0 group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-mono ${bet.status === 'won' ? 'bg-emerald-500/10 text-emerald-400' : bet.status === 'lost' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {bet.sport.slice(0, 3).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-sm group-hover:text-emerald-400 transition-colors">{bet.selection}</div>
                            <div className="text-xs text-zinc-500">{bet.event} • {format(new Date(bet.date), 'MMM dd')}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-semibold tabular-nums text-sm ${bet.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {bet.profit >= 0 ? '+' : ''}{formatCurrency(bet.profit)}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">{bet.bookmaker}</div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-12 text-zinc-500">No bets logged yet. Start by adding your first bet!</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Monthly Trend Mini Chart */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-9">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="font-semibold text-xl">Monthly Performance</div>
                    <div className="text-sm text-zinc-500">Profit trend over the last 6 months</div>
                  </div>
                  <button onClick={() => setCurrentView('analytics')} className="text-xs px-5 py-2 border border-zinc-700 rounded-2xl hover:bg-zinc-800">FULL ANALYTICS →</button>
                </div>

                <div className="h-80 -mx-2">
                  {/* Mini version of the chart - simplified */}
                  <div className="text-center text-zinc-500 pt-20">Interactive charts available in Analytics tab →</div>
                </div>
              </div>
            </div>
          )}

          {/* BETS VIEW */}
          {currentView === 'bets' && (
            <div>
              <div className="mb-10">
                <div className="uppercase text-xs tracking-[2px] text-emerald-400">JOURNAL</div>
                <h1 className="text-6xl font-semibold tracking-tighter">My Bets</h1>
                <p className="text-xl text-zinc-400 mt-2">Every wager, perfectly organized.</p>
              </div>
              <BetTable />
            </div>
          )}

          {/* ANALYTICS VIEW */}
          {currentView === 'analytics' && (
            <div>
              <div className="mb-10">
                <div className="uppercase text-xs tracking-[2px] text-emerald-400">INSIGHTS</div>
                <h1 className="text-6xl font-semibold tracking-tighter">Performance Analytics</h1>
                <p className="text-xl text-zinc-400 mt-2">Deep insights to help you bet smarter.</p>
              </div>
              <Analytics />
            </div>
          )}

          {/* BANKROLL VIEW */}
          {currentView === 'bankroll' && (
            <Bankroll />
          )}
        </div>
      </div>

      {/* Bet Form Modal */}
      <BetForm 
        isOpen={isBetFormOpen} 
        onClose={() => setIsBetFormOpen(false)} 
      />

      {/* Toast Notifications */}
      <Toaster 
        position="top-center" 
        richColors 
        closeButton 
        className="z-[200]"
      />
    </div>
  );
}
