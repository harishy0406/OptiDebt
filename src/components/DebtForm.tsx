import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Debt } from "@/types/debt";
import { Trash2, Plus } from "lucide-react";

interface DebtFormProps {
  debts: Debt[];
  setDebts: (debts: Debt[]) => void;
  monthlyBudget: number;
  setMonthlyBudget: (budget: number) => void;
}

export const DebtForm = ({ debts, setDebts, monthlyBudget, setMonthlyBudget }: DebtFormProps) => {
  const [newDebt, setNewDebt] = useState<Omit<Debt, "id">>({
    name: "",
    balance: 0,
    interestRate: 0,
    minimumPayment: 0,
  });

  const addDebt = () => {
    if (newDebt.name && newDebt.balance > 0) {
      setDebts([
        ...debts,
        {
          ...newDebt,
          id: Date.now().toString(),
        },
      ]);
      setNewDebt({
        name: "",
        balance: 0,
        interestRate: 0,
        minimumPayment: 0,
      });
    }
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const totalMinimum = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Information</CardTitle>
        <CardDescription>
          Enter your debts and monthly repayment budget
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Budget */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Monthly Repayment Budget (₹)</label>
          <Input
            type="number"
            value={monthlyBudget || ""}
            onChange={(e) => setMonthlyBudget(Number(e.target.value))}
            placeholder="e.g., 1000"
          />
          {totalMinimum > 0 && (
            <p className="text-xs text-muted-foreground">
              Total minimum payments: ₹{totalMinimum.toFixed(2)}
              {monthlyBudget < totalMinimum && (
                <span className="text-destructive ml-1">
                  (Budget must be at least ₹{totalMinimum.toFixed(2)})
                </span>
              )}
            </p>
          )}
        </div>

        {/* Existing Debts */}
{debts.length > 0 && (
  <div className="space-y-2">
    <h3 className="text-sm font-medium">Current Debts</h3>
    <div className="space-y-2">
      {debts.map((debt) => (
        <div
          key={debt.id}
          className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
        >
          <div className="flex-1">
            <p className="font-medium">{debt.name}</p>
            <p className="text-sm text-muted-foreground">
              ₹{debt.balance.toFixed(2)} @ {debt.interestRate}% APR | 
              Min: ₹{debt.minimumPayment.toFixed(2)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeDebt(debt.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>

    {/* 🧮 Total Debt Summary */}
    <div className="flex items-center justify-between mt-3 p-3 border-t">
      <p className="text-sm font-medium text-muted-foreground">Total Debt:</p>
      <p className="text-base font-semibold">
        ₹
        {debts
          .reduce((total, debt) => total + debt.balance, 0)
          .toFixed(2)}
      </p>
    </div>
  </div>
)}


        {/* Add New Debt */}
        <div className="space-y-3 pt-4 border-t">
          <h3 className="text-sm font-medium">Add New Debt</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Debt Name"
              value={newDebt.name}
              onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Balance"
              value={newDebt.balance || ""}
              onChange={(e) => setNewDebt({ ...newDebt, balance: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Interest Rate (%)"
              value={newDebt.interestRate || ""}
              onChange={(e) => setNewDebt({ ...newDebt, interestRate: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Minimum Payment"
              value={newDebt.minimumPayment || ""}
              onChange={(e) => setNewDebt({ ...newDebt, minimumPayment: Number(e.target.value) })}
            />
          </div>
          <Button onClick={addDebt} className="w-full" disabled={!newDebt.name || newDebt.balance <= 0}>
            <Plus className="h-4 w-4 mr-2" />
            Add Debt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
