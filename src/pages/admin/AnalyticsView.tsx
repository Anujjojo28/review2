import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AnalyticsViewProps {
  onNavigate: (view: string, params?: any) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const { pages, getAnalyticsSummary } = useCMS();
  const stats = getAnalyticsSummary();

  const maxDailyViews = Math.max(...stats.recentViewsDaily.map((d) => d.views), 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-600" />
            Performance & Insights
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Site Content Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time telemetry on reader engagement, page performance, and audience devices.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Total Pageviews</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {stats.totalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-2">
            &uarr; 24.3% vs previous period
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Unique Visitors</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {stats.totalUniqueVisitors.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-2">
            &uarr; 18.1% organic acquisition
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Avg. Engagement Time</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            2m 48s
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            High reader retention
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Avg. Bounce Rate</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">
            34.2%
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-2">
            &darr; 4.5% lower bounce
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Traffic Histogram */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Traffic Distribution by Day</h2>
              <p className="text-xs text-slate-500">Weekly traffic spikes mapped across publishing days</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              Last 7 Days
            </span>
          </div>

          <div className="h-48 flex items-end gap-3 pt-6 border-b border-slate-100 pb-2">
            {stats.recentViewsDaily.map((item) => {
              const heightPercent = Math.max(15, Math.round((item.views / maxDailyViews) * 100));
              return (
                <div key={item.date} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.views}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg group-hover:from-indigo-500 group-hover:to-cyan-400 transition-all cursor-pointer shadow-xs"
                  />
                  <span className="text-xs font-medium text-slate-500">{item.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">Audience Viewports</h2>
            <p className="text-xs text-slate-500 mb-6">Device categories accessing published content</p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Monitor className="w-4 h-4 text-indigo-600" />
                    Desktop Browser
                  </span>
                  <span className="text-slate-900 font-bold">{stats.deviceBreakdown.desktop}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${stats.deviceBreakdown.desktop}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Smartphone className="w-4 h-4 text-cyan-600" />
                    Mobile Devices
                  </span>
                  <span className="text-slate-900 font-bold">{stats.deviceBreakdown.mobile}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${stats.deviceBreakdown.mobile}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Tablet className="w-4 h-4 text-amber-600" />
                    Tablet Viewport
                  </span>
                  <span className="text-slate-900 font-bold">{stats.deviceBreakdown.tablet}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${stats.deviceBreakdown.tablet}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-6 text-[11px] text-slate-600">
            Responsive builder ensures layout integrity across all detected screen widths.
          </div>
        </div>

      </div>

      {/* Top Pages Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Top Performing Pages</h2>
          <p className="text-xs text-slate-500">Pages generating the highest engagement and views</p>
        </div>

        <div className="divide-y divide-slate-100">
          {stats.topPages.map((page, idx) => (
            <div
              key={page.id}
              className="p-4 hover:bg-slate-50/70 transition flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                  #{idx + 1}
                </span>
                <div className="min-w-0">
                  <div 
                    onClick={() => onNavigate('builder', { pageId: page.id })}
                    className="font-bold text-xs text-slate-900 hover:text-indigo-600 cursor-pointer truncate"
                  >
                    {page.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    /{page.slug}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 font-mono">
                    {page.views.toLocaleString()} views
                  </div>
                  <div className="text-[10px] text-emerald-600">
                    High engagement
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('live-page', { slug: page.slug })}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                  title="Open live page"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
