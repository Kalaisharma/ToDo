const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../Controllers/taskControllers");

router.post("/addtask", createTask);
router.get("/tasks", getTasks);
router.put("/updatetask/:id", updateTask);
router.put("/updatetaskstatus/:id", updateTaskStatus);
router.delete("/deletetask/:id", deleteTask);

module.exports = router;
