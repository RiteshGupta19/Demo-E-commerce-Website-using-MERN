const user=require("../models/user-model")
const contact=require("../models/contact-model")

const getallusers=async(req,res,next)=>{
  try{
    const users=await user.find({},{password:0});
    console.log(users)
    if(!users || users.length===0){
      return res.status(404).json({message:"no users found"});
    }
    return res.status(200).json(users); 
  }catch(error){
    next(error);
  }
}

const getuserbyid=async(req,res,next)=>{
  try{
    const id=req.params.id;
    const data=await user.findOne({_id:id},{password:0})
    return res.status(200).json(data)
  } catch(error){
    next(error);
  }
}

const updateuserbyid=async(req,res,next)=>{
  try{
    const id=req.params.id;
    const updateduserdata=req.body;
    const updateduser=await user.updateOne({_id:id},{$set:updateduserdata,})
    return res.status(200).json(updateduser);
  }catch(error){
    next(error)
  }
}

const deleteuserbyid=async(req,res,next)=>{
  try{
    const id=req.params.id;
    await user.deleteOne({_id:id})
    res.status(200).json({msg:"user deleted"})
  } catch(error){
    next(error);
  }
}

const getallcontacts= async(req,res,next)=>{
  try{
    const contacts=await contact.find();
    console.log(contacts);
    if(!contacts || contacts.length===0){
      return res.status(404).json({message:"no users found"});
    }
    return res.status(200).json(contacts);
  } catch(error){
    next(error)
  }
}

const deletecontactbyid=async(req,res,next)=>{
  try{
    const id=req.params.id;
    await contact.deleteOne({_id:id})
    res.status(200).json({msg:"user deleted"})
  } catch(error){
    next(error);
  }
}

module.exports = {getallusers,getallcontacts,deleteuserbyid,getuserbyid,updateuserbyid,deletecontactbyid};