const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { userService } = require("../services");
const unlinkImages = require("../common/unlinkImage");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json(
    response({
      message: "User Created",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: user,
    })
  );
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role", "gender"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  res.status(httpStatus.OK).json(
    response({
      message: "All Users",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

const getUser = catchAsync(async (req, res) => {
  let user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.status(httpStatus.OK).json(
    response({
      message: "User",
      status: "OK",
      statusCode: httpStatus.OK,
      data: user,
    })
  );
});

const updateUser = catchAsync(async (req, res) => {
  if (req.body.interest) {
    const parsedInterest = JSON.parse(req.body.interest);
    req.body.interest = parsedInterest;
  }
  const image = {};
  console.log(req.file);
  if (req.file) {
    image.url = "/uploads/users/" + req.file.filename;
    image.path = req.file.path;
  }
  if (req.file) {
    req.body.image = image;
  }

  const user = await userService.updateUserById(req.params.userId, req.body);

  res.status(httpStatus.OK).json(
    response({
      message: "User Updated",
      status: "OK",
      statusCode: httpStatus.OK,
      data: user,
    })
  );
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).json(
    response({
      message: "User Deleted",
      status: "OK",
      statusCode: httpStatus.OK,
      data: {},
    })
  );
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
