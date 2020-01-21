// Using Node.js `require()`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    // chatId: String,
    user: String,
    message: String,
    dateTime: String
  });

  module.exports = mongoose.model('Chat', chatSchema);

  
