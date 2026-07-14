"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = exports.initSocket = void 0;
let io;
const initSocket = (socketIo) => {
    io = socketIo;
    io.on("connection", (socket) => {
        // console.log("Client connected:", socket.id);
        socket.on("joinShowtime", (showtimeId) => {
            if (showtimeId) {
                socket.join(`showtime:${showtimeId}`);
                // console.log(`Socket ${socket.id} joined room showtime:${showtimeId}`);
            }
        });
        socket.on("leaveShowtime", (showtimeId) => {
            if (showtimeId) {
                socket.leave(`showtime:${showtimeId}`);
                // console.log(`Socket ${socket.id} left room showtime:${showtimeId}`);
            }
        });
        socket.on("disconnect", () => {
            // console.log("Client disconnected:", socket.id);
        });
    });
};
exports.initSocket = initSocket;
const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
exports.getIo = getIo;
//# sourceMappingURL=socket.js.map