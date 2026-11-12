import { useState } from 'react';
import { RoomChecker } from '@/components/RoomChecker';
import { ThemeToggle } from '@/components/ThemeToggle';

function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? 'dark min-h-screen bg-slate-900 text-slate-100' : 'min-h-screen bg-slate-100 text-slate-900'}>
      <div className="fixed right-4 top-4 z-10">
        <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
      </div>
      <RoomChecker />
    </div>
  );
}

export default App;
