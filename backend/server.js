const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const PORT = 5000;

app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

app.use("/api/courses", courseRoutes);
app.use("/api/categories", categoryRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = status < 500 ? err.message : "Internal Server Error";
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
