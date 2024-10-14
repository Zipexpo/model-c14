import mongoose, { Schema } from "mongoose";
import { typeList } from "@/models/ulti";
const groupSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    members: [
      {
        name: String,
        email: String,
        type: {
          type: String,
          enum: typeList.short,
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models?.Group || mongoose.model("Group", groupSchema);
