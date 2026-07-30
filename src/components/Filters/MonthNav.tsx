import { useAppStore } from '../../store/useAppStore';
import { getMonthLabel } from '../../utils/dateUtils';

export function MonthNav() {
  const currentMonth = useAppStore((s) => s.currentMonth);
  const navigateMonth = useAppStore((s) => s.navigateMonth);
  const goToToday = useAppStore((s) => s.goToToday);

  return (
    <div className="month-nav">
      <button
        className="month-nav-btn"
        onClick={() => navigateMonth('prev')}
        aria-label="Previous month"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="month-nav-center">
        <h2 className="month-label">{getMonthLabel(currentMonth)}</h2>
        <button className="today-btn" onClick={goToToday}>
          Today
        </button>
      </div>

      <button
        className="month-nav-btn"
        onClick={() => navigateMonth('next')}
        aria-label="Next month"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
