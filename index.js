const express = require('express');
const PORT = 8000;
const app=express();

const userRoutes = require('./routes/User');

app.use("/login",userRoutes);
app.use("/",userRoutes);
app.use("/profile:id",userRoutes);
app.use("/profile:id",userRoutes);
app.use("/register",userRoutes);

app.listen(PORT,()=>{
    console.log(`App is running on $PORT`);
})