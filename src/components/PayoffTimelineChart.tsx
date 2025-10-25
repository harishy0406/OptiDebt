import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StrategyResult } from "@/types/debt";

interface PayoffTimelineChartProps {
  result: StrategyResult;
}

export const PayoffTimelineChart = ({ result }: PayoffTimelineChartProps) => {
  // Calculate when each debt is paid off
  const debtPayoffData = Array.from(
    new Set(result.schedule.map(s => s.debtId))
  ).map(debtId => {
    const debtPayments = result.schedule.filter(s => s.debtId === debtId);
    const debtName = debtPayments[0]?.debtName || "";
    const firstMonth = Math.min(...debtPayments.map(p => p.month));
    const lastMonth = debtPayments.find(p => p.remainingBalance < 0.01)?.month || result.totalMonths;
    
    return {
      debtId,
      debtName,
      startMonth: firstMonth,
      endMonth: lastMonth,
      duration: lastMonth - firstMonth + 1,
    };
  });

  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payoff Timeline</CardTitle>
        <CardDescription>
          When each debt will be paid off ({result.strategy})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {debtPayoffData.map((debt, idx) => (
            <div key={debt.debtId} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{debt.debtName}</span>
                <span className="text-xs text-muted-foreground">
                  Month {debt.startMonth} - {debt.endMonth} ({debt.duration} months)
                </span>
              </div>
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute h-full rounded-full transition-all"
                  style={{
                    left: `${(debt.startMonth / result.totalMonths) * 100}%`,
                    width: `${(debt.duration / result.totalMonths) * 100}%`,
                    backgroundColor: colors[idx % colors.length],
                  }}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>Month 1</span>
            <span>Month {result.totalMonths}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
