'use client';

import { ThemeToggle } from './theme-toggle';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">Draper Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Portfolio Company Analysis Dashboard
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}