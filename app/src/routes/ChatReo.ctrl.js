"use strict";
//출력
const view = {
    ChatWithReo: (req, res)=> {
        res.render("ChatWithReo/chatWithReo");
    },

    DtReohome: (req, res)=> {
        res.render("DtReohome/DtReoHome");
    },

    login: (req, res)=> {
        res.render("login/login");
    },
    

}

//모듈 내보내기
module.exports = {
    view,
};