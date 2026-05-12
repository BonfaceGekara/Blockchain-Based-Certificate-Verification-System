import mongoose from "mongoose";

const programmeSchema = new mongoose.Schema({
  name: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});

export default mongoose.model("Programme", programmeSchema);