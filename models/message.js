const mongoose = require('mongoose');
const memberSchema = require('./member');

const messageSchema = mongoose.Schema({
    content : {type : String},
    isPicture : {type: Boolean},
    delete : {type : Boolean},
    vue : {type : Boolean},
    sendDate : {type : Date},
    sender : {
        userId : {type : String},
        fullName : {type : String},
        image : {type : String},
        isOnline : {type : Boolean},
        biography : {type : String}
    }
})

module.exports = mongoose.model('messages', messageSchema)