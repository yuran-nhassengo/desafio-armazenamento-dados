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
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation
  });

  res.status(201).json({ message: "Usuario criado com sucesso!", data: user });
});

const login = asyncHandler(async (req, res) => {

  res.status(201).json({ message: "Login", date:req.body });
});








module.exports = { getAllUser, getUser, signup,login};