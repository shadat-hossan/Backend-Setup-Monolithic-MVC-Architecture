const mongoose = require("mongoose");

const privacySchema = new mongoose.Schema(
    {
        content: { type: String, required: [true, "Content is must be Required"] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Privacy", privacySchema);
