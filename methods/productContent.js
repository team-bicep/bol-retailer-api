async function getProductList(
  { countryCode = 'NL', searchTerm, categoryId, filterRanges = [], filterValues = [], sort = 'RELEVANCE', page = 1 },
  tries = 3
) {
  if (!searchTerm && !categoryId) throw new Error('Either searchTerm or categoryId must be provided');
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/products/list`, {
        method: 'post',
        body: JSON.stringify({
          countryCode,
          filterRanges,
          filterValues,
          sort,
          page,
          // either searchterm or categoryId
          ...(searchTerm ? { searchTerm } : { categoryId }),
        }),
        headers: {
          ...(await this.bolHeader(2)),
          'Accept-Language': 'nl',
        },
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.getProductList(tries)), 2000);
    }
  });
}

async function getCatalogProductDetailsByEAN(ean, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/content/catalog-products/${ean}`, {
        method: 'get',
        headers: {
          ...(await this.bolHeader(2)),
          'Accept-Language': 'nl',
        },
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
  getProductList,
  getCatalogProductDetailsByEAN,
};
