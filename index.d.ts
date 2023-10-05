export default class Bol {
  constructor(APIKEY: string, SECRET: string);

  bolHeader(tries?: number): Promise<{ [key: string]: string }>;

  bolAccess(tries?: number): Promise<void>;

  createOffer(offerData: TOfferData, tries?: number): Promise<void>;

  offerList(tries?: number): Promise<TOffer[]>;

  getOffer(order_id: string, tries?: number): Promise<TOffer>;

  pause(offer_id: string, hold: boolean, method: string, tries?: number): Promise<void>;

  stock(offer_id: string, stock: number, managedByRetailer: boolean, tries?: number): Promise<void>;

  delivery(offer_id: string, fulfilment: any, tries?: number): Promise<boolean>; // #REPLACE

  export(tries?: number): Promise<TExportOffer[]>; // #REPLACE

  orders(page: number, status: 'OPEN' | 'SHIPPED' | 'ALL', tries?: number): Promise<any[]>; // #REPLACE

  orderById(orderId: string, tries?: number): Promise<any[]>; // #REPLACE

  shipments(page: number, fulfilmentMethod: 'FBR' | 'FBB', tries?: number): Promise<any[]>; // #REPLACE

  shipmentById(shipmentId: string, tries?: number): Promise<any[]>; // #REPLACE

  detail(order_id: string, tries?: number): Promise<any>; // #REPLACE

  price(offer_id: string, price: number, tries?: number): Promise<any>; // #REPLACE
}

enum EConditionName {
  AS_NEW = 'AS_NEW',
  NEW = 'NEW',
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

type TcreateOfferResult = {
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
