const mongoose = require('mongoose');
const uniqueValidator =  require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    firstName : {type : String, required : true},
    secondName : {type : String, required : true},
    mail : {type : String, required : true, unique : true},
    biography : {type : String},
    image : {type : String},
    password : {type : String},
    joinDate : {type : Date},
    isOnline : {type : Boolean},
    inbox : [{
        discussion_id : {type : String},
        users : [{
            userId : {type : String},
            fullName : {type : String},
            image : {type : String},
            isOnline : {type : Boolean},
            biography : {type : String}
        }],
        lastMessage : {
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
        }
    }]
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('users', userSchema)