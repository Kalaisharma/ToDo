// src/Services/crudService.js

import { axiosCall } from "../Client/clientcall";
const BASE_URL = import.meta.env.VITE_API_URL;

// Create a new task
export const createTask = (task) => {
  try {
    const response = axiosCall(
      `${BASE_URL}/api/addtask`,
      "POST",
      {
        task,
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
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axiosCall(
      `${BASE_URL}/api/updatetask/${id}`,
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
      `${BASE_URL}/api/deletetask/${id}`,
      "DELETE"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
