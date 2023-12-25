async function getInvoices(queryParams, tries = 3) {
  const periodStartDateString = queryParams.periodStartDate
    ? `period-start-date=${queryParams.periodStartDate}`
    : '';
  const periodEndDateString = queryParams.periodEndDate
    ? `period-end-date=${queryParams.periodEndDate}`
    : '';

  const hasQueryParams = periodStartDateString || periodEndDateString;
  const queryString = hasQueryParams ? `?${periodStartDateString}&${periodEndDateString}` : '';
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/invoices${queryString}`, {
        method: 'get',
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
      let resp = await fetch(`https://api.bol.com/retailer/invoices/${InvoiceId}`, {
        method: 'get',
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

async function getInvoiceSpecificationById(InvoiceId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/invoices/${InvoiceId}/specification`, {
        method: 'get',
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

module.exports = {
  getInvoices,
  getInvoiceById,
  getInvoiceSpecificationById,
};
