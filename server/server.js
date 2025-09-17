const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { readdirSync } = require("fs");
const cron = require("node-cron");
const path = require("path");

const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // สำหรับ JSON body
app.use(express.urlencoded({ extended: true })); // สำหรับ form-urlencoded

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (rea, res) => {
  res.send("hello tonkla");
  // res.render('index'); 
});


cron.schedule("0 * * * *", async () => {
  // รันทุกชั่วโมง
  try {
    await prisma.url.deleteMany({
      where: {
        expiresAt: { lt: new Date() }, // ลบ record ที่หมดอายุ
      },
    });
    console.log("ลบ QR Code ที่หมดอายุเรียบร้อย");
  } catch (err) {
    console.error("Error in cron job:", err);
  }
});

readdirSync("./routes").map((item) =>
  app.use("/api", require("./routes/" + item))
); // map is loop
// const qrcode = require('./routes/qrcode')

// app.use('/api', qrcode)

app.listen(4000, () => {
  console.log("Server running");
});
