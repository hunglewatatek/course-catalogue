import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../api/courseApi";
import CourseForm from "../components/CourseForm";

function NewCoursePage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleCreate(course) {
    setSubmitting(true);
    setError(null);

    createCourse(course)
      .then((created) => navigate(`/courses/${created.id}`))
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  }

  return (
    <div className="course-detail">
      <h1>Thêm khóa học</h1>
      <CourseForm
        submitLabel="Tạo khóa học"
        submitting={submitting}
        error={error}
        onSave={handleCreate}
      />
    </div>
  );
}

export default NewCoursePage;
