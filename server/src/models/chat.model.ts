import { Schema } from "mongoose";

// const Chat = model("Chat", chatSchema)

export const chatSchema = new Schema({
  sender: {
    type: String,
    required: true,
    enum: ["user", "ai"]
  },
  text: {
    type: String,
    required: true,
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  }
}, {
  timestamps: true
})
