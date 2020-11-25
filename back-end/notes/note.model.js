const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
});

const NoteModel = mongoose.model('NoteModel', NoteSchema);
module.exports = NoteModel;
