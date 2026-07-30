import type { DayStatus } from '../../types';
import { STATUS_CONFIG } from '../../utils/statusUtils';

const statusOrder: DayStatus[] = ['available', 'partially-booked', 'fully-booked', 'maintenance'];

export function Legend() {
  return (
    <div className="legend">
      {statusOrder.map((status) => {
        const config = STATUS_CONFIG[status];
        return (
          <div key={status} className="legend-item">
            <span className={`legend-dot ${config.className}`} />
            <span className="legend-label">{config.label}</span>
          </div>
        );
      })}
    </div>
  );
}
