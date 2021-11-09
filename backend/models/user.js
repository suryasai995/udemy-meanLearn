const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//mongoose-unique-validator(npm install --save mongoose-unique-validator) is help to user details must be unique

const userSchema = mongoose.Schema({
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true }
   });
   
   userSchema.plugin(uniqueValidator);
   
   module.exports = mongoose.model("User", userSchema);
   