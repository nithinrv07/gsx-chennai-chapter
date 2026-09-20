import React, { type CSSProperties, useEffect, useRef, useState } from 'react';

type LandmarkArt =
  | 'lighthouse'
  | 'arch'
  | 'civic'
  | 'temple'
  | 'monument'
  | 'park'
  | 'station'
  | 'bridge'
  | 'fort'
  | 'church'
  | 'museum'
  | 'house'
  | 'university'
  | 'planetarium'
  | 'garden'
  | 'flyover'
  | 'tower'
  | 'trade'
  | 'office'
  | 'mall'
  | 'it'
  | 'beach';

type Landmark = {
  name: string;
  art: LandmarkArt;
  left: string;
  top: number;
  height: number;
};

type LandmarkScene = {
  title: string;
  landmarks: Landmark[];
};

const POSITIONS = [
  { left: '9%', top: 131, height: 190 },
  { left: '24%', top: 106, height: 198 },
  { left: '38%', top: 150, height: 150 },
  { left: '62%', top: 138, height: 166 },
  { left: '77%', top: 158, height: 142 },
  { left: '91%', top: 125, height: 177 },
];

const makeScene = (
  title: string,
  items: Array<[string, LandmarkArt]>,
): LandmarkScene => ({
  title,
  landmarks: items.map(([name, art], index) => ({
    name,
    art,
    ...POSITIONS[index],
  })),
});

const LANDMARK_SCENES: LandmarkScene[] = [
  makeScene('Central Chennai', [
    ['CHENNAI LIGHTHOUSE', 'lighthouse'],
    ['MARINA BEACH', 'beach'],
    ['RIPON BUILDING', 'civic'],
    ['CHENNAI CENTRAL', 'station'],
    ['KAPALEESHWARAR\nTEMPLE', 'temple'],
    ['FORT ST. GEORGE', 'fort'],
  ]),
  makeScene('Heritage Chennai', [
    ['NAPIER BRIDGE', 'bridge'],
    ['SAN THOME\nBASILICA', 'church'],
    ['VALLUVAR KOTTAM', 'arch'],
    ['GOVERNMENT\nMUSEUM', 'museum'],
    ['VIVEKANANDA\nHOUSE', 'house'],
    ['PARTHASARATHY\nTEMPLE', 'temple'],
  ]),
  makeScene('Culture & Learning', [
    ['BESANT NAGAR\nBEACH', 'beach'],
    ['ASHTALAKSHMI\nTEMPLE', 'temple'],
    ['GUINDY\nNATIONAL PARK', 'park'],
    ['ANNA UNIVERSITY', 'university'],
    ['BIRLA\nPLANETARIUM', 'planetarium'],
    ['KATHIPARA\nURBAN SQUARE', 'flyover'],
  ]),
  makeScene('Modern Chennai', [
    ['ANNA NAGAR\nTOWER', 'tower'],
    ['CHENNAI\nTRADE CENTRE', 'trade'],
    ['DLF CYBERCITY\nCHENNAI', 'office'],
    ['TIDEL PARK', 'it'],
    ['PHOENIX\nMARKETCITY', 'mall'],
    ['OMR IT\nCORRIDOR', 'it'],
  ]),
];

const LandmarkArtwork: React.FC<{ type: LandmarkArt }> = ({ type }) => {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const art = (() => {
    switch (type) {
      case 'lighthouse':
        return <><path {...common} d="M53 12h14l7 70H46l7-70Z" /><path {...common} d="M50 27h20M48 47h24M46 66h28M57 12V5h6v7M40 82h40" /></>;
      case 'beach':
        return <><path {...common} d="M8 62c12-8 21-8 33 0s22 8 35 0 22-8 36 0M8 75c12-8 21-8 33 0s22 8 35 0 22-8 36 0M24 37c8-11 17-12 26-2M75 22a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" /><path {...common} d="M47 45c9-15 19-18 29-14" /></>;
      case 'arch':
        return <><path {...common} d="M20 82h80M28 82V58c0-25 14-39 32-39s32 14 32 39v24" /><path {...common} d="M42 82V61c0-13 7-21 18-21s18 8 18 21v21" /><path {...common} d="M34 37h52" /></>;
      case 'civic':
        return <><path {...common} d="M18 82V48h84v34M34 48V32h52v16M54 32V14h12v18M60 14V7M28 58h8v24M44 58h8v24M68 58h8v24M84 58h8v24M14 82h92" /><circle {...common} cx="60" cy="22" r="4" /></>;
      case 'temple':
        return <><path {...common} d="M35 82h50L80 68H40l-5 14ZM40 68h40l-5-13H45l-5 13ZM45 55h30l-5-13H50l-5 13ZM50 42h20l-5-13H55l-5 13ZM55 29h10l-5-17-5 17Z" /><path {...common} d="M48 82V72M60 82V72M72 82V72" /></>;
      case 'monument':
        return <><path {...common} d="M48 82h24M52 82V38h16v44M55 38l5-18 5 18M46 82h28M50 52h20M52 68h16" /><path {...common} d="M40 82h40" /></>;
      case 'park':
      case 'garden':
        return <><path {...common} d="M22 82h76M35 82V61M60 82V51M84 82V64" /><circle {...common} cx="35" cy="50" r="16" /><circle {...common} cx="60" cy="38" r="20" /><circle {...common} cx="84" cy="53" r="15" /></>;
      case 'station':
        return <><path {...common} d="M18 82V50h84v32M46 50V24h28v26M55 24V10h10v14M28 62h12v20M80 62h12v20M52 82V61h16v21M14 82h92" /><circle {...common} cx="60" cy="35" r="5" /></>;
      case 'bridge':
        return <><path {...common} d="M12 72c18-32 78-32 96 0M12 72h96M22 72c5-17 18-26 38-26s33 9 38 26M22 72v10M98 72v10M10 82h100" /><path {...common} d="M30 59h60" /></>;
      case 'fort':
        return <><path {...common} d="M18 82V45h14v-8h12v8h32v-8h12v8h14v37M28 82V64h16v18M76 82V64h16v18M52 82V57h16v25M14 82h92" /></>;
      case 'church':
        return <><path {...common} d="M28 82V42h16v40M76 82V42h16v40M44 82V53h32v29M31 42l5-20 5 20M79 42l5-20 5 20M57 53V35h6v18M60 35V24M55 29h10M20 82h80" /></>;
      case 'museum':
        return <><path {...common} d="M18 82h84M25 82V55h70v27M38 55V42h44v13M45 42c3-14 10-22 15-22s12 8 15 22M35 82V62M50 82V62M70 82V62M85 82V62" /></>;
      case 'house':
        return <><path {...common} d="M20 82V49h80v33M30 49l30-23 30 23M32 82V61h18v21M70 82V61h18v21M54 82V56h12v26M15 82h90" /></>;
      case 'university':
        return <><path {...common} d="M15 82h90M22 82V52h76v30M42 52V38h36v14M52 38V26h16v12M31 82V62M45 82V62M75 82V62M89 82V62M56 82V59h8v23" /></>;
      case 'planetarium':
        return <><path {...common} d="M18 82h84M28 82c0-28 14-44 32-44s32 16 32 44M60 38V22M53 22h14M35 82V70h50v12" /></>;
      case 'flyover':
        return <><path {...common} d="M8 72c28-28 52-24 104 0M8 58c35 18 69 18 104 0M20 82V64M45 82V66M75 82V66M100 82V64" /></>;
      case 'tower':
        return <><path {...common} d="M55 82h10M52 82l5-58h6l5 58M47 42h26M44 58h32M50 24h20M60 24V9M55 13h10M38 82h44" /></>;
      case 'trade':
        return <><path {...common} d="M18 82V40h36v42M66 82V25h36v57M26 50h20M26 60h20M26 70h20M74 36h20M74 48h20M74 60h20M74 72h20M14 82h92" /></>;
      case 'mall':
        return <><path {...common} d="M14 82h92M20 82V42h80v40M30 42V31h60v11M30 56h60M36 82V66h48v16M48 66v16M72 66v16" /></>;
      case 'it':
        return <><path {...common} d="M18 82V27h38v55M64 82V38h38v44M26 38h22M26 50h22M26 62h22M72 49h22M72 61h22M72 73h22M14 82h92" /></>;
      case 'office':
      default:
        return <><path {...common} d="M18 82V34h28v48M50 82V18h28v64M82 82V42h20v40M25 44h14M25 55h14M25 66h14M57 30h14M57 43h14M57 56h14M57 69h14M14 82h94" /></>;
    }
  })();

  return <svg className="landmark-art" viewBox="0 0 120 100" aria-hidden="true">{art}</svg>;
};

export const ChennaiSkyline: React.FC = () => {
  // End copies let the last-to-first transition travel one screen, then reset unseen.
  const [slide, setSlide] = useState(1);
  const [animate, setAnimate] = useState(true);
  const moving = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const activeScene = (slide - 1 + LANDMARK_SCENES.length) % LANDMARK_SCENES.length;

  const move = (direction: -1 | 1) => {
    if (moving.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSlide((current) => ((current - 1 + direction + LANDMARK_SCENES.length) % LANDMARK_SCENES.length) + 1);
      return;
    }
    moving.current = true;
    setAnimate(true);
    setSlide((current) => current + direction);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => move(1), 3000);

    return () => window.clearInterval(interval);
  }, []);

  const selectScene = (index: number) => {
    if (moving.current || index === activeScene) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSlide(index + 1);
      return;
    }
    moving.current = true;
    setAnimate(true);
    setSlide(index + 1);
  };

  const finishMove = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    moving.current = false;
    if (slide === 0 || slide === LANDMARK_SCENES.length + 1) {
      setAnimate(false);
      setSlide(slide === 0 ? LANDMARK_SCENES.length : 1);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 45) return;
    if (distance < 0) move(1);
    else move(-1);
  };

  const currentScene = LANDMARK_SCENES[activeScene];

  return (
    <section className="city" aria-label="Explore major Chennai landmarks">
      <p className="city-title" aria-hidden="true">CHENNAI</p>
      <div className="city-art-mask" aria-hidden="true" />

      <div
        className="city-carousel-window"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="landmark-track"
          style={{ transform: `translate3d(-${slide * 100}%, 0, 0)`, transition: animate ? undefined : 'none' }}
          onTransitionEnd={finishMove}
        >
          {[LANDMARK_SCENES.at(-1)!, ...LANDMARK_SCENES, LANDMARK_SCENES[0]].map((scene, index) => (
            <div className="landmark-scene" key={`${scene.title}-${index}`} aria-hidden={index !== slide}>
              {scene.landmarks.map((item) => (
                <div
                  key={item.name}
                  className="landmark"
                  style={
                    {
                      '--left': item.left,
                      '--top': `${item.top}px`,
                      '--height': `${item.height}px`,
                    } as CSSProperties
                  }
                >
                  <span style={{ whiteSpace: 'pre-line' }}>{item.name}</span>
                  <LandmarkArtwork type={item.art} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="city-scene-label" aria-live="polite">
        <span>{String(activeScene + 1).padStart(2, '0')}</span>
        <strong>{currentScene.title}</strong>
      </div>

      <button
        type="button"
        className="city-nav city-nav-left"
        onClick={() => move(-1)}
        aria-label="Show previous Chennai landmark set"
      >
        <span aria-hidden="true">←</span>
      </button>

      <button
        type="button"
        className="city-nav city-nav-right"
        onClick={() => move(1)}
        aria-label="Show next Chennai landmark set"
      >
        <span aria-hidden="true">→</span>
      </button>

      <div className="landmark-pagination" aria-label="Chennai landmark sets">
        {LANDMARK_SCENES.map((scene, index) => (
          <button
            key={scene.title}
            type="button"
            className={index === activeScene ? 'active' : ''}
            onClick={() => selectScene(index)}
            aria-label={`Show ${scene.title}`}
            aria-current={index === activeScene ? 'true' : undefined}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="mobile-landmark-grid" aria-hidden="true">
        {currentScene.landmarks.map((landmark) => (
          <span key={landmark.name}>{landmark.name.replace(/\n/g, ' ')}</span>
        ))}
      </div>
    </section>
  );
};

export default ChennaiSkyline;
