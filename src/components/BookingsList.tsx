import { Clock } from 'lucide-react';
import { minutesToLabel } from '@/lib/timeUtils';
import type { Room } from '@/lib/types';

interface BookingsListProps {
    room: Room;
}

export function BookingsList({ room }: BookingsListProps) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">Existing bookings for {room.id} ({room.bookings.length})</h3>
            {room.bookings.length === 0 ? (
                <p className="text-sm text-slate-400">No existing bookings today.</p>
            ) : (
                <ul className="space-y-1.5">
                    {room.bookings.map((booking) => (
                        <li key={booking.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-700/50">
                            <span className="font-medium text-slate-700 dark:text-slate-200">{booking.label}</span>
                            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3 w-3" />{minutesToLabel(booking.start)} – {minutesToLabel(booking.end)}
              </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}