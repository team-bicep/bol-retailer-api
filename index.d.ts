export default class Bol {
  constructor(APIKEY: string, SECRET: string);

  bolHeader(tries?: number): Promise<{ [key: string]: string }>;

  bolAccess(tries?: number): Promise<void>;

  // Commission

  commission(ean: string, tries?: number): Promise<TCommission>;

  commissionList(
    commissionQueries: TCommissionQueries,
    tries?: number
  ): Promise<TCommission[]>;

  // Insights

  offerInsights(tries?: number): Promise<TInsights>;

  performanceIndicators(tries?: number): Promise<TPerformanceIndicator[]>;

  salesForecast(tries?: number): Promise<TSalesForecast>;

  searchTerms(tries?: number): Promise<TSearchTerm>;

  // Inventory

  getInventory(tries?: number): Promise<TInventory[]>;

  // Invoices

  getInvoices(tries?: number): Promise<string>;

  getInvoiceById(invoiceId: string, tries?: number): Promise<string>;

  getInvoiceSpecificationById(
    invoiceId: string,
    tries?: number
  ): Promise<string>;

  // deprecated, Remove once v10 finished
  createOffer(offerData: TOfferData, tries?: number): Promise<void>;

  offerList(tries?: number): Promise<TOffer[]>;

  getOffer(order_id: string, tries?: number): Promise<TOffer>;

  pause(
    offer_id: string,
    hold: boolean,
    method: string,
    tries?: number
  ): Promise<void>;

  stock(
    offer_id: string,
    stock: number,
    managedByRetailer: boolean,
    tries?: number
  ): Promise<void>;

  delivery(offer_id: string, fulfilment: any, tries?: number): Promise<boolean>; // #REPLACE

  export(tries?: number): Promise<TExportOffer[]>; // #REPLACE

  orders(
    page: number,
    status: "OPEN" | "SHIPPED" | "ALL",
    tries?: number
  ): Promise<any[]>; // #REPLACE

  orderById(orderId: string, tries?: number): Promise<any[]>; // #REPLACE

  shipments(
    page: number,
    fulfilmentMethod: "FBR" | "FBB",
    tries?: number
  ): Promise<any[]>; // #REPLACE

  shipmentById(shipmentId: string, tries?: number): Promise<any[]>; // #REPLACE

  detail(order_id: string, tries?: number): Promise<any>; // #REPLACE

  price(offer_id: string, price: number, tries?: number): Promise<any>; // #REPLACE
}

// commission

type TCommissionQueries = {
  ean: string;
  condition: EConditionName;
  unitPrice: number;
}[];

type TCommission = {
  ean: string;
  condition: EConditionName;
  unitPrice: number;
  fixedAmount: number;
  percentage: number;
  totalCost: number;
  totalCostWithoutReduction?: number;
  reductions: TReduction;
};

type TReduction = {
  maximumPrice: number;
  costReduction: number;
  startDate: string;
  endDate: string;
}[];

// Insights

type TInsights = {
  name: string;
  type: string;
  total: number;
  countries: TCountry[];
  periods: TPeriod[];
};

type TPeriod = {
  period: {
    day: number;
    week: number;
    month: number;
    year: number;
  };
  total: number;
  countries: TCountry[];
};

type TPerformanceIndicator = {
  name: string;
  type: string;
  details: {
    period: {
      week: string;
      year: string;
    };
    score: {
      conforms: boolean;
      numerator: number;
      denominator: number;
      value: number;
      distanceToNorm: number;
    };
    norm: {
      condition: string;
      value: number;
    };
  };
};

type TCountryForecast = {
  countryCode: string;
  minimum: number;
  maximum: number;
};

type TPeriodForecast = {
  weeksAhead: number;
  total: {
    minimum: number;
    maximum: number;
  };
  countries: TCountryForecast[];
};

type TSalesForecast = {
  name: string;
  type: string;
  total: {
    minimum: number;
    maximum: number;
  };
  countries: TCountryForecast[];
  periods: TPeriodForecast[];
};

type TSearchTermCountry = {
  countryCode: string;
  value: number;
};

type TSearchTermPeriod = {
  period: {
    day: string;
    week: string;
    month: string;
    year: string;
  };
  total: number;
  countries: TSearchTermCountry[];
};

type TRelatedSearchTerm = {
  total: number;
  searchTerm: string;
};

type TSearchTerm = {
  searchTerm: string;
  type: string;
  total: number;
  countries: TSearchTermCountry[];
  periods: TSearchTermPeriod[];
  relatedSearchTerms: TRelatedSearchTerm[];
};

// Inventory

type TInventory = {
  ean: string;
  bsku: string;
  gradedStock: number;
  regularStock: number;
  title: string;
};

// Other

type TCountry = {
  countryCode: string;
  value: number;
};

// deprecated, Remove once v10 finished

enum EConditionName {
  AS_NEW = "AS_NEW",
  NEW = "NEW",
}

export type TOfferData = {
  ean: string;
  condition: {
    name: EConditionName;
    category?: string;
    comment?: string;
  };
  reference?: string;
  onHoldByRetailer?: boolean;
  unknownProductTitle?: string;
  pricing: {
    bundlePrices: Array<[number, number]>;
  };
  stock: {
    amount: number;
    managedByRetailer: boolean;
  };
  fulfilment: {
    method: string;
    deliveryCode?: string;
  };
};

type TCreateOfferResult = {
  processStatusId: string;
  entityId: string;
  eventType: string;
  description: string;
  status: string;
  errorMessage: string;
  createTimestamp: string;
  links: [{}];
};

type TOffer = {
  offerId: string;
  ean: string;
  reference: string;
  onHoldByRetailer: boolean;
  pricing: { bundlePrices: [{ quantity: boolean; unitPrice: number }] };
  stock: { amount: number; correctedStock: number; managedByRetailer: boolean };
  fulfilment: { method: string; deliveryCode: string };
  store: {
    productTitle: string;
    visible: [{ countryCode: string }];
  };
  condition: { name: string; category: string };
};

export type TExportOffer = {
  offerId: string;
  ean: string;
  conditionName: string;
  conditionCategory: string;
  conditionComment: string;
  bundlePricesPrice: string;
  fulfilmentDeliveryCode: string;
  stockAmount: string;
  onHoldByRetailer: string;
  fulfilmentType: string;
  mutationDateTime: string;
  referenceCode: string;
  correctedStock: string;
};
