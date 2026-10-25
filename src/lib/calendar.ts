import { EventItem } from '../types';

const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000;

/**
 * Parse an event's free-text date ("Oct 24, 2026") and time ("10:00 AM - 1:00 PM")
 * into start/end Dates. Returns null when the date can't be understood.
 */
export function getEventRange(
  event: Pick<EventItem, 'date' | 'time'>
): { start: Date; end: Date; allDay: boolean } | null {
  const day = new Date(event.date);
  if (Number.isNaN(day.getTime())) return null;

  const [startText, endText] = (event.time || '').split(/\s*[-–—]\s*|\s+to\s+/i);
  // Only real clock times ("10:00 AM", "2 pm", "14:30") count; durations like "1–2 hours" mean all-day.
  const CLOCK_TIME = /^\d{1,2}(:\d{2})?\s*[ap]\.?m\.?$|^\d{1,2}:\d{2}$/i;
  const withTime = (text?: string) => {
    if (!text || !CLOCK_TIME.test(text.trim())) return null;
    const parsed = new Date(`${event.date} ${text.trim()}`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const timedStart = withTime(startText);
  if (!timedStart) {
    // No usable time: treat it as an all-day event on that date.
    const start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return { start, end: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1), allDay: true };
  }
  let end = withTime(endText) ?? new Date(timedStart.getTime() + DEFAULT_DURATION_MS);
  if (end <= timedStart) end = new Date(timedStart.getTime() + DEFAULT_DURATION_MS);
  return { start: timedStart, end, allDay: false };
}

const toGoogleStamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const toGoogleDay = (date: Date) =>
  `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

/** Google Calendar "create event" link, or null if the event date can't be parsed. */
export function googleCalendarUrl(event: EventItem): string | null {
  const range = getEventRange(event);
  if (!range) return null;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} | GSX Chennai`,
    dates: range.allDay
      ? `${toGoogleDay(range.start)}/${toGoogleDay(range.end)}`
      : `${toGoogleStamp(range.start)}/${toGoogleStamp(range.end)}`,
    details: `${event.description}\n\nMore info: ${window.location.origin}/#events`,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
