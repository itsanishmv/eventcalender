import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { buildBookingMap } from '../utils/dateUtils';
import type { DayCell } from '../types';

interface CalendarStats {
  totalBookings: number;
  availableDays: number;
  partiallyBooked: number;
  fullyBooked: number;
  maintenanceDays: number;
}

/**
 * Derives summary statistics from the current calendar view.
 * Only counts days that belong to the current month (not overflow days).
 */
export function useCalendarStats(dayCells: DayCell[]): CalendarStats {
  const selectedVenueId = useAppStore((s) => s.selectedVenueId);
  const selectedHallId = useAppStore((s) => s.selectedHallId);
  const allBookings = useAppStore((s) => s.bookings);

  return useMemo(() => {
    // Only count cells belonging to the current month
    const monthCells = dayCells.filter((c) => c.isCurrentMonth);

    // Count unique bookings visible in the filtered view
    let filtered = allBookings.filter((b) => b.venueId === selectedVenueId);
    if (selectedHallId !== 'all') {
      filtered = filtered.filter((b) => b.hallId === selectedHallId);
    }

    // Check which bookings have at least one occupied date in the current month
    const bookingMap = buildBookingMap(filtered);
    const monthDates = new Set(monthCells.map((c) => c.date));
    const visibleBookingIds = new Set<string>();
    for (const [date, bookings] of bookingMap.entries()) {
      if (monthDates.has(date)) {
        bookings.forEach((b) => visibleBookingIds.add(b.id));
      }
    }

    return {
      totalBookings: visibleBookingIds.size,
      availableDays: monthCells.filter((c) => c.status === 'available').length,
      partiallyBooked: monthCells.filter((c) => c.status === 'partially-booked').length,
      fullyBooked: monthCells.filter((c) => c.status === 'fully-booked').length,
      maintenanceDays: monthCells.filter((c) => c.status === 'maintenance').length,
    };
  }, [dayCells, allBookings, selectedVenueId, selectedHallId]);
}
