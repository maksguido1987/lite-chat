const express = require('express');
const app = express(); // express app
const server = require('http').Server(app); // create http server
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
}); // operation of sockets via the server

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));

const PORT = process.env.PORT || 5002;

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const { roomID, userName } = req.body;
  if (!rooms.has(roomID)) {
    rooms.set(roomID, new Map(['users', new Map()], [('messages', [])]));
  }
  res.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', (data) => {
    console.log(data);
  });

  console.log('user connected', socket.id);
});

server.listen(PORT, (err) => {
  if (err) throw Error(err);
  console.log(PORT);
});
