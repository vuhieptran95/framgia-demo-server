const http = require("http");
const mkdirp = require("mkdirp-promise");
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");
const rimraf = require("rimraf");

const hostname = "127.0.0.1";
const port = 3005;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/hello") {
    res.write("Hello World 2");
    res.end();
  }

  res.end("Hello World!\n");
});

server.listen(port, hostname, async () => {
  //   await spawn("code", ["C:/Users/vuhie/OneDrive/Máy tính/React/my-app"]);
  await mkdirp("temp/hiep");
  rimraf.sync("temp");
  console.log(`Server running at http://${hostname}:${port}/`);
});
