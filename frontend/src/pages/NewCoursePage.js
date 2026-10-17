import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../api/courseApi";

function NewCoursePage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    duration: "",
    description: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    createCourse({ ...form, duration: Number(form.duration) })
      .then((course) => navigate(`/courses/${course.id}`))
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="course-detail">
      <h1>Thêm khóa học</h1>

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
        {error && <p className="error">Lỗi: {error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Đang lưu..." : "Tạo khóa học"}
        </button>
      </form>
    </div>
  );
}

export default NewCoursePage;
