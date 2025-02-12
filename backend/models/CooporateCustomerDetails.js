const mongoose = require("mongoose");

const cooporateDetailsSchema = new mongoose.Schema(
  {
    CUSTOMER_ID: { type: String, required: true, unique: true },
    salutation: { type: String, required: true },
    institutionName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    tin: { type: String, required: true },
    countryOfRegistration: { type: String, required: true },
    dateOfRegistration: { type: Date, required: true },
    telephoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    postOffice: { type: String },
    town: { type: String, required: true },
    corporateCategory: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Company = mongoose.model("Company", cooporateDetailsSchema);
module.exports = Company;
