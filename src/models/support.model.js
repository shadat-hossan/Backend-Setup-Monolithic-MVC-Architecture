const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Support", supportSchema);
