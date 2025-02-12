import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  selectedBenefits: [],
  generalInclusionBenefits:[],
  selectedDentalBenefits: [],
  selectedOpticalBenefits: [],
  ishemaCart: {
    principalAgeGroup: "65-80",
    spouseAgeGroup: "65-80",
    totalPremium: [0, 0, 0, 0],
    ishemaInfo: null,
    ishemaBenefitOptions: [],
    principalCount: 1,
    spouseCount: 1,
    limit: "",
    dependencies: {},
    totalDependencies: 0,
    totalPremiumValue: 0,
  },
  cart: {
    principalAgeGroup: "19-29",
    spouseAgeGroup: "19-29",
    children: [{ ageGroup: "19-29", above18: false }],
    totalPremium: [0, 0, 0, 0, 0],
    maternityOption: {},
    opticalOption: [],
    dentalOption: [],
    retailBenefitOptions: [],
    retailInfo: null,
    outOption: [],
    principalCount: 1,
    spouseCount: 1,
    childCount: 1,
    limit: "",
    dependencies: {},
    totalDependencies: 0,
    totalPremiumValue: 0,
  },
  cooporateCart: {
    categories: [
      {
        id: 1,
        limit: "",
        members: 0,
        dependencies: {},
        totalDependencies: {},
        totalPremium: 0,
        totalPremiumM: 0,
        premiumValues: {},
        totalPremiumValues: {},
      },
    ],
    overallTotals: {
      overallTotalPremium: 0,
      overallDependenciesTotal: 0,
      overallDependancies: 0,
    },
  },
  outCart: {
    outCategories: [
      {
        outId: 1,
        outLimit: "",
        outMembers: 0,
        outDependencies: {},
        outTotalDependencies: {},
        outTotalPremium: 0,
        outTotalPremiumM: 0,
        outPremiumValues: {},
        outTotalPremiumValues: {},
      },
    ],
    outOverallTotals: {
      outOverallTotalPremium: 0,
      outOverallDependenciesTotal: 0,
    },
  },
  dentalCorp: {
    dentalCategories: [
      {
        dentalId: 1,
        dentalLimit: "",
        dentalMembers: 0,
        dentalDependencies: {},
        dentalTotalDependencies: {},
        dentalTotalPremium: 0,
        dentalTotalPremiumM: 0,
        dentalPremiumValues: {},
        dentalTotalPremiumValues: {},
        selectedCategory: "",
      },
    ],
    dentalOverallTotals: {
      dentalOverallTotalPremium: 0,
      dentalOverallDependenciesTotal: 0,
    },
  },
  lastExpenseCart:{
    lastExpenseCategories:[{
      lastExpense:0
    } ]
  },
  optCorp: {
    opticalCategories: [
      {
        opticalId: 1,
        opticalLimit: "",
        opticalMembers: 0,
        opticalDependencies: {},
        opticalTotalDependencies: {},
        opticalTotalPremium: 0,
        opticalTotalPremiumM: 0,
        opticalPremiumValues: {},
        opticalTotalPremiumValues: {},
        selectedCategory: "",
      },
    ],
    
    opticalOverallTotals: {
      opticalOverallTotalPremium: 0,
      opticalOverallDependenciesTotal: 0,
      opticalOverallDependancies: 0,
    },
  },
  
  selectedTriplet: null,
  totalRatePerFamily: 0,
  companyInfo: null,
  blockerInfo:null,
  extendedCategories: [],
};

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return { ...state, userInfo: null };
    case "SET_PRINCIPAL_AGE_GROUP":
      return {
        ...state,
        cart: {
          ...state.cart,
          principalAgeGroup: action.payload,
        },
      };
    case "SET_SPOUSE_AGE_GROUP":
      return {
        ...state,
        cart: {
          ...state.cart,
          spouseAgeGroup: action.payload,
        },
      };
    case "SET_CHILDREN":
      return {
        ...state,
        cart: {
          ...state.cart,
          children: action.payload,
        },
      };

    case "SAVE_EXTENDED":
      return {
        ...state,
        extendedCategories: [...state.extendedCategories, action.payload],
      };

    case "ADD_CHILD":
      const newChildren = [
        ...state.cart.children,
        { ageGroup: "19-29", above18: false },
      ];
      return {
        ...state,
        cart: {
          ...state.cart,
          children: newChildren,
          childCount: state.cart.childCount + 1,
        },
      };
    case "REMOVE_CHILD":
      // Add logic to remove child, if needed
      return state;
    case "SET_TOTAL_PREMIUM":
      return {
        ...state,
        cart: {
          ...state.cart,
          totalPremium: action.payload,
        },
      };
    case "SET_RATE_PER_FAMILY":
      return {
        ...state,
        totalRatePerFamily: action.payload,
      };
    case "SET_ISHEMA_TOTAL_PREMIUM":
      return {
        ...state,
        ishemaCart: {
          ...state.ishemaCart,
          totalPremium: action.payload,
        },
      };
    case "SET_ISHEMA_PRINCIPAL_AGE_GROUP":
      return {
        ...state,
        ishemaCart: {
          ...state.ishemaCart,
          principalAgeGroup: action.payload,
        },
      };
    case "SET_ISHEMA_SPOUSE_AGE_GROUP":
      return {
        ...state,
        ishemaCart: {
          ...state.ishemaCart,
          spouseAgeGroup: action.payload,
        },
      };
    case "SET_SELECTED_ISHEMA_BENEFITS":
      return {
        ...state,
        ishemaCart: {
          ...state.ishemaCart,
          ishemaBenefitOptions: action.payload,
        },
      };
    case "SET_ISHEMA_INFO":
      return {
        ...state,
        ishemaCart: {
          ...state.ishemaCart,
          ishemaInfo: action.payload,
        },
      };
    case "SET_ISHEMA_OUT":
      return {
        ...state,
        ishemaCart: {
          ...state.ishemaCart,
          outOption: action.payload,
        },
      };
    case "SET_MATERNITY":
      return {
        ...state,
        cart: {
          ...state.cart,
          maternityOption: action.payload,
        },
      };
    case "SET_OPTICAL":
      return {
        ...state,
        cart: {
          ...state.cart,
          opticalOption: action.payload,
        },
      };
    case "SET_SELECTED_RETAIL_BENEFITS":
      return {
        ...state,
        cart: {
          ...state.cart,
          retailBenefitOptions: action.payload,
        },
      };
    case "SET_RETAIL_INFO":
      return {
        ...state,
        cart: {
          ...state.cart,
          retailInfo: action.payload,
        },
      };
    case "SET_DENTAL":
      return {
        ...state,
        cart: {
          ...state.cart,
          dentalOption: action.payload,
        },
      };
    case "SET_OUT":
      return {
        ...state,
        cart: {
          ...state.cart,
          outOption: action.payload,
        },
      };
    case "SET_OUT_CART":
      return {
        ...state,
        outCart: action.payload,
      };
    case "SET_CORP_DENTAL":
      return {
        ...state,
        dentalCorp: action.payload,
      };
    case "SET_CORP_OPTICAL":
      return {
        ...state,
        optCorp: action.payload,
      };
    case "SET_LAST_INFO":
      return {
        ...state,
        lastExpenseCart: action.payload,
      };
    case "SET_LIMIT":
      return {
        ...state,
        cart: {
          ...state.cart,
          limit: action.payload,
        },
      };
    case "SET_DEPENDENCIES":
      return {
        ...state,
        cart: {
          ...state.cart,
          dependencies: action.payload,
        },
      };
    case "SET_TOTAL_DEPENDENCIES":
      return {
        ...state,
        cart: {
          ...state.cart,
          totalDependencies: action.payload,
        },
      };
    case "SET_TOTAL_PREMIUM_VALUE":
      return {
        ...state,
        cart: {
          ...state.cart,
          totalPremiumValue: action.payload,
        },
      };
    case "SET_COOPORATE_CART":
      return {
        ...state,
        cooporateCart: action.payload,
      };
    case "SET_SELECTED_TRIPLET":
      return {
        ...state,
        selectedTriplet: action.payload,
      };
    case "SET_COMPANY_INFO":
      return {
        ...state,
        companyInfo: action.payload,
      };
    case "SET_BLOCKER_INFO":
      return {
        ...state,
        blockerInfo: action.payload,
      };
    case "CLEAR_LOCAL_STORAGE":
      localStorage.clear();
      return initialState;
    case "SET_SELECTED_BENEFITS":
      return {
        ...state,
        selectedBenefits: action.payload,
      };
    case "SET_GENERAL_INCLUSION_BENEFITS":
      return {
        ...state,
        generalInclusionBenefits: action.payload,
      };
    case "SET_OPTICAL_SELECTED_BENEFITS":
      return {
        ...state,
        selectedOpticalBenefits: action.payload,
      };
    case "SET_DENTAL_SELECTED_BENEFITS":
      return {
        ...state,
        selectedDentalBenefits: action.payload,
      };
    case "SET_OVERALL_TOTALS":
      return {
        ...state,
        cooporateCart: {
          ...state.cooporateCart,
          overallTotals: action.payload,
        },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    localStorage.setItem("cooporateCart", JSON.stringify(state.cooporateCart));
    localStorage.setItem("outCart", JSON.stringify(state.outCart));
    localStorage.setItem("dentalCorp", JSON.stringify(state.dentalCorp));
    localStorage.setItem("optCorp", JSON.stringify(state.optCorp));
    localStorage.setItem(
      "selectedBenefits",
      JSON.stringify(state.selectedBenefits)
    );
    localStorage.setItem(
      "generalInclusionBenefits",
      JSON.stringify(state.generalInclusionBenefits)
    );
    localStorage.setItem(
      "selectedOpticalBenefits",
      JSON.stringify(state.selectedOpticalBenefits)
    );
    localStorage.setItem(
      "selectedDentalBenefits",
      JSON.stringify(state.selectedDentalBenefits)
    );
    localStorage.setItem(
      "selectedTriplet",
      JSON.stringify(state.selectedTriplet)
    );
    localStorage.setItem("ishemaCart", JSON.stringify(state.ishemaCart));
    localStorage.setItem(
      "extendedCategories",
      JSON.stringify(state.extendedCategories)
    );
  }, [
    state.cart,
    state.userInfo,
    state.cooporateCart,
    state.outCart,
    state.dentalCorp,
    state.optCorp,
    state.selectedBenefits,
    state.selectedOpticalBenefits,
    state.selectedDentalBenefits,
    state.selectedTriplet,
    state.ishemaCart,
    state.extendedCategories,
    state.generalInclusionBenefits
  ]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
