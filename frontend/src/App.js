import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CataloguePage from "./pages/CataloguePage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryPage from "./pages/CategoryPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import NewCoursePage from "./pages/NewCoursePage";
import EditCoursePage from "./pages/EditCoursePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/catalogue/:category" element={<CategoryPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/courses/new" element={<NewCoursePage />} />
          <Route path="/courses/:id/edit" element={<EditCoursePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
