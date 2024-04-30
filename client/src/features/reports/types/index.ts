export interface Reports {
   date_from: string;
   date_to: string;
   total_sales: number;
   total_capital: number;
   total_expenses: number;
   total_profit: number;
   total_collectibles: number;
   new_customers: number;
   returning_customers: number;
}

export interface ReportAnalytics {
   Month: string;
   date_from: string;
   date_to: string;
   gross_income: number;
   capital: number;
   expenses: number;
   net_profit: number;
}
