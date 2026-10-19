export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Chapter moments. Add new photos to public/gallery/ and list them here.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: '/gallery/core-team-group.webp', alt: 'GSX Chennai core team group photo on campus', width: 1200, height: 675 },
  { src: '/gallery/welcome-session-selfie.webp', alt: 'Team selfie at the Welcome to GSX Chennai session', width: 1200, height: 554 },
  { src: '/gallery/session-audience.webp', alt: 'Faculty and students listening at a GSX Chennai session', width: 1200, height: 675 },
  { src: '/gallery/catapult-session-talk.webp', alt: 'Members presenting GSX Chennai at Catapult 2026', width: 900, height: 1200 },
  { src: '/gallery/team-working-session.webp', alt: 'Members working together at a team session', width: 1200, height: 903 },
  { src: '/gallery/interactive-session.webp', alt: 'Students raising hands during an interactive session', width: 1200, height: 675 },
  { src: '/gallery/members-on-campus.webp', alt: 'Four GSX Chennai members on campus', width: 1200, height: 904 },
  { src: '/gallery/catapult-session-presenters.webp', alt: 'Four members presenting to freshers at Catapult', width: 1200, height: 903 },
  { src: '/gallery/session-attendees.webp', alt: 'Students attending a GSX Chennai session', width: 1200, height: 675 },
  { src: '/gallery/team-meetup-selfie.webp', alt: 'Team meetup selfie with a mentor', width: 1200, height: 900 },
  { src: '/gallery/peer-mentoring.webp', alt: 'A member helping students during a classroom session', width: 900, height: 1200 },
];
