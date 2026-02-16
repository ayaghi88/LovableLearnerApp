import React from 'react';
import { StudyGuide } from '../types';
import { ArrowLeft, Award, Zap, Book, CheckCircle } from 'lucide-react';

export const Progress: React.FC<{ history: StudyGuide[], onBack: () => void }> = ({ history, onBack }) => {
  const completedTopics = history.length;
  const cardsLearned = history.reduce((acc, g) => acc + g.content.flashcards.length, 0);

  const achievements = [
    { id: '1', title: 'Curious Mind', desc: 'Generate your first guide', unlocked: completedTopics >= 1 },
    { id: '2', title: 'Focus Master', desc: 'Generate 5 study guides', unlocked: completedTopics >= 5 },
    { id: '3', title: 'Flashcard King', desc: 'Unlock 100+ cards', unlocked: cardsLearned >= 100 },
  ];

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-10 animate-fade-in">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black"><ArrowLeft className="w-5 h-5 mr-1" /> Back</button>
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-display">Your Learning Journey</h1>
        <p className="text-gray-500">Every step forward is a victory for your brilliant brain.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="text-4xl font-bold text-brand-blue mb-1">{completedTopics}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1"><Book className="w-3 h-3" /> Topics</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="text-4xl font-bold text-brand-green mb-1">{cardsLearned}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1"><Zap className="w-3 h-3" /> Cards</div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-display flex items-center gap-2"><Award className="text-yellow-500" /> Achievements</h2>
        <div className="grid gap-3">
          {achievements.map(a => (
            <div key={a.id} className={`p-4 rounded-xl border flex items-center justify-between ${a.unlocked ? 'bg-white border-brand-green' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
              <div className="flex gap-4 items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${a.unlocked ? 'bg-green-100 text-brand-green' : 'bg-gray-200 text-gray-400'}`}>
                  {a.unlocked ? <CheckCircle className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-bold">{a.title}</h4>
                  <p className="text-sm text-gray-500">{a.desc}</p>
                </div>
              </div>
              {a.unlocked && <span className="text-xs font-bold text-brand-green bg-green-50 px-2 py-1 rounded">Unlocked</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};