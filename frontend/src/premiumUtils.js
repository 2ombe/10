// premiumUtils.js
export const premiumData = {
  "75,000,000": {
    M: 183674,
    "M+1": 275511,
    "M+2": 353573,
    "M+3": 427808,
    "M+4": 489798,
    "M+5": 551788,
    "M+6": 613778,
    Extra: 675768,
  },
  "67,500,000": {
    M: 176787,
    "M+1": 269389,
    "M+2": 346838,
    "M+3": 420308,
    "M+4": 482145,
    "M+5": 543982,
    "M+6": 605819,
    Extra: 61837,
  },
};

export const calculateOverallDependenciesTotal = (category) => {
  let overallTotal = 0;
  const labels = Object.keys(category.totalDependencies);

  for (let i = 0; i < labels.length; i++) {
    overallTotal += category.totalDependencies[labels[i]] || 0;
  }

  return overallTotal;
};

export const calculateTotalPremiumValue = (category) => {
  let totalPremiumValue = 0;
  const memberLabels = Array.from({ length: category.members + 1 }, (_, i) =>
    i === 0 ? "M" : `M+${i}`
  );
  for (let i = 0; i < memberLabels.length; i++) {
    const label = memberLabels[i];
    const premiumValuePerMember =
      (premiumData[category.limit]?.[label] || 0) *
      (category.dependencies[label] || 0);
    totalPremiumValue += premiumValuePerMember;
  }
  return totalPremiumValue;
};

export const calculateOverallTotals = (categories) => {
  let overallTotalPremium = 0;
  let overallDependenciesTotal = 0;
  let totalStaffFamily = 0;

  categories.forEach((category) => {
    overallTotalPremium += calculateTotalPremiumValue(category);
    overallDependenciesTotal += calculateOverallDependenciesTotal(category);
    const totalMembers = Object.values(category.dependencies).reduce(
      (sum, value) => sum + value,
      0
    );
    totalStaffFamily += totalMembers;
  });

  return { overallTotalPremium, overallDependenciesTotal, totalStaffFamily };
};

export const updateCategories = (categories) => {
  return categories.map((category) => {
    let updatedTotalDependencies = { ...category.totalDependencies };
    const labels = Object.keys(category.dependencies);

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const value = category.dependencies[label] || 0;
      let calculatedTotal = value;

      if (label !== "M") {
        const numDependents = parseInt(label.slice(2));
        calculatedTotal += numDependents * value;
      }

      updatedTotalDependencies[label] = calculatedTotal;
    }

    let totalPremiumValue = calculateTotalPremiumValue(category);
    let totalPremiumMValue = totalPremiumValue;

    const premiumValues = Object.keys(category.dependencies).reduce(
      (acc, key) => {
        acc[key] = premiumData[category.limit]?.[key] || 0;
        return acc;
      },
      {}
    );

    const totalPremiumValues = Object.keys(category.dependencies).reduce(
      (acc, key) => {
        acc[key] =
          (premiumData[category.limit]?.[key] || 0) *
          (category.dependencies[key] || 0);
        return acc;
      },
      {}
    );

    return {
      ...category,
      totalDependencies: updatedTotalDependencies,
      totalPremium: totalPremiumValue,
      totalPremiumM: totalPremiumMValue,
      premiumValues,
      totalPremiumValues,
    };
  });
};
