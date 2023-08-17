const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")

const io = socketIO(server);

//라우팅
const home = require("./src/routes/ChatReo");
app.use("/", home);


//view engine 세팅
app.set('views', "./src/views");
app.set("view engine","ejs");


io.on("connection",(socket)=>{ 
    socket.on("chatting",(data)=>{
        console.log(data)
        io.emit("chatting",`그래 반가워 ${data}`)
    })
})

module.exports = app;