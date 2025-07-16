const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../Controllers/taskControllers");

router.post("/addtask", createTask);
router.get("/tasks", getTasks);
router.put("/updatetask/:id", updateTask);
router.delete("/deletetask/:id", deleteTask);

module.exports = router;
