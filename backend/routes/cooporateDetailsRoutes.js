const express = require("express");
const router = express.Router();
const companyController = require("../controller/cooporateDetailsController");

// Route to create a company
router.post("/", companyController.createCompany);

// Route to get all companies
router.get("/", companyController.getCompanies);

// Route to get a specific company by ID
router.get("/:id", companyController.getCompanyById);

// Route to update a company
router.put("//:id", companyController.updateCompany);

// Route to delete a company
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
