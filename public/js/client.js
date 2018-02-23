const socket = io.connect()

socket.on('handshake', function (data) {
  console.log(data)
  // if master start webrtc peerconnection
})

socket.on('handshake_error', function (data) {
  console.log(data)
  // show a notification
})

const connectButton = document.getElementById('connectButton')
connectButton.addEventListener('click', getUsername)

function getUsername (e) {
  const username = document.getElementById('username').value
  socket.emit('handshake', JSON.stringify({userid: username, bufferid: window.location.pathname}))
}
