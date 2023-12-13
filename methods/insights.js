async function offerInsight(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch('https://api.bol.com/retailer/insights/offer', {
        method: 'get',
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
      let resp = await fetch('https://api.bol.com/retailer/insights/performance/indicator', {
        method: 'get',
        headers: await this.bolHeader(2),
      });
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
      let resp = await fetch('https://api.bol.com/retailer/insights/sales-forecast', {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.offerInsight(tries)), 2000);
    }
  });
}

async function searchTerms(queryParams, tries = 3) {
  if (!queryParams.searchTerm || !queryParams.period || !queryParams.numberOfPeriods) {
    throw new Error('Missing required query parameters');
  }
  const searchTermString = `search-term=${encodeURIComponent(queryParams.searchTerm)}`;
  const periodString = `period=${queryParams.period}`;
  const numberOfPeriodsString = `number-of-periods=${queryParams.numberOfPeriods}`;
  const relatedSearchTermsString = queryParams.relatedSearchTerms
    ? `related-search-terms=${queryParams.relatedSearchTerms}`
    : '';
  const queryParamString =
    `?${searchTermString}&${periodString}&${numberOfPeriodsString}&${relatedSearchTermsString}`.replaceAll('\n', '');
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/insights/search-terms${queryParamString}`, {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp.searchTerms);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.searchTerms(queryParams, tries)), 2000);
    }
  });
}

module.exports = {
  offerInsight,
  performanceIndicator,
  salesForecast,
  searchTerms,
};
