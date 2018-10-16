const userExists = res => {
  res.status(409).send("Username already exists");
};

const imageTooBig = res => {
  res.status(413).send("File too large. Under 5MB plz");
};

const isNotImage = res => {
  res.status(415).send("Only support jpeg or png");
};

const fileProcessingError = (res, error) => {
  res.status(500).send("Problem occurred when processing file: " + error);
};

const convertImageError = (res, error) => {
  res
    .status(500)
    .send("Problem occurred when converting image to .webp: " + error);
};

const saveImageError = (res, error) => {
  res
    .status(500)
    .send("Problem occurred when saving image to storage: " + error);
};

const saveUserError = (res, error) => {
  res
    .status(500)
    .send("Problem occurred when saving user to firebase: " + error);
};

const updateUserError = (res, error) => {
  res
    .status(500)
    .send("Problem occurred when updating user to firebase: " + error);
};

const isNotEmail = res => {
  res.status(400).send("Please provide a correct email");
};

const usernameIsNotValid = res => {
  res
    .status(400)
    .send(
      "Username need at least 6 characters: letters and numbers only and no space"
    );
};

const userNotExists = res => {
  res.status(400).send("Username does not exist");
};

const userCreated = res => {
  res.status(201).send("User created!");
};

const userUpdated = res => {
  res.status(200).send("User updated!");
};

module.exports = {
  userExists: userExists,
  userNotExists: userNotExists,
  imageTooBig: imageTooBig,
  isNotImage: isNotImage,
  isNotEmail: isNotEmail,
  usernameIsNotValid: usernameIsNotValid,
  fileProcessingError: fileProcessingError,
  convertImageError: convertImageError,
  saveImageError: saveImageError,
  saveUserError: saveUserError,
  updateUserError: updateUserError,
  userCreated: userCreated,
  userUpdated: userUpdated
};
