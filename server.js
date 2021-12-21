// set up express
const express = require('express')
const app = express()
// set up http server for socket.io
const http = require('http')
const server = http.createServer(app)
// set up socket.io
const socketio = require('socket.io')
const io = socketio(server)
// set static folder
app.use(express.static(__dirname + '/public'))
// set up ejs
app.set('view engine', 'ejs')

// util imports
const formatMessage = require('./utils/formatMessage')
const cleanHTML = require('./utils/cleanHTML')

// variables
const PORT = 3000 || process.env.PORT
var user


io.on('connection', socket => {

    socket.on('chat-message', payload => {
        cleanPayload = cleanHTML(payload)
        io.emit('chat-message', formatMessage(cleanPayload.user, cleanPayload.message))
    })

})


const homeRoute = require('./routes/home')
app.use('/', homeRoute)

app.get('/home', (req, res) => {
    res.render('home')
})

const chatRoute = require('./routes/chat')
app.use('/chat', chatRoute)






server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})