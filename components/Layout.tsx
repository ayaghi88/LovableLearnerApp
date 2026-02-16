import React from 'react';
import { ViewState } from '../types';
import { BookOpen, User, Home, TrendingUp, Award } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col text-brand-black relative">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-4">
        <div className="max-w-4xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('HOME')}>
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold text-brand-blue font-display">Lovable Learner</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <button onClick={() => setView('PROGRESS')} className="text-gray-400 hover:text-brand-blue"><Award className="w-5 h-5" /></button>
            <button onClick={() => setView('PROFILE')} className="text-gray-400 hover:text-brand-blue"><User className="w-5 h-5" /></button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 pb-24">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 px-4 no-print">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">© 2025 Lovable Learner | Mission-Driven Education</div>
          <div className="flex gap-6 items-center">
            <button onClick={() => setView('INVESTOR')} className="text-sm font-bold text-brand-blue hover:underline flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> Angel Investors
            </button>
            <a href="mailto:founder@lovablelearner.com" className="text-sm text-gray-500 hover:text-brand-black">Contact Founder</a>
          </div>
        </div>
      </footer>
    </div>
  );
};