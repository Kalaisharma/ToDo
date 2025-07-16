import { useState } from "react";
import Swal from "sweetalert2";
import {
  createTask,
  deletetodoTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
} from "../Services/crudServices";
import StatusModal from "./StatusModal";
import { useEffect } from "react";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.background = isDarkMode
      ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      : "linear-gradient(to right, #c2e9fb, #a1c4fd)";
  }, [isDarkMode]);


  const openStatusModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleSaveStatus = async (id, newStatus) => {
    console.log("Update status of", id, "to", newStatus);
    try {
      const response = await updateTaskStatus(id, newStatus);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Task status updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === selectedTodo._id
              ? { ...todo, status: newStatus }
              : todo
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error updating your task status.",
      });
    }

    setSelectedTodo(null);
  };

  const addTask = async () => {
    if (!task.trim()) return;
    setShowCategoryDialog(true);
  };
  const handleCategorySelect = async (selectedCategory) => {
    setShowCategoryDialog(false);
    try {
      const response = await createTask(task.trim(), selectedCategory);
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
    const { value: formValues } = await Swal.fire({
      title: "Edit Task",
      html: `
    <input id="swal-input1" class="swal2-input" placeholder="Enter task" value="${task}" />
    <div style="display: flex; justify-content: center; gap: 15px; margin-top: 15px;">
      <div id="swal-work" class="category-btn" data-category="Work">Work</div>
      <div id="swal-personal" class="category-btn" data-category="Personal">Personal</div>
    </div>
  `,
      customClass: {
        popup: "swal2-custom-popup",
      },
      didOpen: () => {
        const workBtn = document.getElementById("swal-work");
        const personalBtn = document.getElementById("swal-personal");

        [workBtn, personalBtn].forEach((btn) => {
          btn.style.padding = "8px 16px";
          btn.style.border = "2px solid #ccc";
          btn.style.borderRadius = "5px";
          btn.style.cursor = "pointer";
          btn.style.fontWeight = "bold";

          btn.addEventListener("click", () => {
            workBtn.style.borderColor = "#ccc";
            personalBtn.style.borderColor = "#ccc";
            btn.style.borderColor = "#007bff";
            btn.classList.add("swal2-active-category");
            btn.dataset.selected = "true";

            // remove class from other
            [workBtn, personalBtn].forEach((otherBtn) => {
              if (otherBtn !== btn) {
                otherBtn.classList.remove("swal2-active-category");
                delete otherBtn.dataset.selected;
              }
            });
          });
        });

        // Optional: pre-select based on existing task category (if available)
        const taskToEdit = todos.find((t) => t._id === id);
        if (taskToEdit?.category === "Work") workBtn.click();
        else if (taskToEdit?.category === "Personal") personalBtn.click();
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const taskInput = document.getElementById("swal-input1").value.trim();
        const selected = document.querySelector("[data-selected='true']");
        if (!taskInput)
          return Swal.showValidationMessage("Task cannot be empty");
        if (!selected)
          return Swal.showValidationMessage("Please select a category");
        return {
          task: taskInput,
          category: selected.dataset.category,
        };
      },
    });

    if (formValues) {
      try {
        const response = await updateTask(
          id,
          formValues.task.trim(),
          formValues.category
        );
        if (response.status === 201) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === id ? { ...todo, task: formValues.task.trim() } : todo
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
    setTask("");
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
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#d4edda"; // light green
      case "In Progress":
        return "#fff3cd"; // light yellow
      case "Pending":
        return "#f8d7da"; // light red
      default:
        return "#f0f0f0"; // fallback light grey
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Todo List</h1>
      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        style={styles.themeToggle}
      >
        {isDarkMode ? "☀️" : "🌙"} Switch to {isDarkMode ? "Light" : "Dark"}{" "}
        Mode
      </button>

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
          <div>
            {["Work", "Personal"].map((category) => {
              const filtered = todos.filter(
                (todo) => todo.category === category
              );
              if (filtered.length === 0) return null;

              return (
                <div key={category}>
                  <h3 style={styles.categoryHeader}>{category} Tasks</h3>
                  <ul style={styles.todoList}>
                    {filtered.map((todo) => (
                      <li
                        key={todo._id}
                        style={{
                          ...styles.todoItem,
                          backgroundColor: getStatusColor(todo.status), // 👈 dynamic color here
                          cursor: "pointer",
                        }}
                        onClick={() => openStatusModal(todo)}
                      >
                        <div style={styles.taskBlock}>
                          <span style={styles.taskText}>{todo.task}</span>
                          <div style={styles.iconContainer}>
                            <span
                              style={styles.icon}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent click from reaching <li>
                                editTask(todo._id, todo.task);
                              }}
                            >
                              ✏️
                            </span>
                            <span
                              style={styles.icon}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent click from reaching <li>
                                deleteTask(todo._id);
                              }}
                            >
                              🗑️
                            </span>
                          </div>
                        </div>

                        <div style={styles.timeBlock}>
                          <span style={styles.timeText}>
                            Created: {new Date(todo.createdAt).toLocaleString()}
                          </span>
                          <span style={styles.timeText}>
                            Updated: {new Date(todo.updatedAt).toLocaleString()}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Tasks Found</div>
        )
      ) : null}
      {showCategoryDialog && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialogBox}>
            <h3>Select Task Category</h3>
            <div style={styles.dialogButtons}>
              <button
                onClick={() => handleCategorySelect("Work")}
                style={styles.workBtn}
              >
                Work
              </button>
              <button
                onClick={() => handleCategorySelect("Personal")}
                style={styles.personalBtn}
              >
                Personal
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && selectedTodo && (
        <StatusModal
          currentStatus={selectedTodo.status}
          onClose={() => setShowModal(false)}
          onSave={(newStatus) => {
            handleSaveStatus(selectedTodo._id, newStatus);
            setShowModal(false);
          }}
        />
      )}
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
  themeToggle: {
    marginBottom: "20px",
    padding: "8px 14px",
    borderRadius: "5px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
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
  categoryHeader: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007bff",
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
    padding: "14px 16px",
    marginBottom: "12px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  leftContent: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "60%",
  },

  rightContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
  },
  iconContainer: {
    display: "flex",
    gap: "12px",
  },

  icon: {
    cursor: "pointer",
    fontSize: "18px",
  },
  taskContent: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },

  taskText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  taskBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: {
    fontSize: "12px",
    color: "#666",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginTop: "4px",
    paddingLeft: "2px",
    borderLeft: "2px solid #eee",
  },
  createdAt: {
    fontSize: "12px",
    color: "#777",
    marginTop: "6px",
  },

  updatedAt: {
    fontSize: "12px",
    color: "#777",
  },
  timeBlock: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#666",
  },
  timeText: {
    fontSize: "12px",
    color: "#555",
  },
  dialogOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  dialogBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  dialogButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  workBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  personalBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Todolist;
