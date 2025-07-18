import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.send("API is healthy");
});
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
