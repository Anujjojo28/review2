import React, { useState } from 'react';
import { 
  Cloud, 
  CheckCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Layers, 
  Sparkles,
  GitBranch
} from 'lucide-react';

export const VercelDeployView: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const vercelJsonContent = `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  const cliCommands = `cd cms-react-vite
npm run build
npx vercel --prod`;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md mb-3 border border-white/15">
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              Production Deployment Module
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Deploy Your React CMS on Vercel
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Configured with client-side SPA routing rewrites and zero-config static exports for lightning-fast edge delivery.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
              Build Status
            </span>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Verified & Ready
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Methods Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Method 1: Instant Vercel CLI */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Method 1: One-Command CLI Deploy</h3>
                <p className="text-xs text-slate-500">Deploy directly from your local terminal</p>
              </div>
            </div>

            <ol className="text-xs text-slate-600 space-y-3 list-decimal list-inside my-4 leading-relaxed">
              <li>Open PowerShell or terminal in your project directory.</li>
              <li>Run the production build to verify assets.</li>
              <li>Trigger Vercel CLI to deploy directly to production.</li>
            </ol>

            <div className="relative bg-slate-900 rounded-xl p-3 font-mono text-xs text-indigo-300">
              <pre>{cliCommands}</pre>
              <button
                onClick={() => copyToClipboard(cliCommands, 1)}
                className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                title="Copy commands"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Requires free Vercel account</span>
            <span className="text-emerald-600 font-semibold">&lt; 60 seconds</span>
          </div>
        </div>

        {/* Method 2: Git Repository (GitHub / GitLab) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Method 2: Git & Vercel Dashboard</h3>
                <p className="text-xs text-slate-500">Continuous deployment on every git push</p>
              </div>
            </div>

            <ol className="text-xs text-slate-600 space-y-3 list-decimal list-inside my-4 leading-relaxed">
              <li>Initialize git and push project to your GitHub repository:
                <code className="block mt-1 p-2 bg-slate-100 rounded text-[11px] font-mono text-slate-800">
                  git init &amp;&amp; git add . &amp;&amp; git commit -m "Initial CMS commit"
                </code>
              </li>
              <li>Visit <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-indigo-600 underline">vercel.com/new</a> and click "Import Repository".</li>
              <li>Vercel automatically detects <strong>Vite</strong> framework preset. Click <strong>Deploy</strong>!</li>
            </ol>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Automatic SSL &amp; Global CDN</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Vercel Dashboard</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* SPA Routing Configuration vercel.json */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">vercel.json (Single Page App Rewrite Rule)</h3>
            <p className="text-xs text-slate-500">
              Ensures deep links like <code>/home</code> or <code>/spring-product-innovations</code> route smoothly without 404s.
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(vercelJsonContent, 2)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedIndex === 2 ? 'Copied' : 'Copy Config'}</span>
          </button>
        </div>

        <pre className="bg-slate-900 text-cyan-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
          {vercelJsonContent}
        </pre>
      </div>

    </div>
  );
};
