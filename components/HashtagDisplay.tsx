
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface HashtagDisplayProps {
  hashtags: string[];
  isLoading: boolean;
}

const HashtagDisplay: React.FC<HashtagDisplayProps> = ({ hashtags, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [justCopiedTag, setJustCopiedTag] = useState<string | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (justCopiedTag) {
      const timer = setTimeout(() => setJustCopiedTag(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [justCopiedTag]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCopyAll = () => {
    copyToClipboard(hashtags.join(' '));
    setCopied(true);
  };
  
  const handleCopyTag = (tag: string) => {
    copyToClipboard(tag);
    setJustCopiedTag(tag);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="h-10 bg-base-300 rounded-full animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (hashtags.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-base-300 rounded-lg">
        <p className="text-text-secondary">Your generated hashtags will appear here.</p>
        <p className="text-sm text-gray-500">Enter a caption and click "Generate" to get started!</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="flex flex-wrap gap-3">
        {hashtags.map((tag, index) => (
          <button 
            key={index}
            onClick={() => handleCopyTag(tag)}
            className="flex items-center gap-2 bg-base-300 text-text-secondary px-4 py-2 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-200 text-sm font-medium group"
          >
            {tag}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              {justCopiedTag === tag ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleCopyAll}
          className="bg-base-300 hover:bg-brand-secondary text-text-primary font-semibold py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          {copied ? 'Copied!' : 'Copy All Hashtags'}
        </button>
      </div>
    </div>
  );
};

export default HashtagDisplay;
