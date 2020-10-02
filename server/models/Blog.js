const mongoose = require("mongoose");
const slugify = require("slugify");

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
      max: 2000000, // 2mb
    },
    excerpt: {
      type: String,
      max: 1000,
    },
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

// Create slug based on title
blogSchema.pre("validate", function (next) {
  if (!(this.isNew || this.isModified("title"))) {
    return next();
  }
  this.slug = slugify(this.title);
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
