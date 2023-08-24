"use strict";
//출력
const view = {
    DiagLog: (req, res)=> {
        res.render("DiagLog/DiagLog");
    },


}

//모듈 내보내기
module.exports = {
    view,
};