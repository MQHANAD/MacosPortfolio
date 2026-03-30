/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import { Image, Images, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (initialAlbum) {
      setView('albums');
      setSelectedAlbum(initialAlbum);
    }
  }, [initialAlbum]);

  const openLightbox = (photos: Photo[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxPhotos([]);
  };

  const navigateLightbox = useCallback((direction: 1 | -1) => {
    if (lightboxIndex === null) return;
    const next = lightboxIndex + direction;
    if (next >= 0 && next < lightboxPhotos.length) {
      setLightboxIndex(next);
    }
  }, [lightboxIndex, lightboxPhotos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, navigateLightbox]);

  const handleAlbumClick = (albumId: string) => {
    setSelectedAlbum(albumId);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
  };

  const handleSidebarNav = (newView: View, albumId?: string) => {
    setView(newView);
    if (newView === 'library') {
      setSelectedAlbum(null);
    } else if (albumId) {
      setSelectedAlbum(albumId);
    } else {
      setSelectedAlbum(null);
    }
  };

  // Determine which photos to show in the grid
  const currentPhotos = (() => {
    if (view === 'library') return allPhotos;
    if (selectedAlbum) {
      const album = albums.find((a) => a.id === selectedAlbum);
      return album ? album.photos : [];
    }
    return [];
  })();

  const currentAlbum = selectedAlbum ? albums.find((a) => a.id === selectedAlbum) : null;

  return (
    <div className="flex h-full font-sans relative bg-white">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-48 bg-gray-100/80 backdrop-blur-md border-r border-gray-200 p-3 flex flex-col gap-0.5 text-sm select-none shrink-0">
          {/* Library */}
          <button
            onClick={() => handleSidebarNav('library')}
            className={cn(
              'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer w-full text-left transition-colors',
              view === 'library'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200/60'
            )}
          >
            <Image size={16} className={view === 'library' ? 'text-white' : 'text-blue-500'} />
            <span className="font-medium">Library</span>
          </button>

          {/* Albums Section */}
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-1 px-2">
            Albums
          </div>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => handleSidebarNav('albums', album.id)}
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
                  view === 'albums' && selectedAlbum === album.id
                    ? 'text-white'
                    : 'text-blue-500'
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
          <div className="px-3 pt-3 pb-2 bg-gray-50 border-b border-gray-200">
            <div className="flex bg-gray-200/80 rounded-lg p-0.5">
              <button
                onClick={() => handleSidebarNav('library')}
                className={cn(
                  'flex-1 py-1.5 text-sm font-medium rounded-md transition-all',
                  view === 'library'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500'
                )}
              >
                Library
              </button>
              <button
                onClick={() => {
                  setView('albums');
                  setSelectedAlbum(null);
                }}
                className={cn(
                  'flex-1 py-1.5 text-sm font-medium rounded-md transition-all',
                  view === 'albums'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500'
                )}
              >
                Albums
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Library View — photo grid */}
          {view === 'library' && (
            <div className="p-[2px]">
              <PhotoGrid photos={allPhotos} onPhotoClick={(i) => openLightbox(allPhotos, i)} />
            </div>
          )}

          {/* Albums View — album list or album photos */}
          {view === 'albums' && !selectedAlbum && (
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Albums</h2>
              <div className="grid grid-cols-2 gap-4">
                {albums.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => handleAlbumClick(album.id)}
                    className="text-left group cursor-pointer"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 shadow-sm">
                      <img
                        src={album.coverPhoto}
                        alt={album.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{album.title}</p>
                    <p className="text-xs text-gray-400">{album.photos.length}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'albums' && selectedAlbum && currentAlbum && (
            <div>
              {/* Album header with back button (mobile only, desktop uses sidebar) */}
              {isMobile && (
                <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                  <button
                    onClick={handleBackToAlbums}
                    className="flex items-center gap-1 text-blue-500 text-sm font-medium cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    Albums
                  </button>
                  <span className="text-sm font-semibold text-gray-800">{currentAlbum.title}</span>
                </div>
              )}
              <div className="p-[2px]">
                <PhotoGrid
                  photos={currentPhotos}
                  onPhotoClick={(i) => openLightbox(currentPhotos, i)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && lightboxPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X size={24} />
          </button>

          {/* Previous */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              className="absolute left-4 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {/* Photo */}
          <img
            src={lightboxPhotos[lightboxIndex].src}
            alt={lightboxPhotos[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />

          {/* Next */}
          {lightboxIndex < lightboxPhotos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              className="absolute right-4 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
            >
              <ChevronRight size={36} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 text-white/50 text-sm">
            {lightboxIndex + 1} / {lightboxPhotos.length}
          </div>
        </div>
      )}
    </div>
  );
}

function PhotoGrid({
  photos,
  onPhotoClick,
}: {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-[2px]">
      {photos.map((photo, i) => (
        <button
          key={photo.src}
          onClick={() => onPhotoClick(i)}
          className="aspect-square overflow-hidden cursor-pointer group"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-150"
          />
        </button>
      ))}
    </div>
  );
}
