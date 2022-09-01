const express = require("express");
const connectDb = require("./config/db");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 3500;

//connect DB
connectDb();

//middleware
app.use(express.json());

//CORS(cross origin resource share) 3rd party middleware
const whiteList = ["http://localhost:3000", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by the CORS"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//routes
app.use("/", require("./routes/userWalletRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
