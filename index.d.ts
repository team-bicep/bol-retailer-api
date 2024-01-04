import { TCommission, TCommissionQueries } from './types/commissions';
import {
  TInsights,
  TOfferInsightQueryParams,
  TPerformanceIndicator,
  TPerformanceIndicatorQueryParams,
  TSalesForecast,
  TSalesForecastQueryParams,
  TSearchTerm,
  TSearchTermsQueryParams,
} from './types/insights';
import { TGetInventoryQueryParams, TInventory } from './types/inventory';
import { TGetInvoicesQueryParams } from './types/invoices';
import {
  TCreateOfferResult,
  TExportOffer,
  TOffer,
  TOfferData,
  TOfferPrices,
  TOfferStocks,
  TUpdateOfferData,
} from './types/offers';
import { IBolOrderData, IQueryParams } from './types/orders';
import { IBolShipmentDetails } from './types/shipment';

export default class Bol {
  constructor(APIKEY: string, SECRET: string, bol_token?: string, expires_in?: number);

  bolHeader(tries?: number): Promise<{ [key: string]: string }>;

  bolAccess(tries?: number): Promise<void>;

  //////////////////////////////////////////////////
  // ---              Commissions             --- //
  //////////////////////////////////////////////////

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
  commissionList(commissionQueries: TCommissionQueries, tries?: number): Promise<TCommission[]>;

  //////////////////////////////////////////////////
  // ---               Insights               --- //
  //////////////////////////////////////////////////

  /**
   * Get offer insights
   * @description Get the product visits and the buy box percentage for an offer during a given period.
   * @param {Object} queryParams - The query parameters.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsights({
   *  offerId: '1234567',
   *  period: 'lastWeek',
   *  numberOfPeriods: 1,
   *  name : 'BUY_BOX_PERCENTAGE'
   * });
   */
  offerInsights(queryParams: TOfferInsightQueryParams, tries?: number): Promise<TInsights>;

  /**
   * Get performance indicators
   * @description Gets the measurements for your performance indicators per week.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight({
   *  name: 'REVIEWS',
   *  year: 2020,
   *  week: 1
   * });
   */
  performanceIndicators(
    queryParams: TPerformanceIndicatorQueryParams,
    tries?: number
  ): Promise<TPerformanceIndicator[]>;

  /**
   * Get performance indicators
   * @description Gets the measurements for your performance indicators per week.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight({
   *  offerId: '123456',
   *  weeksAhead: 1,
   * });
   */
  salesForecast(queryParams: TSalesForecastQueryParams, tries?: number): Promise<TSalesForecast>;

  /**
   * Get search terms
   * @description Retrieves the search volume for a specified search term and period.
   * The search volume allows you to see what bol.com customers are searching for.
   * Based on the search volume per search term you can optimize your product content,
   * or spot opportunities to extend your assortment, or analyzing trends for inventory management.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.offerInsight({
   *  searchTerm: 'Iphone',
   *  period: 'DAY',
   *  numberOfPeriods: 12,
   *  relatedSearchTerms: true,
   * });
   */
  searchTerms(queryParams: TSearchTermsQueryParams, tries?: number): Promise<TSearchTerm>;

  //////////////////////////////////////////////////
  // ---              Inventory               --- //
  //////////////////////////////////////////////////

  /**
   * Get search terms
   * @description The inventory endpoint is a specific LVB/FBB endpoint.
   * It provides a paginated list containing your fulfilment by bol.com inventory.
   * This endpoint does not provide information about your own stock.
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const insight = await bol.getInventory();
   */
  getLVBInventory(queryParams: TGetInventoryQueryParams, tries?: number): Promise<TInventory[]>;

  //////////////////////////////////////////////////
  // ---               Invoices               --- //
  //////////////////////////////////////////////////

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
   * @param {Object} [queryParams] - The query parameters
   * @param {number} [tries=3] - The number of attempts to fetch the commissions.
   * @returns {Promise<Object>} - A promise that resolves with the commission list.
   * @example
   * const invoices = await bol.getInvoices({
   *   periodStartDate: '2020-01-01',
   *   periodEndDate: '2020-01-31',
   * });
   */
  getInvoices(queryParams: TGetInvoicesQueryParams, tries?: number): Promise<string>;

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
   * const invoice = await bol.getInvoiceById('123456');
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
   * const invoiceSpecificatoin = await bol.getInvoiceSpecificationById('123456');
   */
  getInvoiceSpecificationById(invoiceId: string, tries?: number): Promise<string>;

  //////////////////////////////////////////////////
  // ---                Offers                --- //
  //////////////////////////////////////////////////

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
  createOffer(offerData: TOfferData, tries?: number): Promise<TCreateOfferResult>;

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
  retrieveOfferReportById(reportId: string, tries?: number): Promise<string>;

  /**
   * Retrieve an unpublished offer report by report id
   * @description Retrieve an unpublished offer report containing all unpublished offers and reasons.
   * @param {string} [reportId] - Unique identifier for unpublished offer report.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  exportStatus(url: string, tries?: number): Promise<string>;

  /**
   * Retrieve an unpublished offer report by report id
   * @description Retrieve an unpublished offer report containing all unpublished offers and reasons.
   * @param {string} [reportId] - Unique identifier for unpublished offer report.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.createNewOffer();
   */
  retrieveUnpublishedOfferReportById(reportId: string, tries?: number): Promise<string>;

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
  updateOffer(offerId: string, offerData: TUpdateOfferData, tries?: number): Promise<TCreateOfferResult>;

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
  updateOfferPrice(offerId: string, offerPrice: TOfferPrices, tries?: number): Promise<void>;

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
  updateOfferStock(offerId: string, offerStock: TOfferStocks, tries?: number): Promise<void>;

  //////////////////////////////////////////////////
  // ---                orders                --- //
  //////////////////////////////////////////////////
  orders(queryParams?: IQueryParams, tries?: number): Promise<IBolOrderData[]>;
  getOrderByOrderId(orderId: string, tries?: number): Promise<any>;

  //////////////////////////////////////////////////
  // ---                content               --- //
  //////////////////////////////////////////////////
  /**
   * Get catalog product details by EAN
   * @description Gets the details of a catalog product by means of its EAN.
   * @param {string} [ean] - The EAN number associated with this product.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const content = await bol.getCatalogProductDetailsByEAN('0000007740404');
   */
  getCatalogProductDetailsByEAN(ean: string, tries?: number): Promise<void>;
  //////////////////////////////////////////////////
  // ---                product               --- //
  //////////////////////////////////////////////////
  /**
   * Get product content
   * @description Gets the content of a product by EAN.
   * @param {string} [ean] - The EAN number associated with this product.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const content = await bol.getProductContent('0000007740404');
   */
  getProductList(getProductListProps: getProductListProps, tries?: number): Promise<any[]>;

  /**
   * Get product ids by EAN
   * @description Get the bol.com specific product identifier and the related EANs.
   * @param {string} [ean] - The EAN number associated with this product.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.getProductIdsByEan();
   */
  getProductIdsByEan(ean: string, tries?: number): Promise<string[]>;

  /**
   * Get product assets
   * @description Gets the list of asset available for the product by EAN.
   * @param {string} [ean] - The EAN number associated with this product.
   * @param {number} [tries=3] - The number of attempts
   * @returns {Promise<Object>}
   * @example
   * const insight = await bol.getProductAssets();
   */
  getProductAssets(ean: string, tries?: number): Promise<string[]>;

  //////////////////////////////////////////////////
  // ---              shipments               --- //
  //////////////////////////////////////////////////
  getShipmentList(page?: number, fulfilmentMethod?: string, orderId?: string, tries?: number): Promise<any[]>;

  getAShipmentByShipmentId(shipmentId: string, tries?: number): Promise<IBolShipmentDetails>;
}

// Other

type TCountry = {
  countryCode: string;
  value: number;
};

type getProductListProps = {
  countryCode?: string;
  searchTerm?: string;
  categoryId?: string;
  filterRanges?: unknown[];
  filterValues?: unknown[];
  sort?: string;
  page?: number;
};

// orders

export type TShipmentDetails = {
  salutation: string;
  firstName: string;
  surname: string;
  streetName: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  countryCode: string;
  email: string;
  company: string;
  language: string;
};

export type TBillingDetails = {
  salutation: string;
  firstName: string;
  surname: string;
  streetName: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  countryCode: string;
  email: string;
  orderReference: string;
};

export type TOrderDataFulfilment = {
  method: string;
  distributionParty: string;
  latestDeliveryDate: string;
  expiryDate: string;
  timeFrameType: string;
};

export type TOrderDataOffer = {
  offerId: string;
  reference: string;
};

export type TOrderDataProduct = {
  ean: string;
  title: string;
};

export type TOrderItems = {
  orderItemId: string;
  cancellationRequest: boolean;
  fulfilment: TOrderDataFulfilment;
  offer: TOrderDataOffer;
  product: TOrderDataProduct;
  quantity: number;
  quantityShipped: number;
  quantityCancelled: number;
  unitPrice: number;
  commission: number;
  latestChangedDateTime: string;
};

export type TBolOrderData = {
  orderId: string;
  pickupPoint: boolean;
  orderPlacedDateTime: string;
  shipmentDetails: TShipmentDetails;
  billingDetails: TBillingDetails;
  orderItems: TOrderItems[];
};
