const User = require('../models/User')

const getUser = async(req, res)=>{
    try{
        const users = await User.find({deleted: false});
        res.json(users)
    }
    catch(err){
        res.status(500).json({message:'Server error'})
    }
}

const addUser = async(req, res)=>{
   
    const {firstName, lastName, email, password}=req.body;
   
    try{

      if(!firstName || !lastName || !email || !password){

        return res.status(400).json({message:'All fields are required'})
      }

      const existingUser = await User.findOne({email})

      if(existingUser){
        return res.status(400).json({message:'Email already exists'})
      }

      const newUser = new User({firstName, lastName, email, password});
      await newUser.save()

      res.status(201).json(newUser)

    }
    catch(err){
        console.log(err)
        res.status(400).json({message:'Failed to add user'})
        
        
    }
}

const deleteUser = async(req, res)=>{
    try{

        const user = await User.findByIdAndUpdate(req.params.id,{deleted: true});

        if(!user)return res.status(404).json({message:'User not found'});

        res.json({message:'User deleted'})
    }
    catch(err){
        res.status(500).json({message:'Server Error'})
    }
}

module.exports = {getUser, addUser, deleteUser}