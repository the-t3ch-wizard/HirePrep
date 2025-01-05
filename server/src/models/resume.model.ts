import { Schema } from "mongoose";

// const Resume = model("Resume", resumeSchema)

export const resumeSchema = new Schema({
  resumeUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  }
}, {
  timestamps: true,
})
