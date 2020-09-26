const Tag = require("../models/Tag");

exports.listTags = async (req, res, next) => {
  try {
    const tag = await Tag.find();
    res.status(201).json({
      data: { tag },
    });
  } catch (error) {
    console.error("[listTags]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Handle tag name is already taken
    let tag = await Tag.findOne({ name });
    if (tag) {
      return res.status(400).json({
        errors: [{ msg: "Tag name is already taken." }],
      });
    }

    tag = await Tag.create({ name });
    res.status(201).json({
      data: { tag },
    });
  } catch (error) {
    console.error("[createTag]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.readTag = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle tag not exist
    const tag = await Tag.findOne({ slug });
    if (!tag) {
      return res.status(404).json({
        errors: [{ msg: "Tag not found." }],
      });
    }

    res.status(200).json({
      data: { tag },
    });
  } catch (error) {
    console.error("[readTag]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Handle tag not exist
    const tag = await Tag.findOne({ slug });
    if (!tag) {
      return res.status(404).json({
        errors: [{ msg: "Tag not found." }],
      });
    }

    await Tag.findOneAndDelete({ slug });
    res.status(200).json({
      data: {
        msg: "Tag successfully deleted.",
      },
    });
  } catch (error) {
    console.error("[deleteTag]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};
