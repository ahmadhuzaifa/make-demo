'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

export function AIQueryInterface() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual API call to OpenAI and SERP
      // This is where we'll integrate the AI and external data sources
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse(
        "Based on the company's current trajectory and market conditions, here's my analysis:\n\n" +
        "• Strong revenue growth at 45% YoY\n" +
        "• Positive market sentiment\n" +
        "• Expanding market opportunity\n\n" +
        "Recommendation: Consider increasing investment position."
      );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Ask about a company (e.g., 'Should we invest more in Company X?' or 'What's the growth potential for Company Y?')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={isLoading || !query.trim()}>
          {isLoading ? 'Analyzing...' : 'Get Analysis'}
        </Button>
      </form>

      {response && (
        <Card className="p-4 mt-4 bg-primary/5">
          <h3 className="font-semibold mb-2">Analysis Results:</h3>
          <div className="whitespace-pre-wrap">{response}</div>
        </Card>
      )}

      <div className="text-sm text-muted-foreground mt-4">
        <p>Example questions you can ask:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Should we invest more in [Company Name]?</li>
          <li>What's the market saying about [Company Name]?</li>
          <li>Compare the growth potential of [Company A] and [Company B]</li>
          <li>What are the key risks for [Company Name]?</li>
        </ul>
      </div>
    </div>
  );
}