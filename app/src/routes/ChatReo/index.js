"use strict";

const express = require("express");
const router = express.Router();

const ctrl =require('./ChatReo.ctrl')

router.get("/ChatReo", ctrl.view.ChatWithReo)
router.get("/", ctrl.view.DtReohome)

//외부 파일 사용모듈 출력
module.exports = router;