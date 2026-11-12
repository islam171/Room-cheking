import { useMemo } from 'react';
import type { Booking, ValidationResult } from '@/lib/types';
import { minutesToLabel } from '@/lib/timeUtils';

interface TimelineProps {
  bookings: Booking[];
  candidateStart: number | null;
  candidateEnd: number | null;
  now: number;
  validation: ValidationResult;
}

const DAY_START = 0;
const DAY_END = 1440;
const TICK_INTERVAL = 120;

export function Timeline({ bookings, candidateStart, candidateEnd, now, validation }: TimelineProps) {
  const ticks = useMemo(() => {
    const arr: number[] = [];
    for (let m = DAY_START; m <= DAY_END; m += TICK_INTERVAL) arr.push(m);
    return arr;
  }, []);

  const showCandidate =
    candidateStart !== null &&
    candidateEnd !== null &&
    !Number.isNaN(candidateStart) &&
    !Number.isNaN(candidateEnd);

  const leftPct = (m: number) => `${(m / (DAY_END - DAY_START)) * 100}%`;

  const candidateOk = showCandidate && validation.ok;

  return (
    <div className="w-full select-none">
      <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>

      <div className="relative h-16 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
        {/* gridlines */}
        {ticks.map((m) => (
          <div
            key={m}
            className="absolute top-0 bottom-0 w-px bg-slate-200/70 dark:bg-slate-600/50"
            style={{ left: leftPct(m) }}
          />
        ))}

        {/* existing bookings */}
        {bookings.map((b) => (
          <div
            key={b.id}
            className="absolute top-1.5 bottom-1.5 rounded bg-slate-300/80 px-1.5 text-[9px] font-medium text-slate-700 flex items-center overflow-hidden dark:bg-slate-600/80 dark:text-slate-200"
            style={{ left: leftPct(b.start), width: `calc(${((b.end - b.start) / (DAY_END - DAY_START)) * 100}%)` }}
            title={`${minutesToLabel(b.start)}–${minutesToLabel(b.end)}`}
          >
            {minutesToLabel(b.start)}–{minutesToLabel(b.end)}
          </div>
        ))}

        {/* now marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 dark:bg-amber-500"
          style={{ left: leftPct(Math.max(0, Math.min(1440, now))) }}
        >
          <span className="absolute -top-0 left-1 text-[8px] font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">NOW</span>
        </div>

        {/* candidate interval */}
        {showCandidate && (
          <div
            className={`absolute top-1.5 bottom-1.5 rounded border-2 flex items-center justify-center text-[9px] font-bold transition-colors ${
              candidateOk
                ? 'bg-emerald-200/70 border-emerald-500 text-emerald-800 dark:bg-emerald-600/40 dark:border-emerald-400 dark:text-emerald-200'
                : 'bg-rose-200/70 border-rose-500 text-rose-800 dark:bg-rose-600/40 dark:border-rose-400 dark:text-rose-200'
            }`}
            style={{
              left: leftPct(Math.max(0, Math.min(1440, candidateStart))),
              width: `calc(${Math.max(0, Math.min(1440, candidateEnd) - Math.max(0, Math.min(1440, candidateStart))) / (DAY_END - DAY_START) * 100}%)`,
            }}
          >
            {candidateEnd - candidateStart > 40 && `${candidateEnd - candidateStart}m`}
          </div>
        )}
      </div>
    </div>
  );
}
