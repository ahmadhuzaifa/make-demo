'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground mt-2">
            Generate and view portfolio reports
          </p>
        </div>
        <Button>Generate New Report</Button>
      </div>

      <div className="grid gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Portfolio Overview Report</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Complete analysis of portfolio performance and metrics
              </p>
            </div>
            <Button variant="outline">View Report</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Investment Performance Report</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Detailed breakdown of investment returns and growth
              </p>
            </div>
            <Button variant="outline">View Report</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Market Segment Analysis</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Performance analysis by market segment and industry
              </p>
            </div>
            <Button variant="outline">View Report</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Growth Metrics Report</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Revenue growth and key performance indicators
              </p>
            </div>
            <Button variant="outline">View Report</Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Custom Report Builder</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select metrics and companies to include in your custom report:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h4 className="font-medium mb-2">Available Metrics</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="revenue" />
                  <label htmlFor="revenue">Revenue Growth</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="funding" />
                  <label htmlFor="funding">Funding History</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="market" />
                  <label htmlFor="market">Market Analysis</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="competitors" />
                  <label htmlFor="competitors">Competitor Comparison</label>
                </li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-2">Report Format</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <input type="radio" name="format" id="pdf" />
                  <label htmlFor="pdf">PDF Report</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="radio" name="format" id="excel" />
                  <label htmlFor="excel">Excel Spreadsheet</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="radio" name="format" id="presentation" />
                  <label htmlFor="presentation">Presentation</label>
                </li>
              </ul>
            </Card>
          </div>
          <Button className="mt-4">Generate Custom Report</Button>
        </div>
      </Card>
    </div>
  );
}