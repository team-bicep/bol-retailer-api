export interface IBolShipmentDetails {
  shipmentId: string;
  shipmentDateTime: string; // ISO 8601 date format
  shipmentReference: string;
  pickupPoint: boolean;
  order: Order;
  shipmentDetails: ShipmentDetails;
  billingDetails: BillingDetails;
  shipmentItems: ShipmentItem[];
  transport: Transport;
}

interface Order {
  orderId: string;
  orderPlacedDateTime: string; // ISO 8601 date format
}

interface ShipmentDetails {
  pickupPointName: string;
  salutation: 'MALE' | 'FEMALE' | 'OTHER';
  firstName: string;
  surname: string;
  streetName: string;
  houseNumber: string;
  houseNumberExtension?: string;
  extraAddressInformation?: string;
  zipCode: string;
  city: string;
  countryCode: string;
  email: string;
  company: string;
  deliveryPhoneNumber: string;
  language: string;
}

interface BillingDetails extends ShipmentDetails {
  vatNumber: string;
  kvkNumber: string;
  orderReference: string;
}

interface ShipmentItem {
  orderItemId: string;
  fulfilment: Fulfilment;
  offer: Offer;
  product: Product;
  quantity: number;
  unitPrice: number;
  commission: number;
}

interface Fulfilment {
  method: 'FBR' | 'FBB';
  distributionParty: string;
  latestDeliveryDate: string; // Date in YYYY-MM-DD format
}

interface Offer {
  offerId: string;
  reference: string;
}

interface Product {
  ean: string;
  title: string;
}

interface Transport {
  transportId: string;
  transporterCode: string;
  trackAndTrace: string;
  shippingLabelId: string;
  transportEvents: TransportEvent[];
}

interface TransportEvent {
  eventCode: TransportEventCodes;
  eventDateTime: string; // ISO 8601 date format
}

declare enum TransportEventCodes {
  PRE_ANNOUNCED = 'PRE_ANNOUNCED',
  AT_TRANSPORTER = 'AT_TRANSPORTER',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED_AT_NEIGHBOURS = 'DELIVERED_AT_NEIGHBOURS',
  DELIVERED_AT_CUSTOMER = 'DELIVERED_AT_CUSTOMER',
  PICKED_UP_AT_PICK_UP_POINT = 'PICKED_UP_AT_PICK_UP_POINT',
  AT_PICK_UP_POINT = 'AT_PICK_UP_POINT',
  RETURNED_TO_SENDER = 'RETURNED_TO_SENDER',
  INBOUND_COLLECT = 'INBOUND_COLLECT',
}
