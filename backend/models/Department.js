import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: String,
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College"
  }
});

export default mongoose.model("Department", departmentSchema);