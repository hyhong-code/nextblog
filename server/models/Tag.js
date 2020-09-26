const mongoose = require("mongoose");
const slugify = require("slugify");

const tagSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// Slugify cateogry's name before validation
tagSchema.pre("validate", function (next) {
  if (!(this.isNew || this.isModified("name"))) {
    console.log("should slug");
    next();
  }
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("Tag", tagSchema);
