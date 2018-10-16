const Fb = require("./../firebase/config");

const checkIfUsernameExist = async username => {
  var doc = await Fb.Db.collection("users")
    .doc(username)
    .get();

  return doc.exists;
};

const checkIfImageTooBig = (image, sizeInMB) => {
  if (image.size > sizeInMB * 1024 * 1024) {
    return true;
  }
  return false;
};

const checkIfIsImage = image => {
  if (image.type !== "image/jpeg" && image.type !== "image/png") {
    return false;
  }
  return true;
};

const checkIfIsEmail = email => {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

const checkIfUsernameValid = username => {
  var regex = /[0-9a-zA-Z]{6,}/;
  if (regex.test(username)) {
    return true;
  }
  return false;
};

module.exports = {
  usernameExist: checkIfUsernameExist,
  imageTooBig: checkIfImageTooBig,
  isImage: checkIfIsImage,
  isEmail: checkIfIsEmail,
  usernameIsValid: checkIfUsernameValid
};
