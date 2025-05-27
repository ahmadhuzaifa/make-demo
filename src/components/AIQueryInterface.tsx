'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { saveAIAnalysis } from '@/lib/actions';

export function AIQueryInterface({ companyName }: { companyName: string }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Simulated AI response for now
      const simulatedResponse = `Analysis for ${companyName}:\n\n` +
        "Based on the available data, here are the key insights:\n\n" +
        "1. Market Position: Strong presence in target market\n" +
        "2. Growth Trajectory: Positive trend with 25% YoY growth\n" +
        "3. Risk Assessment: Moderate risk profile\n" +
        "4. Competitive Advantage: Unique technology stack\n\n" +
        "Recommendation: Consider increasing investment based on performance metrics.";

      setResponse(simulatedResponse);

      // Save the analysis
      await saveAIAnalysis({
        query,
        response: simulatedResponse,
        companyName,
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'AI Analysis Tool'
        }
      });
    } catch (error) {
      console.error('Error performing AI analysis:', error);
      setResponse('Failed to perform analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">AI Analysis Tool</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Ask about {companyName}&apos;s performance, market position, or potential</label>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question..."
            className="mt-2"
          />
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? "Analyzing..." : "Get Insights"}
        </Button>
        {response && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Analysis Results:</h4>
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">
              {response}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}