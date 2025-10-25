import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StrategyResult } from "@/types/debt";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PrincipalInterestChartProps {
  result: StrategyResult;
}

export const PrincipalInterestChart = ({ result }: PrincipalInterestChartProps) => {
  // Aggregate principal and interest by month
  const monthlyData = Array.from({ length: result.totalMonths }, (_, i) => {
    const month = i + 1;
    const monthPayments = result.schedule.filter(s => s.month === month);
    
    return {
      month,
      principal: monthPayments.reduce((sum, p) => sum + p.principal, 0),
      interest: monthPayments.reduce((sum, p) => sum + p.interest, 0),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Principal vs Interest Breakdown</CardTitle>
        <CardDescription>
          Monthly payment allocation ({result.strategy})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              label={{ value: "Month", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis 
              label={{ value: "Amount (₹)", angle: -90, position: "insideLeft" }}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value: number) => `₹${value.toFixed(2)}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive))"
              fillOpacity={0.6}
              name="Interest"
            />
            <Area
              type="monotone"
              dataKey="principal"
              stackId="1"
              stroke="hsl(var(--accent))"
              fill="hsl(var(--accent))"
              fillOpacity={0.6}
              name="Principal"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
