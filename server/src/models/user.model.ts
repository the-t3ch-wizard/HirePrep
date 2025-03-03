import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userEducationalDetailsSchema = new Schema({
  college: {
    type: String,
  },
  degree: {
    type: String,
  },
})

const socialMediaProfileSchema = new Schema({
  linkedinUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  mailUrl: {
    type: String,
  },
  resumeUrl: {
    type: String,
  },
})

const profileVisibilityConfigSchema = new Schema({
  profileVisibility: {
    type: Number,
    // 1 : public
    // 0 : platform profile (leetcode, gfg) is private
    // -1 : completely private
    enum: [1, 0, -1],
    default: 1,
    required: true
  },
})

const contestBadgeSchema = new Schema({
  name: {
    type: String,
  },
  hoverText: {
    type: String,
  },
  icon: {
    type: String,
  }
})

const platformUserStatsSchema = new Schema({
  username: {
    type: String,
  },
  plaformRank: {
    type: Number,
  },
  contestRank: {
    type: Number,
  },
  userAvatar: {
    type: String,
  },
  stars: {
    type: Number,
  },
  contestBadge: {
    type: contestBadgeSchema
  },
  languageList: [{
    languageName: {
      type: String,
    },
    problemsSolved: {
      type: Number,
    }
  }],
})

const platformBadgeStatsSchema = new Schema({
  badgeList: [{
    name: {
      type: String,
    },
    shortName: {
      type: String,
    },
    displayName: {
      type: String,
    },
    hoverText: {
      type: String,
    },
    icon: {
      type: String,
    },
    creationDate: {
      type: Date,
    },
    category: {
      type: String,
    },
    medal: {
      iconGif: {
        type: String,
      },
      iconGifBackground: {
        type: String,
      },
    }
  }]
})

const topicAnalysisStatsSchema = new Schema({
  topicWiseDistribution: {
    type: Map,
    of: Number,
  }
})

const totalQuestionStatsSchema = new Schema({
  totalQuestionAccepted: {
    type: Number,
  },
  easyQuestionAccepted: {
    type: Number,
  },
  mediumQuestionAccepted: {
    type: Number,
  },
  hardQuestionAccepted: {
    type: Number,
  },
  basicQuestionAccepted: {
    type: Number,
  },
  schoolQuestionAccepted: {
    type: Number,
  },
})

const contestActivityStatsSchema = new Schema({
  rating: {
    type: Number,
  },
  attendedContestsCount: {
    type: Number,
  },
  globalRanking: {
    type: Number,
  },
  totalParticipants: {
    type: Number,
  },
  topPercentage: {
    type: Number,
  },
  contestActivityList: [{
    problemsSolved: {
      type: Number,
    },
    totalProblems: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    ranking: {
      type: Number,
    },
    title: {
      type: String,
    },
    startTime: {
      type: Date,
    },
  }]
})

const dailyActivityStatsSchema = new Schema({
  userCalendar: {
    activeYears: {
      type: [Number],
    },
    streak: [{
      year: {
        type: Number,
      },
      maxStreak: {
        type: Number,
      },
      totalActiveDays: {
        type: Number,
      }
    }],
    submissionCalendar: [{
      year: {
        type: Number,
      },
      submissionMap: {
        type: Map,
        of: Number,
      }
    }]
  }
})

const platformProfileSchema = new Schema({
  platform: {
    type: String,
    enum: ["leetcode", "geeksforgeeks"],
    required: true
  },
  platformCode: {
    type: Number,
    enum: [0, 1],
    // 0 : leetcode
    // 1 : geeksforgeeks
    required: true
  },
  platformType: {
    type: [String],
    enum: ["dev", "dsa", "cp"],
    // required: true,
  },
  userStats: {
    type: platformUserStatsSchema
  },
  badgeStats: {
    type: platformBadgeStatsSchema,
  },
  topicAnalysisStats: {
    type: topicAnalysisStatsSchema,
  },
  totalQuestionStats: {
    type: totalQuestionStatsSchema,
  },
  contestActivityStats: {
    type: contestActivityStatsSchema,
  },
  dailyActivityStats: {
    type: dailyActivityStatsSchema,
  },
})

export const userSchema = new Schema({
  profileName: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
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
  imageUrl: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 1000,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  birthDate: {
    type: Date,
  },
  country: {
    type: String,
  },
  userEducationalDetails: {
    type: userEducationalDetailsSchema,
  },
  socialMediaProfileList: {
    type: socialMediaProfileSchema,
  },
  profileVisibilityConfig: {
    type: profileVisibilityConfigSchema,
    default: {},
  },
  platformProfiles: {
    type: [platformProfileSchema]
  }
}, {
  timestamps: true,
})

userSchema.pre("save", async function (next) {
  let user = this;
  user.profileName = String(user._id);
  user.password = await bcrypt.hash(user.password, 10);
  next();
})

export const User = model("User", userSchema)