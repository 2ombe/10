// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "assistant_underwriter",
        "underwriter",
        "senior_underwriter",
        "medical_manager",
        "operational_manager",
        "admin"
      ],
      required: true,
    },
    isAsUnderwritter:{type:Boolean,default:false},
    isUnderWriter:{type:Boolean,default:false},
    isSeniorUnderWriter:{type:Boolean,default:false},
    isHeadofMedical:{type:Boolean,default:false},
    isOperationManager:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
