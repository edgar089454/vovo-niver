import React, { useState, useRef } from 'react';
import { Play, Pause, Mic, Video, Music, Trash2, Upload } from 'lucide-react';
import { AudioTrack, VideoItem } from '../types';

export const MediaSection: React.FC = () => {
  const [audios, setAudios] = useState<AudioTrack[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (url: string) => {
    if (currentAudio === url) {
      audioRef.current?.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(url);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAudio: AudioTrack = {
          id: Date.now().toString(),
          title: file.name.replace(/\.[^/.]+$/, ""),
          url: reader.result as string,
        };
        setAudios([...audios, newAudio]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    const audioToDelete = audios.find(a => a.id === id);
    if (audioToDelete && currentAudio === audioToDelete.url) {
      audioRef.current?.pause();
      setCurrentAudio(null);
    }
    setAudios(prev => prev.filter(audio => audio.id !== id));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      // Using createObjectURL for better performance with video files
      const url = URL.createObjectURL(file);
      
      const newVideo: VideoItem = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        url: url
      };
      setVideos([...videos, newVideo]);
    }
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  return (
    <section id="media" className="py-20 bg-stone-950 text-stone-200">
      <div className="container mx-auto px-4">
        
        {/* Hidden Audio Player Element */}
        <audio ref={audioRef} onEnded={() => setCurrentAudio(null)} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Audio Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gold-600 rounded-full text-white">
                <Music size={24} />
              </div>
              <h2 className="font-serif text-3xl text-gold-100">Homenagens Da Família</h2>
            </div>

            <div className="bg-stone-900 rounded-2xl p-6 shadow-xl border border-stone-800">
              <div className="flex justify-between items-center mb-6">
                 <p className="text-sm text-stone-400">Mensagens de voz e músicas</p>
                 <label className="text-xs bg-stone-800 border border-stone-700 hover:bg-stone-700 px-3 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1 text-stone-300">
                    <Mic size={12} />
                    <span>Upload MP3</span>
                    <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
                 </label>
              </div>

              <div className="space-y-4">
                {audios.length === 0 && (
                    <div className="text-center py-8 text-stone-600 italic text-sm">
                        Nenhum áudio enviado ainda.
                    </div>
                )}
                {audios.map((audio) => (
                  <div key={audio.id} className="flex items-center justify-between bg-stone-950/50 p-4 rounded-lg border border-stone-800 hover:border-gold-700 transition-colors group">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <button 
                        onClick={() => handlePlay(audio.url)}
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentAudio === audio.url ? 'bg-gold-600 text-white' : 'bg-stone-800 text-stone-400 hover:bg-gold-600 hover:text-white'}`}
                      >
                        {currentAudio === audio.url ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <div className="overflow-hidden min-w-0">
                        <h4 className="font-medium text-gold-50 truncate">{audio.title}</h4>
                        <span className="text-xs text-stone-500 block truncate">Áudio da Família</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                        {currentAudio === audio.url && (
                            <div className="flex gap-1 h-3 items-end">
                                <div className="w-1 bg-gold-500 animate-[bounce_1s_infinite] h-full"></div>
                                <div className="w-1 bg-gold-500 animate-[bounce_1.2s_infinite] h-2/3"></div>
                                <div className="w-1 bg-gold-500 animate-[bounce_0.8s_infinite] h-full"></div>
                            </div>
                        )}
                        <button 
                            onClick={() => handleDelete(audio.id)}
                            className="p-2 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Excluir áudio"
                            aria-label="Excluir áudio"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div>
             <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-900/40 rounded-full text-blue-200">
                <Video size={24} />
              </div>
              <h2 className="font-serif text-3xl text-blue-100">Recordações em Vídeo</h2>
            </div>
            
            <div className="bg-stone-900 rounded-2xl p-6 shadow-xl border border-stone-800 min-h-[300px]">
              <div className="flex justify-between items-center mb-6">
                 <p className="text-sm text-stone-400">Memórias em Vídeo</p>
                 <label className="text-xs bg-stone-800 border border-stone-700 hover:bg-stone-700 px-3 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1 text-stone-300">
                    <Upload size={12} />
                    <span>Upload Vídeo</span>
                    <input type="file" accept="video/mp4,video/webm,video/ogg" onChange={handleVideoUpload} className="hidden" />
                 </label>
              </div>

              <div className="space-y-6">
                  {videos.length === 0 && (
                     <div className="flex flex-col items-center justify-center py-12 text-stone-600 border-2 border-dashed border-stone-800 rounded-xl">
                        <Video size={48} className="mb-2 opacity-20" />
                        <p className="italic text-sm">Nenhum vídeo adicionado.</p>
                        <p className="text-xs opacity-50 mt-1">Clique em upload para adicionar.</p>
                     </div>
                  )}

                  {videos.map((video) => (
                    <div key={video.id} className="bg-stone-950 rounded-xl overflow-hidden border border-stone-800 group relative">
                        <div className="aspect-video bg-black relative">
                            <video 
                                src={video.url} 
                                controls 
                                className="w-full h-full object-contain"
                            >
                                Seu navegador não suporta este vídeo.
                            </video>
                        </div>
                        <div className="p-3 flex justify-between items-center bg-stone-900">
                            <h4 className="font-medium text-gold-50 text-sm truncate pr-2">{video.title}</h4>
                            <button 
                                onClick={() => handleDeleteVideo(video.id)}
                                className="text-stone-500 hover:text-red-400 p-1 rounded transition-colors"
                                title="Excluir vídeo"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};