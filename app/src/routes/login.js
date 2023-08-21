const express = require('express');
const router = express.Router();
const { addItem } = require('../database/dbLogin');

// 사용자로부터 이메일 및 이름을 받는 라우터

const view = {
    login: (req, res)=> {
        res.render("login/login");
    },
}

const Process = {
    PutUserInfo: async (req, res) => {
        const email = req.body.email;
        const name = req.body.name;

        try {
            await addItem(email, name);
            // 데이터 추가 후 /home으로 리다이렉트
            res.redirect('/home');
        } catch (error) {
            res.status(500).send('Error adding to DynamoDB.');
        }
    }
};






//모듈 내보내기
module.exports = {
    view,
    Process
};

