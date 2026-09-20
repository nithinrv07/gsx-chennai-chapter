import React, { type CSSProperties, useEffect, useRef, useState } from 'react';

type Landmark = {
  name: string;
  left: string;
  top: number;
  height: number;
};

type LandmarkScene = {
  title: string;
  landmarks: Landmark[];
};

const POSITIONS = [
  { left: '5.3%', top: 151, height: 194 },
  { left: '17%', top: 109, height: 143 },
  { left: '30.3%', top: 160, height: 102 },
  { left: '64.2%', top: 152, height: 132 },
  { left: '76%', top: 181, height: 115 },
  { left: '89%', top: 178, height: 154 },
];

const makeScene = (title: string, names: string[]): LandmarkScene => ({
  title,
  landmarks: names.map((name, index) => ({
    name,
    ...POSITIONS[index],
  })),
});

const LANDMARK_SCENES: LandmarkScene[] = [
  makeScene('Central Chennai', [
    'MARINA BEACH',
    'KALAIGNAR\nKARUNANIDHI\nMEMORIAL',
    'RIPON BUILDING',
    'KAPALEESWARAR\nTEMPLE',
    'BESANT NAGAR',
    'GUINDY\nNATIONAL PARK',
  ]),
  makeScene('Heritage Chennai', [
    'CHENNAI CENTRAL',
    'NAPIER BRIDGE',
    'FORT ST. GEORGE',
    'SAN THOME\nBASILICA',
    'VALLUVAR KOTTAM',
    'GOVERNMENT\nMUSEUM',
  ]),
  makeScene('Culture & Learning', [
    'PARTHASARATHY\nTEMPLE',
    'VIVEKANANDA\nHOUSE',
    'ANNA UNIVERSITY',
    'BIRLA\nPLANETARIUM',
    'SEMMOZHI\nPOONGA',
    'KATHIPARA\nURBAN SQUARE',
  ]),
  makeScene('Modern Chennai', [
    'ANNA NAGAR\nTOWER',
    'CHENNAI\nTRADE CENTRE',
    'DLF CYBERCITY\nCHENNAI',
    'TIDEL PARK',
    'PHOENIX\nMARKETCITY',
    'OMR IT\nCORRIDOR',
  ]),
];

export const ChennaiSkyline: React.FC = () => {
  const [activeScene, setActiveScene] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveScene((current) => (current + 1) % LANDMARK_SCENES.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const previousScene = () => {
    setActiveScene((current) => (current - 1 + LANDMARK_SCENES.length) % LANDMARK_SCENES.length);
  };

  const nextScene = () => {
    setActiveScene((current) => (current + 1) % LANDMARK_SCENES.length);
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
    if (distance < 0) nextScene();
    else previousScene();
  };

  const currentScene = LANDMARK_SCENES[activeScene];

  return (
    <section className="city" aria-label="Explore major Chennai landmarks">
      <p className="city-title" aria-hidden="true">CHENNAI</p>

      <div
        className="city-carousel-window"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="landmark-track"
          style={{ transform: `translate3d(-${activeScene * 100}%, 0, 0)` }}
        >
          {LANDMARK_SCENES.map((scene) => (
            <div className="landmark-scene" key={scene.title} aria-hidden={scene.title !== currentScene.title}>
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
        onClick={previousScene}
        aria-label="Show previous Chennai landmark set"
      >
        <span aria-hidden="true">←</span>
      </button>

      <button
        type="button"
        className="city-nav city-nav-right"
        onClick={nextScene}
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
            onClick={() => setActiveScene(index)}
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
