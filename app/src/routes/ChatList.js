"use strict";
//출력
const view = {
    ChatList: (req, res)=> {
        res.render("chatList/chatList");
    },


}

//모듈 내보내기
module.exports = {
    view,
};