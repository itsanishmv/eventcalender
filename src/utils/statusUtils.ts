import type { Booking, DayStatus } from '../types';

/**
 * Derives the visual status for a single calendar day.
 *
 * Priority:
 *   1. MAINTENANCE — any booking with status 'maintenance' → 'maintenance'
 *   2. FULLY_BOOKED — booked halls ≥ ceil(hallsInScope / 2)
 *   3. PARTIALLY_BOOKED — 1+ bookings but below threshold
 *   4. AVAILABLE — no bookings
 *
 * @param dayBookings  All bookings occupying this day (already filtered by venue)
 * @param hallsInScope Array of hall IDs currently in scope (all venue halls, or single filtered hall)
 */
export function deriveDayStatus(
  dayBookings: Booking[],
  hallsInScope: string[],
): DayStatus {
  if (dayBookings.length === 0) return 'available';

  // Maintenance takes priority
  if (dayBookings.some((b) => b.status === 'maintenance')) {
    return 'maintenance';
  }

  const bookedHallIds = new Set(dayBookings.map((b) => b.hallId));
  const threshold = Math.ceil(hallsInScope.length / 2);

  if (bookedHallIds.size >= threshold) {
    return 'fully-booked';
  }

  return 'partially-booked';
}

/** Maps DayStatus to CSS class suffix / color tokens */
export const STATUS_CONFIG: Record<DayStatus, { label: string; className: string }> = {
  'available':        { label: 'Available',        className: 'status-available' },
  'partially-booked': { label: 'Partially Booked', className: 'status-partial' },
  'fully-booked':     { label: 'Fully Booked',     className: 'status-full' },
  'maintenance':      { label: 'Maintenance',      className: 'status-maintenance' },
};
