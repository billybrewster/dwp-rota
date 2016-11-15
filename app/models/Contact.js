var mongoose = require('mongoose');

var ContactsSchema = new mongoose.Schema({
  name: String,
  number: String,
  hours: String
});

module.exports = mongoose.model('Contacts', ContactsSchema);
