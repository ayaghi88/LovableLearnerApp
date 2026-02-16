import React from 'react';
import { ViewState } from '../types';
import { User, Award, TrendingUp, Mail } from 'lucide-react';
import { Logo } from './Logo';

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
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => setView('HOME')}
          >
            <Logo size={32} />
            <h1 className="text-xl font-bold text-brand-black font-display ml-2">Lovable Learner</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <button onClick={() => setView('PROGRESS')} title="Progress" className="text-gray-400 hover:text-brand-blue transition-colors p-2 hover:bg-gray-50 rounded-lg">
              <Award className="w-5 h-5" />
            </button>
            <button onClick={() => setView('PROFILE')} title="Profile" className="text-gray-400 hover:text-brand-blue transition-colors p-2 hover:bg-gray-50 rounded-lg">
              <User className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 pb-24">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 px-6 no-print mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Logo size={28} />
              <span className="font-display font-bold text-brand-black text-xl">Lovable Learner</span>
            </div>
            <div className="text-sm text-gray-400 font-medium">© 2025 Amber Yaghi | Mission-Driven ND Education</div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
            <button 
              onClick={() => setView('INVESTOR')} 
              className="text-sm font-bold text-brand-blue hover:text-blue-700 flex items-center gap-2 transition-all p-3 bg-blue-50 rounded-xl hover:bg-blue-100 shadow-sm"
            >
              <TrendingUp className="w-4 h-4" /> Angel Investors
            </button>
            <div className="text-sm font-bold text-gray-600 flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <Mail className="w-4 h-4" /> customer.service@lovablelearner.com
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};