import { Info } from 'lucide-react';

interface TimeControlsProps {
    now: number;
    setNow: (val: number) => void;
    startHour: number;
    setStartHour: (val: number) => void;
    startMin: number;
    setStartMin: (val: number) => void;
    duration: number;
    setDuration: (val: number) => void;
    HOURS: number[];
    selectClass: string;
    labelClass: string;
}

export function TimeControls({
                                 now,
                                 setNow,
                                 startHour,
                                 setStartHour,
                                 startMin,
                                 setStartMin,
                                 duration,
                                 setDuration,
                                 HOURS,
                                 selectClass,
                                 labelClass,
                             }: TimeControlsProps) {
    return (
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            {/* Current time */}
            <div>
                <label className={labelClass}>Current time (simulated)</label>
                <div className="flex items-center gap-2">
                    <select
                        aria-label="Current hour"
                        value={Math.floor(now / 60)}
                        onChange={(e) => setNow(Number(e.target.value) * 60 + (now % 60))}
                        className={selectClass}
                    >
                        {HOURS.slice(0, 24).map((h) => <option key={h} value={h}>{h.toString().padStart(2, '0')} hr</option>)}
                    </select>
                    <select
                        aria-label="Current minute"
                        value={now % 60}
                        onChange={(e) => setNow(Math.floor(now / 60) * 60 + Number(e.target.value))}
                        className={selectClass}
                    >
                        {[0, 15, 30, 45].map((minute) => <option key={minute} value={minute}>{minute.toString().padStart(2, '0')} min</option>)}
                    </select>
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Info className="h-3 w-3" /> Candidate start must be after this time.</p>
            </div>

            {/* Booking start */}
            <div>
                <label className={labelClass}>Booking start</label>
                <div className="flex items-center gap-2">
                    <select aria-label="Booking start hour" value={startHour} onChange={(e) => setStartHour(Number(e.target.value))} className={selectClass}>
                        {HOURS.map((h) => <option key={h} value={h}>{h.toString().padStart(2, '0')} hr</option>)}
                    </select>
                    <select aria-label="Booking start minute" value={startMin} onChange={(e) => setStartMin(Number(e.target.value))} className={selectClass}>
                        {[0, 15, 30, 45].map((minute) => <option key={minute} value={minute}>{minute.toString().padStart(2, '0')} min</option>)}
                    </select>
                </div>
            </div>

            {/* Duration */}
            <div>
                <label className={labelClass}>Duration</label>
                <div className="grid grid-cols-4 gap-2">
                    {[30, 60, 90, 120].map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setDuration(value)}
                            className={`rounded-lg border py-2 text-sm font-semibold transition-all ${
                                duration === value
                                    ? 'border-sky-500 bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:border-sky-400 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-800'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                        >
                            {value}m
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}