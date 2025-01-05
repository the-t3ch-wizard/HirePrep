import { Schema } from "mongoose";

// const Conversation = model("Conversation", conversationSchema)

export const conversationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeId: {
    type: Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  name: {
    type: String,
    default: "Conversation "+String(Date.now()),
    required: true,
  },
  aiModel: {
    type: String,
    default: '',
  },
  lastChatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  }
}, {
  timestamps: true,
})
