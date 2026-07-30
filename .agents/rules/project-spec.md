# Ibento — Multi-Venue Availability Calendar (Project Spec)

## Stack (mandatory)
React (latest) + TypeScript + Vite. Git with incremental, meaningful commits.
Mock data only (JSON / mocked API) — no real backend.
Optional but preferred: Zustand for state, Tailwind for styling.

## Domain Model
```
Company
 └── Venue (many)
      └── Hall (many)
           └── Booking (many)
```
- A Booking belongs to exactly one Hall.
- A Booking has: id, eventName, venueId, hallId, customerName,
  status ('confirmed' | 'tentative' | 'maintenance'), guestCount,
  startDate, startTime, endDate, endTime.
- Bookings can span multiple consecutive calendar days
  (startDate+startTime → endDate+endTime).
- Overlapping bookings on the same hall/day ARE allowed. No conflict
  validation required.

## Core Logic to Get Right
1. **Day occupancy**: given a booking's start/end datetime, compute every
   calendar date it occupies (inclusive date range expansion, not just
   start day).
2. **Day status derivation**: per visible day, aggregate all bookings
   occupying it (after venue/hall filters) into one of:
   Available / Partially Booked / Fully Booked / Maintenance.
   Define your own threshold logic for "partially" vs "fully" booked
   and document the rule in the README.
3. **Overflow display**: if >1 booking occupies a day, show the first
   booking + "+N more" indicator.
4. **Multi-day continuity**: a multi-day booking should read as one
   continuous block across the calendar grid (bar-style or repeated
   per cell — pick one, justify it).

## Functional Requirements
- Venue dropdown → changing venue reloads halls + refreshes calendar to
  only that venue's bookings.
- Hall filter: "All Halls" + individual halls, filters calendar in place.
- Monthly calendar: Prev / Next / Today navigation, current month
  loads by default.
- Status shown visually per day (color/badge).
- Click a booking or day → Modal or Drawer showing: Event Name, Venue,
  Hall, Customer Name, Status, Guest Count, Start Date/Time, End Date/Time.
- Fully responsive: desktop, tablet, mobile.

## Suggested Folder Structure
```
src/
  components/  (Calendar, BookingCard, BookingModal, Filters, Header, Common)
  pages/
  hooks/
  services/
  store/
  types/
  utils/
  App.tsx
```
Deviating from this is fine if justified in the README.

## Explicitly Out of Scope
- Booking conflict validation
- Real backend / persistence (unless doing the bonus Local Storage feature)
- Drag & drop, week view, search, dark mode — all optional bonus only,
  do not prioritize over core requirements.

## Deliverables
- GitHub repo, incremental commits reflecting real build order
  (types → mock data → calendar grid → filters → modal → polish).
- README: setup instructions + architecture/decision explanation
  (state management choice, day-occupancy algorithm, status rule).
- Optional: screenshots or short demo video.

## Engineering Priorities (per evaluator notes)
Clean, maintainable, reusable code and thoughtful architecture matter
more than feature completeness. Every non-obvious decision should be
defensible out loud — assume a live follow-up discussion.

## Design Reference

Sample UI reference (see `.agents/rules/assets/sample-ui.png`):

### Layout Structure
- **Top filter bar**: Venue dropdown (left) → Hall dropdown → "Today" button → ‹ › month nav arrows → "August 2026" month label → Month view selector (right)
- **Calendar grid**: 7-column (Mon–Sun), blue header row with white text, 6 body rows, clean white cells with subtle borders
- **Right-side drawer** (not centered modal): slides in from right showing booking details when a day or booking is clicked
- **Bottom stats bar**: horizontal row of summary cards below the calendar
- **Legend row**: between calendar and stats bar — colored dots for Available (green), Partially Booked (amber), Fully Booked (red), Maintenance (purple)

### Calendar Cell Design
- Day number in top-left of each cell
- Small colored **status dot** next to day number indicating day status
- Booking bars inside cells; multi-day bookings span as **continuous bars across cells** (the bar stretches from start to end day)
- "+N more" pill badge in cells with overflow bookings
- Outside-month days shown with muted text/opacity

### Right Drawer Detail View
- Date range header: e.g. "12 – 15 Aug 2026"
- Close (×) button top-right
- Primary booking detail:
  - Status dot + Event Name + Status badge (e.g. "Confirmed" in colored pill)
  - Fields listed vertically with icons: Venue, Hall, Customer, Guests, Status, Start datetime, End datetime
- "Other Bookings (N)" section listing additional bookings on the same date range
  - Each shows: status dot, event name, status badge, hall name, time range
- "View All Bookings" button at bottom

### Bottom Stats Bar
Five summary cards in a horizontal row:
1. 📅 Total Bookings (count)
2. ✅ Available Days (count)
3. ⏳ Partially Booked (count)
4. ⊘ Fully Booked (count)
5. 🔧 Maintenance Days (count)

### Color Palette (from reference)
- Primary accent: Deep blue/indigo (#1e3a8a to #3730a3 range)
- Calendar header: Solid indigo/navy blue
- Confirmed bookings: Blue bar/dot
- Tentative bookings: Amber/orange dot
- Maintenance: Purple/indigo dot
- Available: Green dot
- Partially Booked: Amber/yellow dot
- Fully Booked: Red/coral dot
- Background: Clean white
- Text: Dark gray/slate
