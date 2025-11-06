
import React, { useState, useCallback } from 'react';
import { generateHashtags } from './services/geminiService';
import Header from './components/Header';
import CaptionInput from './components/CaptionInput';
import HashtagDisplay from './components/HashtagDisplay';
import { HashtagIcon } from './components/Icons';

const App: React.FC = () => {
  const [caption, setCaption] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!caption.trim()) {
      setError('Please enter a caption first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setHashtags([]);

    try {
      const result = await generateHashtags(caption);
      setHashtags(result);
    } catch (err) {
      setError('Failed to generate hashtags. Please check your API key or try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [caption]);

  return (
    <div className="min-h-screen bg-base-100 text-text-primary flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-8 bg-base-200 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-fade-in">
          <CaptionInput
            caption={caption}
            setCaption={setCaption}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          <div className="mt-8 border-t border-base-300 pt-8">
             <div className="flex items-center gap-3 mb-4">
                <HashtagIcon className="w-6 h-6 text-brand-light" />
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Suggested Hashtags</h2>
             </div>
             {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg animate-fade-in">
                    <p className="font-semibold">Oops! Something went wrong.</p>
                    <p className="text-sm">{error}</p>
                </div>
              )}
            <HashtagDisplay hashtags={hashtags} isLoading={isLoading} />
          </div>
        </main>
        <footer className="text-center mt-8 text-text-secondary text-sm">
          <p>Powered by Gemini API. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
