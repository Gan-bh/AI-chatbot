import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 p-4 pb-6 sticky bottom-0 z-20">
      <div className="max-w-3xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-slate-800/50 border border-slate-700 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all shadow-lg shadow-black/20">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for jobs (e.g., 'Remote React Developer jobs' or 'Marketing in London')..."
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm px-3 py-3 focus:outline-none resize-none max-h-32 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
          />
          <button
            type="submit"
            disabled={!text.trim() || disabled}
            className="mb-1 p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-600 mt-2">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;