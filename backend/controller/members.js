const { Cooperate } = require("../models/Cooporate");
const Member = require("../models/memberSchema");

exports.uploadMembers = async (req, res) => {
  try {
    const { categoryId, families } = req.body;

    // Validate that all required fields are present

    const newMember = new Member({ categoryId, families });
    console.log(newMember);

    await newMember.save();
    res.status(201).json({ message: "Members uploaded successfully" });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};
exports.getMembersByCategoryId = async (req, res) => {
  const { id } = req.params;

  try {
    const members = await Member.findOne({ categoryId: id }).populate(
      "categoryId"
    );
    if (!members || members.length === 0) {
      return res
        .status(404)
        .json({ message: "No members found for this category" });
    }
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
