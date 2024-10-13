import mongoose, { Schema } from "mongoose";
import Group from "./group";

const RecordSchema = new Schema({
  target: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  metric: {
    type: [Number],
  },
  date: {
    type: Date,
  },
});

const Record =
  mongoose.models?.Record || mongoose.model("Record", RecordSchema);

export default Record;
