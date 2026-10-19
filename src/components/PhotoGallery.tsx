import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/gallery';

/** Two rows of chapter photos drifting in opposite directions; click any photo to enlarge it. */
export const PhotoGallery: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const half = Math.ceil(GALLERY_PHOTOS.length / 2);
  const rows = [
    GALLERY_PHOTOS.slice(0, half).map((photo, i) => ({ photo, index: i })),
    GALLERY_PHOTOS.slice(half).map((photo, i) => ({ photo, index: half + i })),
  ];

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? current : (current + delta + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      ),
    []
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIndex, close, step]);

  return (
    <>
      <div className="space-y-4">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`marquee ${r === 1 ? 'marquee-reverse' : ''}`}
            style={{ '--marquee-duration': '55s' } as React.CSSProperties}
          >
            <ul className="marquee-track">
              {[...row, ...row].map(({ photo, index }, i) => (
                <li key={`${photo.src}-${i}`} aria-hidden={i >= row.length}>
                  <button
                    type="button"
                    tabIndex={i >= row.length ? -1 : 0}
                    onClick={() => setOpenIndex(index)}
                    className="gallery-photo"
                    aria-label={`Open photo: ${photo.alt}`}
                  >
                    <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <figure className="relative max-w-5xl w-full flex flex-col items-center">
            <img
              src={GALLERY_PHOTOS[openIndex].src}
              alt={GALLERY_PHOTOS[openIndex].alt}
              className="max-h-[78dvh] w-auto rounded-2xl border border-purple-400/30 shadow-[0_0_60px_rgba(168,85,247,0.35)]"
            />
            <figcaption className="mt-4 text-sm text-gray-300 text-center">
              {GALLERY_PHOTOS[openIndex].alt}
              <span className="text-gray-500"> · {openIndex + 1} / {GALLERY_PHOTOS.length}</span>
            </figcaption>
          </figure>
          <button type="button" onClick={close} autoFocus aria-label="Close photo viewer" className="absolute top-4 right-4 w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-purple-500/40 text-white cursor-pointer">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-purple-500/40 text-white cursor-pointer">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
