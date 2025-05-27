import { Card } from '@/components/ui/card';
import { CompanyAnalytics } from '@/components/CompanyAnalytics';
import { getCompanies } from '@/lib/actions';

export default async function DashboardPage() {
  const { data: companies = [] } = await getCompanies();
  
  // Calculate key portfolio metrics
  const totalPortfolioValue = companies.reduce((sum, company) => sum + company.totalFunding, 0);
  const totalRevenue = companies.reduce((sum, company) => sum + company.currentRevenue, 0);
  const activeInvestments = companies.length;

  // Calculate stage distribution
  const stageDistribution = companies.reduce((acc, company) => {
    acc[company.stage] = (acc[company.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get top companies by current revenue
  const topRevenueCompanies = [...companies]
    .sort((a, b) => b.currentRevenue - a.currentRevenue)
    .slice(0, 3);

  // Get fastest growing companies
  const topGrowthCompanies = [...companies]
    .filter(company => company.revenueGrowth != null)
    .sort((a, b) => (b.revenueGrowth || 0) - (a.revenueGrowth || 0))
    .slice(0, 3);

  // Calculate market segment distribution
  const marketSegments = companies.reduce((acc, company) => {
    acc[company.marketSegment] = (acc[company.marketSegment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSegment = Object.entries(marketSegments)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio Overview</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
            <p className="text-2xl font-bold">
              ${(totalPortfolioValue / 1_000_000).toFixed(1)}M
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">
              ${(totalRevenue / 1_000_000).toFixed(1)}M
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Active Investments</p>
            <p className="text-2xl font-bold">{activeInvestments}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Top Segment</p>
            <p className="text-2xl font-bold">{topSegment}</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <h3 className="text-lg font-medium mb-4">Top Revenue Companies</h3>
          <div className="space-y-4">
            {topRevenueCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{company.name}</p>
                  <p className="text-sm text-muted-foreground">{company.marketSegment}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(company.currentRevenue / 1_000_000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-muted-foreground">{company.stage}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="col-span-3 p-6">
          <h3 className="text-lg font-medium mb-4">Fastest Growing</h3>
          <div className="space-y-4">
            {topGrowthCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{company.name}</p>
                  <p className="text-sm text-muted-foreground">{company.marketSegment}</p>
                </div>
                <p className={`font-medium ${
                  company.revenueGrowth && company.revenueGrowth > 0 
                    ? "text-green-500" 
                    : "text-red-500"
                }`}>
                  {company.revenueGrowth && company.revenueGrowth > 0 ? '+' : ''}
                  {company.revenueGrowth}%
                </p>
              </div>
            ))}
            {topGrowthCompanies.length === 0 && (
              <p className="text-sm text-muted-foreground">No growth data available</p>
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Stage Distribution</h3>
          <div className="space-y-4">
            {Object.entries(stageDistribution).map(([stage, count]) => (
              <div key={stage} className="flex items-center justify-between">
                <p className="font-medium">{stage}</p>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(count / activeInvestments) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{count}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Segment Distribution</h3>
          <div className="space-y-4">
            {Object.entries(marketSegments).map(([segment, count]) => (
              <div key={segment} className="flex items-center justify-between">
                <p className="font-medium">{segment}</p>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(count / activeInvestments) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{count}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
