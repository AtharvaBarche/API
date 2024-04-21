const express = require('express');
const PORT = 8000;
const app=express();

const userRoutes = require('./routes/User');
app.use("/",userRoutes);

app.listen(PORT,()=>{
    console.log(`App is running on $PORT`);
})