// routes/quotationRoutes.js
const express = require("express");
const router = express.Router();
const quotationController = require("../controller/Retail");

router.post("/", quotationController.createQuotation);
router.get("/single/:id", quotationController.getQuotation);
router.put("/retailQuotation/:id", quotationController.updateRetailQuotation);
router.get("/", quotationController.getAllRetails);
router.get("/count", quotationController.count);
router.get("/pending", quotationController.getPendingQuotationsByMonth);
router.get("/accepted", quotationController.acceptedQuotations);
router.get("/approved", quotationController.approvedQuotations);
router.get("/rejected", quotationController.rejectedQuotations);
router.get("/blocked", quotationController.blockedQuotations);
router.get("/search", quotationController.searchCustomerByName);
router.get("/:id/download", quotationController.downloadCertificate);
router.put("/:id", quotationController.updateCooperateStatus);
router.delete("/", quotationController.deleteData);
module.exports = router;
