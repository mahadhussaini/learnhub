import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Layout from "../components/Layout/Layout";
import { BallTriangle } from "react-loader-spinner";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/", {
          params: { user_id: user._id },
        });
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user._id]);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = async (event) => {
    event.preventDefault();

    if (!newTodo) return; // Prevent adding empty todos

    try {
      const response = await axios.post("http://localhost:4000/", {
        text: newTodo,
        user_id: user._id,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleTodoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditChange = (event) => {
    setEditTodoText(event.target.value);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editTodoText) return;

    try {
      const response = await axios.put(`http://localhost:4000/${editTodoId}`, {
        text: editTodoText,
      });
      setTodos(
        todos.map((todo) => (todo._id === editTodoId ? response.data : todo))
      );
      setEditTodoId(null);
      setEditTodoText("");
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/${todo._id}/complete`,
        {
          completed: !todo.completed,
        }
      );
      setTodos(todos.map((t) => (t._id === todo._id ? response.data : t)));
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  return (
    <Layout>
      <div>
        <div className="bg-white rounded-xl shadow p-6 w-full">
          <h1 className="text-gray-800 text-2xl md:text-4xl font-bold text-center mb-6">
            Todo List
          </h1>
          {loading ? (
            <div className="flex justify-center">
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#6d19d4"
                ariaLabel="ball-triangle-loading"
                visible={true}
              />
            </div>
          ) : (
            <>
              <form onSubmit={handleNewTodoSubmit} className="flex mb-6">
                <input
                  type="text"
                  className="shadow border rounded w-full py-2 px-3 mr-4 text-gray-700"
                  placeholder="Add Todo"
                  value={newTodo}
                  onChange={handleNewTodoChange}
                />
                <button className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5">
                  Add
                </button>
              </form>
              <div className="space-y-4">
                {todos.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex justify-between items-center border rounded-lg shadow-md p-4 bg-gray-50 hover:bg-gray-100 transition duration-300"
                  >
                    <div className="flex items-center">
                      <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo)}
                      />
                      {editTodoId === todo._id ? (
                        <form onSubmit={handleEditSubmit} className="flex">
                          <input
                            type="text"
                            className="shadow border rounded py-1 px-2 text-gray-700"
                            value={editTodoText}
                            onChange={handleEditChange}
                          />
                          <button
                            type="submit"
                            className="text-blue-600 hover:text-blue-700 ml-2"
                          >
                            Save
                          </button>
                        </form>
                      ) : (
                        <p
                          className={`text-gray-800 w-full ${
                            todo.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.text}
                        </p>
                      )}
                    </div>
                    <div>
                      {editTodoId === todo._id ? (
                        <button
                          type="button"
                          className="text-red-600 hover:bg-red-500 hover:text-white border border-red-600 rounded-lg px-3 py-1 transition duration-300"
                          onClick={() => setEditTodoId(null)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="text-blue-600 hover:bg-blue-500 hover:text-white border border-blue-600 rounded-lg px-3 py-1 transition duration-300"
                            onClick={() => {
                              setEditTodoId(todo._id);
                              setEditTodoText(todo.text);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:bg-red-500 hover:text-white border border-red-600 rounded-lg px-3 py-1 transition duration-300"
                            onClick={() => handleTodoDelete(todo._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Todo;
