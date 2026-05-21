'use client';

import { useEffect, useState } from 'react';

type Mode = 'ledger' | 'editorial' | 'blueprint';

const MODES: { value: Mode; label: string }[] = [
  { value: 'ledger', label: 'Ledger' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'blueprint', label: 'Blueprint' },
];

export function TweaksPanel() {
  const [mode, setMode] = useState<Mode>('ledger');

  useEffect(() => {
    const cls = `mode-${mode}`;
    const all = MODES.map((m) => `mode-${m.value}`);
    document.body.classList.remove(...all);
    document.body.classList.add(cls);
    return () => {
      document.body.classList.remove(cls);
    };
  }, [mode]);

  return (
    <div
      className="fixed top-20 right-4 z-[60] hidden md:flex items-center gap-1 p-1 rounded-md border border-border bg-card font-mono text-[10px] tracking-[0.12em] uppercase shadow-sm"
      role="radiogroup"
      aria-label="Visual mode"
    >
      {MODES.map((m) => {
        const active = mode === m.value;
        return (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setMode(m.value)}
            className={
              'px-2.5 py-1.5 rounded transition-colors duration-100 ' +
              (active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted')
            }
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
