import React from 'react';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { MessageWall } from './components/MessageWall';
import { MediaSection } from './components/MediaSection';
import { Footer } from './components/Footer';

// A generic "Highlight" component for the emotional intro
const HighlightMessage: React.FC = () => {
  return (
    <section id="highlight" className="py-20 bg-stone-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
                <div className="bg-stone-900 p-10 md:p-14 rounded-2xl shadow-xl border border-stone-800">
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-100 mb-6 leading-tight">
                        "O justo florescerá como a palmeira; crescerá como o cedro no Líbano."
                    </h2>
                    <p className="text-stone-300 text-lg leading-relaxed font-light mb-8">
                        Ao completarmos 76 anos desta jornada, olhamos para trás com gratidão. 
                        Cada riso, cada desafio superado e cada momento compartilhado moldaram o alicerce 
                        sólido desta família. Hoje não é apenas um aniversário, é a celebração de um legado vivo.
                    </p>
                    <div className="flex justify-center">
                         <span className="font-script text-gold-500 text-xl font-bold">Salmos 92:12</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-950/90 backdrop-blur-md shadow-sm py-3 border-b border-stone-800' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className={`font-serif font-bold text-xl tracking-wider ${isScrolled ? 'text-stone-100' : 'text-white'}`}>
                    LEGADO 76
                </div>
                <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide uppercase">
                    {['Timeline', 'Galeria', 'Mensagens'].map((item) => (
                        <a 
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`hover:text-gold-400 transition-colors ${isScrolled ? 'text-stone-400' : 'text-stone-300'}`}
                        >
                            {item}
                        </a>
                    ))}
                    <a 
                        href="#media"
                        className={`hover:text-gold-400 transition-colors ${isScrolled ? 'text-stone-400' : 'text-stone-300'}`}
                    >
                        Recordações
                    </a>
                </div>
            </div>
        </nav>
    );
};

function App() {
  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-200 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Timeline />
      <Gallery />
      <HighlightMessage />
      <MessageWall />
      <MediaSection />
      <Footer />
    </div>
  );
}

export default App;