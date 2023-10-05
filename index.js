const fetch = require('node-fetch');
const fs = require('fs');
const csvConverter = require('csvtojson');
/**
 * Class representing the Bol API
 */
class Bol {
  /**
   * Creates a new Bol instance.
   * @param {string} APIKEY - The API key.
   * @param {string} SECRET - The secret key.
   */
  constructor(APIKEY, SECRET) {
    this.API = APIKEY;
    this.SECRET = SECRET;
    this.bol_token;
    this.expires_in;
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
          Accept: 'application/vnd.retailer.v9+json',
          'Content-Type': 'application/vnd.retailer.v9+json',
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

  // Offers

  /**
   * Retrieve a list of offers from the Bol platform.
   * @param {number} [tries=3] - The number of attempts to pause the offer.
   * @returns {Promise<Object>} - A promise that resolves with the offer list.
   * @example
   * const offers = await bol.offerList();
   * console.log(offers);
   */
  async offerList(tries = 3) {
    return new Promise(async (resolve, reject) => {
      console.log({ ...(await this.bolHeader(2)), 'Accept-Language': 'nl' });
      try {
        let resp = await fetch('https://api.bol.com/retailer/products/list', {
          method: 'GET',
          headers: { ...(await this.bolHeader(2)), 'Accept-Language': 'nl' },
        });
        resp = await resp.json();
        return resolve(resp);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject(e);
        return setTimeout(() => resolve(this.offerList(tries)), 2000);
      }
    });
  }

  /**
   * Retrieve a single offer from the Bol platform.
   * @param {string} offer_id - The ID of the offer.
   * @param {number} [tries=3] - The number of attempts to pause the offer.
   * @returns
   */
  async getOffer(offer_id, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('https://api.bol.com/retailer/offers/' + offer_id, {
          method: 'GET',
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        return resolve(resp);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject(e);
        return setTimeout(() => resolve(this.getOffer(offer_id, tries)), 2000);
      }
    });
  }

  /**
   * Pause an offer on the Bol platform.
   * @param {string} offer_id - The ID of the offer.
   * @param {boolean} hold - Whether to hold the offer.
   * @param {string} method - The method of fulfillment.
   * @param {number} [tries=3] - The number of attempts to pause the offer.
   * @returns {Promise<void>} - A promise that resolves when the operation is done.
   */
  async pause(offer_id, hold, method, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('https://api.bol.com/retailer/offers/' + offer_id, {
          method: 'PUT',
          body: JSON.stringify({ onHoldByRetailer: hold, fulfilment: { method: method } }),
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        return resolve();
      } catch (e) {
        console.error(e);
        tries--;
        if (tries <= 0) return reject(e);
        return setTimeout(() => resolve(this.pause(offer_id, hold, method, tries)), 2000);
      }
    });
  }

  /**
   * Update the stock of an offer on the Bol platform.
   * @param {string} offer_id - The ID of the offer.
   * @param {number} stock - The new stock value.
   * @param {boolean} managedByRetailer - Whether the stock is managed by the retailer.
   * @param {number} [tries=3] - The number of attempts to update the stock.
   * @returns {Promise<void>} - A promise that resolves when the operation is done.
   */
  async stock(offer_id, stock, managedByRetailer, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('https://api.bol.com/retailer/offers/' + offer_id + '/stock', {
          method: 'PUT',
          body: JSON.stringify({ amount: stock, managedByRetailer: managedByRetailer }),
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        return resolve();
      } catch (e) {
        tries--;
        if (tries <= 0) return reject(e);
        return setTimeout(() => resolve(this.stock(offer_id, stock, managedByRetailer, (tries = 3))), 2000);
      }
    });
  }

  /**
   * Update the delivery details of an offer on the Bol platform.
   * @param {string} offer_id - The ID of the offer.
   * @param {Object} fulfilment - The new fulfilment details.
   * @param {number} [tries=3] - The number of attempts to update the delivery details.
   * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the operation was successful.
   */
  async delivery(offer_id, fulfilment, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('https://api.bol.com/retailer/offers/' + offer_id, {
          method: 'PUT',
          body: JSON.stringify({ fulfilment: fulfilment }),
          headers: await this.bolHeader(2),
        });
        if (resp.ok) return resolve(true);
        tries--;
        if (tries <= 0) return reject(resp);
        return setTimeout(() => resolve(this.delivery(offer_id, fulfilment, tries)), 2000);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject(e);
        return setTimeout(() => resolve(this.delivery(offer_id, fulfilment, tries)), 2000);
      }
    });
  }

  /**
   * Export offers from the Bol platform.
   * @param {number} [tries=3] - The number of attempts to export the offers.
   * @returns {Promise<Array<Object>>} - A promise that resolves with an array of exported offers.
   */
  async export(tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await this.bolHeader(3);
        headers['Content-Type'] = headers['Accept'];
        let resp = await fetch('https://api.bol.com/retailer/offers/export', {
          method: 'POST',
          body: JSON.stringify({ format: 'CSV' }),
          headers: headers,
        });
        resp = await resp.json();
        let exportId = resp.processStatusId,
          csv;
        if (!resp.links) return reject(resp);
        do {
          await new Promise((res) => setTimeout(res, 20e3));
          headers = await this.bolHeader(3);
          let status = await fetch(resp.links[0].href, { method: 'GET', headers: headers });
          status = await status.json();
          if (status.status == 'SUCCESS') {
            exportId = status.entityId;
            headers = await this.bolHeader(3);
            headers['Accept'] = 'application/vnd.retailer.v9+csv';
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            let exported = await fetch('https://api.bol.com/retailer/offers/export/' + exportId, {
              method: 'GET',
              headers: headers,
            });
            if (exported.status != 200) return reject();
            const fileStream = fs.createWriteStream('./export_offers.csv', { flags: 'w' });
            try {
              await new Promise((res, rej) => {
                exported.body.pipe(fileStream);
                exported.body.on('error', (err) => {
                  console.error(err);
                  rej();
                });
                fileStream.on('finish', () => {
                  csv = true;
                  res();
                });
              });
            } catch (e) {
              return reject(e);
            }
          }
        } while (!csv);
        csvConverter()
          .fromFile('./export_offers.csv')
          .then((json) => {
            fs.unlink('./export_offers.csv', (err) => {
              return resolve(json);
            });
          })
          .catch((err) => {
            console.error(err);
            return reject();
          });
      } catch (e) {
        console.error(e);
        tries--;
        if (tries <= 0) return reject();
        return setTimeout(() => resolve(this.bolExport(tries)), 2000);
      }
    });
  }

  /**
   * Fetch orders from the Bol platform.
   * @param {number} page - The page number to fetch.
   * @param {string} status - The status of the orders to fetch.
   * @param {number} [tries=3] - The number of attempts to fetch the orders.
   * @returns {Promise<Array<Object>>} - A promise that resolves with an array of orders.
   */
  async orders(page, status, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch(`https://api.bol.com/retailer/orders?page=${page}&status=${status}`, {
          method: 'GET',
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        if (resp.orders == undefined) resp.orders = [];
        return resolve(resp.orders);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject();
        return setTimeout(() => resolve(this.orders(page, status, tries)), 2000);
      }
    });
  }

  /**
   * Fetch orders from the Bol platform.
   * @param {number} orderId - The page number to fetch.
   * @param {number} [tries=3] - The number of attempts to fetch the orders.
   * @returns {Promise<Array<Object>>} - A promise that resolves with an array of orders.
   */
  async orderById(orderId, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch(`https://api.bol.com/retailer/orders/${orderId}`, {
          method: 'GET',
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        if (resp == undefined) resp = [];
        return resolve(resp);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject();
        return setTimeout(() => resolve(this.orderById(orderId, tries)), 2000);
      }
    });
  }

  /**
   * Fetch shipments from the Bol platform.
   * @param {number} page - The page number to fetch.
   * @param {string} fulfilmentMethod - The status of the shipments to fetch.
   * @param {number} [tries=3] - The number of attempts to fetch the orders.
   * @returns {Promise<Array<Object>>} - A promise that resolves with an array of orders.
   */
  async shipments(page, fulfilmentMethod, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch(
          `https://api.bol.com/retailer/shipments?page=${page}&fulfilment-method=${fulfilmentMethod}`,
          {
            method: 'GET',
            headers: await this.bolHeader(2),
          }
        );
        resp = await resp.json();
        if (resp.shipments == undefined) resp.shipments = [];
        return resolve(resp.shipments);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject();
        return setTimeout(() => resolve(this.shipments(page, fulfilmentMethod, tries)), 2000);
      }
    });
  }

  /**
   * Fetch shipments from the Bol platform.
   * @param {number} page - The page number to fetch.
   * @param {string} fulfilmentMethod - The status of the shipments to fetch.
   * @param {number} [tries=3] - The number of attempts to fetch the orders.
   * @returns {Promise<Array<Object>>} - A promise that resolves with an array of orders.
   */
  async shipmentById(shipmentId, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch(`https://api.bol.com/retailer/shipments/${shipmentId}`, {
          method: 'GET',
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        if (resp == undefined) resp = [];
        return resolve(resp);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject();
        return setTimeout(() => resolve(this.shipmentById(shipmentId, tries)), 2000);
      }
    });
  }

  /**
   * Fetch details of a specific order from the Bol platform.
   * @param {string} order_id - The ID of the order.
   * @param {number} [tries=3] - The number of attempts to fetch the order details.
   * @returns {Promise<Object>} - A promise that resolves with the order details.
   */
  async detail(order_id, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('https://api.bol.com/retailer/orders/' + order_id, {
          method: 'GET',
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        return resolve(resp);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject();
        return setTimeout(() => resolve(this.detail(order_id, tries)), 2000);
      }
    });
  }

  /**
   * Update the price of an offer on the Bol platform.
   * @param {string} offer_id - The ID of the offer.
   * @param {number} price - The new price.
   * @param {number} [tries=3] - The number of attempts to update the price.
   * @returns {Promise<Object>} - A promise that resolves with the response from the Bol API.
   */
  async price(offer_id, price, tries = 3) {
    return new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('https://api.bol.com/retailer/offers/' + offer_id + '/price', {
          method: 'PUT',
          body: JSON.stringify({ pricing: { bundlePrices: [{ quantity: 1, unitPrice: price }] } }),
          headers: await this.bolHeader(2),
        });
        resp = await resp.json();
        return resolve(resp);
      } catch (e) {
        tries--;
        if (tries <= 0) return reject();
        return setTimeout(() => resolve(this.price(offer_id, price, tries)), 2000);
      }
    });
  }
}

module.exports = Bol;
