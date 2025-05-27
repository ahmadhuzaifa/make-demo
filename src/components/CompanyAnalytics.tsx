'use client';

import { Card } from '@tremor/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function CompanyAnalytics() {
  // Example data - this would come from your CSV upload
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Revenue Growth',
        data: [0, 10, 15, 22, 30, 45],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-primary/10">
          <h3 className="font-medium text-sm text-muted-foreground">Total Portfolio Value</h3>
          <p className="text-2xl font-bold">$1.2B</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/10">
          <h3 className="font-medium text-sm text-muted-foreground">Avg. Revenue Growth</h3>
          <p className="text-2xl font-bold">+32%</p>
        </div>
        <div className="p-4 rounded-lg bg-primary/10">
          <h3 className="font-medium text-sm text-muted-foreground">Active Investments</h3>
          <p className="text-2xl font-bold">24</p>
        </div>
      </div>

      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Companies</h3>
        <div className="space-y-2">
          {/* This would be populated with actual data */}
          <div className="flex items-center justify-between p-3 bg-card rounded-lg">
            <span className="font-medium">Company A</span>
            <span className="text-green-500">+65% growth</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-card rounded-lg">
            <span className="font-medium">Company B</span>
            <span className="text-green-500">+48% growth</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-card rounded-lg">
            <span className="font-medium">Company C</span>
            <span className="text-green-500">+42% growth</span>
          </div>
        </div>
      </div>
    </div>
  );
}