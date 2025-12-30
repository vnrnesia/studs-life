"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      window.open(card.videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[35rem] md:w-96 dark:bg-neutral-900 group"
      >
        {/* Gray Overlay by default, disappears on hover */}
        <div className={cn(
          "absolute inset-0 z-20 bg-black/20 transition-opacity duration-300",
          isHovered ? "opacity-0" : "opacity-100"
        )} />

        {/* Content Overlay */}
        <div className="relative z-40 p-8">
          <p className="text-left font-sans text-xs font-medium text-white md:text-sm">
            {card.category}
          </p>
          <p className="mt-2 max-w-xs text-left font-sans text-lg font-semibold [text-wrap:balance] text-white md:text-2xl">
            {card.title}
          </p>
        </div>

        {/* Video Layer */}
        {card.videoUrl && (
          <div className={cn(
            "absolute inset-0 z-10 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {isNativeVideo ? (
              <video
                ref={videoRef}
                src={card.videoUrl}
                loop
                playsInline
                autoPlay={isHovered}
                className="h-full w-full object-cover"
              />
            ) : youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isHovered ? 1 : 0}&mute=0&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0`}
                className="h-full w-full scale-[1.5] object-cover pointer-events-none"
                allow="autoplay; encrypted-media"
              />
            ) : null}
          </div>
        )}

        {/* Fallback/Preview Image */}
        <img
          src={youtubeThumbnail || card.src}
          alt={card.title}
          className={cn(
            "absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
            isHovered && card.videoUrl ? "opacity-0" : "opacity-100"
          )}
        />
      </motion.button>
    </>
  );
};
