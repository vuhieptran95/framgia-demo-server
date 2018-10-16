var http = require("http"),
  path = require("path"),
  os = require("os"),
  fs = require("fs");

var Busboy = require("busboy");

http
  .createServer(function(req, res) {
    if (req.method === "GET") {
      res.end("Getting only");
    }
    if (req.method === "POST") {
      var busboy = new Busboy({ headers: req.headers });
      busboy.on("file", function(
        fieldname,
        file,
        filename,
        encoding,
        mimetype
      ) {
        console.log(file, fieldname, filename, encoding, mimetype);
        var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
        console.log(saveTo);
        file.pipe(fs.createWriteStream(saveTo));
      });
      busboy.on("finish", function() {
        res.writeHead(200, { Connection: "close" });
        res.end("That's all folks!");
      });
      return req.pipe(busboy);
    }
    res.writeHead(404);
    res.end();
  })
  .listen(8000, function() {
    console.log("Listening for requests");
  });
