const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

// Create a new customer
router.post("/", customerController.createCustomer);
router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
