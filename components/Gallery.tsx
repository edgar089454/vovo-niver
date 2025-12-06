import React, { useState, useEffect } from 'react';
import { X, Upload, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { Photo } from '../types';

export const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Initialize from local storage or empty
  useEffect(() => {
    const saved = localStorage.getItem('legacy_photos');
    if (saved) {
      setPhotos(JSON.parse(saved));
    } else {
      setPhotos([]);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: reader.result as string,
          caption: 'Nova lembrança',
          dateAdded: Date.now()
        };
        const updatedPhotos = [newPhoto, ...photos];
        setPhotos(updatedPhotos);
        localStorage.setItem('legacy_photos', JSON.stringify(updatedPhotos));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-stone-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="font-serif text-4xl text-stone-100 mb-2">Galeria de Memórias</h2>
            <div className="w-16 h-1 bg-gold-500"></div>
          </div>
          
          <label className="flex items-center gap-2 bg-stone-800 text-gold-400 border border-stone-700 px-6 py-3 rounded-full hover:bg-stone-700 hover:text-gold-300 transition-colors cursor-pointer shadow-lg">
            <Upload size={18} />
            <span className="font-semibold">Adicionar Foto</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.length === 0 && (
             <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-16 border-2 border-dashed border-stone-800 rounded-xl text-stone-600 bg-stone-900/50">
                <ImageIcon size={48} className="mb-4 opacity-20" />
                <p className="mb-2 text-lg font-serif">A galeria está vazia.</p>
                <p className="text-sm opacity-60">Clique em "Adicionar Foto" para começar a coleção de memórias.</p>
             </div>
          )}
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md bg-stone-900 border border-stone-800"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo.url} 
                alt={photo.caption || 'Foto da galeria'} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <ZoomIn className="text-white opacity-80" size={32} />
              </div>
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white hover:text-gold-400 transition-colors"
          >
            <X size={40} />
          </button>
          
          <div className="max-w-5xl max-h-screen relative">
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption} 
              className="max-h-[85vh] max-w-full object-contain rounded-md shadow-2xl border-4 border-stone-800"
            />
            {selectedPhoto.caption && (
              <p className="text-center text-stone-300 mt-4 text-xl font-light font-serif italic">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};