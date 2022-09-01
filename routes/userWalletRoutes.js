const express = require("express");
const {
  addingExpenses,
  getExpenses,
  updateExpenses,
  deleteExpenses,
  filterData,
} = require("../controller/walletController");

const router = express.Router();

//get details (getting user expenses)
router.get("/getdetails", getExpenses);

//post details (create expenses)
router.post("/create", addingExpenses);

//update details (update specific expense)
router.put("/update/:id", updateExpenses);

//delete detail (delete specific expense)
router.delete("/delete/:id", deleteExpenses);

//filter data using category
router.get("/filter", filterData);

module.exports = router;
