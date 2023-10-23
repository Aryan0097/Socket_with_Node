const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for your express app
const server = http.createServer(app);

const users = {};

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5500", // Change this to the origin of your client application
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    socket.on("newUser", name =>{
        console.log("new User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id] );
        delete users[socket.id];
    });
});

server.listen(7000, () => {
  console.log("Server is running on port 7000");
});

