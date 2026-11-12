import { Timeline } from '@/components/Timeline';
import type { Room } from '@/lib/types';

interface RoomScheduleProps {
    room: Room;
    start: number;
    end: number;
    now: number;
    validation: { ok: boolean; error?: string };
}

export function RoomSchedule({ room, start, end, now, validation }: RoomScheduleProps) {
    const candidateStart = validation.ok || start < end ? start : null;
    const candidateEnd = validation.ok || start < end ? end : null;

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">Today's schedule · {room.id}</h2>
                <span className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
          <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-slate-300" />Booked</span>
          <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm border border-emerald-500 bg-emerald-300" />Candidate</span>
          <span><span className="mr-1 inline-block h-2.5 w-0.5 bg-amber-400" />Now</span>
        </span>
            </div>
            <Timeline
                bookings={room.bookings}
                candidateStart={candidateStart}
                candidateEnd={candidateEnd}
                now={now}
                validation={validation}
            />
        </section>
    );
}