const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
})

module.exports = mongoose.model('Note', quoteSchema);
