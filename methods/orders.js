async function getOrderByOrderId(orderId, tries = 3) {
  if (!orderId) throw new Error('OrderId must be provided');
  console.log(orderId);
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
  getOrderByOrderId,
};
