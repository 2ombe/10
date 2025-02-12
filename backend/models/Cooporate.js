const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  limit: { type: String, required: true },
  members: { type: Number, required: true },
  premiumValues: { type: Map, of: Number, required: true },
  dependencies: { type: Map, of: Number, required: true },
  totalDependencies: { type: Map, of: Number, required: true },
  totalPremiumValues: { type: Map, of: Number, required: true },
  totalPremium: { type: Number, required: true },

});

const outCategorySchema = new mongoose.Schema({
  outId: { type: String, required: true },
  outLimit: { type: String, required: true },
  outMembers: { type: Number, required: true },
  outPremiumValues: { type: Map, of: Number, required: true },
  outDependencies: { type: Map, of: Number, required: true },
  outTotalDependencies: { type: Map, of: Number, required: true },
  outTotalPremiumValues: { type: Map, of: Number, required: true },
  outTotalPremium: { type: Number, required: true },

});
const opticalCategorySchema = new mongoose.Schema({
  opticalId: { type: String, required: true },
  opticalLimit: { type: String, required: true },
  opticalMembers: { type: Number, required: true },
  opticalPremiumValues: { type: Map, of: Number, required: true },
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
  dentalDependencies: { type: Map, of: Number, required: true },
  dentalTotalDependencies: { type: Map, of: Number, required: true },
  dentalTotalPremiumValues: { type: Map, of: Number, required: true },
  dentalTotalPremium: { type: Number, required: true },

});
const lastExpense= new mongoose.Schema({
  lastExpense: { type: Number, required: true },
  
})
const maternityTripletSchema = new mongoose.Schema({
  MaternityCoverLimit: { type: Number, required: true },
  RatePerFamily: { type: Number, required: true },
  GroupMinimumPremium: { type: Number, required: true },
  
});

const quotationSchema = new mongoose.Schema(
  {
    companyInfo: {
      CUSTOMER_ID: { type: String, unique: true },
      salutation: { type: String },
      institutionName: { type: String, required: true },   
      tin: { type: String, required: true },
      countryOfRegistration: { type: String, required: true },
      dateOfRegistration: { type: Date, required: true },
      telephoneNumber: { type: String, required: true },
      email: { type: String, required: true },
      postOffice: { type: String },
      town: { type: String, required: true },
      corporateCategory: { type: String, required: true },
    },
    agentData:{
      category: { type: String, required: true, enum: ["agent", "blocker"] },
      selectedBlocker: { type: String, default: null },
      selectedAgent: { type: String, default: null },
      email: { type: String, default: null },
      phoneNumber: { type: String, default: null },
    },
    selectedBenefits: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    selectedOpticalBenefits: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    selectedDentalBenefits: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    generalInclusionBenefits: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
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
          congenitalConditions: { type: String, required: true },
          inpatientOphthalmology: { type: String, required: true },
          inpatientDentalCover: { type: String, required: true },
          inpatientTreatment: { type: String, required: true },
          chronicPercentage:{type:Number}
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
    lastExpenseCart:[lastExpense],
    
    selectedTriplet: [maternityTripletSchema],
    totalMaternity: { type: Number, required: true },
    totalBasic: { type: Number, required: true },
    MutuelDeSante: { type: Number, required: true },
    AdminFee: { type: Number, required: true },
    ValidityPeriod: { type: Date, required: true },
    discount: { type: Number, default: 0 },
    loadings:{type:Number,default:0},
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
