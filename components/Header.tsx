import React from 'react';
import { BriefcaseIcon, SparklesIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <BriefcaseIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">JobFinder AI</h1>
            <p className="text-xs text-slate-400 font-medium">Powered by Gemini 2.5</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
          <SparklesIcon className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300">Real-time Web Search Active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;