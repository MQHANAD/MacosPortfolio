/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, Images, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import NextImage from 'next/image';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '@/lib/utils';
import { albums, allPhotos, type Photo } from '../../data/photos';

type View = 'library' | 'albums';

interface PhotosAppProps {
  initialAlbum?: string | null;
}

export default function PhotosApp({ initialAlbum = null }: PhotosAppProps) {
  const isMobile = useIsMobile();
  const [view, setView] = useState<View>(initialAlbum ? 'albums' : 'library');
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(initialAlbum);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

  useEffect(() => {
    if (initialAlbum) {
      setView('albums');
      setSelectedAlbum(initialAlbum);
    }
  }, [initialAlbum]);

  const openLightbox = useCallback((photos: Photo[], index: number) => {
    setLightbox({ photos, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const navigateLightbox = useCallback((direction: 1 | -1) => {
    setLightbox(prev => {
      if (!prev) return null;
      const next = prev.index + direction;
      if (next < 0 || next >= prev.photos.length) return prev;
      return { ...prev, index: next };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeLightbox(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { navigateLightbox(-1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { navigateLightbox(1); e.preventDefault(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, closeLightbox, navigateLightbox]);

  const handleSwitchView = useCallback((newView: View, albumId?: string) => {
    setView(newView);
    setSelectedAlbum(newView === 'library' ? null : albumId ?? null);
  }, []);

  const showAlbumList = view === 'albums' && !selectedAlbum;
  const currentAlbum = selectedAlbum ? albums.find((a) => a.id === selectedAlbum) : null;

  /* Stop ALL event types from bubbling to the Window's motion.div.
     On iOS Safari, onPointerDown alone is unreliable — touch events
     can still propagate and trigger framer-motion drag internals,
     causing the page to crash. Stopping onClick + onTouchStart
     covers every code-path on real devices. */
  const stopBubble = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className="flex h-full font-sans bg-white relative"
      style={{ touchAction: 'manipulation' }}
      onClick={stopBubble}
      onPointerDown={stopBubble}
      onTouchStart={stopBubble}
    >
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-48 bg-gray-100/80 backdrop-blur-md border-r border-gray-200 p-3 flex flex-col gap-0.5 text-sm select-none shrink-0">
          <button
            type="button"
            onClick={() => handleSwitchView('library')}
            className={cn(
              'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer w-full text-left transition-colors',
              view === 'library'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200/60'
            )}
          >
            <ImageIcon size={16} className={view === 'library' ? 'text-white' : 'text-blue-500'} />
            <span className="font-medium">Library</span>
          </button>

          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-1 px-2">
            Albums
          </div>
          {albums.map((album) => (
            <button
              type="button"
              key={album.id}
              onClick={() => handleSwitchView('albums', album.id)}
              className={cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer w-full text-left transition-colors',
                view === 'albums' && selectedAlbum === album.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200/60'
              )}
            >
              <Images
                size={16}
                className={
                  view === 'albums' && selectedAlbum === album.id ? 'text-white' : 'text-blue-500'
                }
              />
              <span>{album.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Segmented Control */}
        {isMobile && (
          <div className="px-3 pt-3 pb-2 bg-gray-50 border-b border-gray-200 shrink-0">
            <div className="flex bg-gray-200/80 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => handleSwitchView('library')}
                className={cn(
                  'flex-1 py-1.5 text-sm font-medium rounded-md transition-all',
                  view === 'library' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                )}
                style={{ touchAction: 'manipulation' }}
              >
                Library
              </button>
              <button
                type="button"
                onClick={() => handleSwitchView('albums')}
                className={cn(
                  'flex-1 py-1.5 text-sm font-medium rounded-md transition-all',
                  view === 'albums' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                )}
                style={{ touchAction: 'manipulation' }}
              >
                Albums
              </button>
            </div>
          </div>
        )}

        {/* Mobile album back header */}
        {isMobile && view === 'albums' && selectedAlbum && currentAlbum && (
          <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedAlbum(null)}
              className="flex items-center gap-1 text-blue-500 text-sm font-medium cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              <ArrowLeft size={16} />
              Albums
            </button>
            <span className="text-sm font-semibold text-gray-800">{currentAlbum.title}</span>
          </div>
        )}

        {/* Content area — on mobile, only render the active view to reduce memory pressure */}
        <div className="flex-1 overflow-auto relative">
          {/* Library grid */}
          {view === 'library' && (
            <div className="p-[2px]">
              <PhotoGrid
                photos={allPhotos}
                onPhotoClick={(i) => openLightbox(allPhotos, i)}
              />
            </div>
          )}

          {/* Albums list */}
          {showAlbumList && (
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Albums</h2>
              <div className="grid grid-cols-2 gap-4">
                {albums.map((album) => (
                  <button
                    type="button"
                    key={album.id}
                    onClick={() => setSelectedAlbum(album.id)}
                    className="text-left group cursor-pointer"
                    style={{ touchAction: 'manipulation' }}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-sm relative">
                      <NextImage
                        src={album.coverPhoto}
                        alt={album.title}
                        fill
                        sizes="(max-width: 768px) 45vw, 200px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{album.title}</p>
                    <p className="text-xs text-gray-400">{album.photos.length}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected album grid — only mount the active album */}
          {view === 'albums' && selectedAlbum && currentAlbum && (
            <div className="p-[2px]">
              <PhotoGrid
                photos={currentAlbum.photos}
                onPhotoClick={(i) => openLightbox(currentAlbum.photos, i)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && lightbox.photos[lightbox.index] && (
        <div
          className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X size={22} />
          </button>

          {lightbox.index > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-2 text-white/50 hover:text-white transition-colors cursor-pointer z-10 p-2"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <img
            src={lightbox.photos[lightbox.index].src}
            alt={lightbox.photos[lightbox.index].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[85%] max-h-[85%] object-contain rounded-lg select-none"
            draggable={false}
          />

          {lightbox.index < lightbox.photos.length - 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-2 text-white/50 hover:text-white transition-colors cursor-pointer z-10 p-2"
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div className="absolute bottom-3 text-white/50 text-sm">
            {lightbox.index + 1} / {lightbox.photos.length}
          </div>
        </div>
      )}
    </div>
  );
}

/* Memoized grid — only re-renders when photos array changes */
const PhotoGrid = React.memo(function PhotoGrid({
  photos,
  onPhotoClick,
}: {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-[2px]">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          onClick={() => onPhotoClick(i)}
          className="aspect-square overflow-hidden cursor-pointer group relative"
        >
          <NextImage
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 33vw, 20vw"
            className="object-cover group-hover:opacity-80 transition-opacity duration-150"
          />
        </div>
      ))}
    </div>
  );
});
