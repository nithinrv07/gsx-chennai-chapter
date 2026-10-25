import { mediaUrl } from '../lib/media';
export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Chapter moments, hosted in Supabase Storage (site-media/gallery/). Upload a photo there and list it here.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: mediaUrl('gallery/core-team-group.webp'), alt: 'GSX Chennai core team group photo on campus', width: 1200, height: 675 },
  { src: mediaUrl('gallery/welcome-session-selfie.webp'), alt: 'Team selfie at the Welcome to GSX Chennai session', width: 1200, height: 554 },
  { src: mediaUrl('gallery/session-audience.webp'), alt: 'Faculty and students listening at a GSX Chennai session', width: 1200, height: 675 },
  { src: mediaUrl('gallery/catapult-session-talk.webp'), alt: 'Members presenting GSX Chennai at Catapult 2026', width: 900, height: 1200 },
  { src: mediaUrl('gallery/team-working-session.webp'), alt: 'Members working together at a team session', width: 1200, height: 903 },
  { src: mediaUrl('gallery/interactive-session.webp'), alt: 'Students raising hands during an interactive session', width: 1200, height: 675 },
  { src: mediaUrl('gallery/members-on-campus.webp'), alt: 'Four GSX Chennai members on campus', width: 1200, height: 904 },
  { src: mediaUrl('gallery/catapult-session-presenters.webp'), alt: 'Four members presenting to freshers at Catapult', width: 1200, height: 903 },
  { src: mediaUrl('gallery/session-attendees.webp'), alt: 'Students attending a GSX Chennai session', width: 1200, height: 675 },
  { src: mediaUrl('gallery/team-meetup-selfie.webp'), alt: 'Team meetup selfie with a mentor', width: 1200, height: 900 },
  { src: mediaUrl('gallery/peer-mentoring.webp'), alt: 'A member helping students during a classroom session', width: 900, height: 1200 },
];
