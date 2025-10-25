import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StrategyResult } from "@/types/debt";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DebtAmortizationChartProps {
  result: StrategyResult;
}

export const DebtAmortizationChart = ({ result }: DebtAmortizationChartProps) => {
  // Group by month and debt to create balance over time data
  const debtNames = Array.from(new Set(result.schedule.map(s => s.debtName)));
  const monthlyData = Array.from({ length: result.totalMonths }, (_, i) => {
    const month = i + 1;
    const monthData: any = { month };
    
    debtNames.forEach(debtName => {
      const payment = result.schedule.find(s => s.month === month && s.debtName === debtName);
      monthData[debtName] = payment ? payment.remainingBalance : 0;
    });
    
    return monthData;
  });

  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Amortization Over Time</CardTitle>
        <CardDescription>
          Remaining balance for each debt by month ({result.strategy})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              label={{ value: "Month", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis 
              label={{ value: "Balance (₹)", angle: -90, position: "insideLeft" }}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            {debtNames.map((debtName, idx) => (
              <Line
                key={debtName}
                type="monotone"
                dataKey={debtName}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
