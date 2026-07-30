import type { Company, Venue, Hall, Booking } from '../types';

// ─── Company ─────────────────────────────────────────────────────

export const company: Company = {
  id: 'company-1',
  name: 'Ibento Events Group',
  venueIds: ['venue-1', 'venue-2', 'venue-3'],
};

// ─── Venues ──────────────────────────────────────────────────────

export const venues: Venue[] = [
  {
    id: 'venue-1',
    companyId: 'company-1',
    name: 'The Grand Pavilion',
    address: '42 Marina Boulevard, Downtown',
    hallIds: ['hall-1a', 'hall-1b', 'hall-1c'],
  },
  {
    id: 'venue-2',
    companyId: 'company-1',
    name: 'Skyline Terrace',
    address: '18 Rooftop Drive, Uptown',
    hallIds: ['hall-2a', 'hall-2b'],
  },
  {
    id: 'venue-3',
    companyId: 'company-1',
    name: 'Lakeview Estate',
    address: '7 Serenity Lane, Lakeside',
    hallIds: ['hall-3a', 'hall-3b', 'hall-3c', 'hall-3d'],
  },
];

// ─── Halls ───────────────────────────────────────────────────────

export const halls: Hall[] = [
  // The Grand Pavilion
  { id: 'hall-1a', venueId: 'venue-1', name: 'Crystal Ballroom', capacity: 500 },
  { id: 'hall-1b', venueId: 'venue-1', name: 'Emerald Suite', capacity: 150 },
  { id: 'hall-1c', venueId: 'venue-1', name: 'Ruby Chamber', capacity: 80 },

  // Skyline Terrace
  { id: 'hall-2a', venueId: 'venue-2', name: 'Horizon Hall', capacity: 300 },
  { id: 'hall-2b', venueId: 'venue-2', name: 'Sunset Lounge', capacity: 100 },

  // Lakeview Estate
  { id: 'hall-3a', venueId: 'venue-3', name: 'Lakefront Grand', capacity: 400 },
  { id: 'hall-3b', venueId: 'venue-3', name: 'Garden Pavilion', capacity: 200 },
  { id: 'hall-3c', venueId: 'venue-3', name: 'Willow Room', capacity: 60 },
  { id: 'hall-3d', venueId: 'venue-3', name: 'Birch Alcove', capacity: 30 },
];

// ─── Bookings ────────────────────────────────────────────────────
// Uses August 2026 as the primary demo month so the calendar opens
// with rich data visible.

export const bookings: Booking[] = [
  // ── The Grand Pavilion ──────────────────────────────────────

  // Single-day confirmed booking
  {
    id: 'bk-001',
    eventName: 'Sharma–Patel Wedding',
    venueId: 'venue-1',
    hallId: 'hall-1a',
    customerName: 'Raj Sharma',
    status: 'confirmed',
    guestCount: 350,
    startDate: '2026-08-01',
    startTime: '16:00',
    endDate: '2026-08-01',
    endTime: '23:00',
  },
  // Multi-day corporate event (3 days)
  {
    id: 'bk-002',
    eventName: 'TechSummit 2026',
    venueId: 'venue-1',
    hallId: 'hall-1a',
    customerName: 'Infosys Ltd.',
    status: 'confirmed',
    guestCount: 450,
    startDate: '2026-08-05',
    startTime: '09:00',
    endDate: '2026-08-07',
    endTime: '18:00',
  },
  // Tentative booking overlapping with another hall
  {
    id: 'bk-003',
    eventName: 'Art Gala Preview',
    venueId: 'venue-1',
    hallId: 'hall-1b',
    customerName: 'Nita Mehta',
    status: 'tentative',
    guestCount: 100,
    startDate: '2026-08-06',
    startTime: '10:00',
    endDate: '2026-08-06',
    endTime: '20:00',
  },
  // Maintenance block
  {
    id: 'bk-004',
    eventName: 'Annual Maintenance – HVAC',
    venueId: 'venue-1',
    hallId: 'hall-1c',
    customerName: 'Facilities Team',
    status: 'maintenance',
    guestCount: 0,
    startDate: '2026-08-10',
    startTime: '08:00',
    endDate: '2026-08-12',
    endTime: '18:00',
  },
  // Weekend wedding (multi-day)
  {
    id: 'bk-005',
    eventName: 'Gupta Reception',
    venueId: 'venue-1',
    hallId: 'hall-1a',
    customerName: 'Priya Gupta',
    status: 'confirmed',
    guestCount: 400,
    startDate: '2026-08-15',
    startTime: '18:00',
    endDate: '2026-08-16',
    endTime: '02:00',
  },
  // Overlap: same day as Gupta, different hall
  {
    id: 'bk-006',
    eventName: 'Wine Tasting Evening',
    venueId: 'venue-1',
    hallId: 'hall-1b',
    customerName: 'Deccan Vintners',
    status: 'confirmed',
    guestCount: 80,
    startDate: '2026-08-15',
    startTime: '19:00',
    endDate: '2026-08-15',
    endTime: '22:00',
  },

  // ── Skyline Terrace ─────────────────────────────────────────

  // Full venue booking (both halls same day)
  {
    id: 'bk-007',
    eventName: 'Startup Demo Day',
    venueId: 'venue-2',
    hallId: 'hall-2a',
    customerName: 'YC India',
    status: 'confirmed',
    guestCount: 250,
    startDate: '2026-08-08',
    startTime: '09:00',
    endDate: '2026-08-08',
    endTime: '18:00',
  },
  {
    id: 'bk-008',
    eventName: 'Startup Networking Mixer',
    venueId: 'venue-2',
    hallId: 'hall-2b',
    customerName: 'YC India',
    status: 'confirmed',
    guestCount: 80,
    startDate: '2026-08-08',
    startTime: '19:00',
    endDate: '2026-08-08',
    endTime: '22:00',
  },
  // Tentative multi-day
  {
    id: 'bk-009',
    eventName: 'Fashion Week Preview',
    venueId: 'venue-2',
    hallId: 'hall-2a',
    customerName: 'Vogue India',
    status: 'tentative',
    guestCount: 200,
    startDate: '2026-08-20',
    startTime: '10:00',
    endDate: '2026-08-22',
    endTime: '20:00',
  },
  // Single day confirmed
  {
    id: 'bk-010',
    eventName: 'Charity Auction',
    venueId: 'venue-2',
    hallId: 'hall-2b',
    customerName: 'Hope Foundation',
    status: 'confirmed',
    guestCount: 90,
    startDate: '2026-08-21',
    startTime: '17:00',
    endDate: '2026-08-21',
    endTime: '21:00',
  },

  // ── Lakeview Estate ─────────────────────────────────────────

  // Multi-day conference
  {
    id: 'bk-011',
    eventName: 'AI & Data Conference',
    venueId: 'venue-3',
    hallId: 'hall-3a',
    customerName: 'DataCorp',
    status: 'confirmed',
    guestCount: 350,
    startDate: '2026-08-03',
    startTime: '09:00',
    endDate: '2026-08-05',
    endTime: '17:00',
  },
  // Garden wedding
  {
    id: 'bk-012',
    eventName: 'Iyer–Nair Wedding',
    venueId: 'venue-3',
    hallId: 'hall-3b',
    customerName: 'Lakshmi Iyer',
    status: 'confirmed',
    guestCount: 180,
    startDate: '2026-08-09',
    startTime: '16:00',
    endDate: '2026-08-09',
    endTime: '23:00',
  },
  // Maintenance block (small room)
  {
    id: 'bk-013',
    eventName: 'Floor Refurbishment',
    venueId: 'venue-3',
    hallId: 'hall-3c',
    customerName: 'Facilities Team',
    status: 'maintenance',
    guestCount: 0,
    startDate: '2026-08-18',
    startTime: '08:00',
    endDate: '2026-08-20',
    endTime: '18:00',
  },
  // Weekend event spanning Sat–Sun
  {
    id: 'bk-014',
    eventName: 'Music Festival – Lakeside',
    venueId: 'venue-3',
    hallId: 'hall-3a',
    customerName: 'SoundWave Events',
    status: 'confirmed',
    guestCount: 400,
    startDate: '2026-08-22',
    startTime: '14:00',
    endDate: '2026-08-23',
    endTime: '23:00',
  },
  // Tentative in small room
  {
    id: 'bk-015',
    eventName: 'Board Strategy Retreat',
    venueId: 'venue-3',
    hallId: 'hall-3d',
    customerName: 'Apex Holdings',
    status: 'tentative',
    guestCount: 20,
    startDate: '2026-08-25',
    startTime: '09:00',
    endDate: '2026-08-27',
    endTime: '17:00',
  },
  // Multiple halls same day at Lakeview (to show partially-booked)
  {
    id: 'bk-016',
    eventName: 'Kids Summer Camp',
    venueId: 'venue-3',
    hallId: 'hall-3b',
    customerName: 'BrightMinds Academy',
    status: 'confirmed',
    guestCount: 150,
    startDate: '2026-08-03',
    startTime: '08:00',
    endDate: '2026-08-03',
    endTime: '16:00',
  },
  // Month-boundary booking (spans into September)
  {
    id: 'bk-017',
    eventName: 'End-of-Summer Gala',
    venueId: 'venue-1',
    hallId: 'hall-1a',
    customerName: 'Metro Club',
    status: 'confirmed',
    guestCount: 300,
    startDate: '2026-08-29',
    startTime: '18:00',
    endDate: '2026-09-01',
    endTime: '02:00',
  },
  // July overflow (visible when viewing August, since grid shows tail of July)
  {
    id: 'bk-018',
    eventName: 'Pre-Season Workshop',
    venueId: 'venue-2',
    hallId: 'hall-2a',
    customerName: 'EduFirst',
    status: 'confirmed',
    guestCount: 120,
    startDate: '2026-07-30',
    startTime: '10:00',
    endDate: '2026-08-01',
    endTime: '16:00',
  },
];
