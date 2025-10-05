import React from 'react';
import { Card } from './Card';
import { tw } from '../theme';

interface VideoShowcaseProps {
  videoSrc: string;
  posterImage?: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Video Showcase Component
 * Displays a video player with optional title and description
 * 
 * @example
 * ```tsx
 * <VideoShowcase
 *   videoSrc="/game_screenshots/demo-showcase.mp4"
 *   posterImage="/hero-ocean-depths.jpg"
 *   title="Deep Ocean VR Demo"
 *   description="Experience our immersive VR world"
 * />
 * ```
 */
export function VideoShowcase({
  videoSrc,
  posterImage = '/hero-ocean-depths.jpg',
  title,
  description,
  className = '',
}: VideoShowcaseProps) {
  return (
    <Card className={`p-0 overflow-hidden ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls
          poster={posterImage}
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {(title || description) && (
        <div className={`p-6 ${tw.bg.card}`}>
          {title && (
            <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>{title}</h3>
          )}
          {description && (
            <p className={tw.text.secondary}>{description}</p>
          )}
        </div>
      )}
    </Card>
  );
}

interface VideoHeroProps {
  videoSrc: string;
  title: string;
  subtitle?: string;
  posterImage?: string;
  className?: string;
}

/**
 * Video Hero Component
 * Full-width video banner with overlay text
 * 
 * @example
 * ```tsx
 * <VideoHero
 *   videoSrc="/game_screenshots/demo-showcase.mp4"
 *   title="Deep Ocean VR"
 *   subtitle="Explore the depths"
 *   posterImage="/hero-ocean-depths.jpg"
 * />
 * ```
 */
export function VideoHero({
  videoSrc,
  title,
  subtitle,
  posterImage = '/hero-ocean-depths.jpg',
  className = '',
}: VideoHeroProps) {
  return (
    <div className={`relative h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#85c6cf]/30 ${className}`}>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={posterImage}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#06141B] via-[#06141B]/70 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${tw.text.primary} drop-shadow-2xl`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-xl md:text-2xl ${tw.text.accent} drop-shadow-lg`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

