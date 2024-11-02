import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Popup from "../components/profile/addNewProfile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import profileBg from "../img/pfbg.PNG";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";

const Profile = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [file, setFile] = useState(null);
  const { user, dispatch } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [updatedAvatar, setUpdatedAvatar] = useState(user.avatar);

  // Handle form submission for profile picture update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state while the request is being processed

    const formData = new FormData();
    formData.append("avatar", file); // Append the file to the FormData
    formData.append("_id", user._id); // Append user ID

    // Send the form data to the server
    const response = await fetch("http://localhost:4000/api/user/Profile/", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();

    if (response.ok) {
      setButtonPopup(false); // Close the popup on successful update
      setLoading(false);
      setFile(null); // Reset the file input
      setUpdatedAvatar(json.avatar); // Update the avatar in state
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated",
        showConfirmButton: false,
        timer: 2000,
      });
      localStorage.setItem("user", JSON.stringify(json)); // Update local storage
      dispatch({ type: "LOGIN", payload: json }); // Dispatch updated user info
    } else {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: json.error || "Something went wrong", // Display error message if any
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="relative">
        <Link to="/Dashboard" className="absolute top-4 left-4 z-10">
          <ArrowBackIcon className="text-white text-4xl" />
        </Link>
        <div className="flex flex-col items-center w-full h-40 md:h-96 bg-gray-500">
          <h1 className="mt-20 text-2xl font-bold text-white">
            {user.role === "Admin"
              ? "Hi, you are an Admin!"
              : "Hi, " + user.name}
          </h1>
        </div>
        <div className="flex flex-col items-center mt-4">
          <button onClick={() => setButtonPopup(true)} className="relative">
            <CameraAltIcon className="absolute top-0 left-0 z-10 text-white text-3xl" />
            <img
              src={updatedAvatar}
              alt=""
              className="w-32 h-32 rounded-full border-4 border-white shadow-md md:w-56 md:h-56"
            />
          </button>
          <h1 className="mt-4 text-xl font-bold">{user.name}</h1>
        </div>
        <img
          src={profileBg}
          alt="Profile Background"
          className="absolute top-40 right-0 hidden w-1/3 md:flex"
        />
      </div>
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-6">
        {/* Accordion for User Name */}
        <Accordion className="w-full mb-4" style={{ background: "#abdbe3" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="font-bold">User Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <h1 className="text-lg font-bold">{user.name}</h1>
              <p className="mt-2">
                The name field is a space provided for users to enter their
                given name or preferred name.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* Accordion for User Email */}
        <Accordion className="w-full" style={{ background: "#abdbe3" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="font-bold">User Email</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <h1 className="text-lg font-bold">{user.email}</h1>
              <p className="mt-2">
                An email field is a text input area on a form or webpage that
                allows the user to enter their email address.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      {/* Popup for updating profile picture */}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#6d19d4"
              ariaLabel="ball-triangle-loading"
              visible={true}
            />
            <h1 className="mt-4 text-xl font-bold text-green-800">
              Updating...
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="flex flex-col items-center w-full px-4 py-6">
                <label className="flex flex-col items-center w-64 px-4 py-6 tracking-wide text-blue border-2 border-dashed border-blue-400 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-400 hover:text-white transition">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Select a file
                  </span>
                  <input
                    className="hidden"
                    type="file"
                    name="profileImage"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>
              <button className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Update
              </button>
            </form>
            <span className="mt-2 text-xs text-gray-500">
              Note: It may take some time to update the profile picture.
            </span>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Profile;
