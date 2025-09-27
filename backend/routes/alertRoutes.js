import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

// 1. Get Alerts
router.get("/", async (req, res) => {
  const alerts = await Alert.find().sort({ date: -1 });
  res.json(alerts);
});

// 2. Add Alert
router.post("/", async (req, res) => {
  const newAlert = new Alert(req.body);
  await newAlert.save();
  res.json({ success: true, alert: newAlert });
});

export default router;
