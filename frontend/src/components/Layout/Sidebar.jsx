import { Link, NavLink } from "react-router-dom";
import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ClassIcon from "@mui/icons-material/Class";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MessageIcon from "@mui/icons-material/Message";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useLogout } from "../../hooks/useLogout";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Swal from "sweetalert2";
import Person from "../../img/icons/person.png";

const Sidebar = ({ check, setCheck, forwardRef }) => {
  const { logout } = useLogout();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleClick = () => {
    Swal.fire({
      title: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Logged out!", "You have been logged out", "success");
        navigate("/login");
      }
    });
  };

  return (
    <nav
      className={`${check ? "sidebar-active" : "sidebar"} flex flex-col`}
      ref={forwardRef}
    >
      <div className="flex items-center mt-8 ml-10">
        <Link
          to="/profile"
          className="flex border d w-20 h-20 bg-slate-200 drop-shadow-md rounded-full"
        >
          <img src={Person} className="m-auto" alt="Profile" />
        </Link>
        {/* Check if user exists before accessing user.name */}
        <span className="ml-4 text-lg font-semibold">
          {user ? user.name : "Guest"}
        </span>
      </div>

      <div className="mt-10">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-2 rounded-xl transition-all duration-300 ${
              isActive ? "bg-blue-800 text-white" : "hover:bg-blue-500"
            }`
          }
        >
          <GridViewIcon className="mr-4" />
          Dashboard
        </NavLink>

        {user?.role === "Admin" ? (
          <NavLink
            to="/Courses"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 rounded-xl transition-all duration-300 ${
                isActive ? "bg-blue-800 text-white" : "hover:bg-blue-500"
              }`
            }
          >
            <ClassIcon className="mr-4" />
            Courses
          </NavLink>
        ) : (
          <NavLink
            to="/Grades"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 rounded-xl transition-all duration-300 ${
                isActive ? "bg-blue-800 text-white" : "hover:bg-blue-500"
              }`
            }
          >
            <InsertChartIcon className="mr-4" />
            Grades
          </NavLink>
        )}

        <NavLink
          to="/Todo"
          className={({ isActive }) =>
            `flex items-center px-6 py-2 rounded-xl transition-all duration-300 ${
              isActive ? "bg-blue-800 text-white" : "hover:bg-blue-500"
            }`
          }
        >
          <ListAltIcon className="mr-4" />
          To-do
        </NavLink>

        {user?.role === "Admin" && (
          <NavLink
            to="/Student-List"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 rounded-xl transition-all duration-300 ${
                isActive ? "bg-blue-800 text-white" : "hover:bg-blue-500"
              }`
            }
          >
            <ClassIcon className="mr-4" />
            Student List
          </NavLink>
        )}
      </div>

      <div className="mt-10">
        <NavLink
          to="/Chat"
          className={({ isActive }) =>
            `flex items-center px-6 py-2 rounded-xl transition-all duration-300 ${
              isActive ? "bg-blue-800 text-white" : "hover:bg-blue-500"
            }`
          }
        >
          <MessageIcon className="mr-4" />
          Chat
        </NavLink>

        <NavLink
          to="/Meet"
          className={({ isActive }) =>
            `flex items-center px-6 py-2 rounded-xl transition-all duration-300 ${
              isActive ? "bg-blue-800 text-white" : "hover:bg-blue-500"
            }`
          }
        >
          <VideoCallIcon className="mr-4" />
          Meet
        </NavLink>
      </div>

      <div className="mt-auto p-4">
        {/* Render Logout button only if user exists */}
        {user && (
          <button
            onClick={handleClick}
            className="flex items-center px-6 py-2 text-red-600 hover:bg-red-200 rounded-xl w-full"
          >
            <LogoutIcon className="mr-2" /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
