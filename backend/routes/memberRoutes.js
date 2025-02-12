const express = require("express");
const {
  uploadMembers,
  getMembersByCategoryId,
} = require("../controller/members");

const router = express.Router();

router.post("/upload-members", uploadMembers);
router.get("/:id", getMembersByCategoryId);

module.exports = router;
