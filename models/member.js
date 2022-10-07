const mongoose = require('mongoose');

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const memberSchema = new Schema({
    user_id : ObjectId,
    fullName : {type : String},
    image : {type : String},
    isOnline : {type : Boolean},
    biography : {type : String}
})

module.exports = mongoose.model('member', memberSchema)