export type TInventory = {
  ean: string;
  bsku: string;
  gradedStock: number;
  regularStock: number;
  title: string;
};

export type TGetInventoryQueryParams = {
  page?: number;
  quantity?: string;
  stock: TGetInventoryStock;
  state: TGetInventoryState;
  query: string;
};

export enum TGetInventoryStock {
  SUFFICIENT = 'SUFFICIENT',
  INSUFFICIENT = 'INSUFFICIENT',
}

export enum TGetInventoryState {
  REGULAR = 'REGULAR',
  GRADED = 'GRADED',
}
