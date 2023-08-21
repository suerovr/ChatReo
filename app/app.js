const express = require("express")
const bodyParser = require('body-parser');
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")

const io = socketIO(server);

//라우팅
const home = require("./src/routes/ChatReo");
app.use("/", home);
app.use(bodyParser.urlencoded({ extended: true }));

//정적함수 변환
const staticDirectoriesViews = [
  'chatWithReo',
  'DtReohome',
  'hoshome'
];

for (const dir of staticDirectoriesViews) {
  const staticDir = path.join(__dirname, 'src/views', dir);
  app.use(express.static(staticDir));
}

//라우터
//로그인 라우터
const loginRoutes = require('./src/routes/login/login');
app.use(loginRoutes);

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