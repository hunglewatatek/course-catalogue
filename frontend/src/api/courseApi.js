const API_URL = "http://localhost:5000/api";

async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export function getCategories() {
  return request("/categories");
}

export function getCoursesByCategory(category) {
  return request(`/courses?category=${encodeURIComponent(category)}`);
}

export function getCourseById(id) {
  return request(`/courses/${id}`);
}

export function createCourse(course) {
  return request("/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}
