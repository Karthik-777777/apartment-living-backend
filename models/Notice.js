const mongoose = require("mongoose");

const noticeSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    priority: {
      type: String,
      default: "Normal",
    },

    postedBy: {
      type: String,
      default: "Admin",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =
  mongoose.model(
    "Notice",
    noticeSchema
  );