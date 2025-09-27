import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import alertRoutes from "./routes/alertRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";

const app = express(); // ✅ create app instance

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
(async () => {
  await connectDB();
})();

// Routes
app.get("/" ,(req,res)=> res.send("Api is working"));
app.use("/api/alerts", alertRoutes);
app.use("/api", infoRoutes);

// Start Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
