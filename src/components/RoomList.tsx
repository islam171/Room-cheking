import { Users } from 'lucide-react';
import type { Room } from '@/lib/types';

interface RoomListProps {
    filteredRooms: Room[];
    selectedRoomId: string | null;
    onSelectRoom: (id: string) => void;
    labelClass: string;
}

export function RoomList({ filteredRooms, selectedRoomId, onSelectRoom, labelClass }: RoomListProps) {
    return (
        <section>
            <div className="mb-2 flex items-center justify-between">
                <label className={labelClass}>Matching rooms ({filteredRooms.length})</label>
                <span className="text-[11px] text-slate-400">Select a room</span>
            </div>
            {filteredRooms.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm dark:border-slate-600 dark:bg-slate-800">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">No rooms found</p>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">Try reducing the attendee count or removing requirements.</p>
                </div>
            ) : (
                <div className="grid gap-2 max-h-60 overflow-y-auto pr-1">
                    {filteredRooms.map((candidate) => {
                        const active = candidate.id === selectedRoomId;
                        return (
                            <button
                                key={candidate.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => onSelectRoom(candidate.id)}
                                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-all ${
                                    active
                                        ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-200 dark:border-sky-400 dark:bg-sky-950/50 dark:ring-sky-800'
                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700/50'
                                }`}
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{candidate.name}</p>
                                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span>{candidate.id}</span>
                                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{candidate.capacity} seats</span>
                                    </p>
                                </div>
                                {candidate.blocked && (
                                    <span className="ml-2 shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-600 dark:bg-rose-950 dark:text-rose-400">Blocked</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}