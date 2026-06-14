import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import indexRoute from "./routers/index.route";
import { startSeatLockCleanupJob } from "./jobs/seatLockCleanup.job";
import "./worker/payment-success.worker";
const app = express();
app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// );

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
startSeatLockCleanupJob();
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many requests, please try again later.",
  }),
);
const PORT = process.env.PORT || 3000;
app.use("/api", indexRoute);
app.listen(PORT, () => {
  console.log(`Server running with Port: ${PORT}`);
});
export default app;
