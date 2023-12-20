async function commission(ean, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/commission/${ean}`, {
        method: "get",
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.commission(tries)), 2000);
    }
  });
}

async function commissionList(commissionQueries, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/commission/`, {
        method: "POST",
        body: JSON.stringify({
          commissionQueries,
        }),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp.commissions);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.commissionList(tries)), 2000);
    }
  });
}
module.exports = {
  commission,
  commissionList,
};
