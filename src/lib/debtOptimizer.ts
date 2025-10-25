import { Debt, MonthlyPayment, StrategyResult } from "@/types/debt";

/**
 * Calculates monthly interest for a given balance and annual interest rate
 */
const calculateMonthlyInterest = (balance: number, annualRate: number): number => {
  return (balance * (annualRate / 100)) / 12;
};

/**
 * Simulates debt repayment using a priority-based strategy
 * @param debts - Array of debts to repay
 * @param monthlyBudget - Total monthly budget for debt repayment
 * @param priorityFn - Function to determine debt priority (higher = pay first)
 */
const simulateRepayment = (
  debts: Debt[],
  monthlyBudget: number,
  priorityFn: (debt: Debt) => number
): MonthlyPayment[] => {
  const schedule: MonthlyPayment[] = [];
  const activeDebts = debts.map(d => ({ ...d, remainingBalance: d.balance }));
  let month = 0;

  while (activeDebts.some(d => d.remainingBalance > 0.01)) {
    month++;
    
    // Sort by priority (descending)
    activeDebts.sort((a, b) => priorityFn(b) - priorityFn(a));
    
    let budgetRemaining = monthlyBudget;
    
    // First, pay all minimum payments
    for (const debt of activeDebts) {
      if (debt.remainingBalance > 0.01) {
        const minPayment = Math.min(debt.minimumPayment, debt.remainingBalance);
        const interest = calculateMonthlyInterest(debt.remainingBalance, debt.interestRate);
        const principal = Math.min(minPayment - interest, debt.remainingBalance);
        
        debt.remainingBalance = Math.max(0, debt.remainingBalance - principal);
        budgetRemaining -= minPayment;
        
        schedule.push({
          month,
          debtId: debt.id,
          debtName: debt.name,
          payment: minPayment,
          principal,
          interest,
          remainingBalance: debt.remainingBalance,
        });
      }
    }
    
    // Allocate remaining budget to highest priority debt
    if (budgetRemaining > 0.01) {
      for (const debt of activeDebts) {
        if (debt.remainingBalance > 0.01 && budgetRemaining > 0.01) {
          const extraPayment = Math.min(budgetRemaining, debt.remainingBalance);
          const interest = calculateMonthlyInterest(debt.remainingBalance, debt.interestRate);
          const principal = Math.min(extraPayment, debt.remainingBalance);
          
          debt.remainingBalance = Math.max(0, debt.remainingBalance - principal);
          budgetRemaining -= extraPayment;
          
          // Find the existing payment for this month and debt to update it
          const existingPayment = schedule.find(
            p => p.month === month && p.debtId === debt.id
          );
          if (existingPayment) {
            existingPayment.payment += extraPayment;
            existingPayment.principal += principal;
            existingPayment.remainingBalance = debt.remainingBalance;
          }
          
          break; // Only allocate extra to one debt per month
        }
      }
    }
    
    // Safety check to prevent infinite loops
    if (month > 600) break;
  }
  
  return schedule;
};

/**
 * Snowball Method: Pay off smallest balance first
 */
export const calculateSnowball = (debts: Debt[], monthlyBudget: number): StrategyResult => {
  const schedule = simulateRepayment(
    debts,
    monthlyBudget,
    (debt) => -debt.balance // Negative because we want smallest first
  );
  
  return {
    strategy: "Snowball",
    totalMonths: Math.max(...schedule.map(s => s.month), 0),
    totalInterest: schedule.reduce((sum, s) => sum + s.interest, 0),
    interestSaved: 0, // Will be calculated later
    schedule,
  };
};

/**
 * Avalanche Method: Pay off highest interest rate first
 */
export const calculateAvalanche = (debts: Debt[], monthlyBudget: number): StrategyResult => {
  const schedule = simulateRepayment(
    debts,
    monthlyBudget,
    (debt) => debt.interestRate
  );
  
  return {
    strategy: "Avalanche",
    totalMonths: Math.max(...schedule.map(s => s.month), 0),
    totalInterest: schedule.reduce((sum, s) => sum + s.interest, 0),
    interestSaved: 0,
    schedule,
  };
};

/**
 * Optimized Method: Greedy algorithm that maximizes interest reduction
 * This approximates LP optimization by dynamically choosing the debt that
 * would result in the most interest savings in the long run
 */
export const calculateOptimized = (debts: Debt[], monthlyBudget: number): StrategyResult => {
  const schedule = simulateRepayment(
    debts,
    monthlyBudget,
    (debt) => {
      // Priority score combines interest rate and balance for optimal payoff
      // Higher interest rates and lower balances get priority
      return debt.interestRate * (1 + 1 / Math.max(debt.balance, 1));
    }
  );
  
  return {
    strategy: "Optimized",
    totalMonths: Math.max(...schedule.map(s => s.month), 0),
    totalInterest: schedule.reduce((sum, s) => sum + s.interest, 0),
    interestSaved: 0,
    schedule,
  };
};

/**
 * Baseline: Minimum payments only (for comparison)
 */
export const calculateBaseline = (debts: Debt[]): StrategyResult => {
  const schedule: MonthlyPayment[] = [];
  const activeDebts = debts.map(d => ({ ...d, remainingBalance: d.balance }));
  let month = 0;
  
  while (activeDebts.some(d => d.remainingBalance > 0.01)) {
    month++;
    
    for (const debt of activeDebts) {
      if (debt.remainingBalance > 0.01) {
        const interest = calculateMonthlyInterest(debt.remainingBalance, debt.interestRate);
        const payment = Math.min(debt.minimumPayment, debt.remainingBalance + interest);
        const principal = Math.max(0, payment - interest);
        
        debt.remainingBalance = Math.max(0, debt.remainingBalance - principal);
        
        schedule.push({
          month,
          debtId: debt.id,
          debtName: debt.name,
          payment,
          principal,
          interest,
          remainingBalance: debt.remainingBalance,
        });
      }
    }
    
    if (month > 600) break;
  }
  
  return {
    strategy: "Baseline",
    totalMonths: Math.max(...schedule.map(s => s.month), 0),
    totalInterest: schedule.reduce((sum, s) => sum + s.interest, 0),
    interestSaved: 0,
    schedule,
  };
};

/**
 * Export schedule to CSV format
 */
export const exportToCSV = (result: StrategyResult): string => {
  const headers = ["Month", "Debt", "Payment", "Principal", "Interest", "Remaining Balance"];
  const rows = result.schedule.map(s => [
    s.month,
    s.debtName,
    s.payment.toFixed(2),
    s.principal.toFixed(2),
    s.interest.toFixed(2),
    s.remainingBalance.toFixed(2),
  ]);
  
  return [
    headers.join(","),
    ...rows.map(row => row.join(",")),
  ].join("\n");
};
