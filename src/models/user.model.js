const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      default: null,
    },
    lastName: {
      type: String,
      required: false,
      default: null,
    },
    fullName: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    image: {
      type: String,
      required: [true, "Image is must be Required"],
      default: "/uploads/users/user.png",
    },
    password: {
      type: String,
      required: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: roles,
    },
    callingCode: {
      type: String,
      required: false,
      default: null
    },
    phoneNumber: {
      type: Number,
      required: false,
      default: null
    },
    nidNumber: {
      type: Number,
      required: false,
      default: null
    },
    isNIDVerified: {
      type: Boolean,
      default: false,
      default: null
    },
    dataOfBirth: {
      type: Date,
      required: false,
      default: null
    },
    address: {
      type: String,
      required: false,
      default: null
    },
    oneTimeCode: {
      type: String,
      required: false,
      default: null
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isResetPassword: {
      type: Boolean,
      default: false,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    fcmToken: { // onlly use for firebase push notification / mobile focus*
      type: String,
      required: false,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },

    securitySettings: {
      recoveryEmail: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        default: null,
      },
      recoveryPhone: {
        type: String,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
        default: null,
      },
      securityQuestion: {
        type: String,
        trim: true,
        default: null,
      },
      securityAnswer: {
        type: String,
        required: function () {
          return !!this.securityQuestion;
        },
        set: (answer) => (answer ? require("crypto").createHash("sha256").update(answer).digest("hex") : null),
        select: false,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};
userSchema.statics.isPhoneNumberTaken = async function (
  phoneNumber,
  excludeUserId
) {
  const user = await this.findOne({ phoneNumber, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
