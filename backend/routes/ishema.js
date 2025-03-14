const express = require("express");
const router = express.Router();
const quotationController = require("../controller/Ishema");

router.post("/", quotationController.createQuotation);
router.get("/single/:id", quotationController.getQuotation);
router.put("/:id", quotationController.updateQuotation);
router.put("/ishemaQuotation/:id", quotationController.updateIshemaQuotation);
router.get("/:id/download", quotationController.downloadCertificate);
router.get("/count", quotationController.count);
router.get("/pending", quotationController.getPendingQuotationsByMonth);
router.get("/accepted", quotationController.acceptedQuotations);
router.get("/approved", quotationController.approvedQuotations);
router.get("/rejected", quotationController.rejectedQuotations);
router.get("/blocked", quotationController.blockedQuotations);
router.get("/search", quotationController.searchCustomerByName);
router.get("/all/admin", quotationController.adminDocs);
router.get("/zose", quotationController.getAll);
router.get("/", quotationController.getAllQuotation);
router.get("/status/pending", quotationController.getPendingQuotations);

module.exports = router;
