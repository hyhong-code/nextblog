const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const { s3UploadImage, s3DeleteImage } = require("../utils/s3");

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

exports.listUserBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ postedBy: req.user._id });
    res.status(200).json({
      data: { blogs },
    });
  } catch (error) {
    console.error("[LIST USER BLOG]", error);
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

    const count = await Blog.countDocuments();

    res.status(200).json({
      data: {
        blogs,
        categories,
        tags,
        count,
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

exports.listSimilarBlogs = async (req, res, next) => {
  try {
    const { id, categories } = req.body;
    let { limit } = req.query;
    limit = limit ? parseInt(limit) : 3;

    let blog = await Blog.findById(id);

    // Handle blog not found
    if (!blog) {
      return res.status(404).json({
        errors: [{ msg: "Blog not found." }],
      });
    }

    blogs = await Blog.find({
      _id: { $ne: id },
      categories: { $in: categories },
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      data: { blogs },
    });
  } catch (error) {
    console.error("[LIST SIMILAR BLOGS ERROR]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { title, photo } = req.body;

    // Handle blog not exits
    let blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({
        errors: [{ msg: "Blog not found." }],
      });
    }

    // Handle user not owner of the blog
    if (
      blog.postedBy._id.toString() !== req.user._id.toString() &&
      user.role !== "ADMIN"
    ) {
      return res.status(401).json({
        errors: [{ msg: "User not authorized." }],
      });
    }

    // Handle duplicate title
    if (title) {
      existingBlog = await Blog.findOne({ title });
      if (existingBlog && existingBlog._id.toString() !== blog._id.toString()) {
        return res.status(400).json({
          errors: [{ msg: `Title "${title}" is already taken.` }],
        });
      }
    }

    // Replace image
    let uploadRes;
    if (photo) {
      if (blog.photo) {
        await s3DeleteImage(blog.photo.key);
      }
      uploadRes = await s3UploadImage(photo);
    }

    // Set update object
    const updateObj = { ...req.body };
    if (uploadRes)
      updateObj.photo = {
        url: uploadRes.Location,
        key: uploadRes.Key,
      };

    // Update blog
    Object.entries(updateObj).forEach(([k, v]) => {
      blog[k] = v;
    });
    blog = await blog.save({ validateBeforeSave: true });

    res.status(200).json({
      data: {
        blog,
      },
    });
  } catch (error) {
    console.error("[UPDATE BLOG ERROR]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let blog = await Blog.findOne({ slug });

    // Handle blog not found
    if (!blog) {
      return res.status(404).json({
        errors: [{ msg: "Blog not found." }],
      });
    }

    // Handle user not owner of the blog
    if (
      blog.postedBy._id.toString() !== req.user._id.toString() &&
      user.role !== "ADMIN"
    ) {
      return res.status(401).json({
        errors: [{ msg: "User not authorized." }],
      });
    }

    // Delete photo from s3
    if (blog.photo) {
      await s3DeleteImage(blog.photo.key);
    }

    await Blog.findByIdAndDelete(blog._id);
    res.status(200).json({
      data: { msg: "Blog is successfully deleted." },
    });
  } catch (error) {
    console.error("[DELETE BLOG ERROR]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};
