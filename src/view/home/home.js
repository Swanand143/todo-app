import "./home.css";
import TodoItem from "../../component/todoitem/todoitem";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      setTodoList(JSON.parse(savedTodoList));
    }
  }, []);

  useEffect(() => {
    if (todoList.length === 0) return;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const deleteTasks = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this task!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (!result.isConfirmed) return;
      const newTodoList = todoList.filter((item, i) => i !== index);
      setTodoList(newTodoList);
    });
  };

  const addTasks = () => {
    if (newTask === "") {
      toast.error("Enter the task");
      return;
    }
    if (category === "") {
      toast.error("Please select category");
      return;
    }
    setTodoList([...todoList, { task: newTask, category }]);
    setNewTask("");
    setCategory("");
    toast.success("Task added successfully");
  };

  return (
    <div>
      <h1 className="app-title">ToDo Application</h1>

      <div className="todolist-container">
        <div className="add-item-container">
          <input
            type="text"
            placeholder="Add your Task"
            value={newTask}
            className="input"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select
            value={category}
            className="category-select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Assigment-Completion">Assigment Completion</option>
            <option value="Vollyball">Vollyball</option>
            <option value="Tea Break">Tea Break</option>
            <option value="Gym">Gym</option>
            <option value="Gaming">Gaming</option>
            <option value="Movie">Movie</option>
            <option value="Other">Other</option>
          </select>
          
        </div>
        <div className="item-container">
          {" "}
          {todoList.map((todoItem, i) => (
            <TodoItem
              key={i}
              task={todoItem.task}
              category={todoItem.category}
              onDelete={() => deleteTasks(i)}
            />
          ))}
        </div>
        <img
            src={"https://cdn-icons-png.flaticon.com/512/4601/4601618.png"}
            alt="add-btn"
            className="add-icon"
            onClick={addTasks}
          />
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
