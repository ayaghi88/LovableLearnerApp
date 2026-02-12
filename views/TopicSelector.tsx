import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Search, Loader2 } from 'lucide-react';

interface TopicSelectorProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ onSearch, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSearch(topic);
    }
  };

  const suggestions = [
    "Basic Fractions", 
    "Python Loops", 
    "How Photosynthesis Works", 
    "French Revolution Timeline",
    "AWS Cloud Practitioner"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-black">
            What do you want to learn today?
            </h2>
            <p className="text-gray-500">I'll break it down exactly how your brain likes it.</p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Quantum Physics, Baking Sourdough, React Hooks..."
            className="w-full p-6 pr-36 rounded-2xl border-2 border-gray-200 shadow-sm text-lg focus:border-brand-blue focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white text-brand-black placeholder-gray-400"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-2 bottom-2">
            <Button 
                type="submit" 
                disabled={!topic.trim() || isLoading}
                className="h-full px-8 rounded-xl"
            >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Go"}
            </Button>
          </div>
        </form>

        <div className="space-y-3">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wide text-center">Popular Topics</p>
            <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                    <button
                        key={s}
                        onClick={() => setTopic(s)}
                        disabled={isLoading}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-brand-blue hover:text-brand-blue transition-colors"
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};