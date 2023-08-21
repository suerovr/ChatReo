const express = require('express');
const router = express.Router();
const { addItem } = require('../../database/dbLogin');

// 사용자로부터 이메일 및 이름을 받는 라우터
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/submit-login', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;

    try {
        await addItem(email, name);
        res.send('Successfully added to DynamoDB!');
    } catch (error) {
        res.status(500).send('Error adding to DynamoDB.');
    }
});

module.exports = router;
