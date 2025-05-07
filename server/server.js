import { WebSocketServer } from 'ws';

const port = 8081;
const server = new WebSocketServer({ port });

server.on("connection", (socket) => {
    console.log("Client connected");
    socket.send("Welcome Bacarotech socket server");

    socket.on("message", (data) => {
        console.log(`Received: ${data}`);
        socket.send("Message received");
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});

console.info(`WebSocket server is running on ws://localhost:${port}`);