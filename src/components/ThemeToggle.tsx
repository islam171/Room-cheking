import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}
