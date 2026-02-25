"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

type GalleryImage = { asset: any; alt: string };

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const isOpen = lightboxIdx !== null;

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  // Sync active thumbnail cuando navego con el lightbox
  useEffect(() => {
    if (lightboxIdx !== null) setActiveIdx(lightboxIdx);
  }, [lightboxIdx]);

  // Teclado: Esc cierra, flechas navegan
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, goPrev, goNext]);

  // Bloquear scroll del body mientras el lightbox está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const mainImg = images[activeIdx];
  const mainUrl = mainImg
    ? urlFor(mainImg).width(1200).height(1200).fit("max").url()
    : null;

  return (
    <>
      {/* Imagen principal */}
      <button
        type="button"
        className="group relative w-full aspect-square overflow-hidden rounded-2xl bg-[var(--color-cream)] cursor-zoom-in focus:outline-none"
        onClick={() => setLightboxIdx(activeIdx)}
        title="Ver imagen a tamaño completo"
      >
        {mainUrl && (
          <Image
            src={mainUrl}
            alt={mainImg.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zM11 8v6M8 11h6" />
          </svg>
          Ampliar
        </span>
      </button>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const thumbUrl = urlFor(img).width(200).height(200).fit("crop").url();
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl transition focus:outline-none ${
                  activeIdx === idx
                    ? "ring-2 ring-[var(--color-brown)] ring-offset-2"
                    : "opacity-50 hover:opacity-90"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          onClick={() => setLightboxIdx(null)}
        >
          {/* Botón cerrar */}
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition text-xl"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Contador */}
          {images.length > 1 && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white/80">
              {lightboxIdx! + 1} / {images.length}
            </div>
          )}

          {/* Flecha anterior */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition"
              aria-label="Anterior"
            >
              ‹
            </button>
          )}

          {/* Imagen grande */}
          <div
            className="relative w-full max-w-3xl max-h-[88vh] aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const lbImg = images[lightboxIdx!];
              const lbUrl = urlFor(lbImg).width(2400).height(2400).fit("max").url();
              return (
                <Image
                  src={lbUrl}
                  alt={lbImg.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              );
            })()}
          </div>

          {/* Flecha siguiente */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition"
              aria-label="Siguiente"
            >
              ›
            </button>
          )}

          {/* Tira de miniaturas en el lightbox */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, idx) => {
                const tUrl = urlFor(img).width(120).height(120).fit("crop").url();
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setLightboxIdx(idx); }}
                    className={`relative h-12 w-12 overflow-hidden rounded-lg transition ${
                      lightboxIdx === idx
                        ? "ring-2 ring-white opacity-100"
                        : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    <Image src={tUrl} alt={img.alt} fill className="object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
