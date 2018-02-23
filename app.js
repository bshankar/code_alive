const path = require('path')
const express = require('express')
const app = express()
const port = 9000

app.get('/', function (req, res) {
  res.send('Hello World')
})

// FIXME
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname + '/view/index.html'))
})

app.listen(port, function () {
  console.log('Listening on port ' + port)
})