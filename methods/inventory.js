async function getLVBInventory(queryParams, tries = 3) {
  const pageString = queryParams.page ? `page=${queryParams.page}` : '';
  const quantityString = queryParams.quantity ? `quantity=${queryParams.quantity}` : '';
  const stockString = queryParams.stock ? `stock=${queryParams.stock}` : '';
  const stateString = queryParams.state ? `state=${queryParams.state}` : '';
  const queryString = queryParams.query ? `query=${encodeURIComponent(queryParams.query)}` : '';
  const hasQueryParams = pageString || quantityString || stockString || stateString || queryString;
  const queryParamString = hasQueryParams
    ? `?${pageString}&${quantityString}&${stockString}&${stateString}&${queryString}`.replaceAll(
        '\n',
        '',
      )
    : '';

  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/inventory${queryParamString}`, {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp.inventory);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.offerInsight(tries)), 2000);
    }
  });
}

module.exports = { getLVBInventory };
