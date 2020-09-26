const Category = require("../models/Category");

exports.listCategory = async (req, res, next) => {};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Handle category name is already taken
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        errors: [{ msg: "Category name is already taken." }],
      });
    }

    category = await Category.create({ name, createdBy: req.user._id });
    res.status(201).json({
      data: { category },
    });
  } catch (error) {
    console.error("[createCategory]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.readCategory = async (req, res, next) => {};

exports.updateCategory = async (req, res, next) => {};

exports.deleteCategory = async (req, res, next) => {};
