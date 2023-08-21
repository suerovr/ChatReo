const view = {
    Onboarding: (req, res)=> {
        res.render("Onboding/onboding_finish");
    },
    
}

const process = {
    loginView: (req, res) => {
        res.redirect('/login');
    }
}

//모듈 내보내기
module.exports = {
    view,
    process
};