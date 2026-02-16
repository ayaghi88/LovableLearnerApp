import React, { useState } from 'react';
import { Button } from '../components/Button';
import { 
  ArrowLeft, Target, Zap, Heart, TrendingUp, 
  BarChart3, Presentation, Mail, X, 
  ChevronRight, ChevronLeft, CheckCircle2, Youtube, Rocket
} from 'lucide-react';
import { Logo } from '../components/Logo';

export const Investor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showDeck, setShowDeck] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Lovable Learner",
      subtitle: "The Future of Neurodivergent Learning",
      points: [
        "First-of-its-kind learning platform designed for the ND brain.",
        "Built on pedagogy-first architecture (ADHD, Autism, Dyslexia).",
        "Converting learning barriers into cognitive superpowers."
      ],
      icon: <Logo size={120} />
    },
    {
      title: "The Problem",
      subtitle: "Systemic Academic Burnout",
      points: [
        "1 in 5 individuals are neurodivergent globally.",
        "Traditional EdTech adds noise, not clarity.",
        "Massive disconnect between learning style and content delivery."
      ],
      icon: <Target className="w-20 h-20 text-brand-red mb-4" />
    },
    {
      title: "Market Opportunity",
      subtitle: "A $150 Billion Addressable Market",
      points: [
        "1.5 Billion+ people globally identify as neurodivergent.",
        "$150B spend in adult lifelong learning and self-paced upskilling.",
        "Significant lack of specialized accessibility tools for this demographic."
      ],
      icon: <BarChart3 className="w-20 h-20 text-brand-green mb-4" />
    },
    {
      title: "Our Solution",
      subtitle: "The 'WHY' Based Learning Engine",
      points: [
        "Visual-first logic with AI-generated mind maps.",
        "Structured step-by-step paths with mandatory 'WHY' context.",
        "Sensory-friendly, clean UI to eliminate cognitive overload."
      ],
      icon: <Zap className="w-20 h-20 text-yellow-500 mb-4" />
    },
    {
      title: "Traction & Growth",
      subtitle: "Direct-to-Learner Scalability",
      points: [
        "Freemium SaaS model with high consumer retention.",
        "Enterprise accessibility potential for corporate training.",
        "Community-led growth fueled by inclusive education."
      ],
      icon: <TrendingUp className="w-20 h-20 text-brand-blue mb-4" />
    },
    {
      title: "The Visionary Team",
      subtitle: "Founder-Led Strategy",
      points: [
        "Expert-driven architecture for high user empathy.",
        "Scaling rapidly to empower 10M+ students by 2027.",
        "Join us in building the world's most accessible classroom."
      ],
      icon: <Heart className="w-20 h-20 text-brand-red mb-4" />
    }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 animate-fade-in space-y-16 pb-24">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black transition-colors mb-4 no-print group">
        <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-block bg-blue-50 text-brand-blue border border-blue-100 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
          Investor Relations
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-display text-brand-black leading-tight">
          Lovable Learner: <span className="text-brand-blue">Scaling Intelligence</span>
        </h1>
        <div className="flex flex-col items-center justify-center gap-2">
           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-lg font-medium text-gray-600">
            <span>Mission-Driven <strong className="text-brand-black">Founder-Led Startup</strong></span>
          </div>
        </div>
      </div>

      {/* Market Statistics Section */}
      <section className="bg-brand-black text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-display mb-12 flex items-center gap-3">
            <BarChart3 className="text-brand-blue w-8 h-8" /> Market Potential
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <div className="text-6xl font-bold text-brand-blue">1.5B</div>
              <p className="text-sm text-gray-400 uppercase font-black tracking-widest">Global Population</p>
              <p className="text-xs text-gray-500 font-medium px-4 opacity-80">Neurodivergent learners waiting for a visual-first tool.</p>
            </div>
            <div className="space-y-3">
              <div className="text-6xl font-bold text-brand-green">$150B</div>
              <p className="text-sm text-gray-400 uppercase font-black tracking-widest">Addressable Market</p>
              <p className="text-xs text-gray-500 font-medium px-4 opacity-80">Total annual spend in personalized adult education.</p>
            </div>
            <div className="space-y-3">
              <div className="text-6xl font-bold text-yellow-400">0</div>
              <p className="text-sm text-gray-400 uppercase font-black tracking-widest">Competitors</p>
              <p className="text-xs text-gray-500 font-medium px-4 opacity-80">Mainstream apps lack specialized ND-first architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pitch Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h3 className="text-3xl font-bold font-display">Invest in Inclusion</h3>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            We are building a world where <span className="text-brand-black font-bold">everyone</span> has the tools to learn anything. Lovable Learner is the missing link in accessible EdTech.
          </p>
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-brand-blue transition-colors group">
                <CheckCircle2 className="text-brand-green w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-gray-700">Founder-Product Fit: Built for ND brains.</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-brand-blue transition-colors group">
                <CheckCircle2 className="text-brand-green w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-gray-700">Powered by Gemini AI for extreme personalization.</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-brand-blue/10 shadow-2xl flex flex-col gap-6 text-center relative overflow-hidden">
          <div className="space-y-2 mb-4">
            <h4 className="text-2xl font-bold font-display text-brand-black">Project Pitch</h4>
            <p className="text-gray-500 font-medium">lovablelearner.com</p>
          </div>
          
          <Button 
            className="w-full text-xl py-6 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform"
            onClick={() => {
              setShowDeck(true);
              setCurrentSlide(0);
            }}
          >
            <Presentation className="w-8 h-8" /> View Investor Deck
          </Button>

          <div className="w-full text-lg py-6 flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 text-brand-black border-2 border-dashed border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-brand-blue font-bold">
              <Mail className="w-5 h-5" /> Contact Support
            </div>
            <span className="font-mono font-bold">customer.service@lovablelearner.com</span>
          </div>
          
          <p className="text-xs text-gray-400 italic">For strategic inquiries and deck access assistance.</p>
        </div>
      </div>

      {/* Pitch Deck Modal Overlay */}
      {showDeck && (
        <div className="fixed inset-0 z-[100] bg-brand-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <button 
            onClick={() => setShowDeck(false)}
            className="absolute top-8 right-8 text-white hover:text-brand-blue transition-colors p-3 bg-white/10 rounded-full hover:scale-110 active:scale-95 z-[110]"
          >
            <X className="w-10 h-10" />
          </button>

          <div className="bg-white w-full max-w-6xl h-[85vh] rounded-[3rem] overflow-hidden flex flex-col relative shadow-2xl shadow-blue-500/30 border border-gray-100">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gray-100">
              <div 
                className="h-full bg-brand-blue transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 text-center space-y-12 overflow-y-auto no-scrollbar" key={currentSlide}>
              <div className="animate-scale-up duration-700 flex justify-center w-full">
                {slides[currentSlide].icon}
              </div>
              <div className="space-y-6 max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-bold font-display text-brand-black tracking-tight leading-tight">{slides[currentSlide].title}</h2>
                <p className="text-2xl md:text-3xl text-brand-blue font-semibold">{slides[currentSlide].subtitle}</p>
                <ul className="text-left mt-10 space-y-6 inline-block mx-auto max-w-xl">
                  {slides[currentSlide].points.map((point, idx) => (
                    <li key={idx} className="flex gap-6 items-start text-xl md:text-2xl text-gray-700 font-medium">
                      <span className="text-brand-blue font-black text-3xl leading-none mt-1 shrink-0">•</span>
                      <span className="leading-tight">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-10 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <button 
                onClick={handlePrev}
                className="flex items-center gap-3 text-gray-400 hover:text-brand-black transition-all font-black text-xl disabled:opacity-10 disabled:cursor-not-allowed group"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-10 h-10 group-hover:-translate-x-1 transition-transform" /> <span className="hidden sm:inline">Previous</span>
              </button>
              
              <div className="hidden lg:flex gap-3">
                {slides.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-brand-blue w-16' : 'bg-gray-200 hover:bg-gray-300'}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="flex items-center gap-3 text-brand-blue hover:text-blue-700 transition-all font-black text-xl group"
              >
                <span className="group-hover:mr-1 transition-all">
                    {currentSlide === slides.length - 1 ? "Start Over" : "Next Chapter"}
                </span>
                <ChevronRight className="w-10 h-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};