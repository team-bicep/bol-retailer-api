export type TCommissionQueries = {
  ean: string;
  condition: ECommissionConditionName;
  unitPrice: number;
}[];

export type TCommission = {
  ean: string;
  condition: ECommissionConditionName;
  unitPrice: number;
  fixedAmount: number;
  percentage: number;
  totalCost: number;
  totalCostWithoutReduction?: number;
  reductions: TReduction;
};

export type TReduction = {
  maximumPrice: number;
  costReduction: number;
  startDate: string;
  endDate: string;
}[];

export type ECommissionConditionName = 'AS_NEW' | 'NEW' | 'GOOD' | 'REASONABLE' | 'MODERATE';
