import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
