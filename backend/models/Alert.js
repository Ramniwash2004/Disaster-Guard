import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  type: String,
  message: String,
  severity: String,
  date: { type: Date, default: Date.now }
});

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
