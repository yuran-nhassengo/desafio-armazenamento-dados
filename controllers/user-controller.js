const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();

  const usData = users.map(user =>{
    return {
        id: user._id,
        email: user.email
    }
  })
  
  res.status(200).json({data:usData});
});

const getUser = asyncHandler ( async(req, res) => {

    const user = await User.findById(req.params.id)

    const {_id,email} = user


    if(!user){
      res.status(404).json({message:"Usuario não encontrado"});
    }

    res.status(200).json({_id,email});
});


const signup = asyncHandler(async (req, res) => {

        const {name,email,password,passwordConfirmation} = req.body;


   try{
    const userExist = await User.findOne({email});

    if(!name || !email || !password || !password){
        return  res.status(400).json({message: "Os dados introduzidos não são válidos."});
    }

    if(userExist){

       return  res.status(400).json({errors: "O endereço introduzido já está registado."});
    }

    if(password != passwordConfirmation){
        return  res.status(400).json({errors: "As passwords não coincidem."});
    }

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      });
    
      res.status(201).json({ message: "Utilizador criado com sucesso!", _id: user._id });

   }catch (err){

        res.status(400).json({err: "Internal Server error."});
   }


  



});

    const login = asyncHandler(async (req, res) => {

        const {email,password} = req.body;

        try{

            const userExist = await User.findOne({email}); 
            const {password,name} = userExist

            if(!userExist){

                return  res.status(404).json({"message": "O utilizador não foi encontrado!"});
             }


             if(req.body.password != password){

                return  res.status(401).json({ "message": "A password introduzida é inválida!"});
             }
        
             return  res.status(200).json({message: `Bem vindo!,${name}`});


        }catch(err){
            res.status(400).json({err: "Internal Server error."});
        }

    });








module.exports = { getAllUser, getUser, signup,login};