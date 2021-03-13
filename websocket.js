const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('test', "working");
    socket.on('message', (d) => {
        socket.emit('newMessage', d)
    })
})

module.exports = socketapi;