const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  file: Joi.object().keys({
    filename: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      fullName: Joi.string(),
      // email: Joi.string().email(),
      phoneNumber: Joi.string(),
      callingCode: Joi.string(),
      nidNumber: Joi.string(),
      dataOfBirth: Joi.string(),
      address: Joi.string(),
    })
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};


const getHome = {

};

module.exports = {
  getHome,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
