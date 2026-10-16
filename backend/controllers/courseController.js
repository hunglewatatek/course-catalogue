const {
  getAllCourses,
  findCourseById,
  createNewCourse,
  updateCourseById,
  deleteCourseById,
  replaceCourseById,
  findCoursesByCategory,
} = require("../services/courseService");

const HttpError = require("../utils/HttpError");

function getCourses(req, res) {
  const { category } = req.query;

  if (category !== undefined && typeof category !== "string") {
    throw new HttpError(400, "Category must be a string");
  }

  const courses = category ? findCoursesByCategory(category) : getAllCourses();
  return res.json(courses);
}

function getCourseById(req, res) {
  const id = parseId(req.params.id);
  const course = findCourseById(id);

  if (!course) {
    throw new HttpError(404, "Course not found");
  }
  return res.json(course);
}

function createCourse(req, res) {
  const body = req.body ?? {};
  const error = validateCourse(body);
  if (error) {
    throw new HttpError(400, error);
  }

  const { title, category, duration, description } = body;
  const course = createNewCourse({ title, category, duration, description });
  return res.status(201).json(course);
}

function updateCourse(req, res) {
  const id = parseId(req.params.id);
  const { duration } = req.body ?? {};

  if (!Number.isFinite(duration) || duration <= 0) {
    throw new HttpError(400, "Duration must be a positive number");
  }

  const updatedCourse = updateCourseById(id, {
    duration,
  });

  if (!updatedCourse) {
    throw new HttpError(404, "Course not found");
  }

  return res.json(updatedCourse);
}

function replaceCourse(req, res) {
  const id = parseId(req.params.id);

  const body = req.body ?? {};
  const error = validateCourse(body);
  if (error) {
    throw new HttpError(400, error);
  }

  const { title, category, duration, description } = body;
  const replacedCourse = replaceCourseById(id, {
    title,
    category,
    duration,
    description,
  });

  if (!replacedCourse) {
    throw new HttpError(404, "Course not found");
  }

  return res.json(replacedCourse);
}

function deleteCourse(req, res) {
  const id = parseId(req.params.id);

  const deletedCourse = deleteCourseById(id);

  if (!deletedCourse) {
    throw new HttpError(404, "Course not found");
  }

  return res.status(204).send();
}

function parseId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "Invalid course ID");
  }

  return id;
}

function validateCourse(data) {
  const { title, category, duration, description } = data;

  if (typeof title !== "string" || !title.trim()) {
    return "Title is required";
  }

  if (typeof category !== "string" || !category.trim()) {
    return "Category is required";
  }

  if (
    typeof duration !== "number" ||
    !Number.isFinite(duration) ||
    duration <= 0
  ) {
    return "Duration must be a positive number";
  }

  if (typeof description !== "string" || !description.trim()) {
    return "Description is required";
  }

  return null;
}

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  replaceCourse,
  deleteCourse,
};
