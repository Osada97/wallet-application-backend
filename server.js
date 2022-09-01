const express = require("express");
const connectDb = require("./config/db");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

//connect DB
connectDb();

//middleware
app.use(express.json());

//routes
app.use("/", require("./routes/userWalletRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
