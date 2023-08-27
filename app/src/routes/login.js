const express = require('express');
const router = express.Router();
let globalEmail = "";
// 사용자로부터 이메일 및 이름을 받는 라우터

const view = {
    login: (req, res)=> {
        res.render("login/login");
    },
}

const Process = {
    PutUserInfo: async (req, res) => {
        // 전역변수에 email 값을 저장합니다.
        globalEmail = req.body.email;
        console.log(`Email value set to global variable: ${globalEmail}`);
        res.redirect('/home');
    }
};


//모듈 내보내기
module.exports = {
    view,
    Process,
    globalEmail
};

