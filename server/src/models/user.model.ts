import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// const User = model("User", userSchema);

export const userSchema = new Schema({
  name: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    unique: true,
    minlength: 5,
    required: true
  },
  password: { 
    type: String,
    minlength: 6,
    required: true
  },
})

userSchema.pre("save", async function(next) {
  let user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
})
