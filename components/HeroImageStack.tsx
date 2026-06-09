"use client";

import { useState, useCallback } from "react";

interface HeroImageStackProps {
  images: { src: string; alt: string }[];
}

export default function HeroImageStack({ images }: HeroImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const orderedImages = [
    ...images.slice(currentIndex),
    ...images.slice(0, currentIndex),
  ];

  return (
    <div
      className="relative w-full max-w-[16rem] h-[320px] sm:max-w-full lg:max-w-md lg:h-[420px] cursor-pointer select-none"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="Klik untuk melihat foto berikutnya"
    >
      {orderedImages.map((img, idx) => {
        const isFront = idx === 0;

        // More visible offsets for stacked cards
        const translateX = idx * 8; // increased from 4 → 8
        const translateY = idx * 4; // increased from 2 → 4
        const rotate = (idx % 2 === 0 ? -1 : 1) * idx * 1.2; // slightly stronger
        const zIndex = images.length - idx;
        const scale = 1 - idx * 0.015; // keep subtle scale for depth

        // Hover effect: rotate the front card a tiny bit
        const frontRotate = isFront && isHovered ? 1.5 : 0;

        return (
          <div
            key={img.src}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate + frontRotate}deg) scale(${scale})`,
              zIndex,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover rounded-2xl border-2 border-white"
            />
          </div>
        );
      })}
    </div>
  );
}
