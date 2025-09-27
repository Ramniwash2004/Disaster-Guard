import express from "express";

const router = express.Router();

// 3. Basic Info
router.get("/info", (req, res) => {
  res.json({
    disasters: ["Flood", "Earthquake", "Cyclone", "Wildfire"],
    safetyTips: ["Stay Calm", "Follow Evacuation Plans", "Keep Emergency Kit"]
  });
});

// 4. Graph Data
router.get("/stats", (req, res) => {
  res.json({
    yearlyDisasters: [
      { year: 2021, count: 15 },
      { year: 2022, count: 22 },
      { year: 2023, count: 30 }
    ]
  });
});

export default router;
