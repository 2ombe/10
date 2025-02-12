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
    CUSTOMER_ID: { type: String, required: true, unique: true },
    CUSTOMER_NAME: { type: String },
    CUSTOMER_OPEN_DATE: { type: String },
    SALUTATION: { type: String},
    SURNAME: { type: String },
    FORENAME_1: { type: String },
    FORENAME_2: { type: String },
    CUSTOMER_ACRONYM: { type: String },
    CUSTOMER_GENDER: {
      type: String,
      enum: ["Male", "Female", "Corporate", "Other"],
    },
    DATE_OF_BIRTH: { type: Date },
    PLACE_OF_BIRTH: { type: String},
    MARITAL_STATUS: { type: String },
    SPOUSE_NAME: { type: String },
    NEXT_OF_KIN_NAME: { type: String },
    NEXT_OF_KIN_ID_TYPE: { type: String },
    NEXT_OF_KIN_ID_NUMBER: { type: String },
    NEXT_OF_KIN_TELEPHONE: { type: String },
    NEXT_OF_KIN_EMAIL_ID: { type: String },
    NUMBER_OF_DEPENDANTS: { type: Number },
    ACCOUNT_MANDATE_NAME: { type: String },
    ACCOUNT_MANDATE_ID_TYPE: { type: String },
    ACCOUNT_MANDATE_ID_NUMBER: { type: String },
    NATIONALITY: { type: String, default:"Rwanda"},
    RESIDENCE: { type: String },
    EMAIL_ID: { type: String },
    WORK_TELEPHONE: { type: String },
    HOME_TELEPHONE: { type: String },
    CUSTOMER_TIN: { type: String },
    NATIONAL_ID_TYPE: { type: String },
    NATIONAL_ID_NUMBER: { type: String },
    HEALTH_INSURANCE_NUMBER: { type: String },
    OCCUPATION: { type: String},
  },
  plan: { type: String, required: true },
  members: [memberSchema],
  ValidityPeriod:{type:Date,required:true},
  discount: { type: Number, default: 1 },
  options: {
    Bronze: optionSchema,
    Silver: optionSchema,
    Gold: optionSchema,
    Platinum: optionSchema,
    // "Platinum Plus": optionSchema,
  },
  benefits: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
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

const LowCostQuotation = mongoose.model("LowCost", quotationSchema);

const quotationVersionSchema = new mongoose.Schema({
  originalQuotationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LowCost",
    required: true,
  },
  quotationData: { type: quotationSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LowcostQuotationVersion = mongoose.model(
  "LowCostQuotationVersion",
  quotationVersionSchema
);

module.exports = { LowCostQuotation, LowcostQuotationVersion };
