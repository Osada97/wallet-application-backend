//adding expenses
const userExpenses = require("../model/userExpenses");
const ObjectId = require("mongoose").Types.ObjectId;

//getting expenses controller
const getExpenses = async (req, res) => {
  const expenses = await userExpenses.find();
  if (!expenses) return res.status(204).json({ message: "No expenses found" });

  res.json(expenses);
};

//adding expenses controller
const addingExpenses = async (req, res) => {
  // validating
  const { title, category, description, date, amountSpent } = req.body;
  if (!title || !category || !description || !date || !amountSpent)
    return res.status(400).json({
      message: "Title, Category, Description, Date, Amount Spent are required.",
    });

  if (isNaN(amountSpent))
    return res
      .status(400)
      .json({ message: "Please Send Numerical Data for amountSpent" });

  if (title.length > 50)
    return res
      .status(400)
      .json({ message: "Title must be less than 30 characters" });
  if (category.length > 50)
    return res
      .status(400)
      .json({ message: "Category must be less than 30 characters" });
  if (description.length > 255)
    return res
      .status(400)
      .json({ message: "Description must be less than 255 characters" });

  try {
    const result = await userExpenses.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
      amount_spent: req.body.amountSpent,
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

//update expenses
const updateExpenses = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: "ID required" });
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "ID is invalid" });

  const expense = await userExpenses.findOne({ _id: req.params.id }).exec();

  if (!expense) {
    return res
      .status(204)
      .json({ message: `No Expense matches ID ${req.params.id}` });
  }

  //validating json data
  if (isNaN(req.body.amountSpent))
    return res
      .status(400)
      .json({ message: "Please Send Numerical Data for amountSpent" });

  if (req.body.title.length > 50)
    return res
      .status(400)
      .json({ message: "Title must be less than 30 characters" });
  if (req.body.category.length > 50)
    return res
      .status(400)
      .json({ message: "Category must be less than 30 characters" });
  if (req.body.description.length > 255)
    return res
      .status(400)
      .json({ message: "Description must be less than 255 characters" });

  if (req.body?.title) expense.title = req.body.title;
  if (req.body?.category) expense.category = req.body.category;
  if (req.body?.description) expense.description = req.body.description;
  if (req.body?.date) expense.date = req.body.date;
  if (req.body?.amountSpent) expense.amount_spent = req.body.amountSpent;

  try {
    const result = await expense.save();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

//delete expenses
const deleteExpenses = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: "ID required" });
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "ID is invalid" });

  const expense = await userExpenses.findOne({ _id: req.params.id }).exec();

  if (!expense) {
    return res
      .status(204)
      .json({ message: `No Expense matches ID ${req.params.id}` });
  }

  const result = await expense.deleteOne({ _id: req.params.id });
  res.json({
    message: `Successfully removed ${req.params.id} expense`,
    result,
  });
};

//filter data using category
const filterData = async (req, res) => {
  if (!req?.query?.category)
    return res.status(400).json({ message: "Category is required" });

  const category = req.query.category;

  const expenses = await userExpenses.find({ category: category }).exec();

  if (expenses.length === 0)
    return res
      .status(204)
      .json({ message: "No any expenses category matched" });

  res.json(expenses);
};

module.exports = {
  addingExpenses,
  getExpenses,
  updateExpenses,
  deleteExpenses,
  filterData,
};
