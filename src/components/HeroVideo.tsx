import React, { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/chennai/Chennai_Panorama_Loop.mp4';
const POSTER_SRC = '/chennai/poster.jpg';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

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
    if (userPaused || !inView) {
      video.pause();
    } else {
      video.play().catch(() => setUserPaused(true));
    }
  }, [userPaused, inView]);

  return (
    <>
      <div className={`hero-video${userPaused || !inView ? ' is-paused' : ''}`} aria-hidden="true">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster={POSTER_SRC}>
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
