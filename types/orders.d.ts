export interface IQueryParams {
  // The requested page number with a page size of 50 items.
  // Default value is set to 1.
  page?: number; // integer >= 1, default: 1

  // Fulfilled by the retailer (FBR) or fulfilled by bol.com (FBB).
  // In order to retrieve both FBR and FBB orders, ALL can be used as a parameter.
  fulfilmentMethod?: 'FBR' | 'FBB' | 'ALL';

  // To filter on order status. You can filter on either all orders independent
  // from their status, open orders (excluding shipped and cancelled orders),
  // and shipped orders.
  status?: 'OPEN' | 'SHIPPED' | 'ALL';

  // To filter on the period in minutes during which the latest change was
  // performed on an order item.
  changeIntervalMinute?: number; // integer <= 60

  // To filter on the date on which the latest change was performed on an order item.
  // Up to 3 months of history is supported. Format should be a string representing a date.
  latestChangeDate?: string;
}

export interface IBolOrderData {
  orderId: string;
  orderPlacedDateTime: string; // Assuming ISO 8601 date format string
  orderItems: IBolOrderItem[];
}

interface IBolOrderItem {
  orderItemId: string;
  ean: string;
  fulfilmentMethod: 'FBR' | 'FBB' | 'ALL';
  fulfilmentStatus: 'OPEN' | 'SHIPPED' | 'ALL';
  quantity: number;
  quantityShipped: number;
  quantityCancelled: number;
  cancellationRequest: boolean;
  latestChangedDateTime: string; // Assuming ISO 8601 date format string
}
