import React from 'react';
import { ArrowTopRightOnSquareIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { GroundingChunk } from '../types';

interface JobSourceCardProps {
  chunk: GroundingChunk;
}

const JobSourceCard: React.FC<JobSourceCardProps> = ({ chunk }) => {
  if (!chunk.web || !chunk.web.uri || !chunk.web.title) return null;

  const { uri, title } = chunk.web;

  // Simple heuristic to extract domain name for display
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch (e) {
      return 'Website';
    }
  };

  return (
    <a 
      href={uri} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 rounded-lg transition-all duration-200 mb-2 no-underline"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
          <GlobeAltIcon className="w-4 h-4" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-medium text-slate-200 truncate group-hover:text-blue-300 transition-colors">
            {title}
          </span>
          <span className="text-xs text-slate-500 truncate">
            {getDomain(uri)}
          </span>
        </div>
      </div>
      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 flex-shrink-0 ml-2" />
    </a>
  );
};

export default JobSourceCard;