import { useEffect, useRef, useState } from 'react';
import { navigationItems, routes } from '../config';
type Props = { open: boolean; onClose: () => void };
export default function SearchModal({open,onClose}: Props) {
 const dialog = useRef<HTMLDialogElement>(null);
 const input = useRef<HTMLInputElement>(null);
 const [query,setQuery] = useState('');
 useEffect(() => {if(open) {setQuery('');dialog.current?.showModal();input.current?.focus();} else dialog.current?.close();},[open]);
 const pages = [...navigationItems, {label:'Join GSX',href:routes.join}].filter(item => item.label.toLowerCase().includes(query.trim().toLowerCase()));
 return <dialog ref={dialog} className="search-modal" aria-labelledby="search-title" onCancel={e => {e.preventDefault();onClose();}} onClick={e => {
  if(e.target === e.currentTarget) {const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}
 }}>
  <div className="search-heading"><h2 id="search-title">Explore GSX</h2><button className="icon-button" aria-label="Close search" onClick={onClose}>✕</button></div>
  <label htmlFor="search-input">Find a page</label><input ref={input} id="search-input" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Events, projects, community…" autoComplete="off"/>
  <ul className="search-results">{pages.map(page => <li key={page.label}><a href={page.href}>{page.label}<span aria-hidden="true">→</span></a></li>)}{pages.length === 0 && <li className="empty">No pages found. Try “events” or “community”.</li>}</ul>
  <p className="sr-only" role="status">{pages.length} pages found</p>
 </dialog>;
}
