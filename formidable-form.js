const http = require("http");
const formidable = require("formidable");
const mkdirp = require("mkdirp-promise");
const util = require("util");
const fs = require("fs");

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/hello") {
    res.write("Hello World formidable");
    res.end();
    return;
  }
  if (req.url === "/image") {
    var form = new formidable.IncomingForm();
    await mkdirp("test");
    // form.parse(req);
    await form.parse(req, async function(err, fields, files) {
      //   res.writeHead(200, { "content-type": "text/plain" });
      //   res.write("received upload:\n\n");
      //   res.end(util.inspect({ fields: fields, files: files }));
      var oldpath = files.myImage.path;
      console.log(oldpath);
      var newpath = "test/" + files.myImage.name;
      console.log(newpath);
      fs.rename(oldpath, newpath, function(err) {
        if (err) throw err;
        res.write("File uploaded and moved!");
        res.end(util.inspect({ fields: fields, files: files }));
      });
    });
    return;
  } else {
    res.write("Upload image here");
    res.end();
    return;
  }
  res.write("default page");
  res.end();
});

server.listen(6001, "127.0.0.1", () => {
  console.log("Fuck you");
});
