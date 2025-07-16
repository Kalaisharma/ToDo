import { useState } from "react";
import Swal from "sweetalert2";
import {
  createTask,
  deletetodoTask,
  getAllTasks,
  updateTask,
} from "../Services/crudServices";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [showTasks, setShowTasks] = useState(false);

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const response = await createTask(task.trim());
      console.log("Task created successfully:", response);
      if (response.status === 201) {
        console.log("Task added successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Task Added!",
          text: "Your task was added successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error adding your task.",
      });
    }
    setTask("");
    setShowTasks(false);
  };

  const trackChange = (e) => {
    setTask(e.target.value);
  };

  const deleteTask = async (id) => {
    try {
      const response = await deletetodoTask(id);
      console.log("Task deleted successfully:", response);
      if (response.status === 201) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        console.log("Task deleted successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Task Deleted!",
          text: "Your task was Deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error deleting your task.",
      });
    }
  };

  const editTask = async (id, task) => {
    const { value: newTask } = await Swal.fire({
      title: "Edit Task",
      input: "text",
      inputLabel: "Update your task",
      inputValue: task,
      showCancelButton: true,
      confirmButtonText: "Update",
      inputValidator: (value) => {
        if (!value.trim()) return "Task cannot be empty";
      },
    });

    if (newTask) {
      try {
        const response = await updateTask(id, newTask.trim());
        if (response.status === 201) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, task: newTask.trim() } : todo
            )
          );
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Task updated successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error updating task:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error updating your task.",
        });
      }
    }
  };

  const toggleShowTasks = async (e) => {
    e.preventDefault();
    if (e.target.innerText === "Hide Tasks") {
      setShowTasks(false);
      return;
    }
    try {
      const response = await getAllTasks();
      if (response.status === 201 && response.data.length > 0) {
        console.log("Task fetched successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Task Fetched!",
          text: "Your task was fetched successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      setTodos(response.data || []);
    } catch (error) {
      console.error("Error fetching task:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error fetching your task.",
      });
    }
    setShowTasks(!showTasks);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Todo List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={trackChange}
          placeholder="Enter your task here"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          Add Task
        </button>
      </div>

      <button onClick={toggleShowTasks} style={styles.toggleButton}>
        {showTasks ? "Hide Tasks" : "Show Tasks"}
      </button>

      {showTasks ? (
        todos.length > 0 ? (
          <ul style={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo._id} style={styles.todoItem}>
                <span>{todo.task}</span>
                <div style={styles.iconContainer}>
                  <span
                    style={styles.icon}
                    onClick={() => editTask(todo._id, todo.task)}
                  >
                    ✏️
                  </span>
                  <span
                    style={styles.icon}
                    onClick={() => deleteTask(todo._id)}
                  >
                    🗑️
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No Tasks Found</div>
        )
      ) : null}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggleButton: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#28a745",
    color: "white",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  todoList: {
    listStyleType: "none",
    padding: 0,
  },
  todoItem: {
    backgroundColor: "white",
    padding: "10px 12px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    gap: "10px",
  },
  icon: {
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default Todolist;
