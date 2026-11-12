export interface Booking {
  id: number;
  start: number;
  end: number;
  label: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: Booking[];
}

export interface ValidationResult {
  ok: boolean;
  reason?: string;
}

export interface AvailabilityResult {
  available: boolean;
  reasons: string[];
}
