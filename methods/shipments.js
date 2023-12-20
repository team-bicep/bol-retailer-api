async function getShipmentList(page, fulfilmentMethod, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/shipments?page=${page}&fulfilment-method=${fulfilmentMethod}`,
        {
          method: 'GET',
          headers: await this.bolHeader(2),
        },
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

async function createAShipment(shipmentDetails, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/shipments`, {
        method: 'POST',
        body: JSON.stringify(shipmentDetails),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject();
      return setTimeout(() => resolve(this.createAShipment(shipmentDetails, tries)), 2000);
    }
  });
}

async function getAListOfInvoiceRequests(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/shipments/invoices/requests`, {
        method: 'GET',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp.invoiceRequests);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject();
      return setTimeout(() => resolve(this.getAListOfInvoiceRequests(tries)), 2000);
    }
  });
}

async function uploadAnInvoiceForShipmentId(shipmentId, invoiceBinary, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/shipments/invoices/${shipmentId}`, {
        method: 'POST',
        body: { invoice: invoiceBinary },
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject();
      return setTimeout(
        () => resolve(this.uploadAnInvoiceForShipmentId(shipmentId, invoiceBinary, tries)),
        2000,
      );
    }
  });
}

async function getAShipmentByShipmentId(shipmentId, tries = 3) {
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

module.exports = {
  getShipmentList,
  getAShipmentByShipmentId,
  createAShipment,
  uploadAnInvoiceForShipmentId,
  getAListOfInvoiceRequests,
};
