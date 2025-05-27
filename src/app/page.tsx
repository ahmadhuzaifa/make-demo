'use client';

import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Companies</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
            <p className="text-2xl font-bold">$24.5M</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Avg. Growth Rate</p>
            <p className="text-2xl font-bold">+27%</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
            <p className="text-2xl font-bold">4</p>
          </div>
        </Card>
      </div>
    </div>
  );
}