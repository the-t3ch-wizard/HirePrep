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
  jobTitle: {
    type: String,
    trim: true,
  },
  jobDescription: {
    type: String,
    trim: true,
  },
  // TODO : can provide details about company for which user is applying + can analyze about the company using its website
  // companyAppliedName: {
  //   type: String,
  //   trim: true,
  // },
  // companyAppliedWebsite: {
  //   type: String,
  //   trim: true,
  // },
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
  next();
})

export const Conversation = model("Conversation", conversationSchema)