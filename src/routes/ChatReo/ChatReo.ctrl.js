"use strict";
//출력
const view = {
    ChatReo: (req, res)=> {
        res.render("ChatReo/ChatReo");
    },

    index: (req, res)=> {
        res.render("ChatReo/index");
    },
}

//모듈 내보내기
module.exports = {
    view,
};