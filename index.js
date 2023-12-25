const fetch = require('node-fetch');
const Commission = require('./methods/commission');
const Insights = require('./methods/insights');
const Inventory = require('./methods/inventory');
const Invoices = require('./methods/invoices');
const Offers = require('./methods/offers');
const Products = require('./methods/products');
const ProductContent = require('./methods/productContent');
const Orders = require('./methods/orders');
const Shipments = require('./methods/shipments');
/**
 * Class representing the Bol API V.10.
 */
class Bol {
  /**
   * Creates a new Bol instance.
   * @param {string} APIKEY - The API key.
   * @param {string} SECRET - The secret key.
   */
  constructor(APIKEY, SECRET, bol_token, expires_in) {
    this.API = APIKEY;
    this.SECRET = SECRET;
    this.bol_token = bol_token;
    this.expires_in = expires_in;
  }

  /**
   * Create a header for the Bol API.
   * @param {number} [tries=3] - The number of attempts to create the header.
   * @returns {Promise<Object>} - A promise that resolves with the header object.
   */
  async bolHeader(tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.bol_token || this.expires_in < new Date().getTime()) await this.bolAccess(tries);
        return resolve({
          Accept: 'application/vnd.retailer.v10+json',
          'Content-Type': 'application/vnd.retailer.v10+json',
          Authorization: 'Bearer ' + this.bol_token,
        });
      } catch (e) {
        tries--;
        if (tries <= 0) return reject(e);
        return setTimeout(() => resolve(this.bolHeader(tries)), 2000);
      }
    });
  }

  /**
   * Fetch access tokens from the Bol API.
   * @param {number} [tries=3] - The number of attempts to fetch the access tokens.
   * @returns {Promise<void>} - A promise that resolves when the operation is done.
   */
  async bolAccess(tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('https://login.bol.com/token?grant_type=client_credentials', {
          method: 'POST',
          body: {},
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from(this.API + ':' + this.SECRET).toString('base64'),
          },
        });
        resp = await resp.json();
        this.bol_token = resp.access_token;
        this.expires_in = new Date().getTime() + resp.expires_in * 1000;
        return resolve();
      } catch (e) {
        tries--;
        if (tries <= 0) return reject(e);
        return setTimeout(() => resolve(this.bolAccess(tries)), 2000);
      }
    });
  }

  // Commission
  commission = Commission.commission;
  commissionList = Commission.commissionList;

  // Insights
  offerInsight = Insights.offerInsight;
  performanceIndicator = Insights.performanceIndicator;
  salesForecast = Insights.salesForecast;
  searchTerms = Insights.searchTerms;

  // Inventory
  getLVBInventory = Inventory.getLVBInventory;

  // Invoices
  getInvoices = Invoices.getInvoices;
  getInvoiceById = Invoices.getInvoiceById;
  getInvoiceSpecificationById = Invoices.getInvoiceSpecificationById;

  // Offers
  createNewOffer = Offers.createNewOffer;
  exportOffers = Offers.exportOffers;
  retrieveUnpublishedOfferReportById = Offers.retrieveUnpublishedOfferReportById;
  retrieveOfferByOfferId = Offers.retrieveOfferByOfferId;
  updateOffer = Offers.updateOffer;
  deleteOffer = Offers.deleteOffer;
  updateOfferPrice = Offers.updateOfferPrice;
  updateOfferStock = Offers.updateOfferStock;
  retrieveOfferReportById = Offers.retrieveOfferReportById;
  exportStatus = Offers.exportStatus;

  // Orders
  getOrderByOrderId = Orders.getOrderByOrderId;

  // Product Content
  getCatalogProductDetailsByEAN = ProductContent.getCatalogProductDetailsByEAN;
  getProductList = ProductContent.getProductList;

  // Products
  getProductIdsByEan = Products.getProductIdsByEan;
  getProductAssets = Products.getProductAssets;

  // shipments
  getShipmentList = Shipments.getShipmentList;
  createAShipment = Shipments.createAShipment;
  getAListOfInvoiceRequests = Shipments.getAListOfInvoiceRequests;
  uploadAnInvoiceForShipmentId = Shipments.uploadAnInvoiceForShipmentId;
  getAShipmentByShipmentId = Shipments.getAShipmentByShipmentId;
}

module.exports = Bol;
