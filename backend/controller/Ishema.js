const fs = require("fs");
const pdf = require("html-pdf");
const moment = require("moment");
const photoPath = "./photos/horizontal.jpg";
const stamp = "./photos/stamp.png";
const stampPhoto = fs.readFileSync(stamp).toString("base64");
const photoBase64 = fs.readFileSync(photoPath).toString("base64");
const photoMimeType = "image/jpeg";
const { Quotation, IshemaQuotationVersion } = require("../models/ishema");

exports.createQuotation = async (req, res) => {
  try {
    const { plan, members, agentData, options, benefits, beneficiaryInfo } =
      req.body;
    const user = req.user._id; // Assuming user info is attached to req
    const ValidityPeriod = new Date();
    ValidityPeriod.setMonth(ValidityPeriod.getMonth() + 1);
    const newQuotation = new Quotation({
      plan,
      members,
      benefits,
      beneficiaryInfo,
      options,
      ValidityPeriod: ValidityPeriod,
      user,
      agentData,
    });

    const savedQuotation = await newQuotation.save();
    console.log(savedQuotation.ValidityPeriod);

    res.status(201).json(savedQuotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id).populate("user");
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.status(200).json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan, members, options, status } = req.body;

    const quotation = await Quotation.findById(id);

    quotation.plan = plan || quotation.plan;
    quotation.members = members || quotation.members;
    quotation.options = options || quotation.options;
    quotation.status = status || quotation.status;
    quotation.updatedBy = req.user._id;
    const updatedQuotation = await quotation.save();

    res.status(200).json(updatedQuotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPendingQuotations = async (req, res) => {
  try {
    const pendingQuotations = await Quotation.find({
      status: "Pending",
      user: req.user,
    }).populate("user");
    res.status(200).json(pendingQuotations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllQuotation = async (req, res) => {
  try {
    const quotations = await Quotation.find({ user: req.user });
    res.status(200).json(quotations);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.getAll = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.searchCustomerByName = async (req, res) => {
  const { CUSTOMER_NAME } = req.query;

  if (!CUSTOMER_NAME) {
    return res.status(400).json({ message: "ICustomer name is required" });
  }

  try {
    const results = await Quotation.find({
      "beneficiaryInfo.CUSTOMER_NAME": {
        $regex: CUSTOMER_NAME,
        $options: "i",
      },
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

    const quotations = await Quotation.find({
      status: "Waiting",
      user: req.user,
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
    const closed = await Quotation.find({
      status: "Accepted",
      user: req.user,
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
    const approved = await Quotation.find({
      status: "Approved",
      user: req.user,
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
    const rejected = await Quotation.find({
      status: "Rejected",
      user: req.user,
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
    const blocked = await Quotation.find({
      status: "Block",
      user: req.user,
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

exports.count = async (req, res) => {
  try {
    const count = await Quotation.countDocuments({ user: req.user });
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.adminDocs = async (req, res) => {
  try {
    const count = await Quotation.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateIshemaQuotation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const userId = req.user._id; // Assuming you are using some form of authentication middleware

  try {
    // Find the existing RetailQuotation
    const existingQuotation = await Quotation.findById(id);
    if (!existingQuotation) {
      return res.status(404).json({ message: "RetailQuotation not found" });
    }

    // Create a new version of the existing RetailQuotation
    const quotationVersion = new IshemaQuotationVersion({
      originalQuotationId: existingQuotation._id,
      quotationData: existingQuotation.toObject(),
    });
    await quotationVersion.save();

    // Update the RetailQuotation with new data
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
  const data = await Quotation.findById(id)
    .populate("user")
    .populate("updatedBy");

  if (!data) {
    return res.status(404).send("Quotation not found");
  }
  const formattedDate = new Date(data.ValidityPeriod).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

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
              data.beneficiaryInfo.CUSTOMER_NAME
            }</h1>
            <p>The proposal is valid until : ${formattedDate}</p>
          </div>
       <div class="content">
          <h3>Client Information</h3>
            <p>Customer Id: ${data.beneficiaryInfo.CUSTOMER_ID || ""}</p>
            <p>Telephone: ${data.beneficiaryInfo.HOME_TELEPHONE || ""}</p>


            <h3>Benefits</h3>
            <ul>
              ${data.benefits
                .map((benefit) => `<li>${benefit.label}</li>`)
                .join("")}
            </ul>

            
            </table>
<div class="page-break">
 <img src="data:${photoMimeType};base64,${photoBase64}" alt="Company Logo" style="max-width: 100%;" />
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
<div >
          
         <h3>NB: Outpatient, Optical and dental claims are paid subject to 10% copay. Inpatient and
maternity are covered 100% by insurer.</h3>
<p>Kindly issue a cheque or transfer instructions payable to Old mutual Insurance Rwanda as per the above quotation.	</p>
          </div>
           </div>
          </div>
           
           <div  style="margin-top: 100px;">
          <p>Thank you for considering OLD MUTUAL as your medical insurance provider.
We will be glad to provide any other additional information required.
</p>
<p style="margin-top: 30px;">Yours Sincerely,</p>

            <img src="data:${photoMimeType};base64,${stampPhoto}" alt="Company Logo" style="width: 24%; height: 70%; margin-top:60px; margin-bottom:20px" />
            <p><span style="color: #006400">Prepared By:</span> ${
              data.user.role
            },${""} ${data.user.name} </p>
            
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
