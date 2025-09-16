const QRCode = require("qrcode");
const validator = require("validator");
const prisma = require("../config/prisma");

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

    const checkUrl = await prisma.url.findFirst({
      where: {
        url: url,
      },
    });

    const genQrCode = await QRCode.toDataURL(url);
    if (checkUrl) {
      await prisma.url.update({
        where: {
          id: checkUrl.id,
        },
        data: {
          qrcode: genQrCode,
        },
      });
    } else {
      await prisma.url.create({
        data: {
          url,
          qrcode: genQrCode,
        },
      });
    }
    return res.json({
      qrcode: genQrCode,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getQrcode = async (req, res) => {
  try {
    const getQR = await prisma.url.findMany({
      take: 10,
      skip: 0,
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("QRcode ", getQR);
    res.status(200).json({
      data: getQR,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// docker-compose down
// docker-compose up --build -d
