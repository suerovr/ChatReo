const express = require("express")
const bodyParser = require('body-parser');
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")

const io = socketIO(server);

//라우팅

app.use(bodyParser.urlencoded({ extended: true }));
const home = require("./src/routes");
app.use("/", home);


//정적함수 변환
const staticDirectoriesViews = [
  'chatWithReo',
  'DtReohome',
  'hoshome',
  'Onboding',
  'login',
];

for (const dir of staticDirectoriesViews) {
  const staticDir = path.join(__dirname, 'src/views', dir);
  app.use(express.static(staticDir));
}



//view engine 세팅
app.set('views', "./src/views");
app.set("view engine","ejs");

//소켓
io.on("connection",(socket)=>{ 
    socket.on("chatting",(data)=>{
        console.log(data)
        io.emit("chatting",`그래 반가워 ${data}`)
    })
})

module.exports = app;