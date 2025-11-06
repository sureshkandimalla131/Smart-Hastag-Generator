
import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { GenerateIcon } from './Icons';

interface CaptionInputProps {
  caption: string;
  setCaption: (caption: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const CaptionInput: React.FC<CaptionInputProps> = ({ caption, setCaption, onGenerate, isLoading }) => {
  return (
    <div>
      <label htmlFor="caption" className="block text-sm font-medium text-text-secondary mb-2">
        Enter your social media caption
      </label>
      <textarea
        id="caption"
        rows={5}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="e.g., 'Enjoying a beautiful sunset at the beach today! 🌅'"
        className="w-full p-4 bg-base-300 border border-base-300 rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !caption.trim()}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <GenerateIcon className="w-5 h-5" />
            <span>Generate Hashtags</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CaptionInput;
