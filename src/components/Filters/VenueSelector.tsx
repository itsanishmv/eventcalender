import { useAppStore } from '../../store/useAppStore';

export function VenueSelector() {
  const venues = useAppStore((s) => s.venues);
  const selectedVenueId = useAppStore((s) => s.selectedVenueId);
  const setSelectedVenue = useAppStore((s) => s.setSelectedVenue);

  return (
    <div className="venue-selector">
      <label className="filter-label" htmlFor="venue-select">
        Venue
      </label>
      <div className="select-wrapper">
        <select
          id="venue-select"
          className="select-input"
          value={selectedVenueId}
          onChange={(e) => setSelectedVenue(e.target.value)}
        >
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
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
