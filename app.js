import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";

const app = express();
const server = createServer(app);

const io = new SocketIoServer(server, {
  cors: {
    origin: "https://main--sweet-seahorse-ef13bb.netlify.app",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: "https://main--sweet-seahorse-ef13bb.netlify.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

io.on("connection", (socket) => {
  socket.emit("message", {
    message: "Welcome",
    id: socket.id,
  });

  socket.on("userMessage", (data) => {
    io.to(socket.id).emit("message", {
      message: data,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
