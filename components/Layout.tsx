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
            <button onClick={() => setView('PROGRESS')} title="Progress" className="text-gray-400 hover:text-brand-blue transition-colors">
              <Award className="w-5 h-5" />
            </button>
            <button onClick={() => setView('PROFILE')} title="Profile" className="text-gray-400 hover:text-brand-blue transition-colors">
              <User className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 pb-24">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 px-4 no-print mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 font-display font-bold text-brand-blue">
              <BookOpen className="w-5 h-5" /> Lovable Learner
            </div>
            <div className="text-sm text-gray-400">© 2025 Amber Yaghi | Mission-Driven ND Education</div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <button onClick={() => setView('INVESTOR')} className="text-sm font-bold text-brand-blue hover:underline flex items-center gap-1.5 transition-all">
              <TrendingUp className="w-4 h-4" /> Angel Investors
            </button>
            <a href="mailto:amber.yaghi@lovablelearner.com" className="text-sm font-semibold text-gray-500 hover:text-brand-black transition-colors">Contact Founder</a>
          </div>
        </div>
      </footer>
    </div>
  );
};