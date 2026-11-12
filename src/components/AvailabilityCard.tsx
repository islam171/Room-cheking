import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { minutesToLabel } from '@/lib/timeUtils';

interface AvailabilityCardProps {
    result: { available: boolean; reasons: string[] };
    start: number;
    end: number;
    duration: number;
}

export function AvailabilityCard({ result, start, end, duration }: AvailabilityCardProps) {
    return (
        <section className={`rounded-xl border-2 p-5 transition-colors ${result.available ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/50' : 'border-rose-300 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/50'}`}>
            <div className="flex items-start gap-3">
                {result.available ? (
                    <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-emerald-600 dark:text-emerald-400" />
                ) : (
                    <XCircle className="mt-0.5 h-7 w-7 shrink-0 text-rose-600 dark:text-rose-400" />
                )}
                <div className="min-w-0 flex-1">
                    <p className={`text-lg font-bold ${result.available ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                        {result.available ? 'Available' : 'Unavailable'}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                        <Clock className="h-3.5 w-3.5" />{minutesToLabel(start)} – {minutesToLabel(end)} ({duration} min)
                    </p>
                    {result.reasons.length > 0 && (
                        <ul className="mt-2 space-y-1">
                            {result.reasons.map((reason, index) => (
                                <li key={index} className="flex items-start gap-1.5 text-sm text-rose-700 dark:text-rose-300">
                                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-rose-500" />{reason}
                                </li>
                            ))}
                        </ul>
                    )}
                    {result.available && (
                        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">No conflicts detected. This room is free for your requested interval.</p>
                    )}
                </div>
            </div>
        </section>
    );
}