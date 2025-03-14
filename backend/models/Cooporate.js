const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  limit: { type: String, required: true },
  members: { type: Number, required: true },
  premiumValues: { type: Map, of: Number, required: true },
  dependencies: { type: Map, of: Number, required: true },
  totalDependencies: { type: Map, of: Number, required: true },
  selectedCategory: {
    type: String,
    required: true,
    default: "Premium per Family",
  },
  totalPremiumValues: { type: Map, of: Number, required: true },
  totalPremium: { type: Number, required: true },
  totalStaffPerCategory: { type: Number, required: true },
});

const outCategorySchema = new mongoose.Schema({
  outId: { type: String, required: true },
  outLimit: { type: String, required: true },
  outMembers: { type: Number, required: true },
  outPremiumValues: { type: Map, of: Number, required: true },
  outDependencies: { type: Map, of: Number, required: true },
  selectedCategory: {
    type: String,
    required: true,
    default: "Premium per Family",
  },
  outTotalDependencies: { type: Map, of: Number, required: true },
  outTotalPremiumValues: { type: Map, of: Number, required: true },
  outTotalPremium: { type: Number, required: true },
});
const opticalCategorySchema = new mongoose.Schema({
  opticalId: { type: String, required: true },
  opticalLimit: { type: String, required: true },
  opticalMembers: { type: Number, required: true },
  opticalPremiumValues: { type: Map, of: Number, required: true },
  selectedCategory: {
    type: String,
    required: true,
    default: "Premium per Family",
  },
  opticalDependencies: { type: Map, of: Number, required: true },
  opticalTotalDependencies: { type: Map, of: Number, required: true },
  opticalTotalPremiumValues: { type: Map, of: Number, required: true },
  opticalTotalPremium: { type: Number, required: true },
});
const dentalCategorySchema = new mongoose.Schema({
  dentalId: { type: String, required: true },
  dentalLimit: { type: String, required: true },
  dentalMembers: { type: Number, required: true },
  dentalPremiumValues: { type: Map, of: Number, required: true },
  selectedCategory: {
    type: String,
    required: true,
    default: "Premium per Family",
  },
  dentalDependencies: { type: Map, of: Number, required: true },
  dentalTotalDependencies: { type: Map, of: Number, required: true },
  dentalTotalPremiumValues: { type: Map, of: Number, required: true },
  dentalTotalPremium: { type: Number, required: true },
});
const lastExpense = new mongoose.Schema({
  lastExpense: { type: Number, required: true },
});
const maternityTripletSchema = new mongoose.Schema({
  MaternityCoverLimit: { type: Number, required: true },
  RatePerFamily: { type: Number, required: true },
  GroupMinimumPremium: { type: Number, required: true },
});

const quotationSchema = new mongoose.Schema(
  {
    companyInfo: {
      CUSTOMER_ID: { type: String },
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
    agentData: {
      category: { type: String, enum: ["agent", "blocker"] },
      selectedBlocker: { type: String, default: null },
      selectedAgent: { type: String, default: null },
      email: { type: String, default: null },
      phoneNumber: { type: String, default: null },
    },
    requestedLimit: {
      requestedInpatientLimit: { type: Number },
      requestedOutPatientLimit: { type: Number },
      requestedDentalLimit: { type: Number },
      requestedOpticalLimit: { type: Number },
      maternityLimit: { type: Number },
    },
    selectedBenefits: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    selectedOpticalBenefits: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    selectedDentalBenefits: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    generalInclusionBenefits: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    cooporateCart: {
      categories: [categorySchema],
      overallTotals: {
        overallTotalPremium: { type: Number, required: true },
        overallDependenciesTotal: { type: Number, required: true },
        totalStaffFamily: { type: Number, required: true },
      },
    },

    extendedCategoriesCart: {
      extendedCategories: [
        {
          congenitalConditions: { type: Number },
          inpatientOphthalmology: { type: Number },
          inpatientDentalCover: { type: Number },
          chronicPercentage: { type: Number },
          initiatedDiscount: { type: Number, default: 0 },
          validityPeriod: { type: String },
        },
      ],
    },
    outCart: {
      outCategories: [outCategorySchema],
      outOverallTotals: {
        outOverallTotalPremium: { type: Number, required: true },
        outOverallDependenciesTotal: { type: Number, required: true },
      },
    },
    dentalCorp: {
      dentalCategories: [dentalCategorySchema],
      dentalOverallTotals: {
        dentalOverallTotalPremium: { type: Number, required: true },
        dentalOverallDependenciesTotal: { type: Number, required: true },
      },
    },
    optCorp: {
      opticalCategories: [opticalCategorySchema],
      opticalOverallTotals: {
        opticalOverallTotalPremium: { type: Number, required: true },
        opticalOverallDependenciesTotal: { type: Number, required: true },
      },
    },
    lastExpenseCart: [lastExpense],

    selectedTriplet: [maternityTripletSchema],
    totalMaternity: { type: Number, required: true },
    totalBasic: { type: Number, required: true },
    MutuelDeSante: { type: Number, required: true },
    AdminFee: { type: Number, required: true },
    ValidityPeriod: { type: Date, required: true },
    discount: { type: Number, default: 0 },
    loadings: { type: Number, default: 0 },
    overAllPremiumTotal: { type: Number, required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", default: null },
    assignedTo: { type: mongoose.Types.ObjectId, ref: "User", default: null },
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
  },
  { timestamps: true }
);

const Cooperate = mongoose.model("Cooperate", quotationSchema);

const quotationVersionSchema = new mongoose.Schema({
  originalQuotationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cooperate",
    required: true,
  },
  quotationData: { type: quotationSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CooperateVersion = mongoose.model(
  "CooperateVersion",
  quotationVersionSchema
);

module.exports = { Cooperate, CooperateVersion };
