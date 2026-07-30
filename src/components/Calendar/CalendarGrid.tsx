import { WEEKDAYS } from '../../utils/dateUtils';
import { useCalendarData } from '../../hooks/useCalendarData';
import { CalendarDayCell } from './CalendarDayCell';

export function CalendarGrid() {
  const dayCells = useCalendarData();

  return (
    <div className="calendar">
      {/* Weekday header row */}
      <div className="calendar-header">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Day cells grid */}
      <div className="calendar-grid">
        {dayCells.map((cell) => (
          <CalendarDayCell key={cell.date} cell={cell} />
        ))}
      </div>
    </div>
  );
}
