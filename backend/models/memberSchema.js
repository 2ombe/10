const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  principalMember: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    idCode: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    phoneNumber: { type: String, required: true },
  },
  spouse: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    idCode: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    phoneNumber: { type: String, required: true },
  },
  children: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      idCode: { type: String, required: true },
      gender: { type: String, enum: ["Male", "Female"], required: true },
      phoneNumber: { type: String, required: true },
    },
  ],
});

const memberSchema = new mongoose.Schema({
  families: [familySchema],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cooperate",
    required: true,
  },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
