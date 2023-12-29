const fs = require('fs');
const csvConverter = require('csvtojson');
const { Readable } = require('stream');

async function createNewOffer(offer, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers`, {
        method: 'POST',
        body: JSON.stringify(offer),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.createNewOffer(tries)), 2000);
    }
  });
}

async function exportOffers(tries = 3) {
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

      if (!resp.links) return reject(resp);

      let exportId = resp.processStatusId;
      let csvBuffer = null;

      do {
        await new Promise((res) => setTimeout(res, 20e3));
        headers = await this.bolHeader(3);

        let status = await fetch(resp.links[0].href, {
          method: 'GET',
          headers: headers,
        });
        status = await status.json();

        if (status.status == 'SUCCESS') {
          exportId = status.entityId;
          headers = await this.bolHeader(3);
          headers['Accept'] = 'application/vnd.retailer.v10+csv';
          headers['Content-Type'] = 'application/x-www-form-urlencoded';

          let exported = await fetch('https://api.bol.com/retailer/offers/export/' + exportId, {
            method: 'GET',
            headers: headers,
          });

          if (exported.status != 200) return reject();

          csvBuffer = await exported.arrayBuffer();
          break;
        }
      } while (!csvBuffer);

      // Convert the buffer to a stream
      const stream = new Readable();
      stream.push(Buffer.from(csvBuffer));
      stream.push(null); // Indicate the end of the stream

      // Use csvConverter with the stream
      csvConverter()
        .fromStream(stream)
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      setTimeout(() => resolve(this.exportOffers(tries)), 2000);
    }
  });
}

async function exportStatus(url, tries = 3) {
  return new Promise(async (resolve, reject) => {
    let headers = await this.bolHeader(3);
    headers['Content-Type'] = headers['Accept'];
    try {
      let status = await fetch(url, {
        method: 'GET',
        headers,
      });
      resp = await status.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.exportStatus(tries)), 2000);
    }
  });
}

async function retrieveOfferReportById(reportId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      headers = await this.bolHeader(3);
      headers['Accept'] = 'application/vnd.retailer.v10+csv';
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      let resp = await fetch(`https://api.bol.com/retailer/offers/export/${reportId}`, {
        method: 'GET',
        headers,
      });
      // resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.retrieveOfferReportById(reportId, tries)), 2000);
    }
  });
}
async function retrieveUnpublishedOfferReportById(reportId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/unpublished/${reportId}`, {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.retrieveUnpublishedOfferReportById(tries)), 2000);
    }
  });
}

async function retrieveOfferByOfferId(offerId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}`, {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.retrieveOfferByOfferId(tries)), 2000);
    }
  });
}

async function updateOffer(offerId, offer, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}`, {
        method: 'PUT',
        body: JSON.stringify(offer),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.updateOffer(tries)), 2000);
    }
  });
}

async function deleteOffer(offerId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}`, {
        method: 'DELETE',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.deleteOffer(tries)), 2000);
    }
  });
}

async function updateOfferPrice(offerId, offerPrice, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}/price`, {
        method: 'PUT',
        body: JSON.stringify(offerPrice),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.updateOfferPrice(tries)), 2000);
    }
  });
}
async function updateOfferStock(offerId, offerStock, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}/stock`, {
        method: 'PUT',
        body: JSON.stringify(offerStock),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.updateOfferStock(tries)), 2000);
    }
  });
}

module.exports = {
  createNewOffer,
  exportOffers,
  retrieveUnpublishedOfferReportById,
  retrieveOfferByOfferId,
  updateOffer,
  deleteOffer,
  updateOfferPrice,
  updateOfferStock,
  retrieveOfferReportById,
  exportStatus,
};
