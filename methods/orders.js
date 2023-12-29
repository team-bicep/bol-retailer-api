async function orders(queryParams, tries = 3) {
  const { page, fulfilmentMethod, status, changeIntervalMinute, latestChangeDate } = queryParams || {};

  // Build query string
  const queryParts = [];
  if (page) queryParts.push(`page=${page}`);
  if (fulfilmentMethod) queryParts.push(`fulfilment-method=${fulfilmentMethod}`);
  if (status) queryParts.push(`status=${status}`);
  if (changeIntervalMinute) queryParts.push(`change-interval-minute=${changeIntervalMinute}`);
  if (latestChangeDate) queryParts.push(`latest-change-date=${latestChangeDate}`);
  const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';

  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`https://api.bol.com/retailer/orders${queryString}`, {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      const data = await response.json();
      return resolve(data.orders);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      setTimeout(() => resolve(this.orders(queryParams, tries)), 2000);
    }
  });
}

async function getOrderByOrderId(orderId, tries = 3) {
  if (!orderId) throw new Error('OrderId must be provided');
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/orders/${orderId}`, {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.getOrderByOrderId(tries)), 2000);
    }
  });
}

module.exports = {
  orders,
  getOrderByOrderId,
};
