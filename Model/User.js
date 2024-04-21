const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name:{
    type:"String",
    required:true,
},
email:{
    type:"String",
    required:true
},
password:{
    type:"String",
    required:true
},
blogs: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
})

const User = mongoose.model('user',userSchema);
module.exports=User;

