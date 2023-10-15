async function offerInsight(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch("https://api.bol.com/retailer/insights/offer", {
        method: "get",
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp.offerInsights);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.offerInsight(tries)), 2000);
    }
  });
}

async function performanceIndicator(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        "https://api.bol.com/retailer/insights/performance/indicator",
        {
          method: "get",
          headers: await this.bolHeader(2),
        }
      );
      resp = await resp.json();
      return resolve(resp.performanceIndicators);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.offerInsight(tries)), 2000);
    }
  });
}

async function salesForecast(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        "https://api.bol.com/retailer/insights/sales-forecast",
        {
          method: "get",
          headers: await this.bolHeader(2),
        }
      );
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.offerInsight(tries)), 2000);
    }
  });
}

async function searchTerms(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        "https://api.bol.com/retailer/insights/search-terms",
        {
          method: "get",
          headers: await this.bolHeader(2),
        }
      );
      resp = await resp.json();
      return resolve(resp.searchTerms);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.offerInsight(tries)), 2000);
    }
  });
}

module.exports = {
  offerInsight,
  performanceIndicator,
  salesForecast,
  searchTerms,
};
