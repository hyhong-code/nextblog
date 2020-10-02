const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 32,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Slugify cateogry's name before validation
categorySchema.pre("validate", function (next) {
  if (!(this.isNew || this.isModified("name"))) {
    next();
  }
  this.slug = slugify(this.name).toLowerCase();
  next();
});

// Populate user's info upon list and read
categorySchema.pre(/^find/, function () {
  this.populate({
    path: "createdBy",
    select: "role _id name email username",
  });
});

module.exports = mongoose.model("Category", categorySchema);
