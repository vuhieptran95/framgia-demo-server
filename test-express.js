const express = require("express");
const app = express();
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const port = 4000;

const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  imagemin(["uploads/**"], "images", {
    use: [imageminWebp({ quality: 70 })]
  }).then(() => {
    console.log("Images optimized");
  });
  res.send("testing");
});

app.post("/image", upload.single("myImage"), (req, res) => {
  console.log(req.file);
  res.send("received");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
