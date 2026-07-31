# Ibento — Multi-Venue Availability Calendar

A modern, fast, and responsive calendar application built with React, TypeScript, and Vite. It is designed to visualize and manage bookings across multiple venues and halls seamlessly.

## 🚀 Features
- **Multi-Venue Support**: Filter and view bookings by specific Venues and their respective Halls.
- **Dynamic Calendar Grid**: Computes day statuses automatically (Available, Partially Booked, Fully Booked, Maintenance).
- **Seamless Multi-Day Bars**: Continuous booking visualization across multiple consecutive days without grid gaps.
- **Interactive Drawer**: Right-side slide-in drawer for viewing detailed booking information and adding new ones.
- **Stats Dashboard**: Real-time summary of the current month's occupancy (Total Bookings, Available Days, etc.).
- **Aesthetic Design System**: Pure Vanilla CSS featuring a premium Navy/Indigo color palette and micro-animations.

## 🏗️ Architecture

The app strictly separates the data layer from the presentation layer to ensure scalable and predictable rendering.

### 1. State Management (`zustand`)
The global state is managed entirely by Zustand in `src/store/useAppStore.ts`. It holds:
- **Domain Data**: `venues`, `halls`, `bookings` (Currently initialized from `mockData.ts`).
- **Filter State**: `selectedVenueId`, `selectedHallId`, `currentMonth`.
- **UI State**: `drawerOpen`, `drawerDate`, `drawerBooking` (controls the right-side panel).
- **Actions**: `addBooking`, `navigateMonth`, `openDrawer`, `closeDrawer`.

### 2. Data Transformation (Hooks & Utils)
Instead of manually updating the calendar UI when data changes, the UI is purely a derived reflection of the store.
- **`useCalendarData.ts`**: The core hook that watches the store and builds an array of `DayCell` objects. It processes the date math (padding outside days) and maps the filtered bookings into their respective days.
- **`dateUtils.ts` & `statusUtils.ts`**: Pure functions that handle grid date expansion and compute the capacity status (Green, Yellow, Red, Purple) of any given day based on the bookings it holds.
- **`useCalendarStats.ts`**: Derives the monthly summary counts for the `StatsBar` component.

### 3. Component Hierarchy
- `App.tsx` (Root Layout)
  - `FilterBar` (Venue dropdown, Hall dropdown, Month Navigation)
  - `CalendarGrid` (Renders a 7-column grid)
    - `CalendarDayCell` (Individual day box)
      - `BookingBar` (Spanning events, styled dynamically for multi-day continuity)
  - `StatsBar` (Bottom summary cards)
  - `BookingDrawer` (Slide-in details / form view)

### 4. Styling (Vanilla CSS)
- Located entirely in `src/index.css`.
- Uses CSS Variables (`--color-primary`, `--radius`, `--transition`) to enforce a strict design system.
- Components use standard BEM-style class naming (e.g., `day-cell`, `day-cell--today`).

## 🛠️ Stack & Setup
- React 19
- TypeScript
- Vite
- Zustand

### Running Locally
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
