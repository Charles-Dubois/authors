const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 30,
  },
  nationality: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2,
  },
  books: {
    type: [String],
    required: true,
  },
});

const Authors = mongoose.model("Authors", authorsSchema);

module.exports = Authors;
