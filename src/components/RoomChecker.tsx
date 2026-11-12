import { useEffect, useMemo, useState } from 'react';
import { Building2 } from 'lucide-react';
import { rooms as sampleRooms } from '@/lib/sampleData';
import { checkAvailability, validateInterval } from '@/lib/availability';
import type { Room } from '@/lib/types';

// Импорт мелких компонентов
import { FilterSection } from '@/components/FilterSection';
import { RoomList } from '@/components/RoomList';
import { TimeControls } from '@/components/TimeControls.';
import { RoomHeader } from '@/components/RoomHeader';
import { RoomSchedule } from '@/components/RoomSchedule';
import { AvailabilityCard } from '@/components/AvailabilityCard';
import { BookingsList } from '@/components/BookingsList';

const HOURS: number[] = Array.from({ length: 25 }, (_, h) => h);

const selectClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-800';
const labelClass =
    'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400';

export function RoomChecker() {
    const [rooms] = useState<Room[]>(sampleRooms);
    const [selectedId, setSelectedId] = useState(sampleRooms[0].id);
    const [attendees, setAttendees] = useState(1);
    const [requiredEquipment, setRequiredEquipment] = useState<string[]>([]);
    const [startHour, setStartHour] = useState(10);
    const [startMin, setStartMin] = useState(0);
    const [duration, setDuration] = useState(60);
    const [now, setNow] = useState(480);

    const start = startHour * 60 + startMin;
    const end = start + duration;

    const filteredRooms = useMemo(
        () => rooms.filter(
            (candidate) =>
                candidate.capacity >= attendees &&
                requiredEquipment.every((item) => candidate.equipment.includes(item)),
        ),
        [rooms, attendees, requiredEquipment],
    );

    const room = filteredRooms.find((candidate) => candidate.id === selectedId) ?? filteredRooms[0] ?? null;

    useEffect(() => {
        if (room && room.id !== selectedId) setSelectedId(room.id);
    }, [room, selectedId]);

    const validation = useMemo(() => validateInterval(start, end, now), [start, end, now]);

    const result = useMemo(
        () => room
            ? checkAvailability(room, start, end, now)
            : { available: false, reasons: ['No rooms match the selected capacity and equipment requirements.'] },
        [room, start, end, now],
    );

    const toggleEquipment = (item: string) => {
        setRequiredEquipment((current) =>
            current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
        );
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
            <header className="mb-6 sm:mb-8">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                    <Building2 className="h-4 w-4" /> Smart Campus
                </div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-50">
                    Room Availability Checker
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                    Find a room by capacity and equipment, then check its schedule. Bookings are capped at 120 minutes and must start after the current time.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-5">
                <aside className="space-y-5 md:col-span-2">
                    {/* 1. Блок фильтров */}
                    <FilterSection
                        attendees={attendees}
                        setAttendees={setAttendees}
                        requiredEquipment={requiredEquipment}
                        toggleEquipment={toggleEquipment}
                        selectClass={selectClass}
                        labelClass={labelClass}
                    />

                    {/* 2. Список подходящих комнат */}
                    <RoomList
                        filteredRooms={filteredRooms}
                        selectedRoomId={room?.id ?? null}
                        onSelectRoom={setSelectedId}
                        labelClass={labelClass}
                    />

                    {/* 3. Управление временем */}
                    <TimeControls
                        now={now}
                        setNow={setNow}
                        startHour={startHour}
                        setStartHour={setStartHour}
                        startMin={startMin}
                        setStartMin={setStartMin}
                        duration={duration}
                        setDuration={setDuration}
                        HOURS={HOURS}
                        selectClass={selectClass}
                        labelClass={labelClass}
                    />
                </aside>

                <main className="min-w-0 space-y-4 md:col-span-3">
                    {!room ? (
                        <section className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-600 dark:bg-slate-800">
                            <Building2 className="mb-3 h-9 w-9 text-slate-400" />
                            <h2 className="font-bold text-slate-800 dark:text-slate-100">No matching rooms</h2>
                            <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">No room meets all the selected requirements. Change the filters to see available room options.</p>
                        </section>
                    ) : (
                        <>
                            {/* Информация о выбранной комнате */}
                            <RoomHeader room={room} />

                            {/* Таймлайн бронирования */}
                            <RoomSchedule room={room} start={start} end={end} now={now} validation={validation} />

                            {/* Статус доступности */}
                            <AvailabilityCard result={result} start={start} end={end} duration={duration} />

                            {/* Существующие брони */}
                            <BookingsList room={room} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}