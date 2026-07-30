import { create } from 'zustand';
import type { Company, Venue, Hall, Booking } from '../types';
import { company, venues, halls, bookings } from '../data/mockData';

interface AppState {
  // ─── Data ────────────────────────────────────────
  company: Company;
  venues: Venue[];
  halls: Hall[];
  bookings: Booking[];

  // ─── Filters ─────────────────────────────────────
  selectedVenueId: string;
  selectedHallId: string | 'all';
  currentMonth: Date;

  // ─── Modal ───────────────────────────────────────
  modalDate: string | null;
  modalBooking: Booking | null;

  // ─── Actions ─────────────────────────────────────
  setSelectedVenue: (venueId: string) => void;
  setSelectedHall: (hallId: string | 'all') => void;
  navigateMonth: (direction: 'prev' | 'next') => void;
  goToToday: () => void;
  openModal: (date: string, booking?: Booking) => void;
  closeModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Data (from mock)
  company,
  venues,
  halls,
  bookings,

  // Default: first venue, all halls, August 2026 (demo month)
  selectedVenueId: venues[0].id,
  selectedHallId: 'all',
  currentMonth: new Date(2026, 7, 1), // August 2026

  // Modal
  modalDate: null,
  modalBooking: null,

  // Actions
  setSelectedVenue: (venueId) =>
    set({ selectedVenueId: venueId, selectedHallId: 'all' }),

  setSelectedHall: (hallId) =>
    set({ selectedHallId: hallId }),

  navigateMonth: (direction) =>
    set((state) => {
      const d = new Date(state.currentMonth);
      d.setMonth(d.getMonth() + (direction === 'next' ? 1 : -1));
      return { currentMonth: d };
    }),

  goToToday: () => {
    const today = new Date();
    set({ currentMonth: new Date(today.getFullYear(), today.getMonth(), 1) });
  },

  openModal: (date, booking) =>
    set({ modalDate: date, modalBooking: booking ?? null }),

  closeModal: () =>
    set({ modalDate: null, modalBooking: null }),
}));
