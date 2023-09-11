"use client"
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";

interface Todo {
  id: string;
  title: string;
  complete: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const fetchTodos = async () => {
    try {
      const res = await fetch("api/todo");
      const results = await res.json();

      if (res.ok) {
        const todoData: Todo[] = results.data;
        setTodos(todoData);
        setCompletedTodos(todoData.filter((todo) => todo.complete));
      } else {
        console.log("Error fetching todos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoToggle = async (id: string, complete: boolean) => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ complete }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchTodos();
      } else {
        console.log("Error updating todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      for (const todo of completedTodos) {
        await fetch(`api/todo/${todo.id}`, {
          method: "DELETE",
        });
      }
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Check if todos array is empty or undefined before filtering
  const filteredTodos = todos
    ? todos.filter((todo) => {
        if (filter === "All") {
          return true;
        } else if (filter === "Active") {
          return !todo.complete;
        } else if (filter === "Complete") {
          return todo.complete;
        }
        return true;
      })
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between gap-4 w-full">
        <AddTask fetchTodos={fetchTodos} />
        <select
          className="select max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Complete">Complete</option>
        </select>
      </div>

      <div
        className="flex-grow overflow-y-auto mb-4"
        style={{ maxHeight: "64vh" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td className="w-full">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.complete}
                      onChange={() =>
                        handleTodoToggle(todo.id, !todo.complete)
                      }
                    />
                    <span
                      className={`ml-2 ${
                        todo.complete ? "line-through" : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                  </label>
                </td>
                <DeleteTask getTodos={fetchTodos} todosList={todo} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-danger mx-auto"
        onClick={handleClearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear All Completed Tasks
      </button>
    </div>
  );
};

export default TodoList;
