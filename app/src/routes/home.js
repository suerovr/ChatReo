const view = {

    DtReohome: (req, res)=> {
        res.render("DtReohome/DtReoHome");
    },

}

const process = {
    ChatReoGo: (req, res) => {
        res.redirect('/ChatReo');
    },

    DiagLogGo: (req, res) => {
        res.redirect('/DiagLog');
    },

    ChatListGo: (req, res) => {
        res.redirect('/ChatList');
    },
    
    HomeGo: (req, res) => {
        res.redirect('/home')
    }

}



//모듈 내보내기
module.exports = {
    view,
    process
};