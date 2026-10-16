import React, { useMemo, useState } from 'react';
import { CalendarPlus, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { EventItem, GSX_WHATSAPP_URL } from '../types';
import { getEventRange, googleCalendarUrl } from '../lib/calendar';

interface EventsCalendarProps {
  events: EventItem[];
  onOpenEventDetail?: (event: EventItem) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Month calendar of chapter events with one-click "Add to Google Calendar". */
export const EventsCalendar: React.FC<EventsCalendarProps> = ({ events, onOpenEventDetail }) => {
  const today = new Date();
  const dated = useMemo(
    () =>
      events
        .map((event) => ({ event, range: getEventRange(event) }))
        .filter((item): item is { event: EventItem; range: { start: Date; end: Date } } => item.range !== null)
        .sort((a, b) => a.range.start.getTime() - b.range.start.getTime()),
    [events]
  );

  // Open on the month of the next upcoming event, otherwise the current month.
  const firstUpcoming = dated.find((item) => item.range.end >= today);
  const initial = firstUpcoming?.range.start ?? today;
  const [month, setMonth] = useState(() => new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthEvents = dated.filter(
    (item) => item.range.start.getFullYear() === month.getFullYear() && item.range.start.getMonth() === month.getMonth()
  );
  const listed = selectedDay ? monthEvents.filter((item) => sameDay(item.range.start, selectedDay)) : monthEvents;

  const firstWeekday = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];

  const shiftMonth = (delta: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
    setSelectedDay(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Month grid */}
      <div className="lg:col-span-3 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-7">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white" aria-live="polite">
            {month.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-purple-400 hover:bg-purple-500/15 transition-colors cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-purple-400 hover:bg-purple-500/15 transition-colors cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`blank-${i}`} />;
            const hasEvent = monthEvents.some((item) => sameDay(item.range.start, day));
            const isToday = sameDay(day, today);
            const isSelected = selectedDay !== null && sameDay(day, selectedDay);
            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={!hasEvent}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                aria-pressed={hasEvent ? isSelected : undefined}
                aria-label={`${day.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}${hasEvent ? ', has events' : ''}`}
                className={`relative aspect-square rounded-xl text-sm transition-all ${
                  isSelected
                    ? 'bg-purple-500 text-white font-bold shadow-[0_0_18px_rgba(168,85,247,0.6)]'
                    : hasEvent
                    ? 'bg-purple-500/15 text-white font-semibold hover:bg-purple-500/30 cursor-pointer'
                    : 'text-gray-400'
                } ${isToday && !isSelected ? 'ring-1 ring-purple-300/70' : ''}`}
              >
                {day.getDate()}
                {hasEvent && !isSelected && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events for the month / selected day */}
      <div className="lg:col-span-2 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-7 flex flex-col">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">
          {selectedDay
            ? selectedDay.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
            : 'This month'}
        </h3>

        {listed.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <p className="text-white font-semibold mb-2">No events scheduled yet</p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-5">
              New sessions are announced in our WhatsApp community first.
            </p>
            <a
              href={GSX_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
            >
              Get notified
            </a>
          </div>
        ) : (
          <ul className="space-y-3">
            {listed.map(({ event, range }) => {
              const calendarLink = googleCalendarUrl(event);
              return (
                <li key={event.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <button
                    type="button"
                    onClick={() => onOpenEventDetail?.(event)}
                    className="text-left w-full cursor-pointer group"
                  >
                    <p className="text-xs font-semibold text-purple-300 mb-1">
                      {range.start.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    <p className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">{event.title}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5 text-purple-400" /> {event.time}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" /> {event.location}
                    </p>
                  </button>
                  {calendarLink && event.status !== 'past' && (
                    <a
                      href={calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-200 hover:text-white px-3 py-1.5 rounded-lg border border-purple-400/30 hover:bg-purple-500/20 transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" /> Add to Google Calendar
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventsCalendar;
