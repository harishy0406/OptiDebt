import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StrategyResult } from "@/types/debt";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface InterestComparisonChartProps {
  results: StrategyResult[];
}

export const InterestComparisonChart = ({ results }: InterestComparisonChartProps) => {
  const data = results.map(result => ({
    strategy: result.strategy,
    totalInterest: result.totalInterest,
    months: result.totalMonths,
  }));

  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Comparison</CardTitle>
        <CardDescription>
          Total interest paid and payoff time for each strategy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="strategy" className="text-xs" />
            <YAxis 
              yAxisId="left"
              label={{ value: "Total Interest (₹)", angle: -90, position: "insideLeft" }}
              className="text-xs"
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              label={{ value: "Months", angle: 90, position: "insideRight" }}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value: number, name: string) => [
                name === "totalInterest" ? `₹${value.toFixed(2)}` : value,
                name === "totalInterest" ? "Total Interest" : "Payoff Months"
              ]}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="totalInterest" name="Total Interest" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="months" name="Payoff Months" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
