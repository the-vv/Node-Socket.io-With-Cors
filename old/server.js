var app = require('express')();
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
var server = require('http').Server(app)
var io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})

app.get('/', (req, res) => {
    res.json({ status: 'ok' })
})

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('test', "working");
    socket.on('message', (d) => {
        socket.emit('newMessage', d)
    })
})

server.listen(3000, () => {
    console.log('Listening on 3000');
})

