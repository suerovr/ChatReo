"use strict";

const express = require("express");
const router = express.Router();

const ctrl =require('./ChatReo.ctrl')

router.get("/ChatReo", ctrl.view.ChatReo)
router.get("/index", ctrl.view.index)

//외부 파일 사용모듈 출력
module.exports = router;