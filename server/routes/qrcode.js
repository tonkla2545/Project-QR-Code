const express = require("express");
const router = express.Router();

const { changeToQrcode, getQrcode } = require("../controllers/qrcode");

router.post("/changeToQrcode", changeToQrcode);
router.get("/getQrcode",getQrcode)

module.exports = router;
