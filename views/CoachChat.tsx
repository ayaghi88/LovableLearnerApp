import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/Button';
import { chatWithCoach } from '../services/geminiService';
import { ChatMessage } from '../types';
import { ArrowLeft, Send, Sparkles, Loader2 } from 'lucide-react';

export const CoachChat: React.FC<{ topic: string, onBack: () => void }> = ({ topic, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'coach', text: `Hi! I'm your Lovable Coach. Got questions about ${topic}? I'm here to help in simple, easy steps!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const response = await chatWithCoach(topic, userMsg, messages);
      setMessages(prev => [...prev, { role: 'coach', text: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'coach', text: "Sorry, I had a glitch! Try asking again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-white rounded-lg"><ArrowLeft /></button>
        <h2 className="text-xl font-bold font-display">Study Coach: <span className="text-brand-blue">{topic}</span></h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-3xl border border-gray-100 shadow-inner mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-brand-black'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-gray-100 p-4 rounded-2xl animate-pulse flex items-center gap-2 text-gray-400"><Loader2 className="w-4 h-4 animate-spin" /> Thinking...</div></div>}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="relative">
        <input 
          value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything..." 
          className="w-full p-4 pr-14 rounded-2xl border-2 border-gray-200 outline-none focus:border-brand-blue transition-all"
        />
        <button type="submit" className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-blue text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};