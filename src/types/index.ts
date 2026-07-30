// ─── Domain Types ────────────────────────────────────────────────

export type BookingStatus = 'confirmed' | 'tentative' | 'maintenance';

export type DayStatus = 'available' | 'partially-booked' | 'fully-booked' | 'maintenance';

export interface Company {
  id: string;
  name: string;
  venueIds: string[];
}

export interface Venue {
  id: string;
  companyId: string;
  name: string;
  address: string;
  hallIds: string[];
}

export interface Hall {
  id: string;
  venueId: string;
  name: string;
  capacity: number;
}

export interface Booking {
  id: string;
  eventName: string;
  venueId: string;
  hallId: string;
  customerName: string;
  status: BookingStatus;
  guestCount: number;
  startDate: string;   // ISO date 'YYYY-MM-DD'
  startTime: string;   // 'HH:mm' (24-hr)
  endDate: string;     // ISO date 'YYYY-MM-DD'
  endTime: string;     // 'HH:mm' (24-hr)
}

// ─── View-Model Types ────────────────────────────────────────────

export interface DayCell {
  date: string;          // 'YYYY-MM-DD'
  bookings: Booking[];
  status: DayStatus;
  isCurrentMonth: boolean;
  isToday: boolean;
}
