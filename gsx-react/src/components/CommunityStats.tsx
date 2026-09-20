import AnimatedCounter from './AnimatedCounter';
const stats=[{value:50,label:'Students'},{value:5,label:'Colleges'},{value:10,label:'Projects'},{value:20,label:'Events'}];
export default function CommunityStats() {
 return <ul className="stats" aria-label="Our community in numbers">{stats.map(stat => <li key={stat.label}><strong><AnimatedCounter value={stat.value}/></strong><span>{stat.label}</span></li>)}</ul>;
}
