import React from "react";
import "./todoitem.css";
function TodoItem({ task, category, onDelete }) {
  return (
    <div className="todo-item">
      <span className="task">{task}</span>
      <span className="category">{category}</span>
      <img
        src={"https://cdn-icons-png.flaticon.com/512/1828/1828843.png"}
        alt="delete-btn"
        className="delete-btn"
        onClick={onDelete}
      />
    </div>
  );
}

export default TodoItem;
