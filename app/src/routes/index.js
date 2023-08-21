"use strict";

const express = require("express");
const router = express.Router();

const ctrl =require('./ChatReo.ctrl')
const LoginCtrl = require('./login')
const HomeCtrl = require('./home')
const OnboardingCtrl = require('./Onboarding')

//ChatReo
router.get("/ChatReo", ctrl.view.ChatWithReo)

//home 
router.get("/home", HomeCtrl.view.DtReohome)
router.post("/ChatReo", HomeCtrl.process.ChatReoGo)

//login
router.get("/login", LoginCtrl.view.login)
router.post("/home", LoginCtrl.Process.PutUserInfo)

//Onboarding
router.get("/Onboarding", OnboardingCtrl.view.Onboarding)
router.post('/login', OnboardingCtrl.process.loginView);

//외부 파일 사용모듈 출력
module.exports = router;