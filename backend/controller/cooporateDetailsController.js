const Company = require("../models/CooporateCustomerDetails");

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res
      .status(201)
      .json({ message: "Company created successfully", data: company });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating company", error: error.message });
  }
};

// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching companies", error: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const customer = await Company.findOne({
      CUSTOMER_ID: id,
    });
    console.log(customer);

    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res
      .status(200)
      .json({ message: "Company updated successfully", data: company });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating company", error: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting company", error: error.message });
  }
};
