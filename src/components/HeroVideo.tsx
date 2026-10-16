import React, { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/chennai/Chennai_Panorama_Loop.mp4';
const POSTER_SRC = '/chennai/poster.jpg';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
/** Slightly slower than real time so the water drifts calmly. */
const PLAYBACK_RATE = 0.8;

/**
 * Looping Chennai panorama behind the home hero. Plays muted and inline,
 * pauses while scrolled out of view, honours reduced-motion, and offers a
 * visitor-facing pause control. The poster stays visible if autoplay is blocked.
 */
export const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
  const [inView, setInView] = useState(true);
  // Hold playback while the welcome intro is on screen so it animates smoothly.
  const [introActive, setIntroActive] = useState(
    () => typeof document !== 'undefined' && document.documentElement.dataset.intro === 'active'
  );

  useEffect(() => {
    if (!introActive) return;
    const handleEnd = () => setIntroActive(false);
    window.addEventListener('gsx:intro-end', handleEnd);
    return () => window.removeEventListener('gsx:intro-end', handleEnd);
  }, [introActive]);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = () => setUserPaused(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  // Stop decoding frames while the hero is off-screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (userPaused || !inView || introActive) {
      video.pause();
    } else {
      video.playbackRate = PLAYBACK_RATE;
      video.play().catch(() => setUserPaused(true));
    }
  }, [userPaused, inView, introActive]);

  return (
    <>
      <div className={`hero-video${userPaused || !inView ? ' is-paused' : ''}`} aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          onLoadedMetadata={(event) => {
            event.currentTarget.playbackRate = PLAYBACK_RATE;
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
      <button
        type="button"
        className="motion-toggle"
        onClick={() => setUserPaused((paused) => !paused)}
        aria-label={userPaused ? 'Play background animation' : 'Pause background animation'}
      >
        {userPaused ? 'Play motion' : 'Pause motion'}
      </button>
    </>
  );
};

export default HeroVideo;
