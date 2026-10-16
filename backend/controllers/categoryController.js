const { getAllCategories } = require("../services/courseService");

function getCategories(req, res) {
  const categories = getAllCategories();
  return res.json(categories);
}

module.exports = {
  getCategories,
};
