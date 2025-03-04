// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/User");
const { isAuth } = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/signin", authController.login);
router.get("/", isAuth,authController.getAllUsers);
router.put("/:id", isAuth,authController.updateUser);

module.exports = router;
