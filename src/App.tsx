import { FilterBar } from './components/FilterBar/FilterBar';
import { CalendarGrid } from './components/Calendar/CalendarGrid';
import { Legend } from './components/Common/Legend';
import { StatsBar } from './components/StatsBar/StatsBar';
import { BookingDrawer } from './components/Drawer/BookingDrawer';
import { useCalendarData } from './hooks/useCalendarData';

export default function App() {
  const dayCells = useCalendarData();

  return (
    <div className="app">
      <div className="app-container">
        <FilterBar />
        <CalendarGrid />
        <Legend />
        <StatsBar dayCells={dayCells} />
      </div>
      <BookingDrawer />
    </div>
  );
}
