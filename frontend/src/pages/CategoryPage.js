import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCoursesByCategory } from "../api/courseApi";

function CategoryPage() {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const keyword = search.trim().toLowerCase();
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(keyword),
  );

  useEffect(() => {
    setLoading(true);
    setError(null);

    getCoursesByCategory(category)
      .then((data) => setCourses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p className="error">Lỗi: {error}</p>;
  }

  return (
    <div>
      <Link to="/catalogue" className="back-link">
        ← Tất cả danh mục
      </Link>
      <h1>{category}</h1>
      <input
        className="search-input"
        placeholder="Tìm theo tên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {courses.length === 0 ? (
        <p>Chưa có khóa học nào trong danh mục này.</p>
      ) : filteredCourses.length === 0 ? (
        <p>Không tìm thấy khóa học nào khớp với "{search}".</p>
      ) : (
        <ul className="course-list">
          {filteredCourses.map((course) => (
            <li key={course.id} className="course-card">
              <Link to={`/courses/${course.id}`}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span className="duration">⏱ {course.duration} giờ</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryPage;
