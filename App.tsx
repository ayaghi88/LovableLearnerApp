import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Quiz } from './views/Quiz';
import { Results } from './views/Results';
import { TopicSelector } from './views/TopicSelector';
import { StudyGuide } from './views/StudyGuide';
import { Flashcards } from './views/Flashcards';
import { Profile } from './views/Profile';
import { Investor } from './views/Investor';
import { CoachChat } from './views/CoachChat';
import { Progress } from './views/Progress';
import { generateStudyGuide } from './services/geminiService';
import { LearningProfile, ViewState, StudyGuide as StudyGuideType } from './types';

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
    if (profile) {
      localStorage.setItem('lovable_learner_profile', JSON.stringify(profile));
      document.body.classList.toggle('accessible-font', !!profile.useAccessibleFont);
      document.body.classList.toggle('increased-spacing', !!profile.increasedSpacing);
    }
    localStorage.setItem('lovable_learner_history', JSON.stringify(history));
  }, [profile, history]);

  const handleTopicSearch = async (topic: string, modification?: string) => {
    if (!profile) return;
    setIsLoading(true);
    setError(null);
    try {
      const content = await generateStudyGuide(topic, profile, modification);
      const newGuide: StudyGuideType = {
        id: Date.now().toString(),
        topic,
        content,
        createdAt: Date.now()
      };
      setCurrentGuide(newGuide);
      setHistory(prev => [newGuide, ...prev.filter(g => g.topic !== topic)]);
      setView('STUDY_GUIDE');
    } catch (err) {
      setError("I couldn't reach the AI brain. Check your connection!");
    } finally {
      setIsLoading(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'HOME': return <Home onStartQuiz={() => setView('QUIZ')} onStartLearning={() => setView('TOPIC_SELECTOR')} hasProfile={!!profile} />;
      case 'QUIZ': return <Quiz onComplete={(p) => { setProfile(p); setView('RESULTS'); }} />;
      case 'RESULTS': return profile ? <Results profile={profile} onContinue={() => setView('TOPIC_SELECTOR')} /> : null;
      case 'TOPIC_SELECTOR': return <TopicSelector onSearch={handleTopicSearch} isLoading={isLoading} />;
      case 'STUDY_GUIDE': return currentGuide ? <StudyGuide topic={currentGuide.topic} data={currentGuide.content} onBack={() => setView('TOPIC_SELECTOR')} onRegenerate={handleTopicSearch} onViewFlashcards={() => setView('FLASHCARDS')} onOpenCoach={() => setView('COACH_CHAT')} /> : null;
      case 'FLASHCARDS': return currentGuide ? <Flashcards cards={currentGuide.content.flashcards} onBack={() => setView('STUDY_GUIDE')} /> : null;
      case 'PROFILE': return <Profile profile={profile!} history={history} onResetQuiz={() => setView('QUIZ')} onLoadGuide={(g) => { setCurrentGuide(g); setView('STUDY_GUIDE'); }} onDeleteGuide={(id) => setHistory(h => h.filter(x => x.id !== id))} updateProfile={(u) => setProfile(p => ({...p!, ...u}))} />;
      case 'INVESTOR': return <Investor onBack={() => setView('HOME')} />;
      case 'COACH_CHAT': return currentGuide ? <CoachChat topic={currentGuide.topic} onBack={() => setView('STUDY_GUIDE')} /> : null;
      case 'PROGRESS': return <Progress history={history} onBack={() => setView('HOME')} />;
      default: return <Home onStartQuiz={() => setView('QUIZ')} onStartLearning={() => setView('TOPIC_SELECTOR')} hasProfile={!!profile} />;
    }
  };

  return <Layout currentView={view} setView={setView}>{renderView()}</Layout>;
};

export default App;