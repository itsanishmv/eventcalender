import { useAppStore } from '../../store/useAppStore';
import { getMonthLabel } from '../../utils/dateUtils';

export function MonthNav() {
  const currentMonth = useAppStore((s) => s.currentMonth);
  const navigateMonth = useAppStore((s) => s.navigateMonth);
  const goToToday = useAppStore((s) => s.goToToday);

  return (
    <div className="month-nav">
      <button className="btn-today" onClick={goToToday}>
        Today
      </button>

      <div className="month-nav-arrows">
        <button
          className="nav-arrow"
          onClick={() => navigateMonth('prev')}
          aria-label="Previous month"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className="nav-arrow"
          onClick={() => navigateMonth('next')}
          aria-label="Next month"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <h2 className="month-label">{getMonthLabel(currentMonth)}</h2>
    </div>
  );
}
