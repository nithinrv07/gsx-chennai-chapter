/**
 * Site photos are hosted in the public Supabase Storage bucket "site-media"
 * (folders: gallery/, team/, events/). Public buckets need no key to read.
 */
export const SUPABASE_URL = 'https://otmsnzwfnvvznzeyafcl.supabase.co';
export const MEDIA_BUCKET = 'site-media';

/** Public URL for a file in the media bucket, e.g. mediaUrl('team/minhu.jpg'). */
export const mediaUrl = (path: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path.replace(/^\/+/, '')}`;
