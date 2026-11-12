import { Users, DoorClosed, Monitor } from 'lucide-react';
import type { Room } from '@/lib/types';

interface RoomHeaderProps {
    room: Room;
}

export function RoomHeader({ room }: RoomHeaderProps) {
    return (
        <section className="rounded-lg bg-slate-100 px-4 py-3 dark:bg-slate-800">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-100">{room.name}</span>
                <span className="text-slate-500 dark:text-slate-400">{room.building}</span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <Users className="h-3.5 w-3.5" />{room.capacity} seats
        </span>
                {room.blocked && (
                    <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
            <DoorClosed className="h-3.5 w-3.5" />Blocked
          </span>
                )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
                {room.equipment.map((item) => (
                    <span key={item} className="rounded-full bg-white px-2 py-1 text-[11px] text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            <Monitor className="mr-1 inline h-3 w-3" />{item}
          </span>
                ))}
            </div>
        </section>
    );
}