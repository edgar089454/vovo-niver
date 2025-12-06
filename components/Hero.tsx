import React, { useState, useEffect } from 'react';
import { ArrowDown, Edit2, Check, Upload, Trash2, X } from 'lucide-react';

// Define positions for the 6 floating images
const IMAGE_POSITIONS = [
  "top-12 left-4 md:top-20 md:left-24",      // Top Left
  "top-32 right-4 md:top-24 md:right-1/4",   // Top Center-Right
  "top-12 right-4 md:right-24",              // Top Right
  "bottom-32 left-4 md:bottom-24 md:left-32",// Bottom Left
  "bottom-12 left-1/2 -translate-x-1/2",     // Bottom Center
  "bottom-32 right-4 md:bottom-20 md:right-32" // Bottom Right
];

export const Hero: React.FC = () => {
  const title = "76 Anos de História";
  let globalIndex = 0;
  
  const [isEditing, setIsEditing] = useState(false);
  const [heroImages, setHeroImages] = useState<(string | null)[]>(Array(6).fill(null));

  useEffect(() => {
    const saved = localStorage.getItem('hero_floating_images');
    if (saved) {
      setHeroImages(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...heroImages];
        newImages[index] = reader.result as string;
        setHeroImages(newImages);
        localStorage.setItem('hero_floating_images', JSON.stringify(newImages));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...heroImages];
    newImages[index] = null;
    setHeroImages(newImages);
    localStorage.setItem('hero_floating_images', JSON.stringify(newImages));
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-stone-900 text-white">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url("https://picsum.photos/1920/1080?grayscale&blur=2")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/90"></div>

      {/* Floating Images Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {IMAGE_POSITIONS.map((posClass, index) => (
          <div 
            key={index} 
            className={`absolute ${posClass} transition-all duration-500 ${isEditing ? 'z-50 pointer-events-auto' : 'z-0'}`}
          >
            {isEditing ? (
              // Edit Mode Placeholder
              <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-gold-500/50 bg-stone-900/80 rounded-full flex flex-col items-center justify-center p-2 backdrop-blur-sm shadow-xl relative group">
                {heroImages[index] ? (
                   <>
                     <img src={heroImages[index]!} alt="Memory" className="w-full h-full object-cover rounded-full opacity-50" />
                     <button 
                        onClick={() => removeImage(index)}
                        className="absolute inset-0 flex items-center justify-center text-red-400 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <Trash2 size={24} />
                     </button>
                   </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gold-500 hover:text-gold-300 transition-colors">
                    <Upload size={20} className="mb-1" />
                    <span className="text-[10px] uppercase font-bold">Add Foto</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} className="hidden" />
                  </label>
                )}
              </div>
            ) : (
              // Display Mode
              heroImages[index] && (
                <div 
                   className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gold-500/30 shadow-2xl animate-float opacity-70 hover:opacity-100 transition-opacity duration-700 hover:scale-110"
                   style={{ animationDelay: `${index * 1}s` }}
                >
                  <img src={heroImages[index]!} alt="" className="w-full h-full object-cover" />
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {/* Edit Toggle Button */}
      <button 
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-24 right-4 z-50 bg-stone-800/80 text-gold-400 p-2 rounded-full hover:bg-gold-600 hover:text-white transition-all backdrop-blur-sm border border-gold-500/30"
        title={isEditing ? "Salvar alterações" : "Personalizar fundo"}
      >
        {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
        <div className="mb-4 inline-block px-4 py-1 border border-gold-400 rounded-full text-gold-400 tracking-widest text-sm uppercase animate-fade-in-up">
          1949 — 2025
        </div>
        
        <h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-gold-100 mb-6 drop-shadow-lg flex flex-wrap justify-center gap-x-3 md:gap-x-5 leading-tight"
          aria-label={title}
        >
          {title.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => {
                const delay = (globalIndex++) * 0.08 + 0.2; // Staggered delay
                return (
                  <span
                    key={charIndex}
                    className="opacity-0 animate-letter-in inline-block"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="text-lg md:text-2xl text-stone-200 font-light italic mb-8 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
          "Celebrando uma vida de sabedoria, força e uma fé inabalável."
        </p>
        <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full animate-fade-in-up" style={{ animationDelay: '1.8s' }}></div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow text-gold-300 z-10">
        <a href="#timeline" aria-label="Rolar para baixo">
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};