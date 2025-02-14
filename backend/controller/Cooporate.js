const { Cooperate, CooperateVersion } = require("../models/Cooporate");
const fs = require("fs");
const moment = require("moment");
const pdf = require("html-pdf");
const photoPath = "./photos/horizontal.jpg";
const photoBase64 = fs.readFileSync(photoPath).toString("base64");
const photoMimeType = "image/jpeg";
exports.createCooporate = async (req, res) => {
  const {
    companyInfo,
    agentData,
    selectedBenefits,
    selectedOpticalBenefits,
    selectedDentalBenefits,
    cooporateCart,
    extendedCategoriesCart,
    outCart,
    dentalCorp,
    optCorp,
    selectedTriplet,
    totalMaternity,
    totalBasic,
    MutuelDeSante,
    AdminFee,
    overAllPremiumTotal,
    assignedTo,
    status,
    agentCart,
    lastExpenseCart,
    generalInclusionBenefits
  } = req.body;

  const ValidityPeriod = new Date();
  ValidityPeriod.setMonth(ValidityPeriod.getMonth() + 1);

  const newQuotation = new Cooperate({
    companyInfo,
    agentData,
    selectedBenefits,
    selectedDentalBenefits,
    selectedOpticalBenefits,
    cooporateCart,
    ValidityPeriod: ValidityPeriod,
    outCart,
    dentalCorp,
    optCorp,
    extendedCategoriesCart,
    selectedTriplet,
    totalMaternity,
    totalBasic,
    MutuelDeSante,
    AdminFee,
    overAllPremiumTotal,
    createdBy: req.user._id,
    assignedTo,
    status,
    agentCart,
    lastExpenseCart,
    generalInclusionBenefits
  });

  try {
    const savedQuotation = await newQuotation.save();
    res.status(201).json(savedQuotation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCooporate = async (req, res) => {
  try {
    const allQuotations = await Cooperate.find();
    res.status(200).json(allQuotations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getPendingQuotations = async (req, res) => {
  try {
    const { day, month, year } = req.query;
    const dateFilter = {};
    if (year) dateFilter.$gte = new Date(`${year}-01-01`);
    if (month) {
      const monthDate = `${year || new Date().getFullYear()}-${month.padStart(
        2,
        "0"
      )}-01`;
      dateFilter.$gte = new Date(monthDate);
      dateFilter.$lt = new Date(
        new Date(monthDate).setMonth(new Date(monthDate).getMonth() + 1)
      );
    }
    if (day && month && year) {
      const exactDate = new Date(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
      dateFilter.$gte = exactDate;
      dateFilter.$lt = new Date(exactDate.getTime() + 24 * 60 * 60 * 1000);
    }

    const filter = {
      status: "Pending",
      ...(Object.keys(dateFilter).length && { createdAt: dateFilter }),
    };

    const quotations = await Quotation.find(filter)
      .sort({ createdAt: -1 }) // Sort by most recent first
      .populate("createdBy", "name email");

    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotations", error });
  }
};

exports.getCooporateById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Cooperate.findById(id).populate(
      "createdBy",
      "name role"
    );
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.status(200).json(quotation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.docs = async (req, res) => {
  try {
    const count = await Cooperate.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getPendingQuotationsByMonth = async (req, res) => {
  const { month, year } = req.query;

  try {
    const startDate = moment(`${year}-${month}-01`)
      .startOf("month")
      .startOf("day")
      .utc()
      .toDate();
    const endDate = moment(startDate).endOf("month").utc().toDate();

    const quotations = await Cooperate.find({
      status: "Waiting",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("createdBy", "name")
      .exec();
    res.json(quotations);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ message: "Error fetching quotations." });
  }
};

exports.acceptedQuotations = async (req, res) => {
  const { year, month } = req.query;
  try {
    const startDate = moment(`${year}-${month}-01`)
      .startOf("month")
      .startOf("day")
      .utc()
      .toDate();
    const endDate = moment(startDate).endOf("month").utc().toDate();
    const closed = await Cooperate.find({
      status: "Accepted",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("createdBy", "name")
      .exec();
    res.json(closed);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ message: "Error fetching quotations." });
  }
};

exports.approvedQuotations = async (req, res) => {
  const { year, month } = req.query;
  try {
    const startDate = moment(`${year}-${month}-01`)
      .startOf("month")
      .startOf("day")
      .utc()
      .toDate();
    const endDate = moment(startDate).endOf("month").utc().toDate();
    console.log(startDate);

    const approved = await Cooperate.find({
      status: "Approved",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("createdBy", "name")
      .exec();
    res.json(approved);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ message: "Error fetching quotations." });
  }
};
exports.rejectedQuotations = async (req, res) => {
  const { year, month } = req.query;
  try {
    const startDate = moment(`${year}-${month}-01`)
      .startOf("month")
      .startOf("day")
      .utc()
      .toDate();
    const endDate = moment(startDate).endOf("month").utc().toDate();
    const rejected = await Cooperate.find({
      status: "Rejected",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("createdBy", "name")
      .exec();
    res.json(rejected);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ message: "Error fetching quotations." });
  }
};
exports.blockedQuotations = async (req, res) => {
  const { year, month } = req.query;
  try {
    const startDate = moment(`${year}-${month}-01`)
      .startOf("month")
      .startOf("day")
      .utc()
      .toDate();
    const endDate = moment(startDate).endOf("month").utc().toDate();
    const blocked = await Cooperate.find({
      status: "Block",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("createdBy", "name")
      .exec();
    res.json(blocked);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ message: "Error fetching quotations." });
  }
};

exports.searchCooperateByInstitutionName = async (req, res) => {
  const { institutionName } = req.query;

  if (!institutionName) {
    return res.status(400).json({ message: "Institution name is required" });
  }

  try {
    const results = await Cooperate.find({
      "companyInfo.institutionName": { $regex: institutionName, $options: "i" }, 
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "No quotations found." });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while searching." });
  }
};

exports.updateCooperate = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const userId = req.user._id;
  try {
    const existingCooperate = await Cooperate.findById(id);
    if (!existingCooperate) {
      return res.status(404).json({ message: "Cooperate document not found" });
    }

    const cooperateVersion = new CooperateVersion({
      originalQuotationId: existingCooperate._id,
      quotationData: existingCooperate.toObject(),
    });
    await cooperateVersion.save();

    Object.assign(existingCooperate, updateData, {
      updatedBy: userId,
      updatedAt: Date.now(),
    });
    const updatedCooperate = await existingCooperate.save();

    res.status(200).json({
      message: "Cooperate document updated successfully",
      updatedCooperate,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.updateCooperateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, discount,loadings } = req.body;

    const quotation = await Cooperate.findById(id);
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    const ValidityPeriod = new Date();
    ValidityPeriod.setMonth(ValidityPeriod.getMonth() + 1);
    if (discount) {
      quotation.status = status;
      quotation.discount = discount;
      (quotation.ValidityPeriod = ValidityPeriod),
        (quotation.overAllPremiumTotal =
          (quotation.overAllPremiumTotal * discount) / 100);
      quotation.updatedBy = req.user;
      await quotation.save();
    }else if(loadings){
      quotation.status = status;
      quotation.loadings = loadings;
      (quotation.ValidityPeriod = ValidityPeriod),
        (quotation.overAllPremiumTotal =
          (quotation.overAllPremiumTotal * loadings) / 100);
      quotation.updatedBy = req.user;
      await quotation.save();
    } else {
      quotation.status = status;
      quotation.updatedBy = req.user;
      await quotation.save();
    }

    res.status(200).json({ message: "Status updated successfully", quotation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.downloadCooperateCertificate = async (req, res) => {
  const { id } = req.params;
  const data = await Cooperate.findById(id)
    .populate("createdBy")
    .populate("updatedBy");

  if (!data) {
    return res.status(404).send("Quotation not found");
  }

  const congenitalConditionsValues =
    data.extendedCategoriesCart.extendedCategories.map(
      (extended) => extended.congenitalConditions
    );
  const inpatientOphthalmologyValues =
    data.extendedCategoriesCart.extendedCategories.map(
      (extended) => extended.inpatientOphthalmology
    );
  const inpatientChronic =
    data.extendedCategoriesCart.extendedCategories.map(
      (extended) => extended.chronicPercentage
    );
  const formattedDate = new Date(data.ValidityPeriod).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const inpatientDentalCoverValues =
    data.extendedCategoriesCart.extendedCategories.map(
      (extended) => extended.inpatientDentalCover
    );
  const inpatientTreatmentValues =
    data.extendedCategoriesCart.extendedCategories.map(
      (extended) => extended.inpatientTreatment
    );

  const generateCategoryTable = (
    category,
    outCategory,
    dentalCategory,
    opticalCategory,
    maternityCategory,
    lastExpenses
  ) => {
    const labels = Array.from({ length: category.members + 1 }, (_, i) =>
      i === 0 ? "M" : `M+${i}`
    );

    return `
      <table class="table">
      <thead>
      <tr>
      <th>Benefits</th>
      <th>Limit</th>
      </tr>
      </thead>
      <tr>
      <td>Inpatient</td>
    <td>${category.limit||""}</td>
      <td>Per family</td>
      </tr>
      <tr>
      <td>Outpatient</td>
     <td>${outCategory.outLimit?.toLocaleString()||0}</td>
      <td>Per family</td>
      </tr>
      <tr>
      <td>Maternity</td>
      <td>${maternityCategory.MaternityCoverLimit?.toLocaleString() || 0}</td>
      <td>Per family</td>
      </tr>
      <tr>
      <td>Optical</td>
      <td>${opticalCategory.opticalLimit?.toLocaleString()||0}</td>
      <td>Per Person</td>
      </tr>
      <tr>
      <td>Dental</td>
     <td>${dentalCategory.dentalLimit?.toLocaleString()||0}</td>
      <td>Per Person</td>
      </tr>
      <tr>
      <td>Last expense</td>
      <td>${lastExpenses.lastExpense?.toLocaleString()||0}</td>
      <td>Per Person</td>
      </tr>
      <tr>
      <td>Overall limit</td>
      <td>${(
        Number(category.limit.replace(/\D/g, "")) +
        Number(outCategory.outLimit.replace(/\D/g, "")) +
        Number(opticalCategory.opticalLimit.replace(/\D/g, "")) +
        Number(dentalCategory.dentalLimit.replace(/\D/g, "")) +
        Number(lastExpenses.lastExpense) +
        (maternityCategory.MaternityCoverLimit|| 0)
      ).toLocaleString()||0}</td>
      <td>Annually</td>
      </tr>
        <thead>
          <tr>
            <th>Family size</th>
            <th>Number of staff</th>
            <th>Premium</th>
            <th>Basic Premium</th>
          </tr>
        </thead>
        <tbody>
          ${labels
            .map(
              (label) => `
            <tr>
              <td>${label}</td>
              <td>${category.dependencies?.get(label) || 0}</td>
              <td>${(
                (category.premiumValues?.get(label) || 0) +
                (outCategory?.outPremiumValues?.get(label) || 0) +
                (dentalCategory?.dentalPremiumValues?.get(label) || 0) +
                (opticalCategory?.opticalPremiumValues?.get(label) || 0)
              ).toLocaleString()||0}</td>
              
              <td>${(
                (category.totalPremiumValues?.get(label) || 0) +
                (outCategory?.outTotalPremiumValues?.get(label) || 0) +
                (dentalCategory?.dentalTotalPremiumValues?.get(label) || 0) +
                (opticalCategory?.opticalTotalPremiumValues?.get(label) || 0)
              ).toLocaleString()||0}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
        <thead>
        <th>Total Premium</th>
        <th>${data.cooporateCart.overallTotals.totalStaffFamily.toLocaleString()||0}</th>
        <th></th>
        <th>${data.totalBasic.toLocaleString()||0}</th>
        </thead>
        <tbody>
        <tr>
        <td>Mutuelle de Santé (5% of the Total Premium)</td>
        <td></td>
        <td></td>
        <td>${data.MutuelDeSante.toLocaleString()||0}</td>
        </tr>
        <tr>
        <td>Administration fees (10,000 rwf per life)</td>
        <td></td>
        <td></td>
        <td>${data.AdminFee.toLocaleString()||0}</td>
        </tr>
        <tr>
        <td>Total premium</td>
        <td></td>
        <td></td>
        <td>${data.overAllPremiumTotal.toLocaleString()||0}</td>
        </tr>
        </tbody>
      </table>
    `;
  };

  const categoryTables = data.cooporateCart.categories
    .map((category, index) => {
      const outCategory = data.outCart.outCategories[index] || {};
      const dentalCategory = data.dentalCorp.dentalCategories[index] || {};
      const opticalCategory = data.optCorp.opticalCategories[index] || {};
      const maternityCategory = data.selectedTriplet[index] || {};
      const lastExpenses = data.lastExpenseCart[index]||{}

      return `
      ${index !== 0 ? '<div class="page-break"></div>' : ""}
      <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
      <h3>Category ${category.id}</h3>
      ${generateCategoryTable(
        category,
        outCategory,
        dentalCategory,
        opticalCategory,
        maternityCategory,
        lastExpenses
      )}
    `;
    })
    .join("");

  const html = `
    <html>
      <head>
       <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            width: auto;
            margin: 12px auto;
            padding: 20px;
          }
          .header, .footer {
            text-align: center;
            color: #006400; /* Dark Green Titles */
          }
          .content {
            margin-top: 100px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .table th, .table td {
            border: 1px solid black;
            padding: 10px;
          }
          .table th {
            background-color: #f2f2f2;
          }
          h3 {
            color: #006400; /* Dark Green Titles */
          }
          .page-break {
            page-break-before: always;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
           <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
            <h1>Medical Insurence Quotation proposal for ${
              data.companyInfo.institutionName
            }</h1>
          </div>
          <div class="content">
            <h3>Company Info</h3>
            <p>Company: ${data.companyInfo.institutionName}</p>
            <p>The proposal is valid until : ${formattedDate}</p>

            <h3>Benefits</h3>
            
            <div>
            <h3>
            OLD MUTUAL MEDICAL INSURANCE SCHEME CORPORATE PROPOSAL FOR
STAFF &amp; DEPENDANTS </h3>
<p>
OLD MUTUAL Insurance Rwanda was licensed in 2012 under the names of Old Mutual
and started operations in 2013. OLD MUTUAL INSURANCE RWANDA PLC is a
wholly owned subsidiary of OLD MUTUAL Holdings Limited, a Pan-African
Investment Company, which is engaged in financial services ranging from insurance,
investments management and real property investments. OLD MUTUAL has been in
existence the region for the last 175 years.
</p>
<p>
Currently OLD MUTUAL has twelve (12) businesses operating in 6 markets i.e.
Rwanda, Kenya, Uganda, South Sudan, DRC and Tanzania. OLD MUTUAL Holdings
ltd is the holding company for the various OLD MUTUAL Subsidiaries and its offices
are based in South Africa. The subsidiaries which transact insurance business are 6,
investment 3, property 3 and insurance brokerage in DRC. In June 2015, Old Mutual
Holdings was acquired by Old Mutual and is now member of the OLD MUTUAL
Group.
</p>
<p>
The OLD MUTUAL Rwanda corporate medical Insurance scheme is designed to
meet the requirements of corporate clients/groups with a minimum of ten (10)
employees/members within East Africa (Rwanda, South Sudan, Uganda, Burundi,
Kenya, and Tanzania). Groups with less than 10 employees shall be insured using
the retail product.
</p>
<p>
Our medical insurance product is run by a team of medical and insurance personnel
who guarantee quality and efficient services. Within the group we have been writing
medical products for over 20 years. All the subsidiaries in the group, OLD MUTUAL
Uganda, OLD MUTUAL South Sudan, OLD MUTUAL Rwanda, OLD MUTUAL
Century Tanzania and OLD MUTUAL Insurance Kenya are writing medical products
managed under the same back-office system called EOxygen.
</p>
The benefits highlight for all categories include.
            </div>
            <div >
            <ul>
              ${data.selectedBenefits
                .map((benefit) => `<li>${benefit.label}</li>`)
                .join("")}
            </ul>
            </div>
           <div class="page-break">
             ${categoryTables}
</div>
             <div class="page-break">
           <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
           <h3>Optical Cover Options</h3>
            <ul>
              ${data.selectedOpticalBenefits
                .map((benefit) => `<li>${benefit.label}</li>`)
                .join("")}
            </ul>
          </div>
          <div>
           <h3>Dental Cover Options</h3>
            <ul>
              ${data.selectedDentalBenefits
                .map((benefit) => `<li>${benefit.label}</li>`)
                .join("")}
            </ul>
          </div>
          
          <div>
          <h3>Cover Options.</h3>
          <p>
          The OLD MUTUAL medical insurance scheme provides a wide range of options to
choose from. This broad range of coverage provides the flexibility required to meet
the varying needs of corporate clients.
A key feature of this scheme is that it has the option whereby family members can
share cover amongst themselves. This enables the family to have access to a high
amount of cover at reasonable cost. Full individual cover for each family member is
available, if desired.
          </p>
          </div>
          <div>
          <h3>Eligibility.</h3>
          <p>
          Any person between from birth to sixty-four (64) years can join the scheme. Existing
members remain in the scheme up to the age of seventy (70). Dependents include
spouse, own children, legally adopted and foster children aged from birth to 21 years.
New-born babies shall be introduced in the policy by way of filling enrollment forms.
          </p>
          </div>
          <div>
          <h3>Waiting periods.</h3>
          <p>
          All waiting periods are waived.
          </p>
          </div>
          <div>
          <h3>Service Providers (Healthcare Partners)</h3>
          <p>
          An important aspect of OLD MUTUAL Medical Insurance scheme is that
hospitalization bills are paid directly to the hospital and other service providers
by the scheme.
The insured never gets to see the bill. This credit facility has been arranged
between the scheme and a countrywide/Regional panel of service providers.
All genuine claims are paid directly to providers within a maximum 30 days of
receipt. Reimbursement claims are paid after 7 days of days of working.
A list of the preferred service providers for Rwanda is attached. The list
includes a panel of hospitals and Doctors, and it is continuously being
developed to meet the needs of our clients. We welcome suggestions from
our clients on the panel of preferred providers.
          </p>
          </div>
          
          <div class="page-break">
           <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
           <div>
          <h3>Administration of the scheme</h3>
          <p>
    A world class back office and point of service IT system is employed to
manage medical products across the region. This enables easy sharing of
information within the region and seamless service. The system has limitless
capacity to manage groups including member statements on every pay run,
monthly reports, quarterly and annual statements. The system has capability
to allow staff to view their account status through the web.
          </p>
          </div>
          <h3>Membership and roll out of the medical scheme.</h3>
          <p>
    Members will be issued with smart cards at no extra cost. However,
replacements will be charged Rwf 4,000.
Issuance of cards for all members will take maximum of 5 days after
submission of updated members list and enrollment forms.
          </p>
          </div>
          <div>
          <h3>Outlined below is an illustration of how the smart system works.</h3>
          <p>
    need the image to display here
          </p>
          </div>
          <div>
          <h3>General Exclusions</h3>
          <p>
    Costs arising from the treatment of the said conditions are not payable under OLD
MUTUAL medical insurance scheme.
Excluded conditions include:
          </p>
          <ul>
              ${data.generalInclusionBenefits
                .map((benefit) => `<li>${benefit.label}</li>`)
                .join("")}
            </ul>
          </div>
         
          <div class="page-break">
           <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
            <div>
          <h3>Overseas Referral</h3>
          <p>
    Referral for overseas treatment is only allowed if the treatment for the specific
condition is not available locally as determined by an independent doctor appointed by OLD MUTUAL Insurance. Such referral is to a country chosen by a OLD MUTUAL
appointed specialist (India). Costs for overseas referral are subject to the overall
family cover limit. Not all policies are eligible for overseas referral. Confirm this when
choosing the desired benefit option.
          </p>
          </div>
          </div>
          <div>
          <h2>Enhanced Benefits Cover.</h2>
          <h3>1. Inpatient Pre-existing / Chronic Conditions.</h3>
          <p>
    Pre-existing conditions and HIV/AIDS shall be catered for within the inpatient cover
up to ${inpatientChronic}% per family per annum within the overall inpatient cover limit.
Newly diagnosed chronic conditions shall be covered up to the full cover limit.
Chronic conditions that are diagnosed after 120 days of cover shall be deemed as
newly diagnosed.
          </p>
          </div>
          <div>
          <h3>2. Congenital Conditions &amp; pre-term babies</h3>
          <p>
   We shall allow a sub-limit of ${congenitalConditionsValues} (RWF) (cumulative benefit) per family per
annum to cater for congenital conditions and pre-term babies during hospitalization.
          </p>
          </div>
          <div>
          <h3>3. Emergency Caesarian &amp; Maternity.</h3>
          <p>
   Maternity benefit is for normal delivery, abnormal pregnancy, pregnancy related
ailments and caesarian sections during hospitalization. This benefit is offered
separately from the inpatient limit. Antenatal visits are covered on outpatient.
          </p>
          </div>
          <div>
          <h3>4. Inpatient Ophthalmology Cover</h3>
          <p>
  A sub-limit of ${inpatientOphthalmologyValues} (RWF) per family per annum shall be allowed to cater for non-
accidental ophthalmologic in-patient hospitalization. Cost of frames and lenses are
excluded.
Accident-related inpatient Ophthalmologic cases are already covered under the
standard inpatient benefits.
Surgeries for refractive errors are excluded other than clinically required procedures
when treatment other protocols are not suitable.
          </p>
          </div>
         
          <div class="page-break">
           <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
            <div>
          <h3>5. Inpatient Dental Cover</h3>
          <p>
A sub-limit of ${inpatientDentalCoverValues} (RWF) per family per annum shall be allowed to cater for non-
accidental dental in-patient hospitalization. Cost of Braces, crowns, bridges and other
prosthesis are excluded.
Accident-related inpatient Dental cases are already covered under the standard
inpatient benefits.
          </p>
          </div>
          <h3>Cover Inception</h3>
          <p>
Cover will commence after negotiations are completed and on receipt of the full
premium payment in Rwandan francs. As per regulators directive (BNR) all premiums
are payable upfront before start of the policy. The quoted prices are annual and will
only be reviewed for the new anniversary. The following is a summary of
requirements before roll out of the policy;
          </p>
          <ol>
          <li>All staff shall be fill and submit enrolment forms. Cards shall not be issued
unless duly filled forms have been received in the office.</li>
<li>The representative of the organization shall sign and submit group application
form.</li>
<li>A contract shall be signed between the two parties detailing terms and
conditions for the insurance.</li>
<li>Payment of premium as per final agreed price.</li>
<li>A detailed members list with all personal particulars e.g. date of birth, sex,
relationship etc.</li>
<li>The representative of the insured shall review the forms to confirm entitlement
to join the medical scheme</li>
<li>The contact persons between the two organizations shall be availed at the
start of the policy.</li>
          </ol>
          </div>  
          </div>
          
          <div class="page-break">
           <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
           <div>
          <h3>4. Admission Protocol</h3>
          <p>
          <ul>
<li> Member is confirmed to have COVID-19 by the testing facilities,
either public or private</li>
<li> Member is referred to a health facility (either private or public)
for management.</li>
<li> For those in our panel of providers, Old Mutual undertakes the case in
the usual manner. For those who are in providers we don’t
partner with, they incur the bill and seek reimbursement from
Old Mutual Insurance Rwanda Ltd. Reimbursement shall be based on
prevailing tariffs.</li>
<li> The Case Management Team shall be actively involved in such
cases with daily reports provided.</li>
</ul/>
          </p>
         
          </div>
          <table class="table">
          <thead>
          <tr>
          <th></th>
          <th>Key performance indicator</th>
          <th>Turnaround time</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>1</td>
          <td>Acknowledge queries on email or telephone</td>
          <td>Immediate</td>
          </tr>
          <tr>
          <td>2</td>
          <td>Issue referral letter</td>
          <td>Same day</td>
          </tr>
          <tr>
          <td>3</td>
          <td>Settle reimbursement claims to member
where a bill is paid out of pocket.</td>
          <td>7 days</td>
          </tr>
          <tr>
          <td>4</td>
          <td>Issue policy document/contract</td>
          <td>Before inception of cover</td>
          </tr>
          <tr>
          <td>5</td>
          <td>Issue endorsements</td>
          <td>Monthly</td>
          </tr>
          <tr>
          <td>6</td>
          <td>Issue cards to new members &amp; replacements</td>
          <td>5 days</td>
          </tr>
          <tr>
          <td>7</td>
          <td>Review meetings</td>
          <td>On request</td>
          </tr>
          <tr>
          <td>8</td>
          <td>Member utilization statements</td>
          <td>Quarterly and on request</td>
          </tr>
          <tr>
          <td>9</td>
          <td>Scheme performance report</td>
          <td>Quarterly and month ten for end year</td>
          </tr>
          <tr>
          <td>10</td>
          <td>Payment of premiums</td>
          <td>Upfront</td>
          </tr>

          </tbody>
          </table>
          </div>
          <div class="footer">
            <p>Prepared By: ${data.createdBy.name}, ${data.createdBy.role}</p>
            <p>Approved By: ${data.updatedBy.name}, ${data.updatedBy.role}</p>
          </div>
        </div>
          
         
      </body>
    </html>
  `;

  pdf.create(html, { format: "A4" }).toStream((err, stream) => {
    if (err) return res.status(500).send(err);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=cooperate_certificate.pdf`
    );
    stream.pipe(res);
  });
};


