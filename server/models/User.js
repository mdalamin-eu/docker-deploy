const  mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname:{type:String, required:true, lowercase:true,max:[15]},
    lastname:{type:String, required:true, lowercase:true, max:[25]},
    email:{type:String, required:true,lowercase:true},
    hashpassword:{type:String, required:true},
    phone:{type:String,  required:true, lowercase:true, max:[20]},
    address:{type:String, required:true,lowercase:true, max:[50]},
    birthdate:{type:Date}

})

module.exports=mongoose.model('NewData',UserSchema)