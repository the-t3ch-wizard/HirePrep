import { model, Schema } from "mongoose";

export const resumeSchema = new Schema({
  resumeUrl: {
    type: String,
    // unique: true,
    required: true,
  },
  content: {
    type: String,
  }
}, {
  timestamps: true,
})

export const Resume = model("Resume", resumeSchema)