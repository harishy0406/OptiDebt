import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StrategyResult } from "@/types/debt";
import { Download } from "lucide-react";
import { exportToCSV } from "@/lib/debtOptimizer";
interface ResultsDisplayProps {
  results: StrategyResult[];
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const downloadCSV = (result: StrategyResult) => {
    const csv = exportToCSV(result);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.strategy}-repayment-schedule.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (results.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Results Summary</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {results.map((result) => (
          <Card key={result.strategy}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {result.strategy}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => downloadCSV(result)}
                  title="Download CSV"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Strategy Metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Months</p>
                <p className="text-2xl font-bold">{result.totalMonths}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                <p className="text-xl font-semibold text-destructive">
                  ₹{result.totalInterest.toFixed(2)}
                </p>
              </div>
              {result.interestSaved > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Interest Saved</p>
                  <p className="text-xl font-semibold text-accent">
                    ₹{result.interestSaved.toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
