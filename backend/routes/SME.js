// routes/quotationRoutes.js
const express = require("express");
const router = express.Router();
const quotationController = require("../controller/SME");

router.post("/", quotationController.createQuotation);
router.get("/single/:id", quotationController.getQuotation);
router.get("/count", quotationController.count);
router.get("/pending", quotationController.getPendingQuotationsByMonth);
router.get("/accepted", quotationController.acceptedQuotations);
router.get("/approved", quotationController.approvedQuotations);
router.get("/rejected", quotationController.rejectedQuotations);
router.get("/blocked", quotationController.blockedQuotations);
router.get("/search", quotationController.searchSMEByInstitutionName);
router.get("/", quotationController.allSMEs);
router.put("/smeQuotation/:id", quotationController.updateSmeQuotation);
router.put("/:id/update", quotationController.updateCooperateStatus);
router.get("/:id/download", quotationController.downloadCertificate);
module.exports = router;
