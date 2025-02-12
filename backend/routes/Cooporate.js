const express = require("express");
const router = express.Router();
const {
  createCooporate,
  getCooporateById,
  getAllCooporate,
  docs,
  updateCooperate,
  updateCooperateStatus,
  downloadCooperateCertificate,
  searchCooperateByInstitutionName,
  getPendingQuotationsByMonth,
  acceptedQuotations,
  approvedQuotations,
  rejectedQuotations,
  blockedQuotations,
} = require("../controller/Cooporate");

router.post("/", createCooporate);
router.get("/single/:id", getCooporateById);
router.get("/", getAllCooporate);
router.put("/version/:id", updateCooperate);
router.get("/pending", getPendingQuotationsByMonth);
router.get("/accepted", acceptedQuotations);
router.get("/approved", approvedQuotations);
router.get("/rejected", rejectedQuotations);
router.get("/blocked", blockedQuotations);
router.get("/search", searchCooperateByInstitutionName);
router.get("/all", docs);
router.put("/:id", updateCooperateStatus);
router.get("/:id/download", downloadCooperateCertificate);

module.exports = router;
