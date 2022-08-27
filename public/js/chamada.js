var socket = io();
var input = document.getElementById('senha');
var btn = document.getElementById('enviar');

function enviarSenha() {
  var senha = input.value;
  socket.emit('senha', senha);
}

btn.addEventListener('click', enviarSenha);
