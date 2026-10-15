import { useEffect, useRef, useState, type CSSProperties } from 'react';

export type GsxLoadingScreenProps = {
  /** Public URL or local asset URL of the GSX logo. */
  logoSrc?: string;
  /** Skip the introduction after the first display in this tab session. */
  oncePerSession?: boolean;
  sessionKey?: string;
  /** Animation duration in milliseconds, clamped to 400–1000. */
  duration?: number;
  onComplete?: () => void;
};

/** A brief brand introduction. Render it alongside page content; never wait for it to mount the page. */
export default function GsxLoadingScreen({ logoSrc = '/gsx-logo.png', oncePerSession = true, sessionKey = 'gsx-intro-seen', duration = 900, onComplete }: GsxLoadingScreenProps) {
  const [visible, setVisible] = useState(false);
  const callback = useRef(onComplete);
  callback.current = onComplete;
  const milliseconds = Math.min(1000, Math.max(400, duration));

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    if (oncePerSession) {
      try {
        if (sessionStorage.getItem(sessionKey)) return;
        sessionStorage.setItem(sessionKey, 'true');
      } catch { return; }
    }
    setVisible(true);
    const finish = () => { setVisible(false); callback.current?.(); };
    const timer = window.setTimeout(finish, milliseconds);
    const handlePreference = () => { if (preference.matches) finish(); };
    preference.addEventListener('change', handlePreference);
    return () => { window.clearTimeout(timer); preference.removeEventListener('change', handlePreference); };
  }, [milliseconds, oncePerSession, sessionKey]);

  if (!visible) return null;
  return <>
    <style>{`
      .gsx-loading-intro { position:fixed; inset:0; z-index:100; display:grid; place-items:center; pointer-events:none; background:radial-gradient(125% 125% at 50% 10%,#000 40%,#63e 100%); animation:gsx-intro-reveal var(--gsx-intro-duration) ease forwards; }
      .gsx-loading-intro img { width:80px; height:80px; object-fit:contain; filter:drop-shadow(0 0 30px #c492ff60); animation:gsx-intro-logo var(--gsx-intro-duration) cubic-bezier(.2,.8,.2,1) both; }
      @keyframes gsx-intro-logo { 0% { opacity:0; transform:scale(.65) rotate(-45deg); } 40% { opacity:1; transform:scale(1.05) rotate(5deg); } 72% { opacity:1; transform:scale(1) rotate(0); } 100% { opacity:0; transform:scale(1.1) rotate(0); } }
      @keyframes gsx-intro-reveal { 0%,55% { opacity:1; } 100% { opacity:0; visibility:hidden; } }
      @media(prefers-reduced-motion:reduce) { .gsx-loading-intro { display:none; animation:none; } .gsx-loading-intro img { animation:none; } }
    `}</style>
    <div className="gsx-loading-intro" aria-hidden="true" style={{ '--gsx-intro-duration': `${milliseconds}ms` } as CSSProperties}>
      <img src={logoSrc} alt="" width={80} height={80} onError={() => { setVisible(false); callback.current?.(); }} />
    </div>
  </>;
}
