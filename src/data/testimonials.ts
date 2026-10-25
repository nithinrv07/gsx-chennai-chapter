export interface Testimonial {
  /** The member's own words, exactly as they shared them. */
  quote: string;
  name: string;
  /** e.g. "Core Team · CIT" or "Member · 2nd year, CSE" */
  role: string;
  /** Optional photo path, e.g. mediaUrl('team/minhu.jpg') from src/lib/media. Initials are shown when absent. */
  image?: string;
}

// Add real quotes collected from members (with their permission).
// The home page testimonial strip stays hidden while this list is empty.
export const TESTIMONIALS: Testimonial[] = [];
