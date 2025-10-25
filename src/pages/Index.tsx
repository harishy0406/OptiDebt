import { useState } from "react";
import { Debt, StrategyResult } from "@/types/debt";
import { DebtForm } from "@/components/DebtForm";
import { StrategySelector } from "@/components/StrategySelector";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { DebtAmortizationChart } from "@/components/DebtAmortizationChart";
import { PrincipalInterestChart } from "@/components/PrincipalInterestChart";
import { PayoffTimelineChart } from "@/components/PayoffTimelineChart";
import { InterestComparisonChart } from "@/components/InterestComparisonChart";
import { Footer } from "@/components/Footer";
import { calculateSnowball, calculateAvalanche, calculateOptimized, calculateBaseline } from "@/lib/debtOptimizer";
import { useToast } from "@/hooks/use-toast";
import { Calculator } from "lucide-react";

const Index = () => {
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: "1",
      name: "Personal Loan 1 SBI",
      balance: 500000,
      interestRate: 8.5,
      minimumPayment: 15000,
    },
    {
      id: "2",
      name: "Personal Loan 2 HDFC",
      balance: 300000,
      interestRate: 12.0,
      minimumPayment: 9000,
    },
    {
      id: "3",
      name: "Car Loan",
      balance: 80000,
      interestRate: 10.0,
      minimumPayment: 2500,
    },
  ]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>();
  const [results, setResults] = useState<StrategyResult[]>([]);
  const { toast } = useToast();

  const handleCalculate = (strategy: "snowball" | "avalanche" | "optimized") => {
    if (debts.length === 0) {
      toast({
        title: "No debts added",
        description: "Please add at least one debt to calculate repayment strategies.",
        variant: "destructive",
      });
      return;
    }

    const totalMinimum = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
    if (monthlyBudget < totalMinimum) {
      toast({
        title: "Insufficient budget",
        description: `Your monthly budget must be at least $${totalMinimum.toFixed(2)} to cover minimum payments.`,
        variant: "destructive",
      });
      return;
    }

    const baseline = calculateBaseline(debts);
    let result: StrategyResult;

    switch (strategy) {
      case "snowball":
        result = calculateSnowball(debts, monthlyBudget);
        break;
      case "avalanche":
        result = calculateAvalanche(debts, monthlyBudget);
        break;
      case "optimized":
        result = calculateOptimized(debts, monthlyBudget);
        break;
    }

    result.interestSaved = baseline.totalInterest - result.totalInterest;
    setResults([result]);

    toast({
      title: "Calculation complete",
      description: `${result.strategy} strategy will take ${result.totalMonths} months and save ₹${result.interestSaved.toFixed(2)} in interest.`,
    });
  };

  const handleCalculateAll = () => {
    if (debts.length === 0) {
      toast({
        title: "No debts added",
        description: "Please add at least one debt to calculate repayment strategies.",
        variant: "destructive",
      });
      return;
    }

    const totalMinimum = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
    if (monthlyBudget < totalMinimum) {
      toast({
        title: "Insufficient budget",
        description: `Your monthly budget must be at least $${totalMinimum.toFixed(2)} to cover minimum payments.`,
        variant: "destructive",
      });
      return;
    }

    const baseline = calculateBaseline(debts);
    const snowball = calculateSnowball(debts, monthlyBudget);
    const avalanche = calculateAvalanche(debts, monthlyBudget);
    const optimized = calculateOptimized(debts, monthlyBudget);

    snowball.interestSaved = baseline.totalInterest - snowball.totalInterest;
    avalanche.interestSaved = baseline.totalInterest - avalanche.totalInterest;
    optimized.interestSaved = baseline.totalInterest - optimized.totalInterest;

    setResults([snowball, avalanche, optimized]);

    toast({
      title: "All strategies calculated",
      description: "Compare the results below to find your optimal repayment strategy.",
    });
  };

  const totalMinimum = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const canCalculate = debts.length > 0 && monthlyBudget >= totalMinimum;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">OptiDebt</h1>
              <p className="text-sm text-muted-foreground">
                Debt Repayment Optimizer
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Input Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DebtForm
            debts={debts}
            setDebts={setDebts}
            monthlyBudget={monthlyBudget}
            setMonthlyBudget={setMonthlyBudget}
          />
          <StrategySelector
            onCalculate={handleCalculate}
            disabled={!canCalculate}
          />
        </div>

        {/* Calculate All Button */}
        {canCalculate && (
          <div className="flex justify-center">
            <button
              onClick={handleCalculateAll}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Compare All Strategies
            </button>
          </div>
        )}

        {/* Results Section */}
        {results.length > 0 && (
          <>
            <ResultsDisplay results={results} />

            {/* Visualizations */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Detailed Analysis</h2>
              
              {results.length === 1 ? (
                <>
                  <DebtAmortizationChart result={results[0]} />
                  <PrincipalInterestChart result={results[0]} />
                  <PayoffTimelineChart result={results[0]} />
                </>
              ) : (
                <>
                  <InterestComparisonChart results={results} />
                  <div className="grid gap-6 lg:grid-cols-2">
                    {results.map(result => (
                      <PayoffTimelineChart key={result.strategy} result={result} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Info Section */}
        {results.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <Calculator className="h-16 w-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-semibold text-muted-foreground">
              Ready to Optimize Your Debt?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Add your debts above, set your monthly budget, and choose a strategy to see
              how much you can save and how quickly you can become debt-free.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
