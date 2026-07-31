import type { DayCell } from '../../types';
import { useCalendarStats } from '../../hooks/useCalendarStats';
import type { JSX } from 'react/jsx-runtime';

interface StatsBarProps {
  dayCells: DayCell[];
}

export function StatsBar({ dayCells }: StatsBarProps) {
  const stats = useCalendarStats(dayCells);

  return (
    <div className="stats-bar">
      <StatCard
        icon="calendar"
        value={stats.totalBookings}
        label="Total Bookings"
        colorClass="stat--total"
      />
      <StatCard
        icon="check"
        value={stats.availableDays}
        label="Available Days"
        colorClass="stat--available"
      />
      <StatCard
        icon="clock"
        value={stats.partiallyBooked}
        label="Partially Booked"
        colorClass="stat--partial"
      />
      <StatCard
        icon="xCircle"
        value={stats.fullyBooked}
        label="Fully Booked"
        colorClass="stat--full"
      />
      <StatCard
        icon="wrench"
        value={stats.maintenanceDays}
        label="Maintenance Days"
        colorClass="stat--maintenance"
      />
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  colorClass,
}: {
  icon: string;
  value: number;
  label: string;
  colorClass: string;
}) {
  return (
    <div className={`stat-card ${colorClass}`}>
      <StatIcon type={icon} />
      <div className="stat-content">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

function StatIcon({ type }: { type: string }) {
  const iconPaths: Record<string, JSX.Element> = {
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    check: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    xCircle: (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    wrench: (
      <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <svg className="stat-icon" width="22" height="22" viewBox="0 0 24 24">
      {iconPaths[type]}
    </svg>
  );
}
