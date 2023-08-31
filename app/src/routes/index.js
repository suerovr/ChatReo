"use strict";

const express = require("express");
const router = express.Router();

const ctrl =require('./ChatReo.ctrl')
const LoginCtrl = require('./login')
const HomeCtrl = require('./home')
const OnboardingCtrl = require('./Onboarding')
const ChatListCtrl = require('./ChatList')
const DiagLogCtrl = require('./DiagLog')
const dbPutDataCtrl = require('./dbPutData')

//ChatReo
router.get("/ChatReo", ctrl.view.ChatWithReo)

//home 
router.get("/home", HomeCtrl.view.DtReohome)
router.post("/ChatReo-go", HomeCtrl.process.ChatReoGo)
router.post("/Diaglog-go", HomeCtrl.process.DiagLogGo)
router.post("/ChatList-go", HomeCtrl.process.ChatListGo)
router.post('/HosRecomBox-go', (req, res) => {
    res.redirect('http://www.chatreo.com:3000/model');
});

//login
router.get("/login", LoginCtrl.view.login)
router.post("/loginhome", LoginCtrl.Process.PutUserInfo)

//Onboarding
router.get("/Onboarding", OnboardingCtrl.view.Onboarding)
router.post('/login', OnboardingCtrl.process.loginView)

//ChatList
router.get("/ChatList", ChatListCtrl.view.ChatList)

//DiagLog
router.get("/DiagLog", DiagLogCtrl.view.DiagLog)
router.post('/home-go', HomeCtrl.process.HomeGo)

//dbPutChatData
router.get("/test", dbPutDataCtrl.view.testview)
router.get("/dbimport/getChatData/:chatRoomID", dbPutDataCtrl.process.ImportChat)
router.get("/getChatsByEmail", dbPutDataCtrl.process.ImportChatbyEmail)
router.get("/dbget/userDataItem", dbPutDataCtrl.process.ImportUserData)
router.get("/dbget/userDiagnoseItem", dbPutDataCtrl.process.GetDiagnoseData)
router.get("/deleteAll", dbPutDataCtrl.process.Delete)
router.post('/dbput/chatuser', dbPutDataCtrl.process.PutChatUserInfo)
router.post('/dbput/ChatUserData', dbPutDataCtrl.process.PutChatUser)

//외부 파일 사용모듈 출력
module.exports = router;