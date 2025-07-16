// src/Services/crudService.js

import { axiosCall } from "../Client/clientcall";

// Create a new task
export const createTask = (task) => {
  try {
    const response = axiosCall("http://localhost:5000/api/addtask", "POST", {
      task,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all tasks
export const getAllTasks = async () => {
  try {
    const response = await axiosCall("http://localhost:5000/api/tasks", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axiosCall(
      `http://localhost:5000/api/updatetask/${id}`,
      "PUT",
      { task: updatedTask }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a task
export const deletetodoTask = async (id) => {
  try {
    const response = await axiosCall(
      `http://localhost:5000/api/deletetask/${id}`,
      "DELETE"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
