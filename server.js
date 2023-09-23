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
        socket.emit('error', 'Maksymalna liczba klientów osiągnięta');
        socket.disconnect();
        return;
    }

    connectedClients++;
    console.log('Użytkownik połączony, obecnie podłączonych: ', connectedClients);

    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        connectedClients--;
        console.log('Użytkownik rozłączony, obecnie podłączonych: ', connectedClients);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
