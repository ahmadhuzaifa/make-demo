'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AnalysisPage() {
  const [query, setQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    // TODO: Implement AI analysis
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Analysis</h2>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Ask AI Assistant</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Select Company</label>
              <Input
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                placeholder="Enter company name"
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Your Question</label>
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about growth potential, market analysis, investment recommendations..."
                className="mt-2 min-h-[100px]"
              />
            </div>
            <Button 
              onClick={handleAnalysis}
              disabled={!query.trim() || !selectedCompany.trim() || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Get Analysis"}
            </Button>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Example Questions</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">• Should we invest more in [Company]?</p>
              <p className="text-sm text-muted-foreground">• What&apos;s the market saying about [Company]?</p>
              <p className="text-sm text-muted-foreground">• How does [Company] compare to competitors?</p>
              <p className="text-sm text-muted-foreground">• What are the key risks for [Company]?</p>
              <p className="text-sm text-muted-foreground">• Will their revenue grow in the next year?</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Analysis Sources</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">• Internal portfolio data</p>
              <p className="text-sm text-muted-foreground">• Market research and trends</p>
              <p className="text-sm text-muted-foreground">• News and media coverage</p>
              <p className="text-sm text-muted-foreground">• Industry reports</p>
              <p className="text-sm text-muted-foreground">• Competitor analysis</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}