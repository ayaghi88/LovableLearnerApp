import React, { useState } from 'react';
import { Flashcard } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardsProps {
  cards: Flashcard[];
  onBack: () => void;
}

export const Flashcards: React.FC<FlashcardsProps> = ({ cards, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Guard against missing data
  if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-fade-in">
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 max-w-md">
            <h3 className="text-xl font-bold text-yellow-800 mb-2">No Flashcards Available</h3>
            <p className="text-yellow-700 mb-6">The AI didn't generate flashcards for this topic. Try regenerating the guide.</p>
            <Button onClick={onBack}>Back to Guide</Button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const currentCard = cards[currentIndex];

  const getCardContent = (card: any, side: 'front' | 'back') => {
    if (!card) return "No data";
    
    if (side === 'front') {
        return card.front || card.question || card.term || "Question missing";
    } else {
        return card.back || card.answer || card.definition || "Answer missing";
    }
  };

  const frontContent = getCardContent(currentCard, 'front');
  const backContent = getCardContent(currentCard, 'back');

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-fade-in px-4 max-w-5xl mx-auto w-full">
      <div className="flex-none mb-4 flex items-center justify-between w-full">
         <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-black transition-colors px-2 py-1">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <span className="text-gray-400 font-mono text-sm font-medium">
            {currentIndex + 1} / {cards.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full relative min-h-0">
        <div 
            className="relative w-full h-full cursor-pointer group perspective-[1000px] mb-8"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div 
              className="relative w-full h-full duration-500 transition-transform shadow-lg rounded-3xl"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
                <div 
                  className="absolute inset-0 w-full h-full bg-white rounded-3xl border-2 border-brand-blue flex flex-col items-center justify-center p-6 md:p-12 text-center"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    zIndex: isFlipped ? 0 : 10
                  }}
                >
                    <div className="flex-1 flex items-center justify-center w-full overflow-y-auto">
                        <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-brand-black font-display leading-tight">
                            {String(frontContent)}
                        </p>
                    </div>
                    <div className="mt-6 text-sm text-gray-400 font-bold tracking-wider uppercase shrink-0">Tap to flip</div>
                </div>

                <div 
                  className="absolute inset-0 w-full h-full bg-blue-50 rounded-3xl border-2 border-brand-green flex flex-col items-center justify-center p-6 md:p-12 text-center"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    zIndex: isFlipped ? 10 : 0
                  }}
                >
                     <div className="flex-1 flex items-center justify-center w-full overflow-y-auto">
                        <p className="text-xl md:text-3xl lg:text-4xl font-medium text-brand-black leading-relaxed">
                            {String(backContent)}
                        </p>
                     </div>
                     <div className="mt-6 shrink-0">
                        <span className="text-sm text-brand-green font-bold uppercase tracking-widest bg-green-100 px-3 py-1 rounded-full">
                            Answer
                        </span>
                     </div>
                </div>
            </div>
        </div>

        <div className="absolute bottom-6 w-full flex justify-center items-center gap-8 pointer-events-none">
            <Button 
                variant="outline" 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
                className="pointer-events-auto rounded-full w-14 h-14 p-0 flex items-center justify-center hover:bg-gray-100 bg-white/90 backdrop-blur shadow-sm border-gray-200"
            >
                <ChevronLeft className="w-8 h-8 text-gray-600" />
            </Button>
            
            <Button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }} 
                className="pointer-events-auto rounded-full w-20 h-20 p-0 flex items-center justify-center bg-brand-blue text-white shadow-xl hover:bg-blue-600 border-none transition-transform hover:scale-105 active:scale-95"
            >
                <RotateCw className={`w-8 h-8 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            </Button>

            <Button 
                variant="outline" 
                onClick={(e) => { e.stopPropagation(); handleNext(); }} 
                className="pointer-events-auto rounded-full w-14 h-14 p-0 flex items-center justify-center hover:bg-gray-100 bg-white/90 backdrop-blur shadow-sm border-gray-200"
            >
                <ChevronRight className="w-8 h-8 text-gray-600" />
            </Button>
        </div>
      </div>
    </div>
  );
};