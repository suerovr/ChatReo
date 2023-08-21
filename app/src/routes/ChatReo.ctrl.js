"use strict";
//출력
const view = {
    ChatWithReo: (req, res)=> {
        res.render("chatWithReo/chatWithReo");
    },


}

//모듈 내보내기
module.exports = {
    view,
};