import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Search, CheckCircle, AlertTriangle, XCircle, ArrowRight, Globe, Shield } from 'lucide-react';

interface SeoAuditViewProps {
  onNavigate: (view: string, params?: any) => void;
}

export const SeoAuditView: React.FC<SeoAuditViewProps> = ({ onNavigate }) => {
  const { pages } = useCMS();

  const totalScore = pages.reduce((acc, p) => acc + (p.seo.score || 70), 0);
  const avgScore = pages.length > 0 ? Math.round(totalScore / pages.length) : 0;

  const pagesWithIssues = pages.filter((p) => (p.seo.score || 70) < 80);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
            <Search className="w-3.5 h-3.5 text-emerald-600" />
            SEO Diagnostics & Content Health
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Site-Wide SEO Audit
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time assessment of metadata, keyword targeting, and social preview readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Overall Health</span>
            <div className="text-2xl font-extrabold text-emerald-600">{avgScore} / 100</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Pages SEO Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Page Optimization Audit</h2>
          <span className="text-xs text-slate-500">
            {pagesWithIssues.length} page(s) can be improved
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Page</th>
                <th className="py-3 px-4">SEO Score</th>
                <th className="py-3 px-4">Title Tag</th>
                <th className="py-3 px-4">Description Tag</th>
                <th className="py-3 px-4">Focus Keywords</th>
                <th className="py-3 px-4">Indexing</th>
                <th className="py-3 px-4 text-right">Optimize</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((page) => {
                const score = page.seo.score || 70;
                const titleLen = page.seo.metaTitle?.length || 0;
                const descLen = page.seo.metaDescription?.length || 0;

                return (
                  <tr key={page.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {page.title}
                      <div className="text-[11px] text-slate-400 font-mono">/{page.slug}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        score >= 85
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : score >= 65
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {score} / 100
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {titleLen >= 30 && titleLen <= 65 ? (
                        <span className="text-emerald-600 flex items-center gap-1 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Optimal ({titleLen})
                        </span>
                      ) : (
                        <span className="text-amber-600 flex items-center gap-1 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" /> Length: {titleLen}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {descLen >= 80 && descLen <= 170 ? (
                        <span className="text-emerald-600 flex items-center gap-1 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Optimal ({descLen})
                        </span>
                      ) : (
                        <span className="text-amber-600 flex items-center gap-1 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" /> Length: {descLen}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {(page.seo.focusKeywords || []).map((k) => (
                          <span key={k} className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[10px]">
                            {k}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        !page.seo.noIndex ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {!page.seo.noIndex ? 'Index, Follow' : 'NoIndex'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('builder', { pageId: page.id })}
                        className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-semibold transition"
                      >
                        Edit SEO
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
