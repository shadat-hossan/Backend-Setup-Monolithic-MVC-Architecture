const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/uploads/users";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();


router.route("/").get(auth("common"), userController.getUsers);

router
  .route("/:userId")
  .get(auth("common"), userController.getUser)
  .patch(
    auth("common"),
    [uploadUsers.single("image")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    userController.updateUser
  );

module.exports = router;
