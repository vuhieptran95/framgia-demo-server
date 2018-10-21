const Fb = require("./firebase/config");
const Validate = require("./validation/user-validation");
const Response = require("./reponse/response-add-new-user");
const formidable = require("formidable");
const fs = require("fs");
const express = require("express");
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");
const path = require("path");
const app = express();
const util = require("util");
const cors = require("cors");
const mkdir = require("mkdirp-promise");
const rimraf = require("rimraf");
const os = require("os");
const tmpDir = os.tmpdir();

app.use(cors());

app.post("/users", async (req, res) => {
  var form = new formidable.IncomingForm();
  await form.parse(req, async function(err, fields, files) {
    var username = fields.username;
    var email = fields.email.toLowerCase();
    var name = fields.name;
    var uploadRes = null;
    var image = files.profileImage;
    try {
      var input = await mkdir(path.join(tmpDir, "image-input"));
      var output = await mkdir(path.join(tmpDir, "image-output"));
      var inputFile = path.join(input, "profile.jpeg");
      var outputFile = path.join(output, "profile.webp");
    } catch (error) {
      console.log(error);
    }

    if (!Validate.usernameIsValid(username)) {
      Response.usernameIsNotValid(res);
      return;
    }

    if (!Validate.isEmail(email)) {
      Response.isNotEmail(res);
      return;
    }

    if (await Validate.usernameExist(username)) {
      Response.userExists(res);
      return;
    }

    if (!Validate.usernameIsValid(username)) {
      Response.usernameIsNotValid(res);
      return;
    }

    if (image.name !== "") {
      if (Validate.imageTooBig(image, 5)) {
        Response.imageTooBig(res);
        return;
      }
      if (!Validate.isImage(image)) {
        Response.isNotImage(res);
        return;
      }
      // TODO save image
      try {
        fs.renameSync(image.path, inputFile);
      } catch (error) {
        Response.fileProcessingError(res, error);
        return;
      }
      // TODO convert image
      try {
        await imagemin([inputFile], output, {
          use: [
            imageminWebp({
              size: 80 * 1024,
              resize: { width: 350, height: 350 }
            })
          ]
        });
      } catch (error) {
        Response.convertImageError(res, error);
        return;
      }
      // TODO save image to storage
      try {
        uploadRes = await Fb.Bucket.upload(outputFile, {
          destination: `users/${username}/profile-${Date.now()}.webp`,
          public: true
        });
      } catch (error) {
        Response.saveImageError(res, error);
        return;
      }
      try {
        rimraf.sync(input);
        rimraf.sync(output);
      } catch (error) {
        console.log(error);
      }
    }

    if (await Validate.usernameExist(username)) {
      Response.userExists(res);
      return;
    }

    var profileImagePath = uploadRes
      ? "https://storage.googleapis.com/my-demo-f85d3.appspot.com/" +
        uploadRes[0].name
      : "";
    try {
      await Fb.Db.collection("users")
        .doc(username)
        .set({
          email: email,
          name: name,
          profileImage: profileImagePath,
          isActive: true,
          dateCreated: Date.now()
        });
      Response.userCreated(res);
      return;
    } catch (error) {
      Response.saveUserError(res, error);
      return;
    }
  });
});

app.post("/test", (req, res) => {
  res.send("Hello from post test");
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "/view/form.html"));
});

app.put("/users", async (req, res) => {
  var form = new formidable.IncomingForm();
  await form.parse(req, async function(err, fields, files) {
    console.log(files, fields);
    var username = fields.username;
    var email = fields.email.toLowerCase();
    var name = fields.name;
    // var profileImage = fields.profileImage;
    var uploadRes = null;
    var profileImagePath = null;
    var image = files.profileImage;
    try {
      var input = await mkdir(path.join(tmpDir, "image-input"));
      var output = await mkdir(path.join(tmpDir, "image-output"));
      var inputFile = path.join(input, "profile.jpeg");
      var outputFile = path.join(output, "profile.webp");
    } catch (error) {
      console.log(error);
    }

    if (!(await Validate.usernameExist(username))) {
      Response.userNotExists(res);
      return;
    }

    if (!Validate.isEmail(email)) {
      Response.isNotEmail(res);
      return;
    }

    if (image.name !== "") {
      if (Validate.imageTooBig(image, 5)) {
        Response.imageTooBig(res);
        return;
      }
      if (!Validate.isImage(image)) {
        Response.isNotImage(res);
        return;
      }
      // TODO save image
      try {
        fs.renameSync(image.path, inputFile);
      } catch (error) {
        Response.fileProcessingError(res, error);
        return;
      }
      // TODO convert image
      try {
        await imagemin([inputFile], output, {
          use: [
            imageminWebp({
              size: 80 * 1024,
              resize: { width: 350, height: 350 }
            })
          ]
        });
      } catch (error) {
        Response.convertImageError(res, error);
        return;
      }
      // TODO save image to cloud storage
      try {
        uploadRes = await Fb.Bucket.upload(outputFile, {
          destination: `users/${username}/profile-${Date.now()}.webp`,
          public: true
        });
      } catch (error) {
        Response.saveImageError(res, error);
        return;
      }
      try {
        rimraf.sync(input);
        rimraf.sync(output);
      } catch (error) {
        console.log(error);
      }
    }

    var profileImagePath = uploadRes
      ? "https://storage.googleapis.com/my-demo-f85d3.appspot.com/" +
        uploadRes[0].name
      : null;
    console.log(profileImagePath);
    try {
      if (profileImagePath) {
        await Fb.Db.collection("users")
          .doc(username)
          .update({
            email: email,
            name: name,
            profileImage: profileImagePath
          });
      } else {
        await Fb.Db.collection("users")
          .doc(username)
          .update({
            email: email,
            name: name
          });
      }
      Response.userUpdated(res);
      return;
    } catch (error) {
      Response.updateUserError(res, error);
      return;
    }
  });
});

app.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  // fs.unlink("/image-input/profile", err => console.log(err));
  res.write("Hello");
  res.end();
});

app.get("/users", (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("Get users!");
  res.end();
});
app.listen(process.env.PORT || 6001, () =>
  console.log("express formidable started")
);
