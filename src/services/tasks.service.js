const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const { Tasks } = require("../models");
const { userService } = require(".");

const createTask = async (data) => {

  const task = await Tasks.create(data);
  return task;
};

const queryTasks = async (filter, options) => {
  const { limit = 10, page = 1 } = options; // Set default limit and page values

  const count = await Tasks.countDocuments(filter);

  const totalPages = Math.ceil(count / limit); // Calculate total pages
  const skip = (page - 1) * limit; // Calculate skip value

  const crews = await Tasks.find(filter)

  const result = {
    data: crews,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    totalResults: count,
  };

  if (!crews || !crews.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Tasks found");
  }

  return result;
};

const getTaskById = async (id) => {
  const task = await Tasks.findById(id)
    .populate("crewLeaders", "_id username image") // Assuming username is a field in the User model
    .populate("affiliations", "_id name");
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return task;
};

const deleteTaskById = async (id) => {
  const task = await Tasks.findByIdAndDelete(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return task;
};

const updateTaskById = async (id, bodyData, image) => {
  const task = await getTasksById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  if (image) {
    task.image = image;
  }

  Object.assign(task, bodyData);
  await task.save();
  return task;
};


module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById
};
