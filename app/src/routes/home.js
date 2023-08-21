const view = {

    DtReohome: (req, res)=> {
        res.render("DtReohome/DtReoHome");
    },

}

const process = {
    ChatReoGo: (req, res) => {
        res.redirect('/ChatReo');
    }
}


//모듈 내보내기
module.exports = {
    view,
    process
};