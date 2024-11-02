const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  // Check if authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  // Extract the token from the Authorization header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token using the secret
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Check if the user exists in the database
    const user = await User.findById(_id).select("_id");
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    // Attach user information to the request object
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    console.error("Authentication error:", error); // Log error for debugging
    return res.status(401).json({ error: "Request not authorized." });
  }
};

module.exports = requireAuth;
