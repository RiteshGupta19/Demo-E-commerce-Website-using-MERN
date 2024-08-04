const mongoose = require("mongoose");

const URL=process.env.MONGODB_URI;

const connectdb=async()=>{
  try{
    await mongoose.connect(URL);
    console.log("connection successful to db");
  } catch(error){
    console.log(("database connection failed"));
    process.exit(0);
  }
};
 module.exports = connectdb;