import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCourse, getCourseById } from "../api/courseApi";

function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getCourseById(id)
      .then((data) => setCourse(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleDelete() {
    if (!window.confirm(`Xóa khóa học "${course.title}"?`)) {
      return;
    }
    deleteCourse(course.id)
      .then(() => navigate(`/catalogue/${encodeURIComponent(course.category)}`))
      .catch((err) => setError(err.message));
  }

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return (
      <div>
        <Link to="/catalogue" className="back-link">
          ← Tất cả danh mục
        </Link>
        <p className="error">Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="course-detail">
      <Link
        to={`/catalogue/${encodeURIComponent(course.category)}`}
        className="back-link"
      >
        ← {course.category}
      </Link>
      <h1>{course.title}</h1>
      <div className="course-meta">
        <span>📂 {course.category}</span>
        <span>⏱ {course.duration} giờ</span>
      </div>

      <p>{course.description}</p>
      <Link to={`/courses/${course.id}/edit`} className="edit-button">
        Sửa
      </Link>
      <button className="danger-button" onClick={handleDelete}>
        Xóa khóa học
      </button>
    </div>
  );
}

export default CourseDetailPage;
