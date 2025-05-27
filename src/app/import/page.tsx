'use client';

import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/FileUpload';

export default function ImportPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Import Data</h2>
          <p className="text-muted-foreground mt-2">
            Upload your portfolio data in CSV format
          </p>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Upload Portfolio Data</h3>
        <FileUpload />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Data Format Requirements</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Required Fields:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm text-muted-foreground">
              <li>Company Name</li>
              <li>Total Funding (USD)</li>
              <li>Current Revenue</li>
              <li>Investor List</li>
              <li>Market Segment</li>
              <li>Stage</li>
            </ul>
          </div>

          <div>
            <p className="font-medium">CSV Format Example:</p>
            <pre className="bg-muted p-4 rounded-md mt-2 text-sm overflow-x-auto">
              Company Name,Total Funding,Current Revenue,Investor List,Market Segment,Stage
              Company A,25000000,5000000,&quot;Draper, Sequoia&quot;,SaaS,Series B
              Company B,12000000,2500000,&quot;Draper, a16z&quot;,Fintech,Series A
            </pre>
          </div>

          <div>
            <p className="font-medium">Notes:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm text-muted-foreground">
              <li>All monetary values should be in USD</li>
              <li>Multiple investors should be comma-separated</li>
              <li>Ensure there are no special characters in company names</li>
              <li>Revenue should be annual recurring revenue (ARR)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}