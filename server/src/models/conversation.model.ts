import { model, Schema } from "mongoose";

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
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    }
  ],
  lastChatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
})

conversationSchema.pre("save", async function (next) {
  this.name = `Conversation ${String(Date.now())} ${this.userId}`
})

export const Conversation = model("Conversation", conversationSchema)