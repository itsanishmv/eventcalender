import type { DayCell } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { BookingBar } from './BookingBar';

interface CalendarDayCellProps {
  cell: DayCell;
}

const MAX_VISIBLE_BOOKINGS = 2;

export function CalendarDayCell({ cell }: CalendarDayCellProps) {
  const openDrawer = useAppStore((s) => s.openDrawer);

  const dayNum = parseInt(cell.date.split('-')[2], 10);
  const visibleBookings = cell.bookings.slice(0, MAX_VISIBLE_BOOKINGS);
  const extraCount = cell.bookings.length - MAX_VISIBLE_BOOKINGS;

  return (
    <div
      className={[
        'day-cell',
        !cell.isCurrentMonth && 'day-cell--outside',
        cell.isToday && 'day-cell--today',
      ].filter(Boolean).join(' ')}
      onClick={() => openDrawer(cell.date)}
      role="button"
      tabIndex={0}
      aria-label={`${cell.date}, ${cell.bookings.length} bookings`}
      onKeyDown={(e) => { if (e.key === 'Enter') openDrawer(cell.date); }}
    >
      {/* Day number + status dot */}
      <div className="day-header">
        <span className={`day-number ${cell.isToday ? 'day-number--today' : ''}`}>
          {dayNum}
        </span>
        {cell.status === 'available' && <span className={`status-dot status-dot--${cell.status}`} />}
        {cell.isCurrentMonth && cell.status !== 'available' && (
          <span className={`status-dot status-dot--${cell.status}`} />
        )}
      </div>

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
              openDrawer(cell.date);
            }}
          >
            +{extraCount} more
          </button>
        )}
      </div>
    </div>
  );
}
