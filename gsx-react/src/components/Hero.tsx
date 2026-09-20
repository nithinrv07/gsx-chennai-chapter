import { routes } from '../config';
import CommunityStats from './CommunityStats';
export default function Hero() {
 return <main id="main" className="hero">
  <p className="eyebrow">A brighter tomorrow, together</p>
  <h1>Learn. Build. Connect. <span>Grow.</span></h1>
  <p className="intro">GSX Chennai is a student community under <strong>GirlScript Foundation</strong>, bringing students together to learn, build projects, collaborate, and create meaningful impact.</p>
  <div className="cta-row"><a className="pill primary" href={routes.join}>Join GSX <span aria-hidden="true">→</span></a><a className="pill secondary" href={routes.events}>Explore Events</a></div>
  <CommunityStats/>
 </main>;
}
