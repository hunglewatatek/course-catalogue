import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const EMPTY_ROOM = { title: "", category: "", duration: "", description: "" };

function CourseForm({
  initialValues = EMPTY_ROOM,
  submitLabel,
  submitting,
  error,
  onSave,
}) {
  const [form, setForm] = useState(initialValues);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...form, duration: Number(form.duration) });
  }

  return (
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

      {error && <ErrorMessage message={error} />}

      <button type="submit" disabled={submitting}>
        {submitting ? "Đang lưu..." : submitLabel}
      </button>
    </form>
  );
}

export default CourseForm;