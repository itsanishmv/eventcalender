import { useAppStore } from '../../store/useAppStore';

export function Header() {
  const companyName = useAppStore((s) => s.company.name);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
              <path
                d="M8 10h4v12H8V10zm6 4h4v8h-4v-8zm6-2h4v10h-4V12z"
                fill="white"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="header-title">Ibento</h1>
            <p className="header-subtitle">{companyName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
