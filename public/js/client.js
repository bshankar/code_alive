const socket = io.connect()
socket.on('server', function (data) {
  console.log(data)
  socket.emit('client', {msg: 'hello from client'})
})


const connectButton = document.getElementById('connectButton')
connectButton.addEventListener('click', getUsername)

function getUsername (e) {
  const username = document.getElementById('username').value
  console.log(username)
  socket.emit('client', {username: username, path: window.location.pathname})
}
