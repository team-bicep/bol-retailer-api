async function getInventory(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch("https://api.bol.com/retailer/inventory", {
        method: "get",
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

module.exports = { getInventory };
