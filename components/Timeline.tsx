import React, { useState, useEffect, useRef } from 'react';
import { Star, Heart, Award, Baby, Home, Activity } from 'lucide-react';
import { TimelineEvent } from '../types';

const events: TimelineEvent[] = [
  { id: 1, year: '', title: 'O Início', description: 'Nascimento em uma pequena cidade do interior, iniciando uma jornada extraordinária.', icon: 'baby' },
  { id: 2, year: '', title: 'Construindo o Lar', description: 'Casamento e o início da construção da casa onde a família cresceria.', icon: 'home' },
  { id: 3, year: '', title: 'Paternidade', description: 'O nascimento dos filhos, trazendo alegria e novos desafios.', icon: 'heart' },
  { id: 4, year: '', title: 'Aposentadoria', description: 'Após anos de dedicação ao trabalho, o merecido descanso e tempo para os netos.', icon: 'award' },
  { id: 5, year: '2021', title: 'A Grande Vitória', description: 'Superação do COVID-19 com força e fé, unindo ainda mais a família em oração.', icon: 'Activity' },
  { id: 6, year: '', title: '76 Anos', description: 'Celebrando a vida, a saúde e o legado de amor construído até aqui.', icon: 'star' },
];

const IconMap: Record<string, React.ReactNode> = {
  baby: <Baby size={20} />,
  home: <Home size={20} />,
  heart: <Heart size={20} />,
  award: <Award size={20} />,
  Activity: <Activity size={20} />,
  star: <Star size={20} />,
};

export const Timeline: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleText = "Linha do Tempo";
  let globalIndex = 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-20 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 
            className="font-serif text-4xl text-stone-100 mb-4 flex flex-wrap justify-center gap-x-3"
            aria-label={titleText}
          >
            {titleText.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, charIndex) => {
                    const delay = (globalIndex++) * 0.08; 
                    return (
                      <span
                        key={charIndex}
                        className={`inline-block ${isVisible ? 'opacity-0 animate-letter-in' : 'opacity-0'}`}
                        style={isVisible ? { animationDelay: `${delay}s` } : {}}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ))}
          </h2>
          <div 
            className={`w-16 h-1 bg-gold-500 mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
            style={{ transitionDelay: '1.2s' }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line (Hidden on mobile, visible on md+) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold-800 transform md:-translate-x-1/2"></div>

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            // Calculate delay for staggered animation: Start after title (approx 0.5s) + slower sequence
            const animationDelay = 0.5 + (index * 0.7);

            return (
              <div 
                key={event.id}
                className={`relative flex items-center mb-12 md:mb-24 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: isVisible ? `${animationDelay}s` : '0s' }}
              >
                {/* Spacer for desktop alignment */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* Node/Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gold-600 border-4 border-stone-900 shadow-lg z-10 flex items-center justify-center text-white">
                    {event.icon && IconMap[event.icon] ? IconMap[event.icon] : <Star size={12} />}
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div 
                    className={`bg-stone-800 p-6 rounded-xl shadow-md border-l-4 border-gold-600 hover:shadow-lg hover:shadow-black/50 transition-all duration-300 cursor-pointer ${activeId === event.id ? 'scale-105 ring-2 ring-gold-500/50' : ''}`}
                    onClick={() => setActiveId(activeId === event.id ? null : event.id)}
                  >
                    {event.year && (
                      <span className="inline-block px-3 py-1 bg-gold-900/50 text-gold-400 border border-gold-800 rounded-full text-sm font-bold mb-2">
                        {event.year}
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">{event.title}</h3>
                    <p className="text-stone-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};