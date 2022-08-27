var socket = io();

socket.on('painel', (data) => {
  mostrarSenha(data);
});

socket.on('ultimaSenha', (data) => {
  document.getElementById('senha').innerHTML = data;
});

function mostrarSenha(value) {
  var bgDiv = document.getElementById('bg');
  document.getElementById('senha').innerHTML = value;
  bgDiv.classList.add('alerta-senha');
  som();
  setTimeout(() => {
    bgDiv.classList.remove('alerta-senha');
  }, 8000);
}

function som() {
  document.getElementById('campainha').volume = 0.8;
  document.getElementById('campainha').play();
}
