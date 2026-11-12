import { Users } from 'lucide-react';
import { equipmentOptions } from '@/lib/sampleData';

interface FilterSectionProps {
    attendees: number;
    setAttendees: (value: number) => void;
    requiredEquipment: string[];
    toggleEquipment: (item: string) => void;
    selectClass: string;
    labelClass: string;
}

export function FilterSection({
                                  attendees,
                                  setAttendees,
                                  requiredEquipment,
                                  toggleEquipment,
                                  selectClass,
                                  labelClass,
                              }: FilterSectionProps) {
    return (
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Filters & Requirements</h2>

            {/* Attendees */}
            <div>
                <label className={labelClass}>Minimum Seats</label>
                <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="number"
                        min={1}
                        value={attendees}
                        onChange={(e) => setAttendees(Math.max(1, Number(e.target.value)))}
                        className={`${selectClass} pl-9`}
                    />
                </div>
            </div>

            {/* Equipment */}
            <div>
                <label className={labelClass}>Required Equipment</label>
                <div className="flex flex-wrap gap-1.5">
                    {equipmentOptions.map((item) => {
                        const active = requiredEquipment.includes(item);
                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => toggleEquipment(item)}
                                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                                    active
                                        ? 'bg-sky-500 text-white shadow-sm dark:bg-sky-600'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                                }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}