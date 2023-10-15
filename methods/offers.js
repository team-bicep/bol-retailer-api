async function createNewOffer(offer, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers`, {
        method: "POST",
        body: JSON.stringify(offer),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.createNewOffer(tries)), 2000);
    }
  });
}

async function exportOffers(tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let headers = await this.bolHeader(3);
      headers["Content-Type"] = headers["Accept"];
      let resp = await fetch("https://api.bol.com/retailer/offers/export", {
        method: "POST",
        body: JSON.stringify({ format: "CSV" }),
        headers: headers,
      });
      resp = await resp.json();
      let exportId = resp.processStatusId,
        csv;
      if (!resp.links) return reject(resp);
      do {
        await new Promise((res) => setTimeout(res, 20e3));
        headers = await this.bolHeader(3);
        let status = await fetch(resp.links[0].href, {
          method: "GET",
          headers: headers,
        });
        status = await status.json();
        if (status.status == "SUCCESS") {
          exportId = status.entityId;
          headers = await this.bolHeader(3);
          headers["Accept"] = "application/vnd.retailer.v9+csv";
          headers["Content-Type"] = "application/x-www-form-urlencoded";
          let exported = await fetch(
            "https://api.bol.com/retailer/offers/export/" + exportId,
            {
              method: "GET",
              headers: headers,
            }
          );
          if (exported.status != 200) return reject();
          const fileStream = fs.createWriteStream("./export_offers.csv", {
            flags: "w",
          });
          try {
            await new Promise((res, rej) => {
              exported.body.pipe(fileStream);
              exported.body.on("error", (err) => {
                console.error(err);
                rej();
              });
              fileStream.on("finish", () => {
                csv = true;
                res();
              });
            });
          } catch (e) {
            return reject(e);
          }
        }
      } while (!csv);
      csvConverter()
        .fromFile("./export_offers.csv")
        .then((json) => {
          fs.unlink("./export_offers.csv", (err) => {
            return resolve(json);
          });
        })
        .catch((err) => {
          console.error(err);
          return reject();
        });
    } catch (e) {
      console.error(e);
      tries--;
      if (tries <= 0) return reject();
      return setTimeout(() => resolve(this.bolExport(tries)), 2000);
    }
  });
}

async function retrieveUnpublishedOfferReportById(reportId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/offers/unpublished/${reportId}`,
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
      return setTimeout(
        () => resolve(this.retrieveUnpublishedOfferReportById(tries)),
        2000
      );
    }
  });
}

async function retrieveOfferByOfferId(offerId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}`, {
        method: "get",
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(
        () => resolve(this.retrieveOfferByOfferId(tries)),
        2000
      );
    }
  });
}

async function updateOffer(offerId, offer, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}`, {
        method: "PUT",
        body: JSON.stringify(offer),
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.updateOffer(tries)), 2000);
    }
  });
}

async function deleteOffer(offerId, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(`https://api.bol.com/retailer/offers/${offerId}`, {
        method: "DELETE",
        headers: await this.bolHeader(2),
      });
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.deleteOffer(tries)), 2000);
    }
  });
}

async function updateOfferPrice(offerId, offerPrice, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/offers/${offerId}/price`,
        {
          method: "PUT",
          body: JSON.stringify(offerPrice),
          headers: await this.bolHeader(2),
        }
      );
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.updateOfferPrice(tries)), 2000);
    }
  });
}
async function updateOfferStock(offerId, offerStock, tries = 3) {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await fetch(
        `https://api.bol.com/retailer/offers/${offerId}/stock`,
        {
          method: "PUT",
          body: JSON.stringify(offerStock),
          headers: await this.bolHeader(2),
        }
      );
      resp = await resp.json();
      return resolve(resp);
    } catch (e) {
      tries--;
      if (tries <= 0) return reject(e);
      return setTimeout(() => resolve(this.updateOfferStock(tries)), 2000);
    }
  });
}

module.exports = {
  createNewOffer,
  exportOffers,
  retrieveUnpublishedOfferReportById,
  retrieveOfferByOfferId,
  updateOffer,
  deleteOffer,
  updateOfferPrice,
  updateOfferStock,
};
