export type TOfferData = {
  ean: string;
  condition: {
    name: EOffersConditionName;
    category?: string; // Applies to AS_NEW only
    comment?: string;
  };
  reference?: string;
  onHoldByRetailer?: boolean;
  unknownProductTitle?: string;
  pricing: {
    bundlePrices: TBundlePrice[];
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

type TBundlePrice = {
  quantity: number;
  unitPrice: number;
};

export type TUpdateOfferData = {
  reference?: string;
  onHoldByRetailer: boolean;
  unknownProductTitle?: string;
  fulfilment: {
    method: string;
    deliveryCode: string;
  };
};

export type TCreateOfferResult = {
  processStatusId: string;
  entityId: string;
  eventType: string;
  description: string;
  status: string;
  errorMessage: string;
  createTimestamp: string;
  links: {
    rel: string;
    href: string;
    method: string;
  }[];
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

export type TOfferPrices = {
  pricing: {
    bundlePrices: {
      quantity: number;
      unitPrice: number;
    }[];
  };
};

export type TOfferStocks = {
  amount: number;
  managedByRetailer: boolean;
};

export type TOffer = {
  offerId: string;
  ean: string;
  reference: string;
  onHoldByRetailer: boolean;
  pricing: { bundlePrices: [{ quantity: boolean; unitPrice: number }] };
  stock: { amount: number; correctedStock: number; managedByRetailer: boolean };
  fulfilment: { method: EOffersFulfilmentMethod; deliveryCode: EOffersDeliveryCode };
  store: {
    productTitle: string;
    visible: [{ countryCode: string }];
  };
  condition: {
    EOffersConditionName: string;
    category?: EOffersConditionCategory;
    comment?: string;
  };
  notPublishableReasons: [
    {
      code: string;
      description: string;
    }
  ];
};

export type EOffersConditionCategory = 'NEW' | 'SECONDHAND';

export type EOffersConditionName = 'NEW' | 'AS_NEW' | 'GOOD' | 'REASONABLE' | 'MODERATE';

export type EOffersFulfilmentMethod = 'FBR' | 'FBB';

export type EOffersDeliveryCode =
  | '24uurs-23'
  | '24uurs-22'
  | '24uurs-21'
  | '24uurs-20'
  | '24uurs-19'
  | '24uurs-18'
  | '24uurs-17'
  | '24uurs-16'
  | '24uurs-15'
  | '24uurs-14'
  | '24uurs-13'
  | '24uurs-12'
  | '1-2d'
  | '2-3d'
  | '3-5d'
  | '4-8d'
  | '1-8d'
  | 'MijnLeverbelofte'
  | 'VVB';
