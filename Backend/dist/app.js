"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const index_route_1 = __importDefault(require("./routers/index.route"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./utils/socket");
const seatLockCleanup_job_1 = require("./jobs/seatLockCleanup.job");
require("./worker/payment-success.worker");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// );
const corsOptions = {
    origin: [
        process.env.CLIENT_URL || "",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://tee-star.xyz",
        "https://tee-star.xyz"
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.options(/.*/, (0, cors_1.default)(corsOptions));
app.use(express_1.default.json({
    verify: (req, _res, buf) => {
        req.rawBody = buf.toString();
    },
}));
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
(0, seatLockCleanup_job_1.startSeatLockCleanupJob)();
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too many requests, please try again later.",
}));
const PORT = process.env.PORT || 3000;
app.use("/api", index_route_1.default);
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: corsOptions,
});
(0, socket_1.initSocket)(io);
httpServer.listen(PORT, () => {
    console.log(`Server running with Port: ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map