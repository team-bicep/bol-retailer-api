import { TCountry } from '..';

export type TInsights = {
  name: string;
  type: string;
  total: number;
  countries: TCountry[];
  periods: TPeriod[];
};

type TPeriod = {
  period: {
    day: number;
    week: number;
    month: number;
    year: number;
  };
  total: number;
  countries: TCountry[];
};

type TPerformanceIndicator = {
  name: string;
  type: string;
  details: {
    period: {
      week: string;
      year: string;
    };
    score: {
      conforms: boolean;
      numerator: number;
      denominator: number;
      value: number;
      distanceToNorm: number;
    };
    norm: {
      condition: string;
      value: number;
    };
  };
};

type TCountryForecast = {
  countryCode: string;
  minimum: number;
  maximum: number;
};

type TPeriodForecast = {
  weeksAhead: number;
  total: {
    minimum: number;
    maximum: number;
  };
  countries: TCountryForecast[];
};

type TSalesForecast = {
  name: string;
  type: string;
  total: {
    minimum: number;
    maximum: number;
  };
  countries: TCountryForecast[];
  periods: TPeriodForecast[];
};

type TSearchTermCountry = {
  countryCode: string;
  value: number;
};

type TSearchTermPeriod = {
  period: {
    day: string;
    week: string;
    month: string;
    year: string;
  };
  total: number;
  countries: TSearchTermCountry[];
};

type TRelatedSearchTerm = {
  total: number;
  searchTerm: string;
};

type TSearchTerm = {
  searchTerm: string;
  type: string;
  total: number;
  countries: TSearchTermCountry[];
  periods: TSearchTermPeriod[];
  relatedSearchTerms: TRelatedSearchTerm[];
};

export type TSearchTermsQueryParams = {
  searchTerm: string;
  period: 'DAY' | 'WEEK' | 'MONTH';
  numberOfPeriods: number;
  relatedSearchTerms?: boolean;
};
