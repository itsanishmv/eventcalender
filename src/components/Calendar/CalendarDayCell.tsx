import type { DayCell } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { BookingBar } from './BookingBar';

interface CalendarDayCellProps {
  cell: DayCell;
}

const MAX_VISIBLE_BOOKINGS = 2;

export function CalendarDayCell({ cell }: CalendarDayCellProps) {
  const openModal = useAppStore((s) => s.openModal);

  const dayNum = parseInt(cell.date.split('-')[2], 10);
  const visibleBookings = cell.bookings.slice(0, MAX_VISIBLE_BOOKINGS);
  const extraCount = cell.bookings.length - MAX_VISIBLE_BOOKINGS;

  return (
    <div
      className={`day-cell ${cell.status !== 'available' ? cell.status : ''} ${
        !cell.isCurrentMonth ? 'day-cell-outside' : ''
      } ${cell.isToday ? 'day-cell-today' : ''}`}
      onClick={() => openModal(cell.date)}
      role="button"
      tabIndex={0}
      aria-label={`${cell.date}, ${cell.bookings.length} bookings`}
      onKeyDown={(e) => { if (e.key === 'Enter') openModal(cell.date); }}
    >
      {/* Status indicator dot */}
      {cell.status !== 'available' && cell.isCurrentMonth && (
        <span className={`day-cell-status-dot status-dot-${cell.status}`} />
      )}

      {/* Date number */}
      <span className={`day-number ${cell.isToday ? 'day-number-today' : ''}`}>
        {dayNum}
      </span>

      {/* Booking bars */}
      <div className="day-bookings">
        {visibleBookings.map((booking) => (
          <BookingBar key={booking.id} booking={booking} date={cell.date} />
        ))}
        {extraCount > 0 && (
          <button
            className="more-badge"
            onClick={(e) => {
              e.stopPropagation();
              openModal(cell.date);
            }}
          >
            +{extraCount} more
          </button>
        )}
      </div>
    </div>
  );
}
