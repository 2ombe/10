const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  type: { type: String, required: true },
  age: { type: Number, required: true },
});

const optionSchema = new mongoose.Schema({
  totalInpatientPremium: { type: Number, required: true },
  totalOutpatientPremium: { type: Number, required: true },
  dentalPremium: { type: Number, required: true },
  opticalPremium: { type: Number, required: true },
  maternityPremium: { type: Number, required: true },
  basicPremium: { type: Number, required: true },
  mituelleDeSante: { type: Number, required: true },
  administrationFees: { type: Number, required: true },
  totalPremium: { type: Number, required: true },
});

const quotationSchema = new mongoose.Schema({
  beneficiaryInfo: {
    CUSTOMER_ID: { type: String, unique: true },
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
  plan: { type: String, required: true },
  members: [memberSchema],
  discount: { type: Number, default: 1 },
  options: {
    Bronze: optionSchema,
    Silver: optionSchema,
    Gold: optionSchema,
    Platinum: optionSchema,
    "Platinum Plus": optionSchema,
  },
  benefits: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
  ValidityPeriod:{type:Date,required:true},
  status: {
    type: String,
    enum: [
      "Pending",
      "Accepted",
      "Revise",
      "Rejected",
      "Block",
      "Waiting",
      "Approved",
    ],
    default: "Waiting",
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const SME = mongoose.model("SME", quotationSchema);

const quotationVersionSchema = new mongoose.Schema({
  originalQuotationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SME",
    required: true,
  },
  quotationData: { type: quotationSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SmeQuotationVersion = mongoose.model(
  "SmeQuotationVersion",
  quotationVersionSchema
);

module.exports = { SME, SmeQuotationVersion };
