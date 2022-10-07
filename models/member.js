const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
    userId : {type : String},
    fullName : {type : String},
    image : {type : String},
    isOnline : {type : Boolean},
    biography : {type : String}
})

module.exports = model('Member', memberSchema)