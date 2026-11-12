import type { AvailabilityResult, Room, ValidationResult } from './types';

export function validateInterval(start: number, end: number, now: number): ValidationResult {
  if (Number.isNaN(start) || Number.isNaN(end)) {
    return { ok: false, reason: 'Start and end times are required.' };
  }
  if (start < 0 || end > 1440) {
    return { ok: false, reason: 'Times must be within 00:00–24:00.' };
  }
  if (start >= end) {
    return { ok: false, reason: 'Start must be earlier than end.' };
  }
  if (start < now) {
    return { ok: false, reason: 'Start must be after the current time.' };
  }
  if (end - start > 120) {
    return { ok: false, reason: 'Bookings cannot exceed 120 minutes.' };
  }
  return { ok: true };
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function checkAvailability(room: Room, start: number, end: number, now: number): AvailabilityResult {
  const reasons: string[] = [];

  const validation = validateInterval(start, end, now);
  if (!validation.ok && validation.reason) {
    reasons.push(validation.reason);
  }

  if (room.blocked) {
    reasons.push('This room is currently blocked for maintenance.');
  }

  for (const b of room.bookings) {
    if (overlaps(start, end, b.start, b.end)) {
      reasons.push(`Overlaps existing booking (${b.start.toString().padStart(2, '0')}:00 → ${b.end.toString().padStart(2, '0')}:00 in minutes).`);
      break;
    }
  }

  return { available: reasons.length === 0, reasons };
}
