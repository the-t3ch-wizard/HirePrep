import { Schema, model } from "mongoose";

// const User = model("User", userSchema);

export const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

userSchema.pre("save", async function(next) {
  const user = this;
  console.log('USER just before save:', user)
})
