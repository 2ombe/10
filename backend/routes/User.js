// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/User");

router.post("/register", authController.register);
router.post("/signin", authController.login);
router.get("/", authController.getAllUsers);

module.exports = router;
