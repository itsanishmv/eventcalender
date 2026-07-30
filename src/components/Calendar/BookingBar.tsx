import type { Booking } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface BookingBarProps {
  booking: Booking;
  date: string;
}

/** Color map for booking status */
const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  confirmed:   { bg: 'var(--booking-confirmed-bg)',   text: 'var(--booking-confirmed-text)',   border: 'var(--booking-confirmed-border)' },
  tentative:   { bg: 'var(--booking-tentative-bg)',   text: 'var(--booking-tentative-text)',   border: 'var(--booking-tentative-border)' },
  maintenance: { bg: 'var(--booking-maintenance-bg)', text: 'var(--booking-maintenance-text)', border: 'var(--booking-maintenance-border)' },
};

export function BookingBar({ booking, date }: BookingBarProps) {
  const openModal = useAppStore((s) => s.openModal);
  const colors = STATUS_COLORS[booking.status] ?? STATUS_COLORS.confirmed;

  const isStart = booking.startDate === date;
  const isEnd = booking.endDate === date;
  const isSingleDay = isStart && isEnd;

  const borderRadius = isSingleDay
    ? '6px'
    : isStart
      ? '6px 0 0 6px'
      : isEnd
        ? '0 6px 6px 0'
        : '0';

  return (
    <button
      className="booking-bar"
      style={{
        background: colors.bg,
        color: colors.text,
        borderLeft: isStart ? `3px solid ${colors.border}` : 'none',
        borderRadius,
      }}
      onClick={(e) => {
        e.stopPropagation();
        openModal(date, booking);
      }}
      title={booking.eventName}
    >
      {isStart && (
        <span className="booking-bar-text">{booking.eventName}</span>
      )}
      {!isStart && (
        <span className="booking-bar-continuation" />
      )}
    </button>
  );
}
