import React, { useState, useEffect } from 'react';
import { Send, Heart, MessageSquare } from 'lucide-react';
import { Message } from '../types';

export const MessageWall: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('legacy_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      author,
      text,
      date: new Date().toLocaleDateString()
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('legacy_messages', JSON.stringify(updated));
    setAuthor('');
    setText('');
  };

  return (
    <section id="messages" className="py-20 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-stone-100 mb-4">Mensagens da Família</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            Deixe uma mensagem de carinho para que ele possa ler e sentir todo o nosso amor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-stone-800 p-8 rounded-2xl shadow-xl sticky top-24 border-t-4 border-gold-600">
              <div className="flex items-center gap-3 mb-6 text-gold-500">
                <MessageSquare />
                <h3 className="text-xl font-bold text-stone-100">Escreva sua Homenagem</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-400 mb-1">Seu Nome</label>
                  <input 
                    type="text" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all placeholder-stone-600"
                    placeholder="Ex: Ana (Neta)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-400 mb-1">Mensagem</label>
                  <textarea 
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all resize-none placeholder-stone-600"
                    placeholder="Escreva algo especial..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gold-600 hover:bg-gold-500 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Enviar Homenagem
                </button>
              </form>
            </div>
          </div>

          {/* Cards Display */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
            {messages.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center py-12 text-stone-500 bg-stone-800/50 rounded-xl border border-dashed border-stone-700">
                    <p className="italic">Nenhuma mensagem ainda. Seja o primeiro a escrever!</p>
                </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="bg-stone-800 p-6 rounded-xl shadow-md border border-stone-700 hover:shadow-lg transition-shadow animate-fade-in-up">
                <div className="flex justify-between items-start mb-3">
                   <div className="bg-gold-900/40 p-2 rounded-full text-gold-500">
                     <Heart size={20} fill="currentColor" className="opacity-40" />
                   </div>
                   <span className="text-xs text-stone-500">{msg.date}</span>
                </div>
                <p className="text-stone-300 italic mb-4 font-serif text-lg leading-relaxed">
                  "{msg.text}"
                </p>
                <div className="border-t border-stone-700 pt-3">
                  <p className="font-bold text-gold-500 text-sm uppercase tracking-wide">
                    — {msg.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};