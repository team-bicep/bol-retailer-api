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

export type TGetInventoryStock = 'SUFFICIENT' | 'INSUFFICIENT';

export type TGetInventoryState = 'REGULAR' | 'GRADED';
