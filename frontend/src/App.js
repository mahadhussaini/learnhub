import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Grades from "./pages/Grades";
import Meet from "./pages/Meet";
import Todo from "./pages/Todo";
import AddNewModule from "../src/components/teach/AddNewModule";
import OpenCourse from "./pages/OpenCourse";
import StudentsList from "./pages/StudentsList";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";

axios.defaults.baseURL = axios.defaults.baseURL =
  process.env.REACT_API_URL || "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useAuthContext();

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/Courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Meet"
          element={
            <ProtectedRoute>
              <Meet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/OpenCourse"
          element={
            <ProtectedRoute>
              <OpenCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Grades"
          element={
            <ProtectedRoute>
              <Grades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student-List"
          element={
            <ProtectedRoute>
              <StudentsList />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Todo" element={<Todo />} />
        <Route path="/AddNewModule" element={<AddNewModule />} />
      </Routes>
    </div>
  );
}

export default App;
