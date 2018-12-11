var mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
  memeName: { type: String },
  pathToFile: {type: String},
})

module.exports = mongoose.model('Meme', memeSchema);
