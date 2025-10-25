import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-lg mb-2">OptiDebt</h3>
            <p className="text-sm text-muted-foreground">
              Optimize your debt repayment strategy and save money on interest.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-sm text-muted-foreground">
              This tool helps you visualize and compare different debt repayment strategies 
              to make informed financial decisions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Created By</h4>
            <p className="text-sm text-muted-foreground">
              [Your Name Here]
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              [Your Email or Website]
            </p>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OptiDebt. All rights reserved.</p>
          <p className="text-xs">
            Built with React, TypeScript, and Recharts
          </p>
        </div>
      </div>
    </footer>
  );
};
