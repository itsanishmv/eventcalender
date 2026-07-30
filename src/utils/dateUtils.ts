import type { Booking } from '../types';

// ─── Date Formatting ─────────────────────────────────────────────

/** Format a Date to 'YYYY-MM-DD' */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Format a Date to human-readable 'Mon DD, YYYY' */
export function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Format 'HH:mm' → '4:00 PM' */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** Get month + year label, e.g. 'August 2026' */
export function getMonthLabel(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// ─── Day-Occupancy Algorithm ─────────────────────────────────────

/**
 * Returns every date (as 'YYYY-MM-DD') that a booking occupies.
 * A booking from Aug 5 to Aug 7 returns ['2026-08-05', '2026-08-06', '2026-08-07'].
 */
export function getOccupiedDates(booking: Booking): string[] {
  const dates: string[] = [];
  const start = new Date(booking.startDate + 'T00:00:00');
  const end = new Date(booking.endDate + 'T00:00:00');
  const cursor = new Date(start);

  while (cursor <= end) {
    dates.push(toDateString(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

// ─── Calendar Grid Builder ───────────────────────────────────────

/**
 * Builds the 42-day (6×7) grid for a given month.
 * Returns an array of 'YYYY-MM-DD' strings starting from the Monday
 * on or before the 1st of the month.
 */
export function buildMonthGrid(year: number, month: number): string[] {
  const firstDay = new Date(year, month, 1);
  // getDay(): 0=Sun, we want Monday-start: Mon=0
  const dayOfWeek = (firstDay.getDay() + 6) % 7; // 0=Mon, 6=Sun

  const gridStart = new Date(firstDay);
  gridStart.setDate(gridStart.getDate() - dayOfWeek);

  const grid: string[] = [];
  const cursor = new Date(gridStart);
  for (let i = 0; i < 42; i++) {
    grid.push(toDateString(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return grid;
}

/**
 * Build a Map<dateString, Booking[]> for quick lookup.
 */
export function buildBookingMap(bookings: Booking[]): Map<string, Booking[]> {
  const map = new Map<string, Booking[]>();

  for (const booking of bookings) {
    const dates = getOccupiedDates(booking);
    for (const d of dates) {
      const existing = map.get(d) || [];
      existing.push(booking);
      map.set(d, existing);
    }
  }

  return map;
}

/**
 * Check if a date string belongs to a given month/year.
 */
export function isInMonth(dateStr: string, year: number, month: number): boolean {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getFullYear() === year && d.getMonth() === month;
}

/**
 * Check if a date string is today.
 */
export function isToday(dateStr: string): boolean {
  return dateStr === toDateString(new Date());
}

/** Weekday headers (Mon-first) */
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
