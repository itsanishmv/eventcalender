import { VenueSelector } from './VenueSelector';
import { HallSelector } from './HallSelector';
import { MonthNav } from './MonthNav';

export function FilterBar() {
  return (
    <div className="filter-bar">
      <div className="filter-bar-left">
        <VenueSelector />
        <HallSelector />
      </div>
      <div className="filter-bar-right">
        <MonthNav />
      </div>
    </div>
  );
}
