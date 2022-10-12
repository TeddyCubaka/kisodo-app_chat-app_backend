const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    userId : {type : String},
    fullName : {type : String},
    image : {type : String},
    isOnline : {type : Boolean},
    biography : {type : String}
})

module.exports = mongoose.model('member', memberSchema)
