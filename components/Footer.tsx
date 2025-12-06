import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-12 text-center border-t border-stone-900">
      <div className="container mx-auto px-4">
        <h3 className="font-serif text-2xl text-gold-500 mb-4">Com amor, sua família.</h3>
        <p className="text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Que este dia seja apenas mais um capítulo de alegria em sua linda história.
          Obrigado por nos ensinar tanto.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs tracking-widest uppercase">
            <span>Legado 76</span>
            <span className="w-1 h-1 bg-stone-800 rounded-full"></span>
            <span>2025</span>
        </div>
      </div>
    </footer>
  );
};