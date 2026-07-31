import type { Booking } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface BookingBarProps {
  booking: Booking;
  date: string;
}

/** Color map for booking status */
const STATUS_COLORS: Record<string, { bg: string; border: string }> = {
  confirmed:   { bg: 'var(--booking-confirmed-bg)',   border: 'var(--booking-confirmed-border)' },
  tentative:   { bg: 'var(--booking-tentative-bg)',   border: 'var(--booking-tentative-border)' },
  maintenance: { bg: 'var(--booking-maintenance-bg)', border: 'var(--booking-maintenance-border)' },
};

export function BookingBar({ booking, date }: BookingBarProps) {
  const openDrawer = useAppStore((s) => s.openDrawer);
  const colors = STATUS_COLORS[booking.status] ?? STATUS_COLORS.confirmed;

  const isStart = booking.startDate === date;
  const isEnd = booking.endDate === date;
  const isSingleDay = isStart && isEnd;

  // Rounded edges on start/end, flat on middle — creates seamless multi-day bars
  const borderRadius = isSingleDay
    ? '4px'
    : isStart
      ? '4px 0 0 4px'
      : isEnd
        ? '0 4px 4px 0'
        : '0';

  return (
    <button
      className="booking-bar"
      style={{
        background: colors.bg,
        borderLeft: isStart ? `3px solid ${colors.border}` : 'none',
        borderRadius,
        // width : "100%",
        // width : isSingleDay ? "80%" : "100%",
        // Extend bar to cell edges for seamless multi-day continuity
        // marginLeft: isStart  ? '8px' : '0px',
        // marginRight: isEnd  ? '8px' : '-1px',
        // paddingLeft: isStart  ? '8px' : '4px',
        position: 'relative',
        zIndex: 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        openDrawer(date, booking);
      }}
      title={booking.eventName}
    >
      {isStart ? (
        <span className="booking-bar-text ">{booking.eventName}</span>
      ) : (
        <span className="booking-bar-continuation" />
      )}
    </button>
  );
}
