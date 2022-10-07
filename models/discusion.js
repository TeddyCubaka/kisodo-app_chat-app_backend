const mongoose = require('mongoose');
const member = require('./member');
const message = require('./message');

const discussionSchema = new mongoose.Schema({
    name : {type : String},
    isGroup : {type : Boolean},
    membres : [{member}],
    messages : [{message}]
});

module.exports = mongoose.model('discussion', discussionSchema);