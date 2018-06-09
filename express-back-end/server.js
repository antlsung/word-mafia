var app = require('express')();
var http = require('http');
const socketIO = require('socket.io');

const port = 3001;

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});


const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('User connected');

  socket.on('set word', word => {
    console.log('The word for this game is: ', word);
    io.sockets.emit('set word', word);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));