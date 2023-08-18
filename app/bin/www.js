"use strict";

const app = require("../app");
const PORT = 8080;

app.listen(PORT, () => {    //listen 서버 포트 설정
    console.log(`"서버 ${PORT} 가동"`);
});

