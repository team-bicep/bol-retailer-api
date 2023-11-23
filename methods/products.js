// Get product ids by EAN
async function getProductIdsByEan(ean, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/products/${ean}/product-ids`, {
        method: 'get',
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

module.exports = {
  getProductIdsByEan,
};
