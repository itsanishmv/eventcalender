import { useAppStore } from '../../store/useAppStore';
import { useCalendarData } from '../../hooks/useCalendarData';
import { formatDateLong, formatTime } from '../../utils/dateUtils';
import type { Booking } from '../../types';

/** Status badge color mapping */
const STATUS_BADGE: Record<string, { className: string; label: string }> = {
  confirmed:   { className: 'badge--confirmed',   label: 'Confirmed' },
  tentative:   { className: 'badge--tentative',    label: 'Tentative' },
  maintenance: { className: 'badge--maintenance',  label: 'Maintenance' },
};

export function BookingDrawer() {
  const drawerOpen = useAppStore((s) => s.drawerOpen);
  const drawerDate = useAppStore((s) => s.drawerDate);
  const drawerBooking = useAppStore((s) => s.drawerBooking);
  const closeDrawer = useAppStore((s) => s.closeDrawer);
  const venues = useAppStore((s) => s.venues);
  const halls = useAppStore((s) => s.halls);
  const dayCells = useCalendarData();

  if (!drawerOpen || !drawerDate) return null;

  // Get all bookings for the clicked date
  const dayCell = dayCells.find((c) => c.date === drawerDate);
  const allBookings = dayCell?.bookings ?? [];

  // Primary booking: either the one clicked, or the first in the list
  const primary = drawerBooking ?? allBookings[0] ?? null;
  const otherBookings = primary
    ? allBookings.filter((b) => b.id !== primary.id)
    : [];

  const getVenueName = (venueId: string) =>
    venues.find((v) => v.id === venueId)?.name ?? venueId;
  const getHallName = (hallId: string) =>
    halls.find((h) => h.id === hallId)?.name ?? hallId;

  const formatDateRange = (booking: Booking) => {
    if (booking.startDate === booking.endDate) {
      return formatDateLong(booking.startDate);
    }
    return `${formatDateLong(booking.startDate)} – ${formatDateLong(booking.endDate)}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={closeDrawer} />

      {/* Drawer panel */}
      <aside className="drawer" role="dialog" aria-label="Booking details">
        {/* Header */}
        <div className="drawer-header">
          <h3 className="drawer-title">
            {primary ? formatDateRange(primary) : formatDateLong(drawerDate)}
          </h3>
          <button className="drawer-close" onClick={closeDrawer} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="drawer-body">
          {primary ? (
            <>
              {/* Primary booking detail */}
              <div className="drawer-primary">
                <div className="drawer-event-header">
                  <span className={`status-dot status-dot--${primary.status}`} />
                  <h4 className="drawer-event-name">{primary.eventName}</h4>
                  <span className={`status-badge ${STATUS_BADGE[primary.status]?.className}`}>
                    {STATUS_BADGE[primary.status]?.label}
                  </span>
                </div>

                <div className="drawer-fields">
                  <FieldRow icon="venue" label="Venue" value={getVenueName(primary.venueId)} />
                  <FieldRow icon="hall" label="Hall" value={getHallName(primary.hallId)} />
                  <FieldRow icon="customer" label="Customer" value={primary.customerName} />
                  <FieldRow icon="guests" label="Guests" value={String(primary.guestCount)} />
                  <FieldRow icon="status" label="Status" value={STATUS_BADGE[primary.status]?.label ?? primary.status} />
                  <FieldRow
                    icon="start"
                    label="Start"
                    value={`${formatDateLong(primary.startDate)}, ${formatTime(primary.startTime)}`}
                  />
                  <FieldRow
                    icon="end"
                    label="End"
                    value={`${formatDateLong(primary.endDate)}, ${formatTime(primary.endTime)}`}
                  />
                </div>
              </div>

              {/* Other bookings */}
              {otherBookings.length > 0 && (
                <div className="drawer-others">
                  <h5 className="drawer-others-title">
                    Other Bookings ({otherBookings.length})
                  </h5>
                  <div className="drawer-others-list">
                    {otherBookings.map((booking) => (
                      <OtherBookingCard
                        key={booking.id}
                        booking={booking}
                        hallName={getHallName(booking.hallId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="drawer-empty">
              <p>No bookings on this date.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {allBookings.length > 0 && (
          <div className="drawer-footer">
            <button className="btn-view-all" onClick={closeDrawer}>
              View All Bookings
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function FieldRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="field-row">
      <FieldIcon type={icon} />
      <span className="field-label">{label}</span>
      <span className="field-value">{value}</span>
    </div>
  );
}

function FieldIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    venue: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z',
    hall: 'M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z',
    customer: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    guests: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    status: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    start: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    end: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
  };

  return (
    <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d={icons[type] ?? icons.status} />
    </svg>
  );
}

function OtherBookingCard({ booking, hallName }: { booking: Booking; hallName: string }) {
  const badge = STATUS_BADGE[booking.status];
  return (
    <div className="other-booking">
      <div className="other-booking-header">
        <span className={`status-dot status-dot--${booking.status}`} />
        <span className="other-booking-name">{booking.eventName}</span>
        <span className={`status-badge status-badge--sm ${badge?.className}`}>
          {badge?.label}
        </span>
      </div>
      <div className="other-booking-meta">
        <span>{hallName}</span>
        <span>{formatTime(booking.startTime)} – {formatTime(booking.endTime)}</span>
      </div>
      <div className="other-booking-date">
        {formatDateLong(booking.startDate)}
      </div>
    </div>
  );
}
