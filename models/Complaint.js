const mongoose = require("mongoose");

const complaintSchema =
new mongoose.Schema({

  residentId: {
  type: String,
  required: true,
},

  residentName: {
    type: String,
    required: true,
  },

  flatNumber: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "General",
  },

  priority: {
    type: String,
    default: "Medium",
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
mongoose.model(
  "Complaint",
  complaintSchema
);