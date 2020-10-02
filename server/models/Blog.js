const mongoose = require("mongoose");
const slugify = require("slugify");
const stripHTML = require("string-strip-html");

const smartTrim = require("../utils/smartTrim");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: {}, // Any type
      required: true,
      min: 200,
      max: 2000000, // 2mbs
    },
    excerpt: { type: String },
    metaTitle: { type: String },
    metaDesc: { type: String },
    photo: {
      type: {
        url: {
          type: String,
          required: true,
        },
        key: {
          type: String,
          required: true,
        },
      },
    },
    categories: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Category",
          required: true,
        },
      ],
    },
    tags: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Tag",
          required: true,
        },
      ],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Generate slug based on title
blogSchema.pre("validate", function (next) {
  if (!(this.isNew || this.isModified("title"))) {
    return next();
  }

  this.slug = slugify(this.title).toLowerCase();
  next();
});

// Genetate meta title and meta description
blogSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("title")) {
    this.metaTitle = `${this.title} | ${process.env.APP_NAME}`;
  }

  if (this.isNew || this.isModified("content")) {
    this.metaDesc = stripHTML(this.content.substring(0, 160)).result;
    this.metaDesc = smartTrim(stripHTML(this.content).result, 160, " ", "...");
    this.excerpt = smartTrim(stripHTML(this.content).result, 320, " ", "...");
  }

  next();
});

// Populate tags, categories, and potedBy user info
blogSchema.pre(/^find/, function () {
  console.log("ran");
  this.populate({
    path: "tags",
    select: "name slug",
  })
    .populate({
      path: "categories",
      select: "name slug",
    })
    .populate({
      path: "postedBy",
      select: "name email username profile createdAt role",
    });
});

module.exports = mongoose.model("Blog", blogSchema);
