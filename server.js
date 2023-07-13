
const { log } = require('console');
const express= require('express');
const { Socket } = require('socket.io');
const app= express()
const http= require('http').createServer(app)

const PORT= process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listeining to port ${PORT}`);
})

app.use(express.static(__dirname+'/public')); //access to ublic folder

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
})

//Socket
const io= require('socket.io')(http); //return function is callled with http server so that socket should know which server are the working on.

io.on('connection', (socket) =>{
    
    console.log("Connected...");
    socket.on('message', (msg) => { //server recieved the msg sent from one of the clients
        socket.broadcast.emit('message', msg); //1st arg is event name
    })
})

