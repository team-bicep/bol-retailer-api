async function getCurrentRetailer(short = false, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/retailers/current`, {
        method: 'GET',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      if (short) {
        return resolve(resp);
      }
      await setTimeout(() => resolve(), 200);
      let response = await fetch(`https://api.bol.com/retailer/retailers/${resp.retailerId}`, {
        method: 'GET',
        headers: await this.bolHeader(2),
      });
      response = await response.json();
      return resolve(response);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject();
      return setTimeout(() => resolve(this.getCurrentRetailer(short, tries)), 2000);
    }
  });
}
async function getRetailer(retailerID, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/retailers/${retailerID}`, {
        method: 'GET',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject();
      return setTimeout(() => resolve(this.getRetailer(retailerID, tries)), 2000);
    }
  });
}
module.exports = {
  getCurrentRetailer,
  getRetailer,
};
