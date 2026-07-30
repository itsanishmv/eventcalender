import { useAppStore } from '../../store/useAppStore';
import { useVenueHalls } from '../../hooks/useCalendarData';

export function HallSelector() {
  const selectedHallId = useAppStore((s) => s.selectedHallId);
  const setSelectedHall = useAppStore((s) => s.setSelectedHall);
  const venueHalls = useVenueHalls();

  return (
    <div className="filter-group">
      <label className="filter-label" htmlFor="hall-select">
        Hall
      </label>
      <div className="select-wrapper">
        <select
          id="hall-select"
          className="select-input"
          value={selectedHallId}
          onChange={(e) => setSelectedHall(e.target.value as string | 'all')}
        >
          <option value="all">All Halls</option>
          {venueHalls.map((hall) => (
            <option key={hall.id} value={hall.id}>
              {hall.name}
            </option>
          ))}
        </select>
        <svg className="select-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
