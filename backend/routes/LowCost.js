const express = require("express");
const router = express.Router();
const quotationController = require("../controller/Lowcost");

router.post("/", quotationController.createQuotation);
router.get("/single/:id", quotationController.getQuotation);
router.get("/count", quotationController.count);
router.get("/", quotationController.getAllQuotation);
router.get("/pending", quotationController.getPendingQuotationsByMonth);
router.get("/accepted", quotationController.acceptedQuotations);
router.get("/approved", quotationController.approvedQuotations);
router.get("/rejected", quotationController.rejectedQuotations);
router.get("/search", quotationController.searchCustomerByName);
router.get("/blocked", quotationController.blockedQuotations);
router.put("/:id", quotationController.updateCooperateStatus);
router.put("/lowcostQuotation/:id", quotationController.updateLowcostQuotation);
router.get("/:id/download", quotationController.downloadCertificate);
module.exports = router;
