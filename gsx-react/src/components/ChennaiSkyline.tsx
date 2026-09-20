import type { CSSProperties } from 'react';
const landmarks = [
 {name:'MARINA BEACH',left:'5.3%',top:151,height:194},
 {name:'KALAIGNAR\nKARUNANIDHI\nMEMORIAL',left:'17%',top:109,height:143},
 {name:'RIPON BUILDING',left:'30.3%',top:160,height:102},
 {name:'KAPALEESWARAR\nTEMPLE',left:'64.2%',top:152,height:132},
 {name:'BESANT NAGAR',left:'76%',top:181,height:115},
 {name:'GUINDY\nNATIONAL PARK',left:'89%',top:178,height:154},
];
export default function ChennaiSkyline() {
 return <div className="city" aria-hidden="true"><p className="city-title">CHENNAI</p>{landmarks.map(item => <div key={item.name} className="landmark" style={{'--left':item.left,'--top':`${item.top}px`,'--height':`${item.height}px`} as CSSProperties}><span style={{whiteSpace:'pre-line'}}>{item.name}</span></div>)}</div>;
}
