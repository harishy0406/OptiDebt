export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface MonthlyPayment {
  month: number;
  debtId: string;
  debtName: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface StrategyResult {
  strategy: string;
  totalMonths: number;
  totalInterest: number;
  interestSaved: number;
  schedule: MonthlyPayment[];
}
