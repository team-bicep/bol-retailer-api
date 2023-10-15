import { EConditionName } from "..";

export type TCommissionQueries = {
  ean: string;
  condition: EConditionName;
  unitPrice: number;
}[];

export type TCommission = {
  ean: string;
  condition: EConditionName;
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
