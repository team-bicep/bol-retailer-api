async function getCatalogProductDetailsByEAN(ean, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/content/catalog-products/${ean}`, {
        method: 'get',
        headers: {
          ...await this.bolHeader(2),
        'Accept-Language': 'nl',
        }
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.getCatalogProductDetailsByEAN(tries)), 2000);
    }
  });
}

module.exports = {
  getCatalogProductDetailsByEAN,
};
