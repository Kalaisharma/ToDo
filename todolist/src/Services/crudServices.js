// src/Services/crudService.js

import { axiosCall } from "../Client/clientcall";
const BASE_URL = import.meta.env.VITE_API_URL;

// Create a new task
export const createTask = (task,category) => {
  try {
    const response = axiosCall(
      `${BASE_URL}/api/addtask`,
      "POST",
      {
        task,
        category
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all tasks
export const getAllTasks = async () => {
  try {
    const response = await axiosCall(`${BASE_URL}/api/tasks`, "GET");
    return response;
  } catch (error) {
    throw error;
  }
};

// Update a task
export const updateTask = async (id, updatedTask,updatedCategory) => {
  try {
    const response = await axiosCall(
      `${BASE_URL}/api/updatetask/${id}`,
      "PUT",
      { task: updatedTask, category: updatedCategory }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// Update task status
export const updateTaskStatus = async (id, updatedStatus) => {
  try {
    const response = await axiosCall(
      `${BASE_URL}/api/updatetaskstatus/${id}`,
      "PUT",
      { status: updatedStatus }
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
      `${BASE_URL}/api/deletetask/${id}`,
      "DELETE"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
