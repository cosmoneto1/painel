const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var ultimaSenha = 800;

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('painel');
});

app.get('/chamada', (req, res) => {
  res.render('chamada');
});

app.get('/senha', (req, res) => {
  var numero = req.query.n;
  if (numero) {
    ultimaSenha = numero;
    io.emit('painel', numero);
    res.send({ ok: true });
  } else {
    res.sendStatus(500);
  }
});

io.on('connection', (socket) => {
  socket.emit('ultimaSenha', ultimaSenha);
  socket.on('senha', (data) => {
    ultimaSenha = data;
    socket.broadcast.emit('painel', data);
  });
});

server.listen(port, () => {
  console.log(`server on port ${port}`);
});
