require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const chaptersRoutes = require("./routes/chapters");
const moduleRoutes = require("./routes/module");
const userRoutes = require("./routes/user");
const path = require("path");
const routes = require("./routes/ToDoRoute");
const { socketController } = require("./contollers/chatController");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketController(io);

// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://eventwave-client.onrender.com"
    : "http://localhost:3006";

app.use(
  cors({
    credentials: true,
    origin: allowedOrigin,
  })
);

// app.use(cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/chat", socketController);
app.use("/api/chapters", chaptersRoutes);
app.use("/api/module", moduleRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("listening to port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
