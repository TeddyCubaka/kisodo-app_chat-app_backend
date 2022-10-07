const mongoose = require('mongoose');
const uniqueValidator =  require('mongoose-unique-validator');
const member = require('./member');
const message = require('./message')

const userSchema = new mongoose.Schema({
    firstName : {type : String, required : true},
    secondName : {type : String, required : true},
    mail : {type : String, required : true, unique : true},
    biography : {type : String},
    image : {type : String},
    joinDate : {type : Date},
    isOnline : {type : Boolean},
    inbox : [{
        discussion_id : {type : String},
        users : [{member}],
        lastMessage : {message}
    }]
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('users', userSchema)