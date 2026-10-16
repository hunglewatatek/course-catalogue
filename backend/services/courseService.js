const courses = require("../data/courses");

function getAllCourses() {
  return courses.map((course) => ({ ...course }));
}

function findCourseById(id) {
  const course = courses.find((course) => course.id === Number(id));
  return course ? { ...course } : null;
}

function createNewCourse(courseData) {
  const maxId = courses.reduce(
    (max, course) => (course.id > max ? course.id : max),
    0,
  );
  const newCourse = { ...courseData, id: maxId + 1 };
  courses.push(newCourse);
  return { ...newCourse };
}

function replaceCourseById(id, courseData) {
  const index = courses.findIndex((course) => course.id === Number(id));

  if (index === -1) {
    return null;
  }
  const replacedCourse = { ...courseData, id: Number(id) };
  courses[index] = replacedCourse;
  return { ...replacedCourse };
}

function updateCourseById(id, updates) {
  const index = courses.findIndex((course) => course.id === Number(id));
  if (index === -1) {
    return null;
  }
  courses[index] = { ...courses[index], ...updates, id: Number(id) };
  return { ...courses[index] };
}

function deleteCourseById(id) {
  const index = courses.findIndex((course) => course.id === Number(id));
  if (index === -1) {
    return null;
  }
  const deletedCourse = courses.splice(index, 1);
  return { ...deletedCourse[0] };
}

function findCoursesByCategory(category) {
  const keyword = category.toLowerCase();
  return courses
    .filter((course) => course.category.toLowerCase() === keyword)
    .map((course) => ({ ...course }));
}

function getAllCategories() {
  const categories = courses.map((course) => course.category);
  return [...new Set(categories)];
}
module.exports = {
  getAllCourses,
  findCourseById,
  createNewCourse,
  replaceCourseById,
  updateCourseById,
  deleteCourseById,
  findCoursesByCategory,
  getAllCategories,
};
