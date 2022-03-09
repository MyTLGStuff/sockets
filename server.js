const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = require('http').createServer(app);
const io = new Server(httpServer, { cors: {origin: '*'} });

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index.ejs')
});

httpServer.listen(3000, () => {
    console.log('Server running...')
});

io.on('connection', (socket) => {
    console.log('User connnected: ' + socket.id);

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
    });

});