import { Server } from "socket.io";

let io: Server;

export const initSocket = (socketIo: Server) => {
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

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
