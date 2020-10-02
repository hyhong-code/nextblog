const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const { s3UploadImage } = require("../utils/s3");

exports.createBlog = async (req, res, next) => {
  try {
    const { photo } = req.body;

    let updateRes;
    if (photo) {
      updateRes = await s3UploadImage(photo);
    }

    const createObj = {
      ...req.body,
      postedBy: req.user.id,
    };

    if (updateRes) {
      createObj.photo = {
        url: updateRes.Location,
        key: updateRes.Key,
      };
    }

    const blog = await Blog.create(createObj);
    res.status(201).json({
      data: { blog },
    });
  } catch (error) {
    console.error("[CREATE BLOG]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.listBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      data: { blogs },
    });
  } catch (error) {
    console.error("[LIST BLOG]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.readBlog = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.updateBlog = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {}
};
