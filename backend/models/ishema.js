// models/Quotation.js
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  type: { type: String, required: true },
  limit: { type: Number, required: true },
});

const optionSchema = new mongoose.Schema({
  totalInpatientLimit: { type: Number, required: true },
  totalOutPatientLimit: { type: Number, required: true },
  totalInpatientPremium: { type: Number, required: true },
  totalOutpatientPremium: { type: Number, required: true },
  basicPremium: { type: Number, required: true },
  mituelleDeSante: { type: Number, required: true },
  administrationFees: { type: Number, required: true },
  totalPremium: { type: Number, required: true },
});

const quotationSchema = new mongoose.Schema({
  beneficiaryInfo: {
    CUSTOMER_ID: { type: String, required: true, unique: true },
    CUSTOMER_NAME: { type: String },
    CUSTOMER_OPEN_DATE: { type: String },
    SALUTATION: { type: String },
    SURNAME: { type: String },
    FORENAME_1: { type: String },
    FORENAME_2: { type: String },
    CUSTOMER_ACRONYM: { type: String },

    DATE_OF_BIRTH: { type: Date },
    PLACE_OF_BIRTH: { type: String },
    MARITAL_STATUS: { type: String },
    ACCOUNT_MANDATE_NAME: { type: String },
    ACCOUNT_MANDATE_ID_TYPE: { type: String },
    ACCOUNT_MANDATE_ID_NUMBER: { type: String },
    NATIONALITY: { type: String, default: "Rwanda" },
    RESIDENCE: { type: String },
    EMAIL_ID: { type: String },
    HOME_TELEPHONE: { type: String },
    NATIONAL_ID_TYPE: { type: String },
    NATIONAL_ID_NUMBER: { type: String },
    OCCUPATION: { type: String },
  },
  agentData: {
    category: { type: String, enum: ["agent", "blocker"] },
    selectedBlocker: { type: String, default: null },
    selectedAgent: { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
  },
  plan: { type: String, required: true },
  members: [memberSchema],
  discount: { type: Number, default: 1 },
  options: {
    "Option 1": optionSchema,
    "Option 2": optionSchema,
    "Option 3": optionSchema,
    "Option 4": optionSchema,
  },
  benefits: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    required: true[
      ("Pending",
      "Accepted",
      "Revise",
      "Rejected",
      "Block",
      "Waiting",
      "Approved")
    ],
    default: "Waiting",
  },
  ValidityPeriod: { type: Date, required: true },
  totalMembers: { type: Number },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Quotation = mongoose.model("Quotation", quotationSchema);

const quotationVersionSchema = new mongoose.Schema({
  originalQuotationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quotation",
    required: true,
  },
  quotationData: { type: quotationSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

const IshemaQuotationVersion = mongoose.model(
  "IshemaQuotationVersion",
  quotationVersionSchema
);

module.exports = { Quotation, IshemaQuotationVersion };
