"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CarouselContext } from "@/components/ui/apple-cards-carousel";
interface VideoCardProps {
  card: {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
    videoUrl?: string;
  };
  index: number;
  layout?: boolean;
}
export const VideoCard = ({ card, index, layout = false }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const youtubeId = card.videoUrl ? getYouTubeId(card.videoUrl) : null;
  const youtubeThumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;
  const isNativeVideo = card.videoUrl && !youtubeId;
  const handleClick = () => {
    if (card.videoUrl) {
      setIsPlaying(true);
    }
  };
  return (
    <>
      {}
      <style jsx global>{`
        .youtube-container iframe {
          pointer-events: auto;
        }
        .youtube-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          pointer-events: none;
          z-index: 30;
        }
      `}</style>
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[35rem] md:w-96 dark:bg-neutral-900 group youtube-container"
      >
        {}
        <div
          className={cn(
            "absolute inset-0 z-20 bg-black/20 transition-opacity duration-300 pointer-events-none",
            (isHovered || isPlaying) ? "opacity-0" : "opacity-100"
          )}
        />
        {}
        <div className={cn(
          "relative z-40 p-8 pointer-events-none transition-opacity duration-300",
          isPlaying ? "opacity-0" : "opacity-100"
        )}>
          <p className="text-left font-sans text-xs font-medium text-white md:text-sm">
            {card.category}
          </p>
          <p className="mt-2 max-w-xs text-left font-sans text-lg font-semibold [text-wrap:balance] text-white md:text-2xl">
            {card.title}
          </p>
        </div>
        {}
        {isPlaying && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(false);
            }}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            aria-label="Stop video"
          >
            <IconX className="w-5 h-5" />
          </button>
        )}
        {}
        {card.videoUrl && !isPlaying && (
          <button
            onClick={handleClick}
            className="absolute inset-0 z-30 flex items-center justify-center bg-transparent border-none cursor-pointer"
            aria-label={`Play video: ${card.title}`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-crimson ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
        {}
        {card.videoUrl && isPlaying && (
          <div className="absolute inset-0 z-10 w-full h-full bg-black">
            {isNativeVideo ? (
              <video
                ref={videoRef}
                src={card.videoUrl}
                loop
                playsInline
                autoPlay
                className="h-full w-full object-cover"
              />
            ) : youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
                title={card.title}
                className="h-full w-full object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen={true}
              />
            ) : null}
          </div>
        )}
        {}
        <img
          src={youtubeThumbnail || card.src}
          alt={card.title}
          className={cn(
            "absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none",
            isHovered && card.videoUrl ? "opacity-0" : "opacity-100"
          )}
        />
      </motion.div>
    </>
  );
};
