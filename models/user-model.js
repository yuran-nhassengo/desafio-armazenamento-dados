const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor, introduza o seu nome"],
    },
    email: {
      type: String,
      required: [true, "Por favor, introduza o seu email"],
    },
    password: {
      type: String,
      required: [true, "Por favor, introduza o seu password"],
    },
    passwordConfirmation: {
      type: String,
      required: [true, "Por favor, introduza o seu password de confirmação"],
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);