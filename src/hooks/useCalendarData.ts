import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { buildMonthGrid, buildBookingMap, isInMonth, isToday } from '../utils/dateUtils';
import { deriveDayStatus } from '../utils/statusUtils';
import type { DayCell, Hall } from '../types';

/**
 * Derives the calendar DayCell[] from the current store state.
 * All computation is memoized — only recomputes when filters or month change.
 */
export function useCalendarData(): DayCell[] {
  const selectedVenueId = useAppStore((s) => s.selectedVenueId);
  const selectedHallId = useAppStore((s) => s.selectedHallId);
  const currentMonth = useAppStore((s) => s.currentMonth);
  const allBookings = useAppStore((s) => s.bookings);
  const venues = useAppStore((s) => s.venues);

  return useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // 1. Filter bookings by venue
    let filtered = allBookings.filter((b) => b.venueId === selectedVenueId);

    // 2. Filter by hall (if not 'all')
    if (selectedHallId !== 'all') {
      filtered = filtered.filter((b) => b.hallId === selectedHallId);
    }

    // 3. Build date → bookings map
    const bookingMap = buildBookingMap(filtered);

    // 4. Determine halls in scope (for status derivation)
    const venue = venues.find((v) => v.id === selectedVenueId);
    const hallsInScope =
      selectedHallId === 'all'
        ? venue?.hallIds ?? []
        : [selectedHallId];

    // 5. Build the 42-day grid
    const gridDates = buildMonthGrid(year, month);

    return gridDates.map((dateStr): DayCell => {
      const dayBookings = bookingMap.get(dateStr) ?? [];
      return {
        date: dateStr,
        bookings: dayBookings,
        status: deriveDayStatus(dayBookings, hallsInScope),
        isCurrentMonth: isInMonth(dateStr, year, month),
        isToday: isToday(dateStr),
      };
    });
  }, [selectedVenueId, selectedHallId, currentMonth, allBookings, venues]);
}

/**
 * Returns the halls belonging to the currently selected venue.
 */
export function useVenueHalls(): Hall[] {
  const selectedVenueId = useAppStore((s) => s.selectedVenueId);
  const allHalls = useAppStore((s) => s.halls);

  return useMemo(
    () => allHalls.filter((h) => h.venueId === selectedVenueId),
    [selectedVenueId, allHalls],
  );
}
