import React, { useState } from 'react';
import { StudyGuideContent } from '../types';
import { Button } from '../components/Button';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { 
  ArrowLeft, Layout, Layers, Hand, Brain, CreditCard, 
  Target, MessageSquare, ChevronRight, ChevronLeft, Youtube, ExternalLink,
  Eye
} from 'lucide-react';

interface StudyGuideProps {
  topic: string;
  data: StudyGuideContent;
  onBack: () => void;
  onRegenerate: (topic: string, mod: string) => void;
  onViewFlashcards: () => void;
  onOpenCoach: () => void;
}

export const StudyGuide: React.FC<StudyGuideProps> = ({ 
  topic, data, onBack, onViewFlashcards, onOpenCoach 
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'steps' | 'practice' | 'hacks'>('visual');
  const [focusMode, setFocusMode] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

  const tabs = [
    { id: 'visual', label: 'Visual Map', icon: <Layout className="w-4 h-4" /> },
    { id: 'steps', label: 'Steps', icon: <Layers className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <Hand className="w-4 h-4" /> },
    { id: 'hacks', label: 'Memory Hacks', icon: <Brain className="w-4 h-4" /> },
  ];

  if (focusMode) {
    const focusItems = [
      { type: 'summary', content: data.summary, title: 'The Big Picture' },
      ...data.steps.map(s => ({ type: 'step', content: s, title: s.step })),
      { type: 'practice', content: data.handsOnPractice, title: 'Try It Out' }
    ];
    const current = focusItems[focusIndex];

    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold font-display text-brand-blue">{current.title}</h2>
          <button onClick={() => setFocusMode(false)} className="text-gray-400 hover:text-brand-black p-2">Exit Focus</button>
        </div>
        <div className="flex-1 flex items-center justify-center text-center max-w-2xl mx-auto">
          {current.type === 'summary' && <p className="text-3xl font-medium leading-relaxed">{current.content as string}</p>}
          {current.type === 'step' && (
            <div className="space-y-6 text-left">
              <p className="text-2xl font-bold text-brand-blue">{(current.content as any).step}</p>
              <p className="text-xl text-gray-700">{(current.content as any).explanation}</p>
              <div className="bg-yellow-50 p-4 rounded-xl italic border border-yellow-100">"{(current.content as any).whyItMatters}"</div>
            </div>
          )}
          {current.type === 'practice' && (
             <ul className="space-y-4 text-left">
               {(current.content as string[]).map((p, i) => <li key={i} className="text-xl flex gap-3"><span className="text-brand-green font-bold">✓</span> {p}</li>)}
             </ul>
          )}
        </div>
        <div className="flex gap-4 pb-10 max-w-md mx-auto w-full">
          <Button variant="outline" fullWidth onClick={() => setFocusIndex(i => Math.max(0, i - 1))} disabled={focusIndex === 0}><ChevronLeft /> Prev</Button>
          <Button fullWidth onClick={() => setFocusIndex(i => Math.min(focusItems.length - 1, i + 1))} disabled={focusIndex === focusItems.length - 1}>Next <ChevronRight /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black transition-colors"><ArrowLeft className="w-5 h-5 mr-1" /> Back</button>
        <div className="flex gap-2">
           <Button variant="outline" className="px-3 py-2 text-xs" onClick={() => setFocusMode(true)}><Target className="w-4 h-4 mr-2" /> Focus Mode</Button>
           <Button className="px-3 py-2 text-xs" onClick={onOpenCoach}><MessageSquare className="w-4 h-4 mr-2" /> Ask Coach</Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border-l-[10px] border-brand-blue">
        <h1 className="text-4xl font-bold font-display capitalize mb-3">{topic}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{data.summary}</p>
      </div>

      {data.youtubeLink && (
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center justify-between gap-4 group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm"><Youtube className="w-7 h-7" /></div>
            <div>
              <h3 className="font-bold text-red-900">Watch Visual Explainer</h3>
              <p className="text-sm text-red-700">Recommended for visual & auditory reinforcement.</p>
            </div>
          </div>
          <a 
            href={data.youtubeLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-md"
          >
            Watch <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      <nav className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:text-brand-black hover:bg-gray-50'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 min-h-[400px]">
        {activeTab === 'visual' && (
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200"><MermaidDiagram code={data.diagramCode} /></div>
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
              <h4 className="font-bold text-brand-blue mb-2 flex items-center gap-2"><Eye className="w-5 h-5" /> Visual Breakdown</h4>
              <p className="text-gray-700 leading-relaxed">{data.visualBreakdown}</p>
            </div>
          </div>
        )}
        {activeTab === 'steps' && (
          <div className="space-y-6">
            {data.steps.map((s, i) => (
              <div key={i} className="group flex gap-5 items-start">
                <div className="flex flex-col items-center">
                  <span className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center text-sm font-black border-2 border-brand-blue/20">{i+1}</span>
                  {i < data.steps.length - 1 && <div className="w-0.5 h-full bg-gray-100 mt-2 min-h-[20px]"></div>}
                </div>
                <div className="flex-1 pb-8 group-last:pb-0">
                  <h3 className="font-bold text-xl text-brand-black mb-2">{s.step}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.explanation}</p>
                  <div className="mt-3 inline-block bg-yellow-50 text-yellow-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-yellow-100">WHY: {s.whyItMatters}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'practice' && (
          <div className="grid gap-6">
             <h3 className="text-xl font-bold font-display flex items-center gap-2 text-brand-green"><Hand className="w-5 h-5" /> Practice Exercises</h3>
             <div className="grid gap-4">
               {data.handsOnPractice.map((p, i) => (
                 <div key={i} className="flex gap-4 bg-green-50 p-5 rounded-2xl border border-green-100 items-start hover:shadow-md transition-all">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-green flex-shrink-0 shadow-sm font-bold">{i+1}</div>
                   <p className="font-medium text-green-900 leading-relaxed pt-1">{p}</p>
                 </div>
               ))}
             </div>
          </div>
        )}
        {activeTab === 'hacks' && (
           <div className="grid gap-6">
             <h3 className="text-xl font-bold font-display flex items-center gap-2 text-purple-600"><Brain className="w-5 h-5" /> Memory Anchors & Hacks</h3>
             <div className="grid gap-4">
               {data.memoryAnchors.map((h, i) => (
                 <div key={i} className="flex gap-4 bg-purple-50 p-5 rounded-2xl border border-purple-100 items-start hover:shadow-md transition-all">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">⚓</div>
                   <p className="font-medium text-purple-900 leading-relaxed pt-1">{h}</p>
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>

      <div className="bg-brand-black text-white p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p className="text-xl md:text-2xl font-display font-medium leading-relaxed relative z-10 italic">"{data.pepTalk}"</p>
      </div>

      {/* Prominent Flashcards Call to Action (In-Flow, No Overlap) */}
      <div className="pt-10 no-print flex justify-center">
        <button 
          onClick={onViewFlashcards} 
          className="w-full flex items-center justify-center gap-4 bg-brand-blue text-white py-8 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all group"
        >
          <CreditCard className="w-10 h-10 group-hover:rotate-12 transition-transform" /> 
          <div className="text-left">
            <div className="font-display font-bold text-3xl">Practice Flashcards</div>
            <div className="text-blue-100 text-sm font-semibold uppercase tracking-widest">{data.flashcards.length} Interactive Cards Available</div>
          </div>
          <ChevronRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};