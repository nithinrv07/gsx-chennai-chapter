import { useState } from 'react';
// Curves follow the bright ribbons in the supplied 1672 × 941 background.
const ribbons = [
 'M-30 511 C95 494 130 467 265 444 C361 428 267 415 352 400 C462 383 620 379 756 362',
 'M920 391 C1070 416 1423 421 1510 481 C1638 568 1364 577 1414 645 C1455 704 1577 745 1688 766',
 'M-40 734 C111 676 135 638 281 621 C367 601 430 628 523 638'
];
export default function HeroGlow() {
 const [paused,setPaused] = useState(false);
 return <>
  <div className={`animated-background${paused ? ' is-paused' : ''}`} aria-hidden="true">
   <div className="art"/>
   <svg className="neon-ribbons" viewBox="0 0 1672 941" preserveAspectRatio="none">
    {ribbons.map((d,i) => <g key={d}>
     <path className="ribbon-halo" d={d}/>
     <path className="ribbon-base" d={d}/>
     <path className={`ribbon-travel ribbon-travel-${i}`} d={d} pathLength="100"/>
    </g>)}
   </svg>
  </div>
  <div className="shade" aria-hidden="true"/>
  <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Play background animation' : 'Pause background animation'}>{paused ? '▶ Play motion' : 'Ⅱ Pause motion'}</button>
 </>;
}
