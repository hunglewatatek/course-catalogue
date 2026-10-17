import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../api/courseApi";

function EditCoursePage() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    category: "",
    duration: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [saveError, setSaveError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCourseById(id)
      .then((course) =>
        setForm({
          title: course.title,
          category: course.category,
          duration: course.duration,
          description: course.description,
        }),
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSaveError(null);

    updateCourse(id, { ...form, duration: Number(form.duration) })
      .then(() => navigate(`/courses/${id}`))
      .catch((err) => setSaveError(err.message))
      .finally(() => setSubmitting(false));
  }

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p className="error">Lỗi: {error}</p>;
  }

  return (
    <div className="course-detail">
      <h1>Sửa khóa học</h1>

      <form className="course-form" onSubmit={handleSubmit}>
        <label>
          Tên khóa học
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Danh mục
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Thời lượng (giờ)
          <input
            name="duration"
            type="number"
            min="1"
            value={form.duration}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mô tả
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        {saveError && <p className="error">Lỗi: {saveError}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}

export default EditCoursePage;
