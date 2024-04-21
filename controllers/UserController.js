require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../Model/User");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


exports.register = async(req,res)=>{
    const { name , email , password } =req.body;
    
    try{ 
    const oldUser = await User.findOne({name : req.body.name});
    if (oldUser) {
        return res.send({ err: "User exists" }); // Use 'return' to avoid sending multiple responses
      } else {
       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(password , salt);
       User.create({ name , email ,password:hashedPassword }).then(()=>{
        console.log("User Saved");
       })
        res.status(200).json({message:"User is created successfully"});
      }
}catch(err){
  console.log("error detected" , err);
}
};
exports.login = async(req,res)=>{
    const { email ,password } = req.body;

    try {
      const foundUser = await User.findOne({ email: email });
      if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
      }else {
        const verification = await bcrypt.compare( password ,foundUser.password  ) ; 

      if(verification){
          const accessToken = jwt.sign(foundUser.toJSON(), process.env.ACCESS_SECRET_KEY , {expiresIn: "15m"} ) ;
          const refreshToken = jwt.sign(foundUser.toJSON(),process.env.REFRESH_SECRET_KEY);
        
        console.log("Logged in")
        return res.status(200).json({user: foundUser , accessToken:accessToken , refreshToken : refreshToken});
      }else{
        return res.status(400).json({message : "Password doesnot match"});
      }
    }
    }catch(err){
        console.log("DB Error", err);
    };
};

exports.getUser = async(req,res)=>{
    try {
        const data = await User.find({}, '-password');
        res.json({ data });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error in fetching the data', error: err });
      }
};

exports.getUserById= async(req,res)=>{
    const userId = req.params.id; 

    try {
      const user = await User.findById(userId, '-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error in fetching user data', error: err });
    }
};

exports.addPost = async()=>{
    const { title, content } = req.body; 
    const userId = req.user._id; 
    
    try {
      
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      user.blogs.push({ title, content });
      
      await user.save();
      
      res.status(201).json({ message: 'Blog added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error in adding blog', error: err });
    }
};


exports.deletePost = async(req,res)=>{
    const { userId,blogId} = req.params;

  try {
    const user = await User.findById(userId , blogId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blogIndex = user.blogs.findIndex(blog => blog._id.toString() === blogId);

    if (blogIndex === -1) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    user.blogs.splice(blogIndex, 1);

    await user.save();

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
