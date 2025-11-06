
import React from 'react';
import { SparklesIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center animate-fade-in">
      <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-primary to-brand-secondary p-4 rounded-full shadow-lg">
        <SparklesIcon className="w-10 h-10 text-white" />
      </div>
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-light via-text-primary to-brand-light bg-clip-text text-transparent">
        Smart Hashtag Generator
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
        Instantly generate relevant, high-impact hashtags for your social media captions using the power of AI.
      </p>
    </header>
  );
};

export default Header;
