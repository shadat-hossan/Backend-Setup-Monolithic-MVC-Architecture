const express = require("express");
const validate = require("../../middlewares/validate");
const activityController = require("../../controllers/activity.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.route("/").get(auth("common"),  activityController.getActivitiesById);
router.route("/:id").delete(auth("common"),activityController.deleteActivityById);

module.exports = router;
