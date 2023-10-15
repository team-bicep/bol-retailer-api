import {
  TCommission,
  TCommissionQueries,
  TReduction,
} from "./types/commissions";
import {
  TInsights,
  TPerformanceIndicator,
  TSalesForecast,
  TSearchTerm,
} from "./types/insights";
import { TInventory } from "./types/inventory";

export default class Bol {
  constructor(APIKEY: string, SECRET: string);

  bolHeader(tries?: number): Promise<{ [key: string]: string }>;

  bolAccess(tries?: number): Promise<void>;

  /**
   * Get all commissions and reductions by EAN per single EAN
   * @description Commissions can be filtered by condition, which defaults to NEW. We will calculate the commission amount from the EAN and price
   * @param {string} ean - product EAN
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const commissions = await bol.commissionList('0000007740404');
   */
  commission(ean: string, tries?: number): Promise<TCommission>;

  /**
   * Get all commissions and reductions by EAN in bulk
   * @description Gets all commissions and possible reductions by EAN, price, and optionally condition.
   * @param {Object} commissionQueries - Array of objects
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const commissionQueries = [
        {
          "ean": "0000007740404",
          "condition": "NEW",
          "unitPrice": 59
        }
      ]
   * const commissions = await bol.commissionList(commissionQueries);
   */
  commissionList(
    commissionQueries: TCommissionQueries,
    tries?: number
  ): Promise<TCommission[]>;

  // Insights

  /**
   * Get offer insights
   * @description Get the product visits and the buy box percentage for an offer during a given period.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight();
   */
  offerInsights(tries?: number): Promise<TInsights>;

  /**
   * Get performance indicators
   * @description Gets the measurements for your performance indicators per week.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight();
   */
  performanceIndicators(tries?: number): Promise<TPerformanceIndicator[]>;

  /**
   * Get performance indicators
   * @description Gets the measurements for your performance indicators per week.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight();
   */
  salesForecast(tries?: number): Promise<TSalesForecast>;

  /**
   * Get search terms
   * @description Retrieves the search volume for a specified search term and period.
   * The search volume allows you to see what bol.com customers are searching for.
   * Based on the search volume per search term you can optimize your product content,
   * or spot opportunities to extend your assortment, or analyzing trends for inventory management.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight();
   */
  searchTerms(tries?: number): Promise<TSearchTerm>;

  // Inventory

  /**
   * Get search terms
   * @description The inventory endpoint is a specific LVB/FBB endpoint.
   * It provides a paginated list containing your fulfilment by bol.com inventory.
   * This endpoint does not provide information about your own stock.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight();
   */
  getInventory(tries?: number): Promise<TInventory[]>;

  // Invoices

  /**
   * Get all invoices
   * @description Gets a list of invoices, by default from the past 4 weeks.
   * The optional period-start-date and period-end-date-date parameters can be
   * used together to retrieve invoices from a specific date range in the past,
   * the period can be no longer than 31 days. Invoices and their specifications
   * can be downloaded separately in different media formats with the
   * ‘GET an invoice by id’ and the ‘GET an invoice specification by id’ calls.
   * The available media types differ per invoice and are listed per invoice
   * within the response. Note: the media types listed in the response must be
   * given in our standard API format.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.getInvoices();
   */
  getInvoices(tries?: number): Promise<string>;

  /**
   * Get an invoice by invoice id
   * @description Gets an invoice by invoice id.
   * The available media types differ per invoice and are listed within the response from the
   * ‘GET all invoices’ call. Note: the media types listed in the response must
   * be given in our standard API format.
   * @param {string} [invoiceId] - The ID of the invoice
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.getInvoices();
   */
  getInvoiceById(invoiceId: string, tries?: number): Promise<string>;

  /**
   * Get an invoice specification by invoice id
   * @description Gets an invoice specification for an invoice
   * with a paginated list of its transactions. The available
   * media types differ per invoice specification and are
   * listed within the response from the ‘GET all invoices’ call.
   * Note, the media types listed in the response must be given in our standard API format.
   * @param {string} [invoiceId] - The ID of the invoice
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.getInvoices();
   */
  getInvoiceSpecificationById(
    invoiceId: string,
    tries?: number
  ): Promise<string>;

  // Offers

  /**
   *Create a new offer
   * @description Creates a new offer, and adds it to the catalog. After creation,
   * status information can be retrieved to review if the offer is valid and published to the shop.
   * @param {TBolOffer} [offer] - The ID of the invoice
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.createNewOffer();
   */
  createOffer(
    offerData: TOfferData,
    tries?: number
  ): Promise<TCreateOfferResult>;

  /**
   * Export offers from the Bol platform.
   * @param {number} [tries=3] - The number of attempts to export the offers.
   * @returns {Promise<Array<Object>>} - A promise that resolves with an array of exported offers.
   */
  exportOffers(tries?: number): Promise<TExportOffer[]>; // #REPLACE

  /**
   * Retrieve an unpublished offer report by report id
   * @description Retrieve an unpublished offer report containing all unpublished offers and reasons.
   * @param {string} [reportId] - Unique identifier for unpublished offer report.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  retrieveUnpublishedOfferReportById(
    reportId: string,
    tries?: number
  ): Promise<string>;

  /**
   * Retrieve an offer by its offer id
   * @description Retrieve an offer by using the offer id provided to you when creating or listing your offers.
   * @param {string} [offerId] - Unique identifier for offer.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  retrieveOfferByOfferId(offerId: string, tries?: number): Promise<TOffer>;

  /**
   * Update an offer
   * @description Update an offer by using the offer id provided to you when creating or listing your offers.
   * @param {string} [offerId] - Unique identifier for offer.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  updateOffer(
    offerId: string,
    offerData: TUpdateOfferData,
    tries?: number
  ): Promise<TCreateOfferResult>;

  /**
   * Delete offer by id
   * @description Delete an offer by id.
   * @param {string} [offerId] - Unique identifier for offer.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  deleteOffer(offerId: string, tries?: number): Promise<void>;

  /**
   * Update price(s) for offer by id
   * @description Update price(s) for offer by id.
   * @param {string} [offerId] - Unique identifier for offer.
   * @param {number} [offerPrice] - The new price of the offer.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  updateOfferPrice(
    offerId: string,
    offerPrice: TOfferPrices,
    tries?: number
  ): Promise<void>;

  /**
   * Update stock for offer by id
   * @description Update stock for offer by id.
   * @param {string} [offerId] - Unique identifier for offer.
   * @param {number} [offerStock] - The new stock of the offer.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  updateOfferStock(
    offerId: string,
    offerStock: TOfferStocks,
    tries?: number
  ): Promise<void>;

  // deprecated, Remove once v10 finished
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

// Other

type TCountry = {
  countryCode: string;
  value: number;
};

export enum EConditionName {
  AS_NEW = "AS_NEW",
  NEW = "NEW",
}

export type TOfferData = {
  ean: string;
  condition: {
    name: EConditionName;
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

// offers

type TUpdateOfferData = {
  reference?: string;
  onHoldByRetailer: boolean;
  unknownProductTitle?: string;
  fulfilment: {
    method: string;
    deliveryCode: string;
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
  links: {
    rel: string;
    href: string;
    method: string;
  }[];
};

type TOfferPrices = {
  pricing: {
    bundlePrices: {
      quantity: number;
      unitPrice: number;
    }[];
  };
};

type TOfferStocks = {
  amount: number;
  managedByRetailer: boolean;
};
// deprecated, Remove once v10 finished

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
