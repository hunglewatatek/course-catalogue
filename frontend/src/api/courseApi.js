const API_URL = "http://localhost:5000/api";

async function request(path) {
  const res = await fetch(`${API_URL}${path}`);
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
