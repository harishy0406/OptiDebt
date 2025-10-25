import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Zap, Target } from "lucide-react";

interface StrategySelectorProps {
  onCalculate: (strategy: "snowball" | "avalanche" | "optimized") => void;
  disabled: boolean;
}

export const StrategySelector = ({ onCalculate, disabled }: StrategySelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repayment Strategies</CardTitle>
        <CardDescription>
          Choose a strategy to optimize your debt repayment
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <Button
          variant="outline"
          className="h-auto flex-col items-start p-4 space-y-2"
          onClick={() => onCalculate("snowball")}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 w-full">
            <TrendingDown className="h-5 w-5 text-primary" />
            <span className="font-semibold">Snowball</span>
          </div>
          <p className="text-xs text-muted-foreground text-left">
            Pay smallest balance first for 
          </p>
          <p className="text-xs text-muted-foreground text-left">psychological wins💸
          </p>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col items-start p-4 space-y-2"
          onClick={() => onCalculate("avalanche")}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 w-full">
            <Zap className="h-5 w-5 text-accent" />
            <span className="font-semibold">Avalanche</span>
          </div>
          <p className="text-xs text-muted-foreground text-left">
            Pay highest interest first to 
          </p>
          <p className="text-xs text-muted-foreground text-left">
            save the most money💰
          </p>
        </Button>

        <Button
          variant="outline"
          className="h-auto flex-col items-start p-4 space-y-2"
          onClick={() => onCalculate("optimized")}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 w-full">
            <Target className="h-5 w-5 text-chart-3" />
            <span className="font-semibold">Optimized</span>
          </div>
          <p className="text-xs text-muted-foreground text-left">
            Smart algorithm balancing 
          </p>
          <p className="text-xs text-muted-foreground text-left">
            interest and balance🤑
          </p>
        </Button>
      </CardContent>
    </Card>
  );
};
