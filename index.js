const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

io.on("connection", (socket) => {

    let room = socket.handshake.query.room

    socket.join(room)

    socket.emit("message", `Welcome in ${room} group`);
    socket.on("message", (msg) => io.to(room).emit("message", msg))
});

server.listen(5000, () => {
    console.log("listening on *:" + 5000)
})