const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content : {type : String, required : true},
    isPicture : {type: Boolean},
    delete : {type : Boolean},
    vue : {type : Boolean},
    sendDate : {type : Date},
    sender : {
        userId : {type : String},
        fullName : {type : String, required : true},
        image : {type : String},
        biography : {type : String}
    }
})

module.exports = mongoose.model('messages', messageSchema)