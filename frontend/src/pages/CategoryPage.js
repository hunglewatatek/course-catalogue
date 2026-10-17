import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCoursesByCategory } from "../api/courseApi";

function CategoryPage() {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      {courses.length === 0 ? (
        <p>Chưa có khóa học nào trong danh mục này.</p>
      ) : (
        <ul className="course-list">
          {courses.map((course) => (
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
