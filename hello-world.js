const http = require("http");

const hostname = "127.0.0.1";
const port = 3003;
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

const server = http.createServer((req, res) => {
  // imagemin(["test.jpg"], "images", {
  //   use: [imageminWebp({ quality: 90, resize: { width: 500, height: 400 } })]
  // }).then(() => {
  //   console.log("Images optimized");
  // });
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/hello") {
    res.write("Hello World 2");
    res.end();
  }

  res.end("Hello World!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
