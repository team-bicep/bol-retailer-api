async function getShipmentList(page = 1, fulfilmentMethod, orderId, tries = 3) {
  // Error handling for conflicting parameters
  if (fulfilmentMethod && orderId) {
    throw new Error('Cannot provide both fulfilmentMethod and orderId');
  }

  // Building the query parameter string
  let queryParamString = `?page=${page}`;
  if (fulfilmentMethod) {
    queryParamString += `&fulfilment-method=${fulfilmentMethod}`;
  } else if (orderId) {
    queryParamString += `&order-id=${orderId}`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`https://api.bol.com/retailer/shipments${queryParamString}`, {
        method: 'GET',
        headers: await this.bolHeader(),
      });
      const data = await response.json();
      if (!data.shipments) {
        data.shipments = [];
      }
      return resolve(data.shipments);
    } catch (e) {
      if (--tries <= 0) return reject(e);
      setTimeout(() => resolve(this.getShipmentList(page, fulfilmentMethod, orderId, tries)), 2000);
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
      return setTimeout(() => resolve(this.uploadAnInvoiceForShipmentId(shipmentId, invoiceBinary, tries)), 2000);
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
      return setTimeout(() => resolve(this.getAShipmentByShipmentId(shipmentId, tries)), 2000);
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
