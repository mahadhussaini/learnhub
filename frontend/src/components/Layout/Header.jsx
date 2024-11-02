import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../../img/logo.png";

const Header = ({ check, setCheck }) => {
  const { user, logout } = useAuthContext();

  const handleChangeMessage = () => {
    setCheck(!check);
  };
  return (
    <header className="hame flex items-center justify-between px-4 bg-white border-b">
      <div className="ml-14 -mt-2">
        <input type="checkbox" id="check" onChange={handleChangeMessage} />
        <label htmlFor="check" className="checkbtn">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </label>
      </div>

      <div className="flex items-center justify-center">
        <Link to="/">
          <img src={logo} alt="LearnHub Logo" className="h-20 w-auto" />
        </Link>
      </div>

      <div className="flex items-center">
        {user ? (
          <div className="flex items-center space-x-2">
            {/* <img
              src={user.photoURL || "defaultProfilePic.png"}
              alt="Profile"
              className="h-8 w-8 rounded-full"
            /> */}
            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-500"
            >
              <ExitToAppIcon className="mr-1" />
              {/* Logout */}
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-red-500">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
