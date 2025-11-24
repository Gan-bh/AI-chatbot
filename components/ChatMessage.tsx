import React from 'react';
import { UserIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';
import { Message } from '../types';
import JobSourceCard from './JobSourceCard';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Basic Markdown formatting helpers
  const formatText = (text: string) => {
    // Bold
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Lists
    formatted = formatted.replace(/^\s*-\s(.*)$/gm, '<li class="ml-4 list-disc">$1</li>');
    // Newlines to breaks (but preserve lists)
    formatted = formatted.replace(/\n/g, '<br />');
    
    return formatted;
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm mt-1
          ${isUser ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
          {isUser ? (
            <UserIcon className="w-5 h-5 text-white" />
          ) : (
            <ComputerDesktopIcon className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Content Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div 
            className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap
            ${isUser 
              ? 'bg-indigo-600 text-white rounded-tr-sm' 
              : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
            }`}
          >
             {/* We render text safely. For this demo, using dangerouslySetInnerHTML with basic formatting */}
             <div dangerouslySetInnerHTML={{ __html: formatText(message.text) }} />
          </div>

          {/* Grounding Sources (Job Cards) - Only for Model */}
          {!isUser && message.groundingChunks && message.groundingChunks.length > 0 && (
            <div className="mt-3 w-full max-w-md animate-fade-in-up">
              <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider ml-1">
                Direct Apply & Source Links
              </p>
              <div className="grid gap-2">
                {message.groundingChunks.map((chunk, idx) => (
                   <JobSourceCard key={`${message.id}-chunk-${idx}`} chunk={chunk} />
                ))}
              </div>
            </div>
          )}
          
          {/* Time */}
          <span className="text-[10px] text-slate-500 mt-1 px-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;