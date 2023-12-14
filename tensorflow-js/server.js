const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 8080

// servers the css file
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi')

    // chat message event
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

    // disconnect event
    // socket.on('disconnect', () => {
    //     console.log('user disconnected')
    // })
  });

  server.listen(port, () => {
    console.log(`listening on *:${port}`);
  });