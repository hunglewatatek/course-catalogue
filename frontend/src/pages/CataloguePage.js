import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/courseApi";

function CataloguePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p className="error">Lỗi: {error}</p>;
  }

  return (
    <div>
      <h1>Catalogue</h1>
      <p>Chọn một danh mục:</p>

      {categories.length === 0 ? (
        <p>Chưa có danh mục nào.</p>
      ) : (
        <ul className="category-list">
          {categories.map((name) => (
            <li key={name}>
              <Link to={`/catalogue/${encodeURIComponent(name)}`}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CataloguePage;
