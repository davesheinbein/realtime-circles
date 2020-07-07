const socket = io();

socket.on('add-circle', function(data) {
  addCircle(data);
});

socket.on('clear-display', function() {
  circles.innerHTML = '';
});

socket.on('update-player-list', function(data) {
  players.innerHTML = data.map(player => `<li>${player}</li>`).join('');
});

const circles = document.getElementById('circles');
const players = document.getElementById('players');

let initials = '';

// Listen for clicks anywhere in the "section"
circles.addEventListener('click', function(evt) {
  socket.emit('add-circle', {
    initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(20, 125),
    rgba: getRandomRGBA()
  });
});

document.querySelector('button').addEventListener('click', function() {
  socket.emit('clear-display');
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);

socket.emit('register-player', initials);

function getInitials() {
  const input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

function addCircle({x, y, dia, rgba, initials}) {
  const el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return `rgba(${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(2, 10) / 10})`;
}
