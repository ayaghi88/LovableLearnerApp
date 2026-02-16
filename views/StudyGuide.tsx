import React, { useState } from 'react';
import { StudyGuideContent } from '../types';
import { Button } from '../components/Button';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { 
  ArrowLeft, Layout, Layers, Hand, Brain, CreditCard, 
  Target, MessageSquare, ChevronRight, ChevronLeft 
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
          <button onClick={() => setFocusMode(false)} className="text-gray-400 hover:text-brand-black">Exit Focus</button>
        </div>
        <div className="flex-1 flex items-center justify-center text-center max-w-2xl mx-auto">
          {current.type === 'summary' && <p className="text-3xl font-medium leading-relaxed">{current.content as string}</p>}
          {current.type === 'step' && (
            <div className="space-y-6 text-left">
              <p className="text-2xl font-bold text-brand-blue">{(current.content as any).step}</p>
              <p className="text-xl text-gray-700">{(current.content as any).explanation}</p>
              <div className="bg-yellow-50 p-4 rounded-xl italic">"{(current.content as any).whyItMatters}"</div>
            </div>
          )}
          {current.type === 'practice' && (
             <ul className="space-y-4 text-left">
               {(current.content as string[]).map((p, i) => <li key={i} className="text-xl flex gap-3"><span className="text-brand-green">✓</span> {p}</li>)}
             </ul>
          )}
        </div>
        <div className="flex gap-4 pb-10">
          <Button variant="outline" fullWidth onClick={() => setFocusIndex(i => Math.max(0, i - 1))} disabled={focusIndex === 0}><ChevronLeft /> Prev</Button>
          <Button fullWidth onClick={() => setFocusIndex(i => Math.min(focusItems.length - 1, i + 1))} disabled={focusIndex === focusItems.length - 1}>Next <ChevronRight /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black"><ArrowLeft className="w-5 h-5 mr-1" /> Dashboard</button>
        <div className="flex gap-2">
           <Button variant="outline" className="px-3 py-2 text-xs" onClick={() => setFocusMode(true)}><Target className="w-4 h-4 mr-2" /> Focus Mode</Button>
           <Button className="px-3 py-2 text-xs" onClick={onOpenCoach}><MessageSquare className="w-4 h-4 mr-2" /> Ask Coach</Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-brand-blue">
        <h1 className="text-3xl font-bold font-display capitalize mb-2">{topic}</h1>
        <p className="text-gray-600 leading-relaxed">{data.summary}</p>
      </div>

      <nav className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-blue text-white shadow-md' : 'text-gray-400 hover:text-brand-black'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-[400px]">
        {activeTab === 'visual' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl overflow-hidden"><MermaidDiagram code={data.diagramCode} /></div>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-xl border border-blue-100">{data.visualBreakdown}</p>
          </div>
        )}
        {activeTab === 'steps' && (
          <div className="space-y-4">
            {data.steps.map((s, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex gap-3 items-center mb-2">
                  <span className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                  <h3 className="font-bold text-lg">{s.step}</h3>
                </div>
                <p className="text-gray-600 ml-9">{s.explanation}</p>
                <div className="ml-9 mt-2 text-sm text-yellow-700 font-medium italic">Why: {s.whyItMatters}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'practice' && (
          <div className="space-y-6">
             <div className="grid gap-4">
               {data.handsOnPractice.map((p, i) => (
                 <div key={i} className="flex gap-4 bg-green-50 p-4 rounded-xl border border-green-100 items-start">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-green flex-shrink-0">✓</div>
                   <p className="font-medium text-green-900 leading-relaxed">{p}</p>
                 </div>
               ))}
             </div>
          </div>
        )}
        {activeTab === 'hacks' && (
           <div className="grid gap-4">
             {data.memoryAnchors.map((h, i) => (
               <div key={i} className="flex gap-4 bg-purple-50 p-4 rounded-xl border border-purple-100 items-start">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">⚓</div>
                 <p className="font-medium text-purple-900 leading-relaxed">{h}</p>
               </div>
             ))}
           </div>
        )}
      </div>

      <div className="bg-brand-black text-white p-6 rounded-2xl text-center shadow-xl italic">"{data.pepTalk}"</div>

      <div className="fixed bottom-6 right-6 z-40 no-print">
        <button onClick={onViewFlashcards} className="flex items-center gap-3 bg-brand-blue text-white px-8 py-5 rounded-full shadow-2xl hover:scale-105 transition-all">
          <CreditCard className="w-6 h-6" /> <span className="font-bold">Practice Flashcards ({data.flashcards.length})</span>
        </button>
      </div>
    </div>
  );
};