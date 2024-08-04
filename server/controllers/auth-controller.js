const User = require("../models/user-model")
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")

const home =async (req,res)=>{
  try{  
    res.status(200).send("Welcomerte to the authentication endpoint");
  }
  catch(error){
    console.log(error)
  }
};

const register =async (req,res,next)=>{
  try{  
    console.log(req.body);
    const {username,email,phone,password}= req.body;

    const userexist =await User.findOne({email});
    if(userexist){
      return res.status(400).json({msg:"email already exists"})
    }
    

    const usercreated=await User.create({username,email,phone,password});

    res.status(201).json({
      msg:"successful",
      token:await usercreated.generateToken(),
      userId:usercreated._id.toString(),
    });
  } catch (error) {
    //  res.status(500).json({msg:'Internal Server Error'})
    next(error);
    }
}


const login = async(req,res)=>{
  try{
    const {email,password}=req.body;

    const userExist= await User.findOne({email});
    if(!userExist){
      return res.status(400).json({message:"invalid crediantials"})
    }
    // const user =await bcrypt.compare(password,userExist.password);
    const user=await userExist.comparepassword(password);


    if(user){
      res.status(200).json({
        msg:"login successful",
        token:await userExist.generateToken(),
        userId:userExist._id.toString(),
      });
    }
      else{
        res.status(401).json({messagw:'invalid email or password'})
      }
  }catch(error){
    res.status(500).json({msg:'Internal Server Error'})
  }
}

const user = async (req,res)=>{
  try {
    const userdata =req.user;
    console.log(userdata);
    res.status(200).json({userdata});
  } catch(error){
    console.log(`error from nthe user route ${error}`)
  }
}

module.exports={home,register,login,user};