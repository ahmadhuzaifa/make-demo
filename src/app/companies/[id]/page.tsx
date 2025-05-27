"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCompany } from "@/lib/actions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type CompanyData = {
  id: string;
  name: string;
  totalFunding: number;
  currentRevenue: number;
  investorList: string[];
  marketSegment: string;
  stage: string;
  revenueGrowth: number | null;
  location: string | null;
  updates: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
  }>;
  metrics: Array<{
    date: string;
    revenue: number;
    growth: number;
  }>;
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CompanyPage({ params }: PageProps) {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      const resolvedParams = await params;
      const result = await getCompany(resolvedParams.id);
      if (result.success) {
        setCompany({
          ...result.data,
          updates: result.data.updates.map((update) => ({
            ...update,
            date: update.date.toISOString(),
          })),
          metrics: result.data.metrics.map((metric) => ({
            ...metric,
            date: metric.date.toISOString(),
          })),
        });
      }
      setLoading(false);
    }
    loadCompany();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-muted-foreground">
          Loading company data...
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-muted-foreground">Company not found</div>
      </div>
    );
  }

  const revenueData = {
    labels: company.metrics.map((m) => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: "Revenue",
        data: company.metrics.map((m) => m.revenue),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{company.name}</h2>
          <p className="text-muted-foreground">
            {company.marketSegment} - {company.stage}
          </p>
        </div>
        <Button>Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Funding</p>
            <p className="text-2xl font-bold">
              ${(company.totalFunding / 1000000).toFixed(1)}M
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current Revenue</p>
            <p className="text-2xl font-bold">
              ${(company.currentRevenue / 1000000).toFixed(1)}M ARR
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Growth Rate</p>
            <p
              className={`text-2xl font-bold ${
                company.revenueGrowth && company.revenueGrowth > 0
                  ? "text-green-500"
                  : ""
              }`}
            >
              {company.revenueGrowth ? `+${company.revenueGrowth}%` : "N/A"}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Revenue Growth</h3>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
              },
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Company Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Market Segment</p>
              <p className="font-medium">{company.marketSegment}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Investor List</p>
              <p className="font-medium">{company.investorList.join(", ")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stage</p>
              <p className="font-medium">{company.stage}</p>
            </div>
            {company.location && (
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{company.location}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Updates</h3>
        <div className="space-y-4">
          {company.updates.length === 0 ? (
            <p className="text-muted-foreground">No recent updates</p>
          ) : (
            company.updates.map((update) => (
              <div key={update.id} className="border-l-2 border-primary pl-4">
                <p className="font-medium">{update.title}</p>
                <p className="text-sm text-muted-foreground">
                  {update.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(update.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
