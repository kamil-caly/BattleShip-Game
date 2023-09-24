const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const io = socketIo(server);

let connectedClients = 0;

io.on('connection', (socket) => {
    if (connectedClients >= 2) {
        socket.emit('error', 'The maximum number of clients reached!');
        socket.disconnect();
        return;
    }

    connectedClients++;
    console.log('The user connected, current connections count: ', connectedClients);
    io.emit('receive_message', { system: true, text: 'A new user connected.' });

    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        connectedClients--;
        console.log('The user disconnected, current connections count: ', connectedClients);
        io.emit('receive_message', { system: true, text: 'A user disconnected.' });
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`The server has been started on port: ${PORT}`);
});
