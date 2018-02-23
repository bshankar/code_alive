const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)

const port = 9000
const io = require('socket.io')(server)

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World')
})

// FIXME
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/view/index.html'))
})

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.emit('server', {msg: 'hello from server'})
  socket.on('client', function (data) {
    console.log(data)
  })
})

server.listen(port, function () {
  console.log('Listening on port ' + port)
})
