async function getInvoices(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch("https://api.bol.com/retailer/invoices", {
        method: "get",
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.getInvoices(tries)), 2000);
    }
  });
}

async function getInvoiceById(InvoiceId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/invoices/${InvoiceId}`,
        {
          method: "get",
          headers: await this.bolHeader(2),
        }
      );
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.getInvoices(tries)), 2000);
    }
  });
}

async function getInvoiceSpecificationById(InvoiceId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/invoices/${InvoiceId}/specification`,
        {
          method: "get",
          headers: await this.bolHeader(2),
        }
      );
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.getInvoices(tries)), 2000);
    }
  });
}

module.exports = {
  getInvoices,
  getInvoiceById,
  getInvoiceSpecificationById,
};
