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

export enum ECommissionConditionName {
  AS_NEW = 'AS_NEW',
  NEW = 'NEW',
  GOOD = 'GOOD',
  REASONABLE = 'REASONABLE',
  MODERATE = 'MODERATE',
}
