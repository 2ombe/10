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
    salutation: { type: String },
    institutionName: { type: String },

    tin: { type: String },
    countryOfRegistration: { type: String },
    dateOfRegistration: { type: Date },
    telephoneNumber: { type: String },
    email: { type: String },
    postOffice: { type: String },
    town: { type: String },
    corporateCategory: { type: String },
  },
  plan: { type: String },
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
  ValidityPeriod: { type: Date, required: true },
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
  agentData: {
    category: { type: String, enum: ["agent", "blocker"] },
    selectedBlocker: { type: String, default: null },
    selectedAgent: { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
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
