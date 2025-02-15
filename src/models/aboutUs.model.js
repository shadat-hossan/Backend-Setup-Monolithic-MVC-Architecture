const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
  {
    content: { 
      type: String, 
      required: [true, "Content is required"], 
      minlength: 10, 
      maxlength: 2000
    },
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("AboutUs", aboutUsSchema);
