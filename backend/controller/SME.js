const fs = require("fs");
const pdf = require("html-pdf");
const moment = require("moment");
const photoPath = "./photos/horizontal.jpg";
const photoBase64 = fs.readFileSync(photoPath).toString("base64");
const photoMimeType = "image/jpeg";
const { SME, SmeQuotationVersion } = require("../models/SME");

exports.createQuotation = async (req, res) => {
  try {
    const { plan, members, options, benefits, beneficiaryInfo } = req.body;
    const user = req.user._id;
    const ValidityPeriod = new Date();
    ValidityPeriod.setMonth(ValidityPeriod.getMonth() + 1);
    const newQuotation = new SME({
      plan,
      members,
      beneficiaryInfo,
      ValidityPeriod:ValidityPeriod,
      benefits,
      options,
      user,
    });
    const savedQuotation = await newQuotation.save();
    console.log(savedQuotation);

    res.status(201).json(savedQuotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getQuotation = async (req, res) => {
  try {
    const quotation = await SME.findById(req.params.id).populate("user");
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.status(200).json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.allSMEs = async (req, res) => {
  try {
    const savedQuotation = await SME.find();
    if (savedQuotation.length === 0) {
      return res.status(404), json({ message: "No saved SMEs quotation" });
    }
    res.status(200).json(savedQuotation);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateCooperateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const quotation = await SME.findById(id);
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    quotation.status = status;
    quotation.updatedBy = req.user._id;
    await quotation.save();

    res.status(200).json({ message: "Status updated successfully", quotation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.count = async (req, res) => {
  try {
    const count = await SME.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchSMEByInstitutionName = async (req, res) => {
  const { institutionName } = req.query;

  if (!institutionName) {
    return res.status(400).json({ message: "Institution name is required" });
  }

  try {
    const results = await SME.find({
      "companyInfo.institutionName": { $regex: institutionName, $options: "i" }, // Case-insensitive search
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
exports.getPendingQuotationsByMonth = async (req, res) => {
  const { month, year } = req.query;

  try {
    const startDate = moment(`${year}-${month}-01`)
      .startOf("month")
      .startOf("day")
      .utc()
      .toDate();
    const endDate = moment(startDate).endOf("month").utc().toDate();

    const quotations = await SME.find({
      status: "Waiting",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("user", "name")
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
    const closed = await SME.find({
      status: "Accepted",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("user", "name")
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
    const approved = await SME.find({
      status: "Approved",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("user", "name")
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
    const rejected = await SME.find({
      status: "Rejected",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("user", "name")
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
    const blocked = await SME.find({
      status: "Block",
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ createdAt: 1 })
      .populate("user", "name")
      .exec();
    res.json(blocked);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ message: "Error fetching quotations." });
  }
};

exports.updateSmeQuotation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const userId = req.user._id;

  try {
    const existingQuotation = await SME.findById(id);
    if (!existingQuotation) {
      return res.status(404).json({ message: "RetailQuotation not found" });
    }

    const quotationVersion = new SmeQuotationVersion({
      originalQuotationId: existingQuotation._id,
      quotationData: existingQuotation.toObject(),
    });
    await quotationVersion.save();

    Object.assign(existingQuotation, updateData, {
      updatedBy: userId,
      updatedAt: Date.now(),
    });
    const updatedQuotation = await existingQuotation.save();

    res.status(200).json({
      message: "RetailQuotation updated successfully",
      updatedQuotation,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

exports.downloadCertificate = async (req, res) => {
  const { id } = req.params;
  const data = await SME.findById(id).populate("user").populate("updatedBy");

  if (!data) {
    return res.status(404).send("Quotation not found");
  }

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
            color: #006400; 
          }
          .content {
            margin-top: 159px;
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
            .footer {
  display: flex;
  justify-content: space-between; /* Distribute space between items */
  align-items: center; /* Vertically align the items if needed */
}

.footer p {
  margin: 0; 
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
            <h1>Ishema Quotation Proposal for ${
              data.beneficiaryInfo.institutionName
            }</h1>
          </div>
          <div class="content">
           <h3>Client Info</h3>
            <p>Company: ${data.beneficiaryInfo.institutionName}</p>
            <p>ID: ${data.beneficiaryInfo.CUSTOMER_ID}</p>
            <p>Tin Number: ${data.beneficiaryInfo.tin}</p>


            <h3>Benefits</h3>
            <ul>
              ${data.benefits
                .map((benefit) => `<li>${benefit.label}</li>`)
                .join("")}
            </ul>

            <h3>Members</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                ${data.members
                  .map(
                    (member) => `
                  <tr>
                    <td>${member.type}</td>
                    <td>${member.age}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <h3>Options</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Premium Type</th>
                  ${Object.keys(data.options)
                    .map((optionKey) => `<th>${optionKey}</th>`)
                    .join("")}
                </tr>
              </thead>
              <tbody>
                ${[
                  "totalInpatientPremium",
                  "totalOutpatientPremium",
                  "dentalPremium",
                  "opticalPremium",
                  "maternityPremium",
                  "basicPremium",
                  "mituelleDeSante",
                  "administrationFees",
                  "totalPremium",
                ]
                  .map(
                    (premiumType) => `
                   <tr>
  <td>${premiumType
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())}</td>
  ${Object.keys(data.options)
    .map(
      (optionKey) =>
        `<td>${Number(
          data.options[optionKey][premiumType]
        ).toLocaleString()}</td>`
    )
    .join("")}
</tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

          </div>
          <div class="page-break">
           <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
         <h3>NB: Outpatient, dental and optical claims shall be payable subject to 10% copay by the member.	</h3>
<h3>All medical claims have a waiting period of 28 days, exception being a case of an accident.	</h3>
<h3>Pre-exisiting and newly diagnosed chronic conditions have a waiting period of 1 year.	</h3>
<h3>Maternity is subject to a waiting period of 1 year.	</h3>
<h3>Members over the age of 60 will have to undergo medical checkup and results submitted to OM medical team.	</h3>
<h3>(A medical examination form will be provided along with the quotation)	</h3>
<h3>(Exams done at BWIZA Clinic in CHIK building at subsidized rates)	</h3>
	
	
<p>Kindly issue a cheque or transfer instructions payable to Old mutual Insurance Rwanda as per the above quotation.	</p>
          </div>
          <div class="footer">
            <p>Created by: ${data.user.name} (${data.user.role})</p>
            <p>Approved by: ${data.updatedBy.name} (${data.updatedBy.role})</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const options = { format: "A4" };

  pdf.create(html, options).toStream((err, stream) => {
    if (err) return res.status(500).send(err);
    res.setHeader(
      "Content-disposition",
      'attachment; filename="quotation_certificate.pdf"'
    );
    res.setHeader("Content-type", "application/pdf");
    stream.pipe(res);
  });
};
