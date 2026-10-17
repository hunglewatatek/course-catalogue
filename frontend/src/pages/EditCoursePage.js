import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../api/courseApi";
import CourseForm from "../components/CourseForm";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

function EditCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCourseById(id)
      .then((data) =>
        setCourse({
          title: data.title,
          category: data.category,
          duration: data.duration,
          description: data.description,
        }),
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleSave(updated) {
    setSubmitting(true);
    setSaveError(null);

    updateCourse(id, updated)
      .then(() => navigate(`/courses/${id}`))
      .catch((err) => setSaveError(err.message))
      .finally(() => setSubmitting(false));
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="course-detail">
      <h1>Sửa khóa học</h1>
      <CourseForm
        initialValues={course}
        submitLabel="Lưu thay đổi"
        submitting={submitting}
        error={saveError}
        onSave={handleSave}
      />
    </div>
  );
}

export default EditCoursePage;
