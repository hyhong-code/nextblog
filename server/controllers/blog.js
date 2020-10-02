const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const { s3UploadImage } = require("../utils/s3");

exports.createBlog = async (req, res, next) => {
  try {
    const { title, photo } = req.body;

    let blog = await Blog.findOne({ title });
    if (blog) {
      return res
        .status(400)
        .json({ errors: [{ msg: `Title ${title} is already taken.` }] });
    }

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

    blog = await Blog.create(createObj);
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

exports.scanBlogs = async (req, res, next) => {
  try {
    let { limit, skip } = req.query;
    limit = limit ? parseInt(limit) : 10;
    skip = skip ? parseInt(skip) : 0;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const categories = await Category.find();
    const tags = await Tag.find();

    res.status(200).json({
      data: {
        blogs,
        categories,
        tags,
        count: blogs.length,
      },
    });
  } catch (error) {
    console.error("[SCAN BLOGS ERROR]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.readBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    res.status(200).json({
      data: {
        blog,
      },
    });
  } catch (error) {
    console.error("[READ BLOG ERROR]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {}
};
