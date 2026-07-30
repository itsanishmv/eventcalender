import { useAppStore } from '../../store/useAppStore';
import { useVenueHalls } from '../../hooks/useCalendarData';

export function HallFilter() {
  const selectedHallId = useAppStore((s) => s.selectedHallId);
  const setSelectedHall = useAppStore((s) => s.setSelectedHall);
  const venueHalls = useVenueHalls();

  return (
    <div className="hall-filter">
      <label className="filter-label">Hall</label>
      <div className="hall-chips">
        <button
          className={`hall-chip ${selectedHallId === 'all' ? 'hall-chip-active' : ''}`}
          onClick={() => setSelectedHall('all')}
        >
          All Halls
        </button>
        {venueHalls.map((hall) => (
          <button
            key={hall.id}
            className={`hall-chip ${selectedHallId === hall.id ? 'hall-chip-active' : ''}`}
            onClick={() => setSelectedHall(hall.id)}
          >
            {hall.name}
          </button>
        ))}
      </div>
    </div>
  );
}
