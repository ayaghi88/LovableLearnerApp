import React, { useState } from 'react';
import { StudyGuideContent, StudyGuideStep } from '../types';
import { Button } from '../components/Button';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { ArrowLeft, RefreshCw, Layout, Layers, Hand, Brain, CreditCard, Video, Download, Eye, ChevronRight, ChevronLeft, Target } from 'lucide-react';

interface StudyGuideProps {
  topic: string;
  data: StudyGuideContent;
  onBack: () => void;
  onRegenerate: (prompt: string) => void;
  onViewFlashcards: () => void;
  isRegenerating: boolean;
}

export const StudyGuide: React.FC<StudyGuideProps> = ({ 
  topic, 
  data, 
  onBack, 
  onRegenerate, 
  onViewFlashcards,
  isRegenerating 
}) => {
  const [focusMode, setFocusMode] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

  const sections = [
    { id: 'summary', title: 'The Big Picture', icon: <Eye className="w-5 h-5" /> },
    { id: 'visual', title: 'Visual Map', icon: <Layout className="w-5 h-5" /> },
    ...data.steps.map((s, i) => ({ id: `step-${i}`, title: `Step ${i + 1}: ${s.step}`, icon: <Layers className="w-5 h-5" /> })),
    { id: 'hands-on', title: 'Try It Out', icon: <Hand className="w-5 h-5" /> },
    { id: 'memory', title: 'Memory Anchors', icon: <Brain className="w-5 h-5" /> },
  ];

  const handlePrint = () => window.print();
  const handleWatchVideo = () => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic + " explained simply")}`, '_blank');
  };

  const nextFocus = () => setFocusIndex(prev => Math.min(prev + 1, sections.length - 1));
  const prevFocus = () => setFocusIndex(prev => Math.max(prev - 0, 0));

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between no-print">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <div className="flex gap-2">
          <Button 
            variant={focusMode ? "primary" : "outline"}
            onClick={() => setFocusMode(!focusMode)}
            className="text-xs px-3 py-2 flex items-center gap-2"
          >
            <Target className="w-4 h-4" /> {focusMode ? "Exit Focus" : "Focus Mode"}
          </Button>
          <Button variant="outline" onClick={handlePrint} className="text-xs px-3 py-2 flex items-center gap-2">
            <Download className="w-4 h-4" /> PDF
          </Button>
        </div>
      </div>

      {!focusMode ? (
        <>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-8 border-brand-blue">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 capitalize">{topic}</h1>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.summary}</p>
            <div className="mt-4 flex gap-3">
               <button onClick={handleWatchVideo} className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-red-200">
                <Video className="w-4 h-4" /> YouTube Guides
               </button>
            </div>
          </div>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-4 border-brand-blue">
            <div className="flex items-center gap-2 mb-4 text-brand-blue">
              <Layout className="w-6 h-6" />
              <h2 className="text-xl font-bold font-display">Visual Breakdown</h2>
            </div>
            {data.diagramCode && (
              <div className="mb-6 border-2 border-gray-100 rounded-xl overflow-hidden bg-white">
                <MermaidDiagram code={data.diagramCode} />
              </div>
            )}
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-gray-700">{data.visualBreakdown}</p>
            </div>
          </section>

          <div className="space-y-6">
            {data.steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-brand-black text-white font-bold rounded-full text-sm">{idx + 1}</span>
                  <h3 className="font-bold text-lg">{step.step}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-lg">{step.explanation}</p>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <span className="font-bold text-yellow-800 text-sm block uppercase tracking-wide">Why this matters</span>
                    <p className="text-yellow-900">{step.whyItMatters}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-brand-green">
              <div className="flex items-center gap-2 mb-4 text-brand-green">
                <Hand className="w-6 h-6" />
                <h2 className="text-xl font-bold font-display">Hands-On Practice</h2>
              </div>
              <ul className="space-y-3">
                {data.handsOnPractice.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-gray-700"><span className="text-brand-green mt-1">➜</span>{item}</li>
                ))}
              </ul>
            </section>
            <section className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-purple-500">
              <div className="flex items-center gap-2 mb-4 text-purple-600">
                <Brain className="w-6 h-6" />
                <h2 className="text-xl font-bold font-display">Memory Anchors</h2>
              </div>
              <ul className="space-y-3">
                {data.memoryAnchors.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-gray-700"><span className="text-purple-500 mt-1">⚓</span>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </>
      ) : (
        <div className="bg-white min-h-[60vh] rounded-3xl shadow-xl flex flex-col overflow-hidden border-2 border-brand-blue animate-scale-in">
          <div className="bg-brand-blue p-4 text-white flex justify-between items-center">
             <div className="flex items-center gap-3 font-bold">
                {sections[focusIndex].icon}
                {sections[focusIndex].title}
             </div>
             <div className="text-sm font-mono">{focusIndex + 1} / {sections.length}</div>
          </div>
          
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center text-center">
             {focusIndex === 0 && (
                <p className="text-2xl md:text-3xl font-medium text-brand-black leading-relaxed">{data.summary}</p>
             )}
             {focusIndex === 1 && (
                <div className="w-full max-w-2xl"><MermaidDiagram code={data.diagramCode} /></div>
             )}
             {focusIndex > 1 && focusIndex < sections.length - 2 && (
                <div className="space-y-6 max-w-2xl text-left">
                   <p className="text-2xl font-bold text-brand-blue">{data.steps[focusIndex - 2].step}</p>
                   <p className="text-xl text-gray-700 leading-relaxed">{data.steps[focusIndex - 2].explanation}</p>
                   <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      <p className="text-yellow-800 italic">"This is important because: {data.steps[focusIndex - 2].whyItMatters}"</p>
                   </div>
                </div>
             )}
             {focusIndex === sections.length - 2 && (
                <ul className="space-y-4 text-left max-w-xl">
                   {data.handsOnPractice.map((h, i) => <li key={i} className="text-xl flex gap-3"><span className="text-brand-green">✓</span>{h}</li>)}
                </ul>
             )}
             {focusIndex === sections.length - 1 && (
                <ul className="space-y-4 text-left max-w-xl">
                   {data.memoryAnchors.map((m, i) => <li key={i} className="text-xl flex gap-3"><span className="text-purple-500">⚓</span>{m}</li>)}
                </ul>
             )}
          </div>

          <div className="p-6 bg-gray-50 border-t flex justify-between gap-4">
             <Button variant="outline" onClick={prevFocus} disabled={focusIndex === 0} className="flex-1 flex items-center justify-center gap-2">
                <ChevronLeft className="w-5 h-5" /> Previous
             </Button>
             <Button onClick={nextFocus} disabled={focusIndex === sections.length - 1} className="flex-1 flex items-center justify-center gap-2">
                Next <ChevronRight className="w-5 h-5" />
             </Button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-500 to-brand-blue p-6 rounded-2xl text-white text-center shadow-lg">
        <p className="text-lg md:text-xl font-medium italic">"{data.pepTalk}"</p>
      </div>

      <div className="fixed bottom-6 right-6 z-40 no-print flex flex-col gap-3 items-end">
        <button 
            onClick={onViewFlashcards}
            className="group flex items-center gap-2 bg-brand-black text-white px-6 py-4 rounded-full shadow-xl hover:scale-105 transition-all"
        >
            <CreditCard className="w-6 h-6 text-brand-green" />
            <span className="font-bold">Practice Flashcards</span>
        </button>
      </div>
    </div>
  );
};