import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import indexRoute from "./routers/index.route";
import dotenv from "dotenv";
import { startSeatLockCleanupJob } from "./jobs/seatLockCleanup.job";
const app = express();
dotenv.config();
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
startSeatLockCleanupJob();
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  }),
);
const PORT = 3000;
app.use("/api", indexRoute);
app.listen(PORT, () => {
  console.log(`Server running with Port: ${PORT}`);
});
export default app;
