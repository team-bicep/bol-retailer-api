async function offerInsights(queryParams, tries = 3) {
  const offerIdString = `offer-id=${queryParams.offerId}`;
  const periodString = `period=${queryParams.period}`;
  const nameString = `name=${queryParams.name}`;
  const numberOfPeriodsString = `number-of-periods=${queryParams.numberOfPeriods}`;
  const queryParamString =
    `?${offerIdString}&${periodString}&${nameString}&${numberOfPeriodsString}`.replaceAll('\n', '');

  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/insights/offer${queryParamString}`, {
        method: 'get',
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp.offerInsights);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.offerInsights(tries)), 2000);
    }
  });
}

async function performanceIndicator(queryParams, tries = 3) {
  const nameString = `name=${queryParams.name}`;
  const yearString = `year=${queryParams.year}`;
  const weekString = `week=${queryParams.week}`;
  const queryParamString = `?${nameString}&${yearString}&${weekString}`.replaceAll('\n', '');

  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/insights/performance/indicator${queryParamString}`,
        {
          method: 'get',
          headers: await this.bolHeader(2),
        },
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

async function salesForecast(queryParams, tries = 3) {
  const offerIdString = `offer-id=${queryParams.offerId}`;
  const weeksAheadString = `weeks-ahead=${queryParams.weeksAhead}`;
  const queryParamString = `?${offerIdString}&${weeksAheadString}`.replaceAll('\n', '');

  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `ttps://api.bol.com/retailer/insights/sales-forecast${queryParamString}`,
        {
          method: 'get',
          headers: await this.bolHeader(2),
        },
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
    `?${searchTermString}&${periodString}&${numberOfPeriodsString}&${relatedSearchTermsString}`.replaceAll(
      '\n',
      '',
    );
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/insights/search-terms${queryParamString}`,
        {
          method: 'get',
          headers: await this.bolHeader(2),
        },
      );
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
  offerInsights,
  performanceIndicator,
  salesForecast,
  searchTerms,
};
