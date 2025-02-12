const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/User");
const quotationRoutes = require("./routes/ishema");
const retailRoutes = require("./routes/Retail");
const lowRoutes = require("./routes/LowCost");
const smeRoutes = require("./routes/SME");
const customerRoutes = require("./routes/customerRoutes");
const cooporateRoutes = require("./routes/Cooporate");
const memberRoutes = require("./routes/memberRoutes");
const cooporateCustomerDetails = require("./routes/cooporateDetailsRoutes");
const { isAuth } = require("./middleware/auth");
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to DB", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api/ishema", isAuth, quotationRoutes);
app.use("/api/retail", isAuth, retailRoutes);
app.use("/api/lowcost", isAuth, lowRoutes);
app.use("/api/cooporate", isAuth, cooporateRoutes);
app.use("/api/sme", isAuth, smeRoutes);
app.use("/api/members", isAuth, memberRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/cooporateDetails", cooporateCustomerDetails);
// app.use(express.static(path.join(path.resolve(), "/frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(path.resolve(), "/frontend/build/index.html"));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
