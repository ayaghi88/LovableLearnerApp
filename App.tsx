
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Quiz } from './views/Quiz';
import { Results } from './views/Results';
import { TopicSelector } from './views/TopicSelector';
import { StudyGuide } from './views/StudyGuide';
import { Flashcards } from './views/Flashcards';
import { Profile } from './views/Profile';
import { generateStudyGuide } from './services/geminiService';
import { LearningProfile, ViewState, StudyGuide as StudyGuideType } from './types';
import { AlertCircle, X } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [profile, setProfile] = useState<LearningProfile | null>(null);
  const [currentGuide, setCurrentGuide] = useState<StudyGuideType | null>(null);
  const [history, setHistory] = useState<StudyGuideType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('lovable_learner_profile');
    const savedHistory = localStorage.getItem('lovable_learner_history');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    if (profile) localStorage.setItem('lovable_learner_profile', JSON.stringify(profile));
    localStorage.setItem('lovable_learner_history', JSON.stringify(history));
    
    // Apply accessible font/spacing to the body
    if (profile?.useAccessibleFont) {
        document.body.style.fontFamily = '"Comic Sans MS", "Open Sans", sans-serif';
    } else {
        document.body.style.fontFamily = '"Open Sans", sans-serif';
    }
    if (profile?.increasedSpacing) {
        document.body.style.lineHeight = '1.8';
    } else {
        document.body.style.lineHeight = 'normal';
    }
  }, [profile, history]);

  const handleQuizComplete = (newProfile: LearningProfile) => {
    setProfile(newProfile);
    setView('RESULTS');
  };

  const handleTopicSearch = async (topic: string, modification?: string) => {
    if (!profile) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const content = await generateStudyGuide(topic, profile, modification);
      const newGuide: StudyGuideType = {
        id: modification && currentGuide ? currentGuide.id : Date.now().toString(),
        topic: modification && currentGuide ? currentGuide.topic : topic,
        content,
        createdAt: modification && currentGuide ? currentGuide.createdAt : Date.now()
      };
      setCurrentGuide(newGuide);
      if (!modification) {
         setHistory(prev => [newGuide, ...prev]);
         setView('STUDY_GUIDE');
      } else {
         setHistory(prev => prev.map(g => g.id === newGuide.id ? newGuide : g));
      }
    } catch (err: any) {
      console.error(err);
      if (err.message === 'MISSING_API_KEY') {
        setError("API Key is missing. Please add API_KEY to your Netlify environment variables.");
      } else {
        setError("I had a little trouble generating that guide. It might be a network glitch or an API limit. Please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'HOME':
        return <Home onStartQuiz={() => setView('QUIZ')} onStartLearning={() => setView('TOPIC_SELECTOR')} hasProfile={!!profile} />;
      case 'QUIZ':
        return <Quiz onComplete={handleQuizComplete} />;
      case 'RESULTS':
        return profile ? <Results profile={profile} onContinue={() => setView('TOPIC_SELECTOR')} /> : null;
      case 'TOPIC_SELECTOR':
        return <TopicSelector onSearch={(topic) => handleTopicSearch(topic)} isLoading={isLoading} />;
      case 'STUDY_GUIDE':
        return currentGuide ? (
          <StudyGuide 
            topic={currentGuide.topic} data={currentGuide.content} onBack={() => setView('TOPIC_SELECTOR')} 
            onRegenerate={(i) => handleTopicSearch(currentGuide.topic, i)} onViewFlashcards={() => setView('FLASHCARDS')} isRegenerating={isLoading}
          />
        ) : null;
      case 'FLASHCARDS':
        return currentGuide ? <Flashcards cards={currentGuide.content.flashcards} onBack={() => setView('STUDY_GUIDE')} /> : null;
      case 'PROFILE':
        return profile ? (
          <Profile 
            profile={profile} history={history} onResetQuiz={() => setView('QUIZ')}
            onLoadGuide={(g) => { setCurrentGuide(g); setView('STUDY_GUIDE'); }}
            onDeleteGuide={(id) => setHistory(h => h.filter(x => x.id !== id))}
            updateProfile={(u) => setProfile(p => p ? {...p, ...u} : null)}
          />
        ) : null;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <Layout currentView={view} setView={setView}>
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl shadow-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
            <div className="flex-1 text-sm font-medium">{error}</div>
            <button onClick={() => setError(null)} className="text-red-400"><X className="w-5 h-5" /></button>
          </div>
        </div>
      )}
      {renderView()}
    </Layout>
  );
};

export default App;
