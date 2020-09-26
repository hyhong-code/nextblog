const Category = require("../models/Category");

exports.listCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(201).json({
      data: { categories },
    });
  } catch (error) {
    console.error("[listCategory]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

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

exports.readCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle category not exist
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        errors: [{ msg: "Category not found." }],
      });
    }

    res.status(200).json({
      data: { category },
    });
  } catch (error) {
    console.error("[readCategory]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    // Handle category not exist
    let category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        errors: [{ msg: "Category not found." }],
      });
    }

    category.name = name;
    category = await category.save({ validateBeforeSave: true });

    res.status(200).json({
      data: { category },
    });
  } catch (error) {
    console.error("[deleteCategory]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle category not exist
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        errors: [{ msg: "Category not found." }],
      });
    }

    await Category.findOneAndDelete({ slug });
    res.status(200).json({
      data: {
        msg: "Category successfully deleted.",
      },
    });
  } catch (error) {
    console.error("[deleteCategory]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};
