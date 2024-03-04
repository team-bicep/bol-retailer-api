export type TRetailerResponse = {
  retailerId: string;
  displayName: string;
  companyName: string;
  vatNumber: string;
  kvkNumber: string;
  registrationDate: string;
  topRetailer?: boolean;
  ratingMethod?: string;
  retailerRating?: {
    retailerRating: number;
    productInformationRating: number;
    deliveryTimeRating: number;
    shippingRating: number;
    serviceRating: number;
  };
  retailerReview?: {
    totalReviewCount: number;
    approvalPercentage: number;
    positiveReviewCount: number;
    neutralReviewCount: number;
    negativeReviewCount: number;
  };
};

export type TCurrentRetailerShortResponse = {
  retailerId: string;
  displayName: string;
  registrationDate: string;
};
