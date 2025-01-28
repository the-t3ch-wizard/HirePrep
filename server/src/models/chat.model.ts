import { model, Schema } from "mongoose";

export const chatSchema = new Schema({
  sender: {
    type: String,
    required: true,
    enum: ["user", "model"]
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

export const Chat = model("Chat", chatSchema)