const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  replaceCourse,
} = require("../controllers/courseController");

//GET METHOD
router.get("/", getCourses);
router.get("/:id", getCourseById);

//POST METHOD
router.post("/", createCourse);

//PUT METHOD
router.put("/:id", replaceCourse);

//PATCH METHOD
router.patch("/:id", updateCourse);
//DELETE METHOD
router.delete("/:id", deleteCourse);

module.exports = router;
