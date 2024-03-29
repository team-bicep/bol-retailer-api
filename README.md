# Important note
As far as im aware, no one is using this library yet, and there isnt a high demand for it. Therefore i develop this library on per use basis and will not put my full focus on it. If you do plan on using this library but cant because of its in-development status. Please make a GH issue so im aware someones actually waiting on this. As of right now, this library is NOT ready for (production) usage yet


# Bol.com Retailer API Wrapper

Source https://api.bol.com/retailer/public/redoc/v10/retailer.html

Github: https://github.com/team-bicep/bol-retailer-api
NPM: https://www.npmjs.com/package/bol-retailer-api
<br>

```bash
npm i bol-retailer-api
```

This is a unofficial npm library for the bol.com retailer api

### Initialization

```javascript
import Bol from "bol-retailer-api";

bol = new Bol(API_KEY, API_SECRET);
```

### progess



- [x] Commissions
	- [x] Get all commissions and reductions by EAN in bulk
	- [x] Get all commissions and reductions by EAN per single EAN
- [X] Insights
	- [X] Get offer insights
	- [X] Get performance indicators
	- [X] Get sales forecast
	- [X] Get search terms
- [X] Inventory
	- [X] Get LVB/FBB inventory
- [x] Invoices
	- [x] Get all invoices
	- [x] Get an invoice by invoice id
	- [x] Get an invoice specification by invoice id
- [x] Offers
	- [x] Create a new offer
	- [x] Request an offer export file
	- [x] Retrieve an offer export file by report id
	- [x] Request an unpublished offer report
	- [x] Retrieve an unpublished offer report by report id
	- [x] Retrieve an offer by its offer id
	- [x] Update an offer
	- [x] Delete offer by id
	- [x] Update price(s) for offer by id
	- [x] Update stock for offer by id
- [ ] Orders
	- [ ] Get a list of orders
	- [ ] Cancel an order item by an order item id
	- [x] Get an order by order id
- [ ] Product Content
	- [x] Get catalog product details by EAN
	- [ ] Get chunk recommendations
	- [ ] Create content for a product
	- [ ] Get an upload report by upload id
- [ ] Products
	- [x] Get products list
	- [ ] Get products list filters
	- [x] Get product assets
	- [ ] Get a list of competing offers by EAN
	- [ ] Get product placements
	- [ ] Get price star boundaries by EAN
	- [x] Get product ids by EAN
	- [ ] Get product ratings
- [ ] Promotions
	- [ ] Get a list of promotions
	- [ ] Get a promotion by promotion id
	- [ ] Get a list of products
- [ ] Replenished
	- [ ] Get replenishments
	- [ ] Create a replenishment
	- [ ] Get delivery dates
	- [ ] Post pickup time slots
	- [ ] Request product destinations
	- [ ] Get product destinationa by product destinations id
	- [ ] Post product labels
	- [ ] Get a replenishment by replenishment id
	- [ ] Update a replenishment by replenishment id
	- [ ] Get load carrier labels
	- [ ] Get pick list
- [x] Retailers
	- [x] Get retailer information by retailer id
- [ ] Returns
	- [ ] Get returns
	- [ ] Create a return
	- [ ] Get a return by return id
	- [ ] Handle a return by rma id
- [ ] Shipments
	- [ ] Get shipment list
	- [ ] Create a shipment
	- [ ] Get a list of invoice requests
	- [ ] Upload an invoice for shipment id
	- [ ] Get a shipment by shipment id
- [ ] Shipping labels
	- [ ] Create a shipping label
	- [ ] Get delivery options
	- [ ] Get a shipping label
- [ ] Subscriptions
	- [ ] Retrieve Event Notification Subscriptions (BETA)
	- [ ] Create Event Notification Subscription (BETA)
	- [ ] Retrieve public keys for push notification signature validation.
	- [ ] Send test push notification for subscriptions
	- [ ] Retrieve Specific Event Notification Subscription (BETA)
	- [ ] Update Event Notification Subscription (BETA)
	- [ ] Remove Event Notification Subscription
- [ ] Transports
	- [ ] Add transport information by transport id
