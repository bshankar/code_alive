const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)

const port = 9000
const io = require('socket.io')(server)
app.use(express.static('public'))

const buffers = {}

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/buffer/:bufferid', function (req, res) {
  console.log(req.params.bufferid)
  res.sendFile(path.join(__dirname, '/view/index.html'))
})

io.on('connection', function (socket) {
  console.log('a user connected')
  // handle disconnects
  // when disconnected  remove user from buffers
  socket.on('handshake', function (data) {
    console.log(data)
    data = JSON.parse(data)
    const bufferid = data.bufferid
    const userid = data.userid
    if (buffers[bufferid]) {
      if (buffers[bufferid].slave) {
        console.log('maximum users reached ', userid, buffers)
        socket.emit('handshake_error', JSON.stringify({msg: 'maximum users reached'}))
      } else {
        const master = buffers[bufferid].master
        if (master.userid === userid) {
          socket.emit('handshake_error', JSON.stringify({msg: 'you are already a master of the 9 realms'}))
        } else {
          console.log('adding slave ', userid, buffers)
          buffers[bufferid].slave = {userid: userid, socket: socket}
          // send slave id to master
          master.socket.emit('handshake', JSON.stringify({...data, from: 'slave'}))
          // send master id to slave
          socket.emit('handshake', JSON.stringify({userid: master.userid, bufferid: bufferid, from: 'master'}))
        }
      }
    } else {
      // set master
      buffers[bufferid] = {}
      buffers[bufferid].master = {userid: userid, socket: socket}
    }
  })
})

server.listen(port, function () {
  console.log('Listening on port ' + port)
})
