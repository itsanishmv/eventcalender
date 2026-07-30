import type { BookingStatus } from '../../types';

const STATUS_BADGE: Record<string, { className: string; label: string }> = {
  confirmed:   { className: 'badge--confirmed',   label: 'Confirmed' },
  tentative:   { className: 'badge--tentative',    label: 'Tentative' },
  maintenance: { className: 'badge--maintenance',  label: 'Maintenance' },
};

interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const badge = STATUS_BADGE[status];
  
  if (!badge) return null;

  return (
    <span className={`status-badge ${size === 'sm' ? 'status-badge--sm' : ''} ${badge.className}`}>
      {badge.label}
    </span>
  );
}
