import React from 'react';
import { Button } from '../components/Button';
import { ArrowLeft, Target, Users, Zap, Heart, ShieldCheck } from 'lucide-react';

export const Investor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 animate-fade-in space-y-12">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black transition-colors mb-4">
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="text-center space-y-4">
        <div className="inline-block bg-blue-100 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Investment Opportunity</div>
        <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-black">Unlocking the <span className="text-brand-blue">Neurodivergent</span> Mind</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The educational system isn't broken—it was just never designed for 20% of the population. We're changing that.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center"><Target className="w-6 h-6" /></div>
          <h3 className="text-xl font-bold font-display">The Problem</h3>
          <p className="text-gray-600 leading-relaxed">
            1 in 5 adults is neurodivergent (ADHD, Autism, Dyslexia). Traditional study tools rely on auditory/linear methods that cause 20 million+ learners to "zone out" or feel like failures.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-green-50 text-brand-green rounded-full flex items-center justify-center"><Zap className="w-6 h-6" /></div>
          <h3 className="text-xl font-bold font-display">The Solution</h3>
          <p className="text-gray-600 leading-relaxed">
            Lovable Learner uses Gen-AI to instantly restructure any topic into ND-friendly visual maps, chunked steps, and memory anchors. We turn "overwhelmed" into "gifted."
          </p>
        </div>
      </div>

      <section className="bg-brand-black text-white p-10 rounded-3xl space-y-6 shadow-2xl">
        <h2 className="text-3xl font-bold font-display">Market Opportunity</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-brand-blue">1.2B</div>
            <p className="text-sm text-gray-400">ND individuals globally</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-brand-green">$150B</div>
            <p className="text-sm text-gray-400">EdTech market size</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-yellow-400">0</div>
            <p className="text-sm text-gray-400">Mainstream competitors for ND focus</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-800">
          <p className="text-gray-400 leading-relaxed">
            We are building a mission-driven platform that stays free for learners while scaling through B2B partnerships with schools and corporate accessibility programs.
          </p>
        </div>
      </section>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">YB</div>
          <div>
            <h4 className="font-bold text-lg">Yazan Ayaghi</h4>
            <p className="text-sm text-gray-500">Founder & Product Architect</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">View Investor Deck</Button>
          <Button onClick={() => window.location.href='mailto:founder@lovablelearner.com'}>Contact Founder</Button>
        </div>
      </div>
    </div>
  );
};