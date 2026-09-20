import { useEffect, useRef, useState } from 'react';
import { navigationItems, routes } from '../config';
import SearchModal from './SearchModal';
export default function Navbar() {
 const [open, setOpen] = useState(false);
 const [search, setSearch] = useState(false);
 const header = useRef<HTMLElement>(null);
 const menu = useRef<HTMLButtonElement>(null);
 const searchButton = useRef<HTMLButtonElement>(null);
 useEffect(() => {
  const click = (e: MouseEvent) => { if (!header.current?.contains(e.target as Node)) setOpen(false); };
  const key = (e: KeyboardEvent) => { if(e.key === 'Escape' && open) {setOpen(false); menu.current?.focus();} };
  const media = matchMedia('(min-width:1001px)');
  const resize = () => setOpen(false);
  document.addEventListener('click', click); document.addEventListener('keydown', key); media.addEventListener('change', resize);
  return () => {document.removeEventListener('click', click); document.removeEventListener('keydown', key); media.removeEventListener('change', resize);};
 }, [open]);
 return <>
 <header className="header" ref={header}>
  <a className="brand" href={routes.home} aria-label="GSX Chennai home"><span className="wordmark">GSX</span><span className="chapter">CHENNAI</span></a>
  <nav className={`navigation${open ? ' open' : ''}`} id="navigation" aria-label="Main navigation">
   {navigationItems.map((item,i) => <a key={item.label} href={item.href} aria-current={i === 0 ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
  </nav>
  <div className="header-actions">
   <a className="pill" href={routes.join}>Join GSX <span aria-hidden="true">→</span></a>
   <button ref={searchButton} className="icon-button" aria-label="Search pages" onClick={() => {setOpen(false);setSearch(true);}}><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg></button>
   <button ref={menu} className="icon-button menu-toggle" aria-controls="navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
  </div>
 </header>
 <SearchModal open={search} onClose={() => {setSearch(false);searchButton.current?.focus();}}/>
 </>;
}
