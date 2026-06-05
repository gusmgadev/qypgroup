"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { theme } from "../../lib/theme"
import type { ProjectPhoto } from "../../lib/db/projects"

export default function PhotoGallery({ photos }: { photos: ProjectPhoto[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (photos.length === 0) return null

  function prev() {
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : 0))
  }
  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : 0))
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "12px",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            onClick={() => setLightbox(i)}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: theme.radii.md,
              overflow: "hidden",
              cursor: "zoom-in",
              backgroundColor: theme.colors.dark,
            }}
          >
            <Image
              src={photo.url}
              alt={`Foto ${i + 1}`}
              fill
              style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="gallery-img"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255,255,255,0.10)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              zIndex: 2,
            }}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              style={{
                position: "absolute",
                left: "16px",
                background: "rgba(255,255,255,0.10)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                zIndex: 2,
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "min(90vw, 1000px)",
              maxHeight: "85vh",
              width: "100%",
              aspectRatio: "4/3",
            }}
          >
            <Image
              src={photos[lightbox].url}
              alt={`Foto ${lightbox + 1}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              style={{
                position: "absolute",
                right: "16px",
                background: "rgba(255,255,255,0.10)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                zIndex: 2,
              }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Counter */}
          <span
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.60)",
              fontSize: theme.fontSizes.sm,
            }}
          >
            {lightbox + 1} / {photos.length}
          </span>
        </div>
      )}

      <style jsx>{`
        .gallery-img:hover {
          transform: scale(1.04);
        }
      `}</style>
    </>
  )
}
