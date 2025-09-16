const express = require("express");
const router = express.Router();

const { changeToQrcode } = require("../controllers/qrcode");

router.post("/changeToQrcode", changeToQrcode);

module.exports = router;
