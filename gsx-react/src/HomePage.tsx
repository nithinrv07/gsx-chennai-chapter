import Navbar from './components/Navbar';
import HeroGlow from './components/HeroGlow';
import ChennaiSkyline from './components/ChennaiSkyline';
import Hero from './components/Hero';
import { routes } from './config';
import './styles/home.css';
export default function HomePage() {
 return <><a href="#main" className="skip">Skip to content</a><div className="home" id="home"><HeroGlow/><Navbar/><ChennaiSkyline/><Hero/><div className="page-marker" aria-hidden="true"><i/><i/><i/><i/></div><a className="explore" href={routes.about}><span className="circle" aria-hidden="true">↓</span>Explore our community</a></div></>;
}
