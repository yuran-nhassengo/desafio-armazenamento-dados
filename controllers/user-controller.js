const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ message: "Obter todos os Usuarios", data: users });
});

const getUser = asyncHandler ( async(req, res) => {

    const user = await User.findById(req.params.id)

    if(!user){
      res.status(404).json({message:"Usuario não encontrado"});
    }

  res.status(200).json({message: `Obter Usuario ${user}`,
  });
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

            if(!userExist){

                return  res.status(404).json({"message": "O utilizador não foi encontrado!"});
             }

        
             return  res.status(200).json({"message": "Utilizador encontrado!"});


        }catch(err){
            res.status(400).json({err: "Internal Server error."});
        }

    });








module.exports = { getAllUser, getUser, signup,login};