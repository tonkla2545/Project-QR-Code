const QRCode = require("qrcode");
const validator = require("validator");
const prisma = require('../config/prisma')

exports.changeToQrcode = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        message: "URL is Not found",
      });
    }
    if (!validator.isURL(url)) {
      return res.status(400).json({
        message: "Invalid URL format",
      });
    }
    const genQrCode = await QRCode.toDataURL(url);
    
    console.log(genQrCode)

    await prisma.url.create({
      data:{
        url:url,
        qrcode:genQrCode
      }
    })

    res.json({
      qrcode: genQrCode,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
