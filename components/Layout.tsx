import React from 'react';
import { ViewState } from '../types';
import { BookOpen, User, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col text-brand-black relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setView('HOME')}
            title="Return to Home"
          >
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            {/* Responsive Title - Always show full name */}
            <h1 className="text-lg sm:text-xl font-bold text-brand-blue font-display">Lovable Learner</h1>
          </div>
          
          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => setView('HOME')}
              className={`p-2 rounded-lg transition-colors ${currentView === 'HOME' ? 'bg-gray-100 text-brand-black' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
              aria-label="Home"
            >
              <Home className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('PROFILE')}
              className={`p-2 rounded-lg transition-colors ${currentView === 'PROFILE' ? 'bg-gray-100 text-brand-black' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 pb-24">
        {children}
      </main>
    </div>
  );
};