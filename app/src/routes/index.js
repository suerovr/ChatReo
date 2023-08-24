"use strict";

const express = require("express");
const router = express.Router();

const ctrl =require('./ChatReo.ctrl')
const LoginCtrl = require('./login')
const HomeCtrl = require('./home')
const OnboardingCtrl = require('./Onboarding')
const ChatListCtrl = require('./ChatList')
const DiagLogCtrl = require('./DiagLog')

//ChatReo
router.get("/ChatReo", ctrl.view.ChatWithReo)

//home 
router.get("/home", HomeCtrl.view.DtReohome)
router.post("/ChatReo-go", HomeCtrl.process.ChatReoGo)
router.post("/Diaglog-go", HomeCtrl.process.DiagLogGo)
router.post("/ChatList-go", HomeCtrl.process.ChatListGo)

//login
router.get("/login", LoginCtrl.view.login)
router.post("/home-login", LoginCtrl.Process.PutUserInfo)

//Onboarding
router.get("/Onboarding", OnboardingCtrl.view.Onboarding)
router.post('/login', OnboardingCtrl.process.loginView)

//ChatList
router.get("/ChatList", ChatListCtrl.view.ChatList)

//DiagLog
router.get("/DiagLog", DiagLogCtrl.view.DiagLog)
router.post('/home-go', HomeCtrl.process.HomeGo)

//외부 파일 사용모듈 출력
module.exports = router;