import React from 'react';
import { Button } from '../components/Button';
import { ArrowLeft, Target, Users, Zap, Heart, TrendingUp, Lightbulb, BarChart3, Presentation, Mail } from 'lucide-react';

export const Investor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 animate-fade-in space-y-16 pb-24">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black transition-colors mb-4 no-print">
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-block bg-blue-50 text-brand-blue border border-blue-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
          Investor Pitch
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-display text-brand-black leading-tight">
          Lovable Learner: <span className="text-brand-blue">AI-Powered Learning</span> Built for Neurodivergent Adults
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-500 font-medium">
          <span>Founder: Amber Yaghi</span>
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
          <span>Visual • Structured • WHY-based</span>
        </div>
      </div>

      {/* The Problem & Opportunity */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center"><Target className="w-6 h-6" /></div>
          <h3 className="text-2xl font-bold font-display">The Problem</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2 items-start"><span className="text-brand-red font-bold">•</span> 1 in 5 individuals are neurodivergent.</li>
            <li className="flex gap-2 items-start"><span className="text-brand-red font-bold">•</span> Traditional EdTech focuses on speed, not comprehension.</li>
            <li className="flex gap-2 items-start"><span className="text-brand-red font-bold">•</span> ND adults are underserved in higher education and upskilling.</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-green-50 text-brand-green rounded-2xl flex items-center justify-center"><BarChart3 className="w-6 h-6" /></div>
          <h3 className="text-2xl font-bold font-display">Market Opportunity</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2 items-start"><span className="text-brand-green font-bold">•</span> Global EdTech market: $400B+</li>
            <li className="flex gap-2 items-start"><span className="text-brand-green font-bold">•</span> Growing adult self-education & upskilling demand.</li>
            <li className="flex gap-2 items-start"><span className="text-brand-green font-bold">•</span> Massive untapped ND adult segment.</li>
          </ul>
        </div>
      </div>

      {/* Product & Innovation */}
      <section className="bg-brand-black text-white p-10 rounded-[2.5rem] space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-bold font-display flex items-center gap-3">
            <Lightbulb className="text-yellow-400" /> Product Overview
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h4 className="font-bold text-brand-blue mb-2">AI Guides</h4>
              <p className="text-sm text-gray-400">Personalized study materials structured for ND brains.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h4 className="font-bold text-brand-green mb-2">WHY-Explanations</h4>
              <p className="text-sm text-gray-400">Step-by-step logic that answers the "why" to prevent zoning out.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h4 className="font-bold text-yellow-400 mb-2">YouTube Integration</h4>
              <p className="text-sm text-gray-400">Curated visual/auditory reinforcement to reduce overwhelm.</p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10">
             <h3 className="text-xl font-bold mb-4">Why YouTube Matters</h3>
             <p className="text-gray-400 leading-relaxed">
               ND learners benefit from visual & auditory reinforcement. Curated relevant YouTube videos reduce overwhelm, increase engagement, and boost learning confidence.
             </p>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
          <h3 className="text-2xl font-bold font-display">Revenue Model</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2 items-start"><span className="text-brand-blue font-bold">•</span> Freemium model with Premium tools.</li>
            <li className="flex gap-2 items-start"><span className="text-brand-blue font-bold">•</span> Institutional licensing for schools/corps.</li>
            <li className="flex gap-2 items-start"><span className="text-brand-blue font-bold">•</span> Future AI tutoring expansion.</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><Zap className="w-6 h-6" /></div>
          <h3 className="text-2xl font-bold font-display">Traction & Vision</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2 items-start"><span className="text-purple-600 font-bold">•</span> Early community momentum.</li>
            <li className="flex gap-2 items-start"><span className="text-purple-600 font-bold">•</span> Founder-led authentic brand voice.</li>
            <li className="flex gap-2 items-start"><span className="text-purple-600 font-bold">•</span> Goal: The global standard for ND learning.</li>
          </ul>
        </div>
      </div>

      {/* The Ask & Founder */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl">
        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-3xl font-bold font-display mb-2">The Ask</h3>
            <p className="text-gray-600">Seed investment for platform scaling, strategic EdTech partnerships, and advisor connections in AI & education.</p>
          </div>
          <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl">
            <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl">AY</div>
            <div>
              <h4 className="font-bold text-lg">Amber Yaghi</h4>
              <p className="text-sm text-gray-500">Founder & Project Architect</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <Button className="flex items-center justify-center gap-2 text-lg py-5 px-10">
            <Presentation className="w-5 h-5" /> View Investor Deck
          </Button>
          <Button variant="outline" onClick={() => window.location.href='mailto:amber.yaghi@lovablelearner.com'} className="flex items-center justify-center gap-2 text-lg py-5 px-10">
            <Mail className="w-5 h-5" /> Contact Founder
          </Button>
        </div>
      </div>
    </div>
  );
};