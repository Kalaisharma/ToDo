const express = require("express");
const cors = require("cors");
const taskRoutes = require("./Routes/taskRoutes");
const app = express();
const connectDB = require("./Database/connection");
connectDB();
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  cors({ origin: "https://kalai-todolist.netlify.app", credentials: true })
);

app.use(express.json());
app.use("/api", taskRoutes);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
module.exports = app;
