const Task = require("../Models/Task");

exports.createTask = async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new Task({ task });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Error creating task" });
  }
};

exports.getTasks = async (_req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(201).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updated = await Task.findByIdAndUpdate(id, { task }, { new: true });
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params; 
    await Task.findByIdAndDelete(id);
    res.status(201).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
