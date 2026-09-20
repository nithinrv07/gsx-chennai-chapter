import { useEffect, useRef, useState } from 'react';
type Props = {value:number;suffix?:string;duration?:number};
export default function AnimatedCounter({value,suffix='+',duration=1100}:Props) {
 const ref=useRef<HTMLSpanElement>(null);
 const [count,setCount]=useState(value);
 useEffect(() => {
  if(matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {setCount(value);return;}
  let frame=0;setCount(0);
  const observer=new IntersectionObserver(entries => {
   if(!entries.some(entry => entry.isIntersecting))return;
   observer.disconnect();const start=performance.now();
   const tick=(time:number) => {const p=Math.min((time-start)/Math.max(1,duration),1);setCount(Math.round(value*(1-Math.pow(1-p,3))));if(p<1)frame=requestAnimationFrame(tick);};
   frame=requestAnimationFrame(tick);
  });
  if(ref.current)observer.observe(ref.current);
  return () => {observer.disconnect();cancelAnimationFrame(frame);};
 },[value,duration]);
 return <span ref={ref} style={{display:'inline',font:'inherit',color:'inherit',margin:0}}><span aria-hidden="true" style={{display:'inline',font:'inherit',color:'inherit'}}>{count}{suffix}</span><span className="sr-only">{value}{suffix}</span></span>;
}
